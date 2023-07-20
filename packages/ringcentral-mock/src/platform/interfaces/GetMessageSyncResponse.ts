import type { GetMessageInfoResponse } from './GetMessageInfoResponse';
import type { SyncInfoMessages } from './SyncInfoMessages';

export interface GetMessageSyncResponse {
  /**
   * Link to the message sync resource
   */
  uri: string;
  /**
   * List of message records with synchronization information
   * Required
   */
  records: GetMessageInfoResponse[];
  /**
   * Required
   */
  syncInfo: SyncInfoMessages;
}
