import type { MessageChanges } from './MessageChanges';

// Notification payload body
export interface MessageEventBody {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Datetime when the message was last modified in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  lastUpdated: string;
  /**
   * Message Changes
   */
  changes: MessageChanges[];
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
