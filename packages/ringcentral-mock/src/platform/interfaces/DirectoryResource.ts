import type { CompanyContactsPagingInfo } from './CompanyContactsPagingInfo';
import type { ContactResource } from './ContactResource';

export interface DirectoryResource {
  /**
   */
  paging: CompanyContactsPagingInfo;
  /**
   */
  records: ContactResource[];
}
