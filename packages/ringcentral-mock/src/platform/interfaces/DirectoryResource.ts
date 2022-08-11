import { CompanyContactsPagingInfo } from './CompanyContactsPagingInfo';
import { ContactResource } from './ContactResource';

export interface DirectoryResource {
  /**
   */
  paging: CompanyContactsPagingInfo;
  /**
   */
  records: ContactResource[];
}
