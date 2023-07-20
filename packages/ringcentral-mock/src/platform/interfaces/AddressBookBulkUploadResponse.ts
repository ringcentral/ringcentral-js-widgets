import type { AddressBookBulkUploadTaskResult } from './AddressBookBulkUploadTaskResult';

// Information on a task for adding multiple contacts to multiple extensions
export interface AddressBookBulkUploadResponse {
  /**
   * Internal identifier of a task
   * Required
   */
  id: string;
  /**
   * Link for the task status retrieval
   * Required
   */
  uri: string;
  /**
   * Task status
   * Required
   */
  status: 'Accepted' | 'InProgress' | 'Completed' | 'Failed';
  /**
   * Datetime of a task creation
   * Required
   */
  creationTime: string;
  /**
   * Datetime of a task latest update
   * Required
   */
  lastModifiedTime: string;
  /**
   */
  results: AddressBookBulkUploadTaskResult;
}
