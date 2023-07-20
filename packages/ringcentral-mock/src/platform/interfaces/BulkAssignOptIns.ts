import type { OptOutBulkAssignFailedEntry } from './OptOutBulkAssignFailedEntry';

// Contains successfull and failed opt-ins
export interface BulkAssignOptIns {
  /**
   * Recipients' phone numbers which opt-ins were successfully added for.
   * Example: ["15551237799"]
   */
  successful: string[];
  /**
   * Recipients' phone numbers which opt-ins were failed to be added for. Plus, error messages
   * Example: [object Object]
   */
  failed: OptOutBulkAssignFailedEntry[];
}
