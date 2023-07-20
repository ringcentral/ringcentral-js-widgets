import type { UserPhoneNumberInfo } from './UserPhoneNumberInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetExtensionPhoneNumbersResponse {
  /**
   * Link to the user's phone number list resource
   */
  uri: string;
  /**
   * List of phone numbers
   * Required
   */
  records: UserPhoneNumberInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
