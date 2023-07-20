import type { GrantInfo } from './GrantInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
