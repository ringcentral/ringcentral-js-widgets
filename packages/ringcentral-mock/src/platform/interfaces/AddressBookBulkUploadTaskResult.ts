import type { AddressBookBulkContactResource } from './AddressBookBulkContactResource';
import type { ErrorEntity } from './ErrorEntity';

// Result record on adding multiple contacts to an extension. Returned for completed tasks
export interface AddressBookBulkUploadTaskResult {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   */
  contact: AddressBookBulkContactResource;
  /**
   * Adding contact status
   */
  status: 'Success' | 'Fail';
  /**
   */
  errors: ErrorEntity[];
}
