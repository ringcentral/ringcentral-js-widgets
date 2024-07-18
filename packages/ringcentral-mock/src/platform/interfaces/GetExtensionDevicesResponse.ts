import type { DeviceProvisioningNavigationInfo } from './DeviceProvisioningNavigationInfo';
import type { DeviceProvisioningPagingInfo } from './DeviceProvisioningPagingInfo';
import type { ExtensionDeviceResponse } from './ExtensionDeviceResponse';

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
