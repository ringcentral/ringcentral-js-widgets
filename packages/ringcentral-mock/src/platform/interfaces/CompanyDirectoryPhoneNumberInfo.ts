// Extension phone number information
export interface CompanyDirectoryPhoneNumberInfo {
  /**
   * Extension phone number in E.164 format
   */
  phoneNumber: string;
  /**
   * Type of a phone number
   */
  type: 'VoiceFax' | 'FaxOnly' | 'VoiceOnly';
  /**
   * Specifies if a phone number should be hidden or not. Returned only if the value is 'True'
   */
  hidden: boolean;
  /**
   * Usage type of a phone number
   */
  usageType:
    | 'MobileNumber'
    | 'ContactNumber'
    | 'DirectNumber'
    | 'ForwardedNumber';
}
