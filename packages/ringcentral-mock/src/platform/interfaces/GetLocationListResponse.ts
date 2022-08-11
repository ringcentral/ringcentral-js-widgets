import { LocationInfo } from './LocationInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
