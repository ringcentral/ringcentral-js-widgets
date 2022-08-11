import { BulkAssignOptOuts } from './BulkAssignOptOuts';
import { BulkAssignOptIns } from './BulkAssignOptIns';

// The results of adding opt-outs and opt-ins
export interface OptOutBulkAssignResponse {
  /**
   */
  optOuts: BulkAssignOptOuts;
  /**
   */
  optIns: BulkAssignOptIns;
}
