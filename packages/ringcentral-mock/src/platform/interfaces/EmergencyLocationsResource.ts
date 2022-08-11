import { EmergencyLocationInfo } from './EmergencyLocationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface EmergencyLocationsResource {
  /**
   */
  records: EmergencyLocationInfo[];
  /**
   */
  paging: ProvisioningPagingInfo;
}
