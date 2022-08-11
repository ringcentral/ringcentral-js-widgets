import { PagingGroupExtensionInfo } from './PagingGroupExtensionInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface PagingOnlyGroupUsers {
  /**
   * Link to the list of users allowed to page the Paging Only group
   */
  uri: string;
  /**
   * List of users allowed to page the Paging Only group
   */
  records: PagingGroupExtensionInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
