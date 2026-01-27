export interface DataFetcherOptions {
  //
}

export interface DataSourceBaseProps {
  /**
   * Time-to-live for cached data in milliseconds
   */
  ttl?: number;
  /**
   * Whether to disable caching for this data source
   */
  disableCache?: boolean;
  /**
   * Whether to enable polling for this data source
   */
  polling?: boolean;
  /**
   * Time to wait before retrying after a failed fetch
   */
  timeToRetry?: number;
  /**
   * Intervals to use for retry attempts
   */
  retryIntervals?: number[];
  /**
   * Interval for polling in milliseconds
   */
  pollingInterval?: number;
  /**
   * Whether to disable setting null when permission check fails
   */
  disableSetNull?: boolean;
}

export interface DataSourceProps<T> extends DataSourceBaseProps {
  /**
   * Unique key for this data source
   */
  key: string;
  /**
   * Clean up data on logout. Default to true as DataFetcher
   * will always fetchData on login. This will also be always true if disableCache is true.
   */
  cleanOnReset?: boolean;
  /**
   * when already have data, whether to trigger the refetch data when page refresh
   *
   * each page refresh will trigger the refetch data, and have 10 seconds throttle time to avoid too many requests in worker mode
   *
   * if is number, it will be the throttle time in this case milliseconds
   * if is boolean, it will use the default 10 seconds throttle time
   *
   * @default false
   */
  refreshDataOnPageRefresh?: boolean | number;
  /**
   * Function that fetches data from the server
   */
  fetchFunction(): Promise<T>;
  /**
   * Function that checks if the module is ready to fetch data
   */
  readyCheckFunction?(): boolean;
  /**
   * Function that checks if the user has permission to fetch data
   */
  permissionCheckFunction?(): boolean;
}
