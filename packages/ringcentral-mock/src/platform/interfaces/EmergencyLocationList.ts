import type { EmergencyLocationInfo } from './EmergencyLocationInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface EmergencyLocationList {
  /**
   * Link to the emergency location list resource
   */
  uri: string;
  /**
   */
  records: EmergencyLocationInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
