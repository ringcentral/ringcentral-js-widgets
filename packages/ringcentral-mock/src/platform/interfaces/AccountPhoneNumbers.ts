import type { CompanyPhoneNumberInfo } from './CompanyPhoneNumberInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface AccountPhoneNumbers {
  /**
   * Link to the list of account phone numbers
   */
  uri: string;
  /**
   * List of account phone numbers
   */
  records: CompanyPhoneNumberInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
