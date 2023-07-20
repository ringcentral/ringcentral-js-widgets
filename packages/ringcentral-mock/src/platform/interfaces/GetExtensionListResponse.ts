import type { GetExtensionListInfoResponse } from './GetExtensionListInfoResponse';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetExtensionListResponse {
  /**
   * Link to the extension list resource
   */
  uri: string;
  /**
   * List of extensions with extension information
   * Required
   */
  records: GetExtensionListInfoResponse[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
