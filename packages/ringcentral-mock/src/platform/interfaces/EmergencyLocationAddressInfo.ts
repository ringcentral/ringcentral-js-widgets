export interface EmergencyLocationAddressInfo {
  /**
   * Country name
   */
  country: string;
  /**
   * Internal identifier of a country
   */
  countryId: string;
  /**
   * ISO code of a country
   */
  countryIsoCode: string;
  /**
   * Full name of a country
   */
  countryName: string;
  /**
   * State/Province name. Mandatory for the USA, the UK and Canada
   */
  state: string;
  /**
   * Internal identifier of a state
   */
  stateId: string;
  /**
   * ISO code of a state
   */
  stateIsoCode: string;
  /**
   * Full name of a state
   */
  stateName: string;
  /**
   * City name
   */
  city: string;
  /**
   * First line address
   */
  street: string;
  /**
   * Second line address (apartment, suite, unit, building, floor, etc.)
   */
  street2: string;
  /**
   * Postal (Zip) code
   */
  zip: string;
  /**
   * Customer name
   */
  customerName: string;
}
