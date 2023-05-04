import { LanguageInfo } from './LanguageInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
