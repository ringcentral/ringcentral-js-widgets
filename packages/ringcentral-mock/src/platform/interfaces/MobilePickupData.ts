export interface MobilePickupData {
  /**
   * List of extension IDs, configured to pick up a call from Desktop/Mobile applications
   */
  ccMailboxes: string[];
  /**
   * SIP proxy registration name
   */
  to: string;
  /**
   * User data
   */
  sid: string;
  /**
   * User data
   */
  srvlvl: string;
  /**
   * User data
   */
  srvLvlExt: string;
}
