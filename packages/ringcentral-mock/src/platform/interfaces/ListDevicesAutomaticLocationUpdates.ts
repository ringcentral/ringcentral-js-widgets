import { AutomaticLocationUpdatesDeviceInfo } from './AutomaticLocationUpdatesDeviceInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
