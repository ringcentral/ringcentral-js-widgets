export interface PresenceInfoRequest {
  /**
   */
  userStatus: 'Offline' | 'Busy' | 'Available';
  /**
   */
  dndStatus:
    | 'TakeAllCalls'
    | 'DoNotAcceptDepartmentCalls'
    | 'TakeDepartmentCallsOnly'
    | 'DoNotAcceptAnyCalls'
    | 'Unknown';
  /**
   */
  message: string;
  /**
   */
  allowSeeMyPresence: boolean;
  /**
   */
  ringOnMonitoredCall: boolean;
  /**
   */
  pickUpCallsOnHold: boolean;
}
