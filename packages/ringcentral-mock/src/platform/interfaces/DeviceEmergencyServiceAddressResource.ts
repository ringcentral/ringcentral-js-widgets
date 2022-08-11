// Address for emergency cases. The same emergency address is assigned to all the numbers of one device
export interface DeviceEmergencyServiceAddressResource {
  /**
   */
  street: string;
  /**
   */
  street2: string;
  /**
   */
  city: string;
  /**
   */
  zip: string;
  /**
   */
  customerName: string;
  /**
   * State/province name
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
   * Internal identifier of a country
   */
  countryId: string;
  /**
   * ISO code of a country
   */
  countryIsoCode: string;
  /**
   * Country name
   */
  country: string;
  /**
   * Full name of a country
   */
  countryName: string;
  /**
   * Specifies if emergency address is out of country
   */
  outOfCountry: boolean;
}
