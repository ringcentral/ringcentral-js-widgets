import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  delegate,
  fromWatchValue,
  RcModule,
  takeUntilAppDestroy,
  watch,
} from '@ringcentral-integration/next-core';
import { EventEmitter } from 'events';
import { filter, Subject, take, tap, throttle, timer } from 'rxjs';

import type { DataFetcher } from './DataFetcher';
import type { DataSource } from './DataSource';
import { sourceStatus } from './sourceStatus';

export const baseEvents = ObjectMap.fromKeys(['dataReady']);

/**
 * Base class for modules that consume data from the DataFetcher
 * Provides common functionality for accessing and managing fetched data
 *
 * @class
 * @template T Type of data this consumer accesses
 */
export abstract class DataFetcherConsumer<T> extends RcModule {
  protected _source!: DataSource<T>;
  protected _emitter = new EventEmitter();

  /**
   * the data observable
   */
  data$ = fromWatchValue(this, () => this.data);
  /**
   * emit when data have value
   */
  dataReady$ = this.data$.pipe(filter(Boolean));

  private _refresh$ = new Subject<void>();

  constructor(protected _dataFetcher: DataFetcher) {
    super();

    // any page refresh should trigger the refetch data because in hubspot there will some page never be closed in shared worker structure, so the life cycle will not be re-executed
    this._dataFetcher.ready$
      .pipe(
        take(1),
        tap(() => {
          if (this.data && this.source.props.refreshDataOnPageRefresh) {
            // emit to server to trigger the refetch data and with 10 seconds throttle time to avoid too many requests in worker mode
            this.initRefetchData();
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();

    this._refresh$
      .pipe(
        throttle(() => {
          const refreshDataOnPageRefresh =
            this.source.props.refreshDataOnPageRefresh;
          const throttleTimeMs =
            typeof refreshDataOnPageRefresh === 'number'
              ? refreshDataOnPageRefresh
              : 10_000;

          return timer(throttleTimeMs);
        }),
        tap(async () => {
          try {
            await this.fetchData({ passive: true });
          } catch (error) {
            // ignore error to avoid the observable to be destroyed
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @delegate('server')
  private async initRefetchData() {
    this._refresh$.next();
  }

  /**
   * Gets the data source used by this consumer
   * @returns {DataSource<T>} The data source
   */
  get source() {
    return this._source;
  }

  /**
   * Gets the unique key of the data source
   * @returns {string} The key
   */
  get key() {
    return this._source.key;
  }

  /**
   * Gets the data from the data source
   * @returns {T|null} The retrieved data or null if not available
   */
  get data() {
    return this._dataFetcher.getData(this._source);
  }

  /**
   * Gets the timestamp of when data was last fetched
   * @returns {number|null} Timestamp of when data was last fetched
   */
  get updatedTimestamp() {
    return this._dataFetcher.getTimestamp(this._source);
  }

  /**
   * Gets the events supported by this consumer
   * @returns {object} Event map
   */
  get events() {
    return baseEvents;
  }

  override onInitOnce() {
    watch(
      this,
      () => [this.ready, this.data] as const,
      ([ready, data]) => {
        if (ready && data) {
          this._emitter.emit(this.events.dataReady);
        }
      },
      {
        multiple: true,
      },
    );
  }

  /**
   * Registers an event listener
   * @param {...Parameters<EventEmitter['on']>} args - Event emitter parameters
   * @returns {EventEmitter} The event emitter
   */
  on(...args: Parameters<EventEmitter['on']>) {
    return this._emitter.on(...args);
  }

  /**
   * Removes an event listener
   * @param {...Parameters<EventEmitter['off']>} args - Event emitter parameters
   * @returns {EventEmitter} The event emitter
   */
  off(...args: Parameters<EventEmitter['off']>) {
    return this._emitter.off(...args);
  }

  override _shouldInit() {
    return !!(
      super._shouldInit() &&
      this._dataFetcher.getSourceStatus(this._source) === sourceStatus.ready
    );
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready &&
        this._dataFetcher.getSourceStatus(this._source) !== sourceStatus.ready)
    );
  }

  /**
   * Fetches data for this consumer's data source
   * @param {object} options - Fetch options
   * @param {boolean} [options.passive=false] - Whether to fetch even if not ready
   * @returns {Promise<void>} Promise that resolves when fetching is complete
   */
  async fetchData({ passive = false } = {}) {
    if (this.ready || passive) {
      return this._dataFetcher.fetchData(this._source);
    }
  }

  /**
   * Updates the source data manually
   *
   * Use this method to trigger update
   *
   * ### ⚠️⚠️⚠️ should only use this method when you want to update the source data manually, like after put data, reset the source data into the new data without fetch again, should not use that in `test` environment with manually update the source data
   *
   * ### ⚠️⚠️⚠️ should trigger inside `server` post when running at `shared` mode
   *
   * @param {T} data - The new data to set
   */
  updateData(data: T) {
    this._dataFetcher.updateData(this._source, data, Date.now());
  }
}
