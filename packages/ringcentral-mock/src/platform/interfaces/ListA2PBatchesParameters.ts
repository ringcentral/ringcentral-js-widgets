// Query parameters for operation listA2PBatches
export interface ListA2PBatchesParameters {
  /**
   * The default is 24 hours before `dateTo`
   * Format: date-time
   */
  dateFrom: string;
  /**
   * The default is current time
   * Format: date-time
   */
  dateTo: string;
  /**
   * Current status of a message batch
   */
  status: string[];
  /**
   * Phone number in E.164 format from which the messages are going to be sent
   */
  from: string;
  /**
   * Token of the page to be retrieved
   */
  pageToken: string;
  /**
   * Number of records to be returned for the page
   */
  perPage: string;
}
