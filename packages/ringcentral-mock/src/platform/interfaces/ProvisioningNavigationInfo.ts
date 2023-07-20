import type { ProvisioningNavigationInfoUri } from './ProvisioningNavigationInfoUri';

// Information on navigation
export interface ProvisioningNavigationInfo {
  /**
   */
  firstPage: ProvisioningNavigationInfoUri;
  /**
   */
  nextPage: ProvisioningNavigationInfoUri;
  /**
   */
  previousPage: ProvisioningNavigationInfoUri;
  /**
   */
  lastPage: ProvisioningNavigationInfoUri;
}
