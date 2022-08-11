export interface CallPartyInfo {
  /**
   * Call party phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I)(with '+' sign) format
   */
  phoneNumber: string;
  /**
   * Call party name
   */
  name: string;
  /**
   * Internal identifier of a call party extensionId
   */
  extensionId: string;
}
