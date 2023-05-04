import { NotificationInfo } from './NotificationInfo';

export interface InboundMessageEvent {
  /**
   */
  aps: NotificationInfo;
  /**
   * Internal identifier of a message
   */
  messageId: string;
  /**
   * Internal identifier of a conversation
   */
  conversationId: string;
  /**
   * Sender phone number. For GCM transport type '_from' property should be used
   */
  from: string;
  /**
   * Receiver phone number
   */
  to: string;
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
