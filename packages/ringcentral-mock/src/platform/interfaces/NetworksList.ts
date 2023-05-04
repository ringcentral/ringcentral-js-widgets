import { NetworkInfo } from './NetworkInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
