import {
  RcModuleV2,
  state,
  storage,
  action,
} from '@ringcentral-integration/core';
import { forEach } from 'ramda';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { Deps } from './DataFetcherV2.interface';
import { SourceStatusType, sourceStatus } from './sourceStatus';
import { DataSource } from './DataSource';

@Module({
  name: 'DataFetcherV2',
  deps: [
    'Auth',
    'Storage',
    'SleepDetector',
    { dep: 'TabManager', optional: true },
    { dep: 'DataFetcherV2Options', optional: true },
  ],
})
export class DataFetcherV2 extends RcModuleV2<Deps> {
  protected _sources = new Set<DataSource<any>>();
  protected _timeoutIds = new Map<string, NodeJS.Timeout>();
  protected _promises = new Map<string, Promise<void>>();

  constructor(deps: Deps) {
    super({
      storageKey: 'dataFetcherV2',
      enableCache: true,
      deps,
    });
    this._deps.sleepDetector.on(this._deps.sleepDetector.events.detected, () =>
      this._handleSleepDetected(),
    );
  }

  _shouldInit() {
    return this._deps.auth.loggedIn && super._shouldInit();
  }

  _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  @state
  sourceStatus: Record<string, SourceStatusType> = {};

  @storage
  @state
  cachedData: Record<string, any> = {};

  @storage
  @state
  cachedTimestamps: Record<string, number> = {};

  @state
  data: Record<string, any> = {};

  @state
  timestamps: Record<string, number> = {};

  @state
  isFetching: Record<string, boolean> = {};

  @action
  protected _setFetching(source: DataSource<any>, isFetching: boolean) {
    this.isFetching[source.key] = isFetching;
  }

  getFetching<T>(source: DataSource<T>) {
    return !!this.isFetching[source.key];
  }

  @action
  protected _setData<T>(
    source: DataSource<T>,
    data: T,
    timestamp = Date.now(),
  ): void {
    if (source.disableCache) {
      this.data[source.key] = data;
      this.timestamps[source.key] = timestamp;
    } else {
      this.cachedData[source.key] = data;
      this.cachedTimestamps[source.key] = timestamp;
    }
  }

  updateData<T>(source: DataSource<T>, data: T, timestamp: number): void {
    this._setData(source, data, timestamp);
  }

  @proxify
  protected async _fetchData<T>(source: DataSource<T>): Promise<void> {
    this._setFetching(source, true);
    const { ownerId } = this._deps.auth;
    try {
      const data = await source.fetchFunction();
      if (this._deps.auth.ownerId === ownerId) {
        this._setData(source, data, Date.now());
        this._setFetching(source, false);
        if (source.polling) {
          this._startPolling(source);
        }
        this._promises.delete(source.key);
      }
    } catch (error) {
      if (this._deps.auth.ownerId === ownerId) {
        this._promises.delete(source.key);
        this._setFetching(source, false);
        if (source.polling) {
          this._startPolling(source, source.timeToRetry);
        } else {
          this._retry(source);
        }
        throw error;
      }
    }
  }

  protected _clearTimeout<T>(source: DataSource<T>) {
    if (this._timeoutIds.has(source.key)) {
      clearTimeout(this._timeoutIds.get(source.key));
      this._timeoutIds.delete(source.key);
    }
  }

  protected _startPolling<T>(
    source: DataSource<T>,
    t = this.getTimestamp(source) + source.pollingInterval + 10 - Date.now(),
  ) {
    this._clearTimeout(source);
    this._timeoutIds.set(
      source.key,
      setTimeout(() => {
        this._timeoutIds.delete(source.key);
        if (
          this.ready &&
          this._checkIsActiveTab(source) &&
          source.readyCheckFunction() &&
          source.permissionCheckFunction()
        ) {
          if (this._expired(source)) {
            this.fetchData(source);
          } else {
            this._startPolling(source);
          }
        } else if (!this._expired(source)) {
          this._startPolling(source);
        } else {
          this._startPolling(source, source.timeToRetry);
        }
      }, t),
    );
  }

  protected _retry<T>(source: DataSource<T>, t = source.timeToRetry) {
    this._clearTimeout(source);
    this._timeoutIds.set(
      source.key,
      setTimeout(() => {
        if (this._expired(source)) {
          if (
            this.ready &&
            this._checkIsActiveTab(source) &&
            source.readyCheckFunction() &&
            source.permissionCheckFunction()
          ) {
            this.fetchData(source);
          } else {
            this._retry(source);
          }
        }
      }, t),
    );
  }

  @proxify
  async fetchData(source: DataSource<any>): Promise<void> {
    if (!this._promises.get(source.key)) {
      this._promises.set(source.key, this._fetchData(source));
    }
    return this._promises.get(source.key);
  }

  getTimestamp<T>(source: DataSource<T>) {
    if (source.disableCache) {
      return this.timestamps[source.key] || null;
    }
    return this.cachedTimestamps[source.key] || null;
  }

  get sources() {
    return this._sources;
  }

  protected _expired<T>(source: DataSource<T>) {
    return Date.now() - this.getTimestamp(source) > source.ttl;
  }

