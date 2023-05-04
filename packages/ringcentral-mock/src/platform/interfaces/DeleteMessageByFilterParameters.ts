// Query parameters for operation deleteMessageByFilter
export interface DeleteMessageByFilterParameters {
  /**
   */
  conversationId: string[];
  /**
   * Messages received earlier then the date specified will be deleted. The default value is current datetime
   * Format: date-time
   */
  dateTo: string;
  /**
   * Type of messages to be deleted
   * Default: All
   */
  type: 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text' | 'All';
}
