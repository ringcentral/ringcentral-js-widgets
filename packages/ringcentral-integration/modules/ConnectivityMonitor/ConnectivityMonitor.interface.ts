import type { Environment } from '../Environment';

export interface ConnectivityMonitorOptions {
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

export interface Deps {
  client: any;
  environment?: Environment;
  connectivityMonitorOptions?: ConnectivityMonitorOptions;
}
