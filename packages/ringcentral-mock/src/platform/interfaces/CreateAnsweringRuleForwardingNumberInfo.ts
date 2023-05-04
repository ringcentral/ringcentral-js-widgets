export interface CreateAnsweringRuleForwardingNumberInfo {
  /**
   * Internal identifier of a forwarding number
   */
  id: string;
  /**
   * Canonical URI of a forwarding/call flip phone number
   */
  uri: string;
  /**
   * Forwarding/Call flip phone number
   */
  phoneNumber: string;
  /**
   * Forwarding/Call flip number title
   */
  label: string;
  /**
   * Type of a forwarding number
   */
  type:
    | 'Home'
    | 'Mobile'
    | 'Work'
    | 'PhoneLine'
    | 'Outage'
    | 'Other'
    | 'BusinessMobilePhone'
    | 'ExternalCarrier';
}
