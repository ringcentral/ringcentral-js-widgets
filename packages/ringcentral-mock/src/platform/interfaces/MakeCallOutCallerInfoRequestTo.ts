// Phone number of the called party. This number corresponds to the 2nd leg of a CallOut call
export interface MakeCallOutCallerInfoRequestTo {
  /**
   * Phone number in E.164 format
   * Example: 16502223366
   */
  phoneNumber: string;
  /**
   * Extension number
   * Example: 103
   */
  extensionNumber: string;
}
