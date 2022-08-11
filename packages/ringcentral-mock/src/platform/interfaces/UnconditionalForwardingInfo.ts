// Unconditional forwarding parameters. Returned if 'UnconditionalForwarding' is specified in 'callHandlingAction'
export interface UnconditionalForwardingInfo {
  /**
   * Phone number to which the call is forwarded. In addition to common e.164 format, the following number patterns are supported: 11xxxxxxxxxxx, 444xxxxxxxxxxx, 616xxxxxxxxxxx, 1700yyyy; where xxxxxxxxxxx is a phone number in e.164 format (without '+' sign) and yyyy is an external short extension number. Max number of digits is 15
   */
  phoneNumber: string;
  /**
   * Event that initiates forwarding to the specified phone number
   */
  action: 'HoldTimeExpiration' | 'MaxCallers' | 'NoAnswer';
}
