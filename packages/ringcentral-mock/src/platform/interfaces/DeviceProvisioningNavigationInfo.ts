import { DeviceProvisioningNavigationInfoUri } from './DeviceProvisioningNavigationInfoUri';

// Information on navigation
export interface DeviceProvisioningNavigationInfo {
  /**
   */
  firstPage: DeviceProvisioningNavigationInfoUri;
  /**
   */
  nextPage: DeviceProvisioningNavigationInfoUri;
  /**
   */
  previousPage: DeviceProvisioningNavigationInfoUri;
  /**
   */
  lastPage: DeviceProvisioningNavigationInfoUri;
}
