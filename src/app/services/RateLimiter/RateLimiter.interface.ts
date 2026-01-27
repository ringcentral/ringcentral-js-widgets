export interface RateLimiterOptions {
  /**
   *  throttle duration, default 61 seconds
   */
  throttleDuration?: number;
  suppressAlerts?: boolean;
}
