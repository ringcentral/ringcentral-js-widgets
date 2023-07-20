import type { ExtensionDeviceResponse } from './ExtensionDeviceResponse';
import type { DeviceProvisioningNavigationInfo } from './DeviceProvisioningNavigationInfo';
import type { DeviceProvisioningPagingInfo } from './DeviceProvisioningPagingInfo';

export interface GetExtensionDevicesResponse {
  /**
   * Link to the list of extension devices
   */
  uri: string;
  /**
   * List of extension devices
   * Required
   */
  records: ExtensionDeviceResponse[];
  /**
   * Required
   */
  navigation: DeviceProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: DeviceProvisioningPagingInfo;
}
