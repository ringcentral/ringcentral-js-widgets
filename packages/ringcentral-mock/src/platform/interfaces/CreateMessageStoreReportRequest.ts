export interface CreateMessageStoreReportRequest {
  /**
   * Only messages created before the date will be collected. The default value is current time
   */
  dateTo: string;
  /**
   * Only messages created after (or including) the date will be collected. The default value is current time minus 24 hours
   */
  dateFrom: string;
  /**
   */
  messageTypes: ('EMail' | 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text')[];
}
