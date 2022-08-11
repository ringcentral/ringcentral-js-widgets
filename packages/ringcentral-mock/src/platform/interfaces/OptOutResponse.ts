// Opt-out record
export interface OptOutResponse {
  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the recipient has opted out
   * Example: 15551234567
   */
  from: string;
  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format which is opted out
   * Example: 15551234567
   */
  to: string;
  /**
   * Status of a phone number
   */
  status: 'OptIn' | 'OptOut';
  /**
   */
  source: 'Recipient' | 'Account' | 'Upstream' | 'Carrier';
}
