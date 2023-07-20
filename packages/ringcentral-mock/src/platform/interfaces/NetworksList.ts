import type { NetworkInfo } from './NetworkInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface NetworksList {
  /**
   * Link to a networks resource
   */
  uri: string;
  /**
   */
  records: NetworkInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
