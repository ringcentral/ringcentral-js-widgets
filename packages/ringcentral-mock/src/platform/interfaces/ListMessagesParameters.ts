// Query parameters for operation listMessages
export interface ListMessagesParameters {
  /**
   * Specifies the availability status for the resulting messages. Multiple values are accepted
   */
  availability: ('Alive' | 'Deleted' | 'Purged')[];
  /**
   * Specifies the conversation identifier for the resulting messages
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
   * The direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted
   */
  direction: ('Inbound' | 'Outbound')[];
  /**
   * If 'True', then the latest messages per every conversation ID are returned
   */
  distinctConversations: boolean;
  /**
   * The type of the resulting messages. If not specified, all messages without message type filtering are returned. Multiple values are accepted
   */
  messageType: ('Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text')[];
  /**
   * The read status for the resulting messages. Multiple values are accepted
   */
  readStatus: ('Read' | 'Unread')[];
  /**
   * Indicates the page number to retrieve. Only positive number values are accepted
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Default: 100
   */
  perPage: number;
  /**
   * The phone number. If specified, messages are returned for this particular phone number only
   */
  phoneNumber: string;
}
