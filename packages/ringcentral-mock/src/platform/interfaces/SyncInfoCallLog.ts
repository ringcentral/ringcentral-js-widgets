// Sync information (type, token and time)
export interface SyncInfoCallLog {
  /**
   * Type of synchronization
   */
  syncType: 'FSync' | 'ISync';
  /**
   * Synchronization token
   */
  syncToken: string;
  /**
   * The last synchronization datetime in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  syncTime: string;
}
