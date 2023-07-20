import type { AutomaticLocationUpdatesDeviceInfo } from './AutomaticLocationUpdatesDeviceInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface ListDevicesAutomaticLocationUpdates {
  /**
   * Link to devices resource
   */
  uri: string;
  /**
   * List of users' devices with the current status of Emergency Address Auto Update Feature
   */
  records: AutomaticLocationUpdatesDeviceInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
