export interface ParsePhoneNumberRequest {
  /**
   * Phone numbers passed in a string. The maximum value of phone numbers is limited to 64. The maximum number of symbols in each phone number in a string is 64
   */
  originalStrings: string[];
}
