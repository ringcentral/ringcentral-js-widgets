import { PagingDeviceInfo } from './PagingDeviceInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface PagingOnlyGroupDevices {
  /**
   * Link to the list of devices assigned to the paging only group
   */
  uri: string;
  /**
   * List of paging devices assigned to this group
   */
  records: PagingDeviceInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
