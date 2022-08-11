// Query parameters for operation syncAddressBook
export interface SyncAddressBookParameters {
  /**
   * Type of synchronization
   */
  syncType: 'FSync' | 'ISync';
  /**
   * Value of syncToken property of the last sync request response
   */
  syncToken: string;
  /**
   * Number of records per page to be returned. The max number of records is 250, which is also the default. For 'FSync' if the number of records exceeds the parameter value (either specified or default), all of the pages can be retrieved in several requests. For 'ISync' if the number of records exceeds the page size, the number of incoming changes to this number is limited
   */
  perPage: number;
  /**
   * Internal identifier of a page. It can be obtained from the 'nextPageId' parameter passed in response body
   * Format: int64
   */
  pageId: number;
}
