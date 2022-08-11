export interface PhoneNumberResource {
  /**
   */
  formattedPhoneNumber: string;
  /**
   */
  phoneNumber: string;
  /**
   */
  type: string;
  /**
   * Custom user name of a phone number, if any
   */
  label: string;
  /**
   * Usage type of a phone number
   */
  usageType:
    | 'MobileNumber'
    | 'ContactNumber'
    | 'DirectNumber'
    | 'ForwardedNumber';
  /**
   * Specifies if a phone number should be hidden or not
   */
  hidden: boolean;
  /**
   * Specifies if the number is primary, i.e. displayed as 'main number' and called by default
   */
  primary: boolean;
}
