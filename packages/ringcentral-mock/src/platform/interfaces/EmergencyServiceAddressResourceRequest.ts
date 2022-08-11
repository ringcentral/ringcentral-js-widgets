// Address for emergency cases. The same emergency address is assigned to all numbers of a single device. If the emergency address is also specified in `emergency` resource, then this value is ignored
export interface EmergencyServiceAddressResourceRequest {
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
   * Country name
   */
  country: string;
  /**
   * Internal identifier of a country
   */
  countryId: string;
}
