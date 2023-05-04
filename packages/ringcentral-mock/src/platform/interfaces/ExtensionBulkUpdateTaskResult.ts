import { ExtensionUpdateShortResult } from './ExtensionUpdateShortResult';
import { ErrorEntity } from './ErrorEntity';

// Result record on multiple extension update task
export interface ExtensionBulkUpdateTaskResult {
  /**
   */
  affectedItems: ExtensionUpdateShortResult[];
  /**
   */
  errors: ErrorEntity[];
}
