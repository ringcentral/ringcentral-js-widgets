import type { DataSourceProps } from './DataFetcher.interface';

export const DEFAULT_TTL = 30 * 60 * 1000;
export const DEFAULT_RETRY = 62 * 1000;

export const DEFAULT_RETRY_INTERVALS = [
  2 * 1000,
  5 * 1000,
  10 * 1000,
  30 * 1000,
];

const DEFAULT_READY_CHECK = () => true;
const DEFAULT_PERMISSION_CHECK = () => true;

/**
 * Data source for the DataFetcher service
 * Configures how data is fetched, cached, and polled
 *
 * @class
 * @template T Type of data this source fetches
 */
export class DataSource<T> {
  constructor(private _props: DataSourceProps<T>) {}

  get props() {
    return this._props;
  }

  /**
   * Unique key for this data source
   * @type {string}
   */
  get key() {
    return this._props.key;
  }

  /**
   * Whether to disable setting null when permission check fails
   * @type {boolean}
   */
  get disableSetNull() {
    return this._props.disableSetNull;
  }

  /**
   * Function that fetches data from the server
   * @returns {Promise<T>} Promise that resolves with the fetched data
   */
  fetchFunction() {
    return this._props.fetchFunction();
  }

  /**
   * Time-to-live for cached data in milliseconds
   * @type {number}
   */
  get ttl() {
    return this._props.ttl ?? DEFAULT_TTL;
  }

  /**
   * Time to wait before retrying after a failed fetch
   * @type {number}
   */
  get timeToRetry() {
    return this._props.timeToRetry ?? DEFAULT_RETRY;
  }

  /**
   * Intervals to use for retry attempts
   * @type {readonly number[]}
   */
  get retryIntervals() {
    return this._props.retryIntervals ?? DEFAULT_RETRY_INTERVALS;
  }

  /**
   * Whether to disable caching for this data source
   * @type {boolean}
   */
  get disableCache() {
    return !!this._props.disableCache;
  }

  /**
   * Whether to enable polling for this data source
   * @type {boolean}
   */
  get polling() {
    return !!this._props.polling;
  }

  /**
   * Interval for polling in milliseconds
   * @type {number}
   */
  get pollingInterval() {
    // polling interval should be >= than ttl
    return Math.max(this._props.pollingInterval ?? this.ttl, this.ttl);
  }

  /**
   * Whether to clean up data on reset/logout
   * @default true
   * @description Clean up data on logout. Default to true as DataFetcher
   *  will always fetchData on login. This will also be always true if disableCache is true.
   * @type {boolean}
   */
  get cleanOnReset() {
    return !!((this.disableCache || this._props.cleanOnReset) ?? true);
  }

  /**
   * Function that checks if the module is ready to fetch data
   * @returns {boolean} Whether the module is ready
   */
  readyCheckFunction() {
    return (this._props.readyCheckFunction ?? DEFAULT_READY_CHECK)();
  }

  /**
   * Function that checks if the user has permission to fetch data
   * @returns {boolean} Whether the user has permission
   */
  permissionCheckFunction() {
    return (this._props.permissionCheckFunction ?? DEFAULT_PERMISSION_CHECK)();
  }
}
