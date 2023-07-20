import type { GetCountryInfoDictionaryResponse } from './GetCountryInfoDictionaryResponse';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface GetCountryListResponse {
  /**
   * Link to the list of countries supported
   */
  uri: string;
  /**
   * List of countries with the country data
   * Required
   */
  records: GetCountryInfoDictionaryResponse[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
