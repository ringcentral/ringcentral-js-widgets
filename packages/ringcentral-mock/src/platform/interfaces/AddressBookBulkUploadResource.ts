import type { AddressBookBulkContactResource } from './AddressBookBulkContactResource';

export interface AddressBookBulkUploadResource {
  /**
   * Internal identifier of an extension
   * Required
   */
  extensionId: string;
  /**
   * List of contacts to be added to extension address book
   * Required
   */
  contacts: AddressBookBulkContactResource[];
}
