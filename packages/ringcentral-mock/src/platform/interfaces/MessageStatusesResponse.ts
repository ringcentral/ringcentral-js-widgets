import type { MessageStatusCounts } from './MessageStatusCounts';

export interface MessageStatusesResponse {
  /**
   */
  queued: MessageStatusCounts;
  /**
   */
  delivered: MessageStatusCounts;
  /**
   */
  deliveryFailed: MessageStatusCounts;
  /**
   */
  sent: MessageStatusCounts;
  /**
   */
  sendingFailed: MessageStatusCounts;
}
