import { WirelessPointInfo } from './WirelessPointInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
