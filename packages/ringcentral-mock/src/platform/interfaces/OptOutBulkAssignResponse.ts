import type { BulkAssignOptOuts } from './BulkAssignOptOuts';
import type { BulkAssignOptIns } from './BulkAssignOptIns';

// The results of adding opt-outs and opt-ins
export interface OptOutBulkAssignResponse {
  /**
   */
  optOuts: BulkAssignOptOuts;
  /**
   */
  optIns: BulkAssignOptIns;
}
