import type { AutomaticLocationUpdatesUserInfo } from './AutomaticLocationUpdatesUserInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface AutomaticLocationUpdatesUserList {
  /**
   * Link to the users list resource
   */
  uri: string;
  /**
   */
  records: AutomaticLocationUpdatesUserInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
