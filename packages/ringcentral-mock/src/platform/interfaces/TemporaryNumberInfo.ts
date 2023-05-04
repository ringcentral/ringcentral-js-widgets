// Temporary phone number, if any. Returned for phone numbers in `Pending` porting status only
export interface TemporaryNumberInfo {
  /**
   * Temporary phone number identifier
   */
  id: string;
  /**
   * Temporary phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format
   */
  phoneNumber: string;
}
