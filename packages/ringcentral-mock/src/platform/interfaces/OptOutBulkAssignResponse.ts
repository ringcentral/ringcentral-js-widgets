import type { BulkAssignOptIns } from './BulkAssignOptIns';
import type { BulkAssignOptOuts } from './BulkAssignOptOuts';

// The results of adding opt-outs and opt-ins
export interface OptOutBulkAssignResponse {
  /**
   */
  optOuts: BulkAssignOptOuts;
  /**
   */
  optIns: BulkAssignOptIns;
}
