import { ExtensionBulkUpdateTaskResult } from './ExtensionBulkUpdateTaskResult';

// Information on a task for updating multiple extensions
export interface ExtensionBulkUpdateTaskResource {
  /**
   * Link to a task resource
   * Required
   */
  uri: string;
  /**
   * Internal identifier of a task
   * Required
   */
  id: string;
  /**
   * Task status
   * Required
   */
  status: 'Accepted' | 'InProgress' | 'Completed' | 'Failed';
  /**
   * Task creation datetime
   * Required
   */
  creationTime: string;
  /**
   * Task latest update datetime
   * Required
   */
  lastModifiedTime: string;
  /**
   */
  result: ExtensionBulkUpdateTaskResult;
}
