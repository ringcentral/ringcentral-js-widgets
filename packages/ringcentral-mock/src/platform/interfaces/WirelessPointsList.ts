import type { WirelessPointInfo } from './WirelessPointInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface WirelessPointsList {
  /**
   * Link to the wireless point list resource
   */
  uri: string;
  /**
   * List of wireless points with assigned emergency addresses
   */
  records: WirelessPointInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
