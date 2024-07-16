import type { ConversationInfo } from './ConversationInfo';
import type { MessageAttachmentInfo } from './MessageAttachmentInfo';
import type { NotificationRecipientInfo } from './NotificationRecipientInfo';
import type { SenderInfo } from './SenderInfo';

// Notification payload body
export interface InstantMessageEventBody {
  /**
   * Internal identifier of a message
   */
  id: string;
  /**
   * Message receiver(s) information
   */
  to: NotificationRecipientInfo[];
  /**
   */
  from: SenderInfo;
  /**
   * Type of a message. The default value is 'SMS'
   */
  type: string;
  /**
   * Message creation datetime in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  creationTime: string;
  /**
   * Datetime when the message was modified in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Status of a message
   * Default: Unread
   */
  readStatus: string;
  /**
   * Default: Normal
   */
  priority: string;
  /**
   * Message attachment data
   */
  attachments: MessageAttachmentInfo[];
  /**
   * Message direction
   * Default: Inbound
   */
  direction: string;
  /**
   * Message availability status
   * Default: Alive
   */
  availability: string;
  /**
   * Message subject. It replicates message text which is also returned as an attachment
   */
  subject: string;
  /**
   * Status of a message
   * Default: Received
   */
  messageStatus: string;
  /**
   * Deprecated. Identifier of a conversation the message belongs to
   */
  conversationId: string;
  /**
   */
  conversation: ConversationInfo;
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
