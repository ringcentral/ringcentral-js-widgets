export interface MessageStoreReport {
  /**
   * Internal identifier of a message store report task
   */
  id: string;
  /**
   * Link to a task
   */
  uri: string;
  /**
   * Status of a message store report task
   */
  status:
    | 'Accepted'
    | 'Pending'
    | 'InProgress'
    | 'AttemptFailed'
    | 'Failed'
    | 'Completed'
    | 'Cancelled';
  /**
   * Internal identifier of an account
   */
  accountId: string;
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Task creation time
   */
  creationTime: string;
  /**
   * Time of the last task modification
   */
  lastModifiedTime: string;
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
