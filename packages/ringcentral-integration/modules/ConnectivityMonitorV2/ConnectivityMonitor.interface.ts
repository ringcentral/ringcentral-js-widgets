import { Environment } from '../EnvironmentV2';

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
   * function to check network, default `fetch('https://pubsub.pubnub.com/time/0')`.
   */
  checkConnectionFunc?: () => Promise<void>;
}

export interface Deps {
  client: any;
  environment?: Environment;
  connectivityMonitorOptions?: ConnectivityMonitorOptions;
}
