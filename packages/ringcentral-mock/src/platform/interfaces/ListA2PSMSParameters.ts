// Query parameters for operation listA2PSMS
export interface ListA2PSMSParameters {
  /**
   * Internal identifier of a message batch used for filtering records
   * Example: 1234
   */
  batchId: string;
  /**
   * Direction of a message to filter the message list result. By default there is no filter applied - both Inbound and Outbound messages are returned
   * Example: Outbound
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * Indicates if the response has to be detailed, includes text in the response if detailed
   * Default: Simple
   */
  view: 'Simple' | 'Detailed';
  /**
   * Date to filter message list result. Messages with `creationTime` later than or equal to `dateFrom` value are returned. The default value is 1 day before the current datetime
   * Example: 2020-11-09T16:07:52.597Z
   */
  dateFrom: string;
  /**
   * Date to filter message list result. Messages with `creationTime` earlier than `dateTo` value are returned. The default is the current datetime
   * Example: 2020-11-25T16:07:52.597Z
   */
  dateTo: string;
  /**
   * List of phone numbers (specified in 'to' or 'from' fields of a message) to filter the results. Maximum number of phone numbers allowed to be specified as filters is 15
   * Example: phoneNumber=15551234455&phoneNumber=15551235577
   */
  phoneNumber: string[];
  /**
   * Token of a page to be retrieved
   * Example: pgt1
   */
  pageToken: string;
  /**
   * Number of messages to be returned per request
   * Format: int32
   * Example: 1
   * Default: 1000
   */
  perPage: number;
}
