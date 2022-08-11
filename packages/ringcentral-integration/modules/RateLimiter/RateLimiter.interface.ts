import { Alert } from '../Alert';
import { Environment } from '../Environment';
import { GlobalStorage } from '../GlobalStorage';

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
