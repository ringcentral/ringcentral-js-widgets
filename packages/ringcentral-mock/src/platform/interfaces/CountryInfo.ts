// Country information
export interface CountryInfo {
  /**
   * Internal identifier of a home country
   */
  id: string;
  /**
   * Canonical URI of a home country
   */
  uri: string;
  /**
   * Official name of a home country
   */
  name: string;
  /**
   * ISO code of a country
   */
  isoCode: string;
  /**
   * Calling code of a country
   */
  callingCode: string;
}
