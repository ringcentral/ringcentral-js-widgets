import type { LanguageInfo } from './LanguageInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface LanguageList {
  /**
   * Canonical URI of the language list resource
   */
  uri: string;
  /**
   * Language data
   */
  records: LanguageInfo[];
  /**
   */
  navigation: ProvisioningNavigationInfo;
  /**
   */
  paging: ProvisioningPagingInfo;
}
