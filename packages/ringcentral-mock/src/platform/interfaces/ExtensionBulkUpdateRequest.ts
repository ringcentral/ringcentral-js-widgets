import { ExtensionBulkUpdateInfo } from './ExtensionBulkUpdateInfo';

// List of extensions to be updated
export interface ExtensionBulkUpdateRequest {
  /**
   * Required
   */
  records: ExtensionBulkUpdateInfo[];
}