  protected _shouldFetch<T>(source: DataSource<T>, isFreshLogin = false) {
    return (
      this._checkIsActiveTab<T>(source) &&
      (isFreshLogin || this._expired(source))
    );
  }

  private _checkIsActiveTab<T>(source: DataSource<T>) {
    // if cache is disabled, then each tab should fetch its own data
    // therefore tabManager should be ignored
    return (
      source.disableCache ||
      !this._deps.tabManager ||
      this._deps.tabManager.active
    );
  }

  protected async _tryInitializeSource<T>(
    source: DataSource<T>,
  ): Promise<void> {
    if (this.getSourceStatus(source) === sourceStatus.pending) {
      this._setSourceStatus(source, sourceStatus.initializing);
      if (this._shouldFetch(source)) {
        try {
          await this.fetchData(source);
        } catch {
          this._retry(source);
        }
      } else if (source.polling) {
        this._startPolling(source);
      } else {
        this._retry(source);
      }
      return;
    }
    if (this.getData(source) !== null && this.getTimestamp(source) !== null) {
      this._setSourceStatus(source, sourceStatus.ready);
    }
  }

  @action
  protected _setSourceStatus<T>(
    source: DataSource<T>,
    status: SourceStatusType,
  ) {
    this.sourceStatus[source.key] = status;
  }

  getSourceStatus<T>(source: DataSource<T>) {
    return this.sourceStatus[source.key];
  }

  protected _processSources() {
    if (this.ready) {
      forEach((source) => {
        if (!this.getSourceStatus(source)) {
          this._setSourceStatus(source, sourceStatus.pending);
        }
        const status = this.getSourceStatus(source);
        const readyCheck = this.ready && source.readyCheckFunction();
        const permissionCheck = readyCheck && source.permissionCheckFunction();
        if (readyCheck) {
          if (
            status === sourceStatus.pending ||
            status === sourceStatus.initializing
          ) {
            // if user has no permission to fetch data, bypass the initialization process
            if (!permissionCheck) {
              this._setSourceStatus(source, sourceStatus.ready);
              this._setData(source, null, 0);
            } else {
              this._tryInitializeSource(source);
            }
          } else if (status === sourceStatus.ready) {
            if (
              !permissionCheck &&
              this.getData(source) !== null &&
              this.getTimestamp(source) !== null
            ) {
              // no permission but has data, set data to null
              // use 0 for timestamp so we know this is on purpose
              this._setData(source, null, 0);
            } else if (
              permissionCheck &&
              this.getData(source) === null &&
              this.getTimestamp(source) === 0 &&
              !this._promises.get(source.key)
            ) {
              // if the data set to null due to permission before
              // but now there is permission, then fetch data
              this.fetchData(source);
            }
          }
        } else if (status === sourceStatus.ready) {
          this._setSourceStatus(source, sourceStatus.pending);
          if (source.cleanOnReset) {
            this._setData(source, null, null);
          }
        }
      }, Array.from(this._sources));
    }
  }

  protected _handleSleepDetected() {
    forEach((source) => {
      if (this._shouldFetch(source)) {
        this.fetchData(source);
      }
    }, Array.from(this._sources));
  }

  protected _getRegisteredKeys() {
    const keys = new Set<string>();
    this._sources.forEach((source) => {
      keys.add(source.key);
    });
    return keys;
  }

  protected _getInvalidCachedKeys() {
    const registeredKeys = this._getRegisteredKeys();
    const keys = new Set<string>();
    for (const k in this.cachedData) {
      if (
        Object.prototype.hasOwnProperty.call(this.cachedData, k) &&
        !registeredKeys.has(k)
      ) {
        keys.add(k);
      }
    }
    for (const k in this.cachedTimestamps) {
      if (
        Object.prototype.hasOwnProperty.call(this.cachedTimestamps, k) &&
        !registeredKeys.has(k)
      ) {
        keys.add(k);
      }
    }
    return keys;
  }

  @action
  protected _deleteKeys(keys: Set<string>) {
    keys.forEach((k) => {
      delete this.cachedData[k];
      delete this.cachedTimestamps[k];
    });
  }

  protected _cleanCache() {
    this._deleteKeys(this._getInvalidCachedKeys());
  }

  onInit() {
    // clean up cached sources that are no longer exist
    this._cleanCache();
  }

  onReset() {
    forEach((source) => {
      // clear all pollings or retries
      this._clearTimeout(source);
      // clear all pending requests
      this._promises.delete(source.key);
      // reset isFetching
      this._setFetching(source, false);
      if (this.getSourceStatus(source) !== sourceStatus.pending) {
        this._setSourceStatus(source, sourceStatus.pending);
      }
      if (
        source.cleanOnReset &&
        this.getData(source) !== null &&
        this.getTimestamp(source) !== null
      ) {
        this._setData(source, null, null);
      }
    }, Array.from(this._sources));
  }

  onStateChange() {
    this._processSources();
  }

  register<T>(source: DataSource<T>) {
    this._sources.add(source);
  }

  getData<T>(source: DataSource<T>): T {
    if (this._sources.has(source)) {
      if (source.disableCache) {
        return this.data[source.key] || null;
      }
      return this.cachedData[source.key] || null;
    }
    return null;
  }
}
