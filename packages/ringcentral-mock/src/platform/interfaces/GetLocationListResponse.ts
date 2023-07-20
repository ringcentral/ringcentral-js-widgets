import type { LocationInfo } from './LocationInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetLocationListResponse {
  /**
   * Link to the location list resource
   */
  uri: string;
  /**
   * List of locations
   */
  records: LocationInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
