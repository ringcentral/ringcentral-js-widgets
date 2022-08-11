// Shipping address for the order. If it coincides with the Emergency Service Address, then can be omitted. By default the same value as the emergencyServiceAddress. Multiple addresses can be specified; in case the order contains several devices, they can be delivered to different addresses
export interface ShippingAddressInfo {
  /**
   * Name of a primary contact person (receiver)
   */
  customerName: string;
  /**
   * Name of an additional contact person. Should be specified for countries except the US, Canada, the UK and Australia.
   */
  additionalCustomerName: string;
  /**
   * Email of a primary contact person (receiver). Should be specified for countries except the US, Canada, the UK and Australia.
   */
  customerEmail: string;
  /**
   * Email of an additional contact person. Should be specified for countries except the US, Canada, the UK and Australia.
   */
  additionalCustomerEmail: string;
  /**
   * Phone number of a primary contact person (receiver). Should be specified for countries except the US, Canada, the UK and Australia
   */
  customerPhone: string;
  /**
   * Phone number of an additional contact person. Should be specified for countries except the US, Canada, the UK & Australia.
   */
  additionalCustomerPhone: string;
  /**
   * Street address, line 1 - street address, P.O. box, company name, c/o
   */
  street: string;
  /**
   * Street address, line 2 - apartment, suite, unit, building, floor, etc.
   */
  street2: string;
  /**
   * City name
   */
  city: string;
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
   * Zip code
   */
  zip: string;
  /**
   * National taxpayer identification number. Should be specified for Brazil (CNPJ/CPF number) and Argentina (CUIT number).
   */
  taxId: string;
}
