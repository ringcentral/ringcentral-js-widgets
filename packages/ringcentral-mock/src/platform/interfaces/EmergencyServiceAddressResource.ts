// Address for emergency cases. The same emergency address is assigned to all the numbers of one device
export interface EmergencyServiceAddressResource {
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
  /**
   * Resulting status of emergency address synchronization. Returned if `syncEmergencyAddress` parameter is set to 'True'
   */
  syncStatus:
    | 'Verified'
    | 'Updated'
    | 'Deleted'
    | 'NotRequired'
    | 'Unsupported'
    | 'Failed';
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
   * Status of digital line provisioning
   */
  lineProvisioningStatus: 'Provisioning' | 'Valid' | 'Invalid';
  /**
   * Internal identifier of a tax
   */
  taxId: string;
}
