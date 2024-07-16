import type { ErrorEntity } from './ErrorEntity';
import type { ExtensionUpdateShortResult } from './ExtensionUpdateShortResult';

// Result record on multiple extension update task
export interface ExtensionBulkUpdateTaskResult {
  /**
   */
  affectedItems: ExtensionUpdateShortResult[];
  /**
   */
  errors: ErrorEntity[];
}
