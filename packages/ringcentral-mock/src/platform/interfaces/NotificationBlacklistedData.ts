// Returned if WebHook subscription is blacklisted
export interface NotificationBlacklistedData {
  /**
   * Time of adding subscription to a black list in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*
   * Format: date-time
   */
  blacklistedAt: string;
  /**
   * Reason for adding subscription to a black list
   */
  reason: string;
}
