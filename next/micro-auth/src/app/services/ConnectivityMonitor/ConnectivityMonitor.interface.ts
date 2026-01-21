export interface ConnectivityMonitorOptions {
  enable?: boolean;
  /**
   * time to Retry, default 5 seconds.
   */
  timeToRetry?: number;
  /**
   * heart beat interval, default 1 min.
   */
  heartBeatInterval?: number;
  /**
   * function to check network.
   */
  checkConnectionFunc?: () => Promise<void>;
}
