import { AutomaticLocationUpdatesUserInfo } from './AutomaticLocationUpdatesUserInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
