export interface ForwardingNumberInfoRulesCreateRuleRequest {
  /**
   * Internal identifier of a forwarding number
   */
  id: string;
  /**
   * Forwarding phone number type
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
}
