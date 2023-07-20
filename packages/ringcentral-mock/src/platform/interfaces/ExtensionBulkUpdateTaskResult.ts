import type { ExtensionUpdateShortResult } from './ExtensionUpdateShortResult';
import type { ErrorEntity } from './ErrorEntity';

// Result record on multiple extension update task
export interface ExtensionBulkUpdateTaskResult {
  /**
   */
  affectedItems: ExtensionUpdateShortResult[];
  /**
   */
  errors: ErrorEntity[];
}
