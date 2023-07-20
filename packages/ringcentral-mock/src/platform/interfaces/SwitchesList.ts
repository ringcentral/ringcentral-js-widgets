import type { SwitchInfo } from './SwitchInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface SwitchesList {
  /**
   * Link to the switches list resource
   */
  uri: string;
  /**
   * Switches map
   */
  records: SwitchInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
