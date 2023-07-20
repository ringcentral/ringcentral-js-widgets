import type { Alert } from '../Alert';
import type { Environment } from '../Environment';
import type { GlobalStorage } from '../GlobalStorage';

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
