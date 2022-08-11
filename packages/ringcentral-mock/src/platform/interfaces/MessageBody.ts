import { MessageAttachmentInfo } from './MessageAttachmentInfo';
import { ConversationInfo } from './ConversationInfo';
import { MessageSenderInfo } from './MessageSenderInfo';
import { MessageRecipientInfo } from './MessageRecipientInfo';

export interface MessageBody {
  /**
   * Canonical URI of a message
   */
  uri: string;
  /**
   * Internal identifier of a message
   */
  id: string;
  /**
   * The list of message attachments
   */
  attachments: MessageAttachmentInfo[];
  /**
   * Message availability status. Message in 'Deleted' state is still preserved with all its attachments and can be restored. 'Purged' means that all attachments are already deleted and the message itself is about to be physically deleted shortly
   */
  availability: 'Alive' | 'Deleted' | 'Purged';
  /**
   * SMS and Pager only. Identifier of a conversation the message belongs to
   * Format: int64
   */
  conversationId: number;
  /**
   */
  conversation: ConversationInfo;
  /**
   * Message creation datetime in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  creationTime: string;
  /**
   * SMS only. Delivery error code returned by gateway
   */
  deliveryErrorCode: string;
  /**
   * Message direction. Note that for some message types not all directions are allowed. For example voicemail messages can be only inbound
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * Fax only. Page count in a fax message
   */
  faxPageCount: number;
  /**
   * Fax only. Resolution of a fax message. 'High' for black and white image scanned at 200 dpi, 'Low' for black and white image scanned at 100 dpi
   */
  faxResolution: 'High' | 'Low';
  /**
   */
  from: MessageSenderInfo;
  /**
   * The datetime when the message was modified on server in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Message status. Different message types may have different allowed status values.For outbound faxes the aggregated message status is returned: If status for at least one recipient is 'Queued', then 'Queued' value is returned If status for at least one recipient is 'SendingFailed', then 'SendingFailed' value is returned In other cases Sent status is returned
   */
  messageStatus:
    | 'Queued'
    | 'Sent'
    | 'Delivered'
    | 'DeliveryFailed'
    | 'SendingFailed'
    | 'Received';
  /**
   * 'Pager' only. 'True' if at least one of the message recipients is 'Department' extension
   */
  pgToDepartment: boolean;
  /**
   * Message priority
   */
  priority: 'Normal' | 'High';
  /**
   * Message read status
   */
  readStatus: 'Read' | 'Unread';
  /**
   * SMS only. The datetime when outbound SMS was delivered to recipient's handset in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. It is filled only if the carrier sends a delivery receipt to RingCentral
   * Format: date-time
   */
  smsDeliveryTime: string;
  /**
   * SMS only. Number of attempts made to send an outbound SMS to the gateway (if gateway is temporary unavailable)
   */
  smsSendingAttemptsCount: number;
  /**
   * Message subject. For SMS and Pager messages it replicates message text which is also returned as an attachment
   */
  subject: string;
  /**
   * Recipient information
   */
  to: MessageRecipientInfo[];
  /**
   * Message type
   */
  type: 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text';
  /**
   * Voicemail only. Status of voicemail to text transcription. If VoicemailToText feature is not activated for account, the 'NotAvailable' value is returned
   */
  vmTranscriptionStatus:
    | 'NotAvailable'
    | 'InProgress'
    | 'TimedOut'
    | 'Completed'
    | 'CompletedPartially'
    | 'Failed';
}
