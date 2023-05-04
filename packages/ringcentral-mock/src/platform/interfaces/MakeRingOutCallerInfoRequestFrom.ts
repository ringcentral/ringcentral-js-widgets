// Phone number of the caller. This number corresponds to the 1st leg of the RingOut call. This number can be one of the user's configured forwarding numbers or an arbitrary number
export interface MakeRingOutCallerInfoRequestFrom {
  /**
   * Phone number in E.164 format
   */
  phoneNumber: string;
  /**
   * Internal identifier of a forwarding number; returned in response as an 'id' field value. Can be specified instead of the phoneNumber attribute
   */
  forwardingNumberId: string;
}
