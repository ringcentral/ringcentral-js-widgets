import type { EmergencyLocationInfo } from './EmergencyLocationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface EmergencyLocationsResource {
  /**
   */
  records: EmergencyLocationInfo[];
  /**
   */
  paging: ProvisioningPagingInfo;
}
