import type { CountryInfo } from './CountryInfo';

// Information on account brand
export interface BrandInfo {
  /**
   * Internal identifier of a brand
   */
  id: string;
  /**
   * Brand name, for example  RingCentral UK ,  ClearFax
   */
  name: string;
  /**
   */
  homeCountry: CountryInfo;
}
