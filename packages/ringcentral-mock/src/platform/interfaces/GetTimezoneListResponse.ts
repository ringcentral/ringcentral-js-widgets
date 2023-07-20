import type { GetTimezoneInfoResponse } from './GetTimezoneInfoResponse';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetTimezoneListResponse {
  /**
   * Link to the timezone list resource
   */
  uri: string;
  /**
   * List of timezones
   * Required
   */
  records: GetTimezoneInfoResponse[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
