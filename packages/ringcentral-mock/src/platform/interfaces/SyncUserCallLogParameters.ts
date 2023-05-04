// Query parameters for operation syncUserCallLog
export interface SyncUserCallLogParameters {
  /**
   * Type of synchronization
   * Default: FSync
   */
  syncType: 'FSync' | 'ISync';
  /**
   * Value of syncToken property of last sync request response
   */
  syncToken: string;
  /**
   * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is the current moment
   * Format: date-time
   */
  dateFrom: string;
  /**
   * For 'FSync' the parameter is mandatory, it limits the number of records to be returned in response. For 'ISync' it specifies with how many records to extend sync Frame to the past, the maximum number of records is 250
   */
  recordCount: number;
  /**
   * Type of calls to be returned. The default value is 'All'
   */
  statusGroup: ('Missed' | 'All')[];
  /**
   * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
   * Default: Simple
   */
  view: 'Simple' | 'Detailed';
  /**
   * Supported for ISync. If 'True' then deleted call records are returned
   */
  showDeleted: boolean;
}
