import { SleepDetector } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  injectable,
  optional,
  delegate,
  RcModule,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { forEach } from 'ramda';
import { takeUntil, tap } from 'rxjs';

import { Auth } from '../Auth';

import type { DataFetcherOptions } from './DataFetcher.interface';
import type { DataSource } from './DataSource';
import type { SourceStatusType } from './sourceStatus';
import { sourceStatus } from './sourceStatus';

@injectable({
  name: 'DataFetcher',
})
export class DataFetcher extends RcModule {
  protected _sources = new Set<DataSource<any>>();
  protected _timeoutIds = new Map<string, NodeJS.Timeout>();
  protected _promises = new Map<string, Promise<void>>();

  constructor(
    protected _auth: Auth,
    protected _storage: StoragePlugin,
    protected _sleepDetector: SleepDetector,
    @optional('DataFetcherOptions')
    protected _dataFetcherOptions?: DataFetcherOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  override _shouldInit() {
    return this._auth.loggedIn && super._shouldInit();
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  @state
  sourceStatus: Record<string, SourceStatusType> = {};

  get cachedData() {
    return this.storageData.cachedData;
  }

  get cachedTimestamps() {
    return this.storageData.cachedTimestamps;
  }

  @storage
  @state
  storageData: {
    cachedData: Record<string, any>;
    cachedTimestamps: Record<string, number | null>;
  } = {
    cachedData: {},
    cachedTimestamps: {},
  };

  @state
  data: Record<string, any> = {};

  @state
  timestamps: Record<string, number | null> = {};

  @state
  isFetching: Record<string, boolean> = {};

  @action
  protected _setFetching(key: string, isFetching: boolean) {
    this.isFetching[key] = isFetching;
  }

  getFetching<T>(source: DataSource<T>) {
    return !!this.isFetching[source.key];
  }

  @action
  protected _setData<T>(
    key: string,
    disableCache: boolean,
    data: T,
    timestamp: number | null = Date.now(),
  ): void {
    if (typeof data === 'undefined') return;
    if (disableCache) {
      this.data[key] = data;
      this.timestamps[key] = timestamp;
    } else {
      this.storageData.cachedData[key] = data;
      this.storageData.cachedTimestamps[key] = timestamp;
    }
  }

  updateData<T>(source: DataSource<T>, data: T, timestamp: number): void {
    this._setData(source.key, source.disableCache, data, timestamp);
  }

  @delegate('server')
  protected async _fetchData<T>(source: DataSource<T>): Promise<void> {
    this._setFetching(source.key, true);
    const { ownerId } = this._auth;
    try {
      const data = await source.fetchFunction();
      if (this._auth.ownerId === ownerId) {
        this._setData(source.key, source.disableCache, data, Date.now());
        this._setFetching(source.key, false);
        if (source.polling) {
          this._startPolling(source);
        }
        this._promises.delete(source.key);
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        this._promises.delete(source.key);
        this._setFetching(source.key, false);
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
          source.readyCheckFunction() &&
          source.permissionCheckFunction()
        ) {
          if (this._expired(source)) {
            this.tryFetchData(source, '_startPolling');
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
            source.readyCheckFunction() &&
            source.permissionCheckFunction()
          ) {
            this.tryFetchData(source, '_retry');
          } else {
            this._retry(source);
          }
        }
      }, t),
    );
  }

  @delegate('server')
  async tryFetchData<T>(source: DataSource<T>, callerName: string) {
    try {
      await this.fetchData(source);
    } catch (ex) {
      this.logger.error(
        `${callerName} > fetchData`,
        `source "${source.key}"`,
        ex,
      );
    }
  }

  @delegate('server')
  async fetchData<T>(source: DataSource<T>): Promise<void> {
    if (!this._promises.get(source.key)) {
      this._promises.set(source.key, this._fetchData(source));
    }
    return this._promises.get(source.key);
  }

  getTimestamp<T>(source: DataSource<T>) {
    if (source.disableCache) {
      return this.timestamps[source.key] || 0;
    }
    return this.cachedTimestamps[source.key] || 0;
  }

  get sources() {
    return this._sources;
  }

  protected _expired<T>(source: DataSource<T>) {
    return Date.now() - this.getTimestamp(source) > source.ttl;
  }

  // TODO: [new arch] fix shared app issue for multiple instances
  protected _shouldFetch<T>(source: DataSource<T>, isFreshLogin = false) {
    return isFreshLogin || this._expired(source);
  }

  protected async _tryInitializeSource<T>(
    source: DataSource<T>,
  ): Promise<void> {
    if (this.getSourceStatus(source) === sourceStatus.pending) {
      this._setSourceStatus(source.key, sourceStatus.initializing);
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
      this._setSourceStatus(source.key, sourceStatus.ready);
    }
  }

  @action
  protected _setSourceStatus(key: string, status: SourceStatusType) {
    this.sourceStatus[key] = status;
  }

  getSourceStatus<T>(source: DataSource<T>) {
    return this.sourceStatus[source.key];
  }

  protected _processSources() {
    if (this.ready) {
      forEach((source) => {
        if (!this.getSourceStatus(source)) {
          this._setSourceStatus(source.key, sourceStatus.pending);
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
              this._setSourceStatus(source.key, sourceStatus.ready);
              if (!source.disableSetNull) {
                this._setData(source.key, source.disableCache, null, 0);
              }
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
              if (!source.disableSetNull) {
                this._setData(source.key, source.disableCache, null, 0);
              }
            } else if (
              permissionCheck &&
              this.getData(source) === null &&
              this.getTimestamp(source) === 0 &&
              !this._promises.get(source.key)
            ) {
              // if the data set to null due to permission before
              // but now there is permission, then fetch data
              this.tryFetchData(source, '_processSources');
            }
          }
        } else if (status === sourceStatus.ready) {
          this._setSourceStatus(source.key, sourceStatus.pending);
          if (source.cleanOnReset) {
            this._setData(source.key, source.disableCache, null, null);
          }
        }
      }, Array.from(this._sources));
    }
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

  override onInit() {
    this._sleepDetector.detect$
      .pipe(
        tap(() => {
          forEach((source) => {
            if (this.ready && this._shouldFetch(source)) {
              this.tryFetchData(source, '_handleSleepDetected');
            }
          }, Array.from(this._sources));
        }),
        takeUntil(this.resetting$),
      )
      .subscribe();

    // clean up cached sources that are no longer exist
    this._cleanCache();
  }

  override onReset() {
    forEach((source) => {
      // clear all pollings or retries
      this._clearTimeout(source);
      // clear all pending requests
      this._promises.delete(source.key);
      // reset isFetching
      this._setFetching(source.key, false);
      if (this.getSourceStatus(source) !== sourceStatus.pending) {
        this._setSourceStatus(source.key, sourceStatus.pending);
      }
      if (
        source.cleanOnReset &&
        this.getData(source) !== null &&
        this.getTimestamp(source) !== null
      ) {
        this._setData(source.key, source.disableCache, null, null);
      }
    }, Array.from(this._sources));
  }

  override onStateChange() {
    this._processSources();
  }

  register<T>(source: DataSource<T>) {
    this._sources.add(source);
  }

  getData<T>(source: DataSource<T>): T | null {
    if (this._sources.has(source)) {
      if (source.disableCache) {
        return this.data[source.key] || null;
      }
      return this.cachedData[source.key] || null;
    }
    return null;
  }
}
