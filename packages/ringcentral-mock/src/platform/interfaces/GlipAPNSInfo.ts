import type { GlipAPSInfo } from './GlipAPSInfo';
import type { GlipUnreadMessageCountInfo } from './GlipUnreadMessageCountInfo';

// Apple notification data
export interface GlipAPNSInfo {
  /**
   */
  aps: GlipAPSInfo;
  /**
   * Datetime of a call action in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  timestamp: string;
  /**
   * Universally unique identifier of a notification
   */
  uuid: string;
  /**
   * Event filter URI
   */
  event: string;
  /**
   * Internal identifier of a subscription
   */
  subscriptionId: string;
  /**
   */
  body: GlipUnreadMessageCountInfo;
}
