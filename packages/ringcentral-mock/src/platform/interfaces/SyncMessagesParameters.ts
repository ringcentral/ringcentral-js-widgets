// Query parameters for operation syncMessages
export interface SyncMessagesParameters {
  /**
   * Conversation identifier for the resulting messages. Meaningful for SMS and Pager messages only.
   * Format: int64
   */
  conversationId: number;
  /**
   * The start datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
   * Format: date-time
   */
  dateFrom: string;
  /**
   * The end datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
   * Format: date-time
   */
  dateTo: string;
  /**
   * Direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted
   */
  direction: ('Inbound' | 'Outbound')[];
  /**
   * If 'True', then the latest messages per every conversation ID are returned
   */
  distinctConversations: boolean;
  /**
   * Type for the resulting messages. If not specified, all types of messages are returned. Multiple values are accepted
   */
  messageType: ('Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text')[];
  /**
   * Limits the number of records to be returned (works in combination with dateFrom and dateTo if specified)
   */
  recordCount: number;
  /**
   * Value of syncToken property of last sync request response
   */
  syncToken: string;
  /**
   * Type of message synchronization
   */
  syncType: 'FSync' | 'ISync';
}
