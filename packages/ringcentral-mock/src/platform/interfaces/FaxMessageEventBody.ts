import { NotificationRecipientInfo } from './NotificationRecipientInfo';
import { SenderInfo } from './SenderInfo';
import { FaxMessageAttachment } from './FaxMessageAttachment';

// Notification payload body
export interface FaxMessageEventBody {
  /**
   * Internal identifier of a message
   */
  id: string;
  /**
   */
  to: NotificationRecipientInfo[];
  /**
   */
  from: SenderInfo;
  /**
   * Type of a message
   */
  type: 'Fax';
  /**
   * Message creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*
   */
  creationTime: string;
  /**
   * Datetime when the message was modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*
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
  attachments: FaxMessageAttachment[];
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
   * Internal identifier of a conversation this message belongs to
   */
  conversationId: string;
  /**
   * Resolution of a fax message. ('High' for black and white image scanned at 200 dpi, 'Low' for black and white image scanned at 100 dpi)
   */
  faxResolution: string;
  /**
   * Page count of a fax message
   */
  faxPageCount: number;
}
