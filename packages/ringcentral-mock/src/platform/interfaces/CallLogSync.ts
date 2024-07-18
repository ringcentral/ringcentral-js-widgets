import type { SyncInfoCallLog } from './SyncInfoCallLog';
import type { UserCallLogRecord } from './UserCallLogRecord';

export interface CallLogSync {
  /**
   * Link to the list of call log records with sync information
   */
  uri: string;
  /**
   * List of call log records with synchronization information. For ISync the total number of returned records is limited to 250; this includes both new records and the old ones, specified by the recordCount parameter
   */
  records: UserCallLogRecord[];
  /**
   */
  syncInfo: SyncInfoCallLog;
}
