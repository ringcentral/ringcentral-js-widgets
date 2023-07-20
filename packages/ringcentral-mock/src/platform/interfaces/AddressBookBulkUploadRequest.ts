import type { AddressBookBulkUploadResource } from './AddressBookBulkUploadResource';

export interface AddressBookBulkUploadRequest {
  /**
   * List of extensions which contacts have to be updated
   * Required
   */
  records: AddressBookBulkUploadResource[];
}
