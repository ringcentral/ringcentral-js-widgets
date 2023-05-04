// Emergency address assigned to the switch. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
export interface LocationUpdatesEmergencyAddressInfoRequest {
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
   * Customer name
   */
  customerName: string;
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
}
