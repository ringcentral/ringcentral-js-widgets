import { GrantInfo } from './GrantInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetExtensionGrantListResponse {
  /**
   * Link to the list of extension grants
   */
  uri: string;
  /**
   * List of extension grants with details
   * Required
   */
  records: GrantInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
