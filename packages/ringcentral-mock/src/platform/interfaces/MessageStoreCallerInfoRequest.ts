// Message sender information. The `phoneNumber` value should be one the account phone numbers allowed to send the current type of messages
export interface MessageStoreCallerInfoRequest {
  /**
   * Phone number in E.164 format
   */
  phoneNumber: string;
}
