import { GetStateInfoResponse } from './GetStateInfoResponse';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
