import type { GetStateInfoResponse } from './GetStateInfoResponse';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetStateListResponse {
  /**
   * Link to the states list resource
   */
  uri: string;
  /**
   * List of states
   */
  records: GetStateInfoResponse[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
