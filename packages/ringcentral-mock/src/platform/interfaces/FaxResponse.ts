import type { CallerInfoFrom } from './CallerInfoFrom';
import type { CallerInfoTo } from './CallerInfoTo';
import type { MessageAttachmentInfoIntId } from './MessageAttachmentInfoIntId';

export interface FaxResponse {
  /**
   * Internal identifier of a message
   * Format: int64
   */
  id: number;
  /**
   * Canonical URI of a message
   */
  uri: string;
  /**
   * Message type - 'Fax'
   */
  type: string;
  /**
   */
  from: CallerInfoFrom;
  /**
   * Recipient information
   */
  to: CallerInfoTo[];
  /**
   * Message creation datetime in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  creationTime: string;
  /**
   * Message read status
   */
  readStatus: 'Read' | 'Unread';
  /**
   * Message priority
   */
  priority: 'Normal' | 'High';
  /**
   * The list of message attachments
   */
  attachments: MessageAttachmentInfoIntId[];
  /**
   * Message direction
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * Message availability status. Message in 'Deleted' state is still preserved with all its attachments and can be restored. 'Purged' means that all attachments are already deleted and the message itself is about to be physically deleted shortly
   */
  availability: 'Alive' | 'Deleted' | 'Purged';
  /**
   * Message status. 'Queued' - the message is queued for sending; 'Sent' - a message is successfully sent; 'SendingFailed' - a message sending attempt has failed; 'Received' - a message is received (inbound messages have this status by default)
   */
  messageStatus: 'Queued' | 'Sent' | 'SendingFailed' | 'Received';
  /**
   * Resolution of a fax message. ('High' for black and white image scanned at 200 dpi, 'Low' for black and white image scanned at 100 dpi)
   */
  faxResolution: 'High' | 'Low';
  /**
   * Page count in a fax message
   */
  faxPageCount: number;
  /**
   * Datetime when the message was modified on server in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Cover page identifier. If coverIndex is set to '0' (zero) cover page is not attached. For the list of available cover page identifiers (1-13) please call the Fax Cover Pages method. If not specified, the default cover page is attached (which is configured in 'Outbound Fax Settings')
   */
  coverIndex: number;
  /**
   * Cover page text, entered by the fax sender and printed on the cover page. Maximum length is limited to 1024 symbols
   */
  coverPageText: string;
}
