import { Alert } from '../AlertV2';
import { Environment } from '../EnvironmentV2';
import { GlobalStorage } from '../GlobalStorageV2';

export interface RateLimiterOptions {
  /**
   *  throttle duration, default 61 seconds
   */
  throttleDuration?: number;
  suppressAlerts?: boolean;
}

export interface Deps {
  alert: Alert;
  client: any;
  globalStorage: GlobalStorage;
  environment?: Environment;
  rateLimiterOptions?: RateLimiterOptions;
}
