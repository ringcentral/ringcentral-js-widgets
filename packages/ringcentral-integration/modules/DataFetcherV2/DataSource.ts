import { DataSourceProps } from './DataFetcherV2.interface';

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

export class DataSource<T> {
  constructor(private _props: DataSourceProps<T>) {}

  get key() {
    return this._props.key;
  }

  fetchFunction() {
    return this._props.fetchFunction();
  }

  get ttl() {
    return this._props.ttl ?? DEFAULT_TTL;
  }

  get timeToRetry() {
    return this._props.timeToRetry ?? DEFAULT_RETRY;
  }

  get retryIntervals() {
    return this._props.retryIntervals ?? DEFAULT_RETRY_INTERVALS;
  }

  get disableCache() {
    return !!this._props.disableCache;
  }

  get polling() {
    return !!this._props.polling;
  }

  get pollingInterval() {
    // polling interval should be >= than ttl
    return Math.max(this._props.pollingInterval ?? this.ttl, this.ttl);
  }

  /**
   * @default true
   * @description Clean up data on logout. Default to true as DataFetcher
   *  will always fetchData on login. This will also be always true if disableCache is true.
   */
  get cleanOnReset() {
    return !!((this.disableCache || this._props.cleanOnReset) ?? true);
  }

  readyCheckFunction() {
    return (this._props.readyCheckFunction ?? DEFAULT_READY_CHECK)();
  }

  permissionCheckFunction() {
    return (this._props.permissionCheckFunction ?? DEFAULT_PERMISSION_CHECK)();
  }
}
