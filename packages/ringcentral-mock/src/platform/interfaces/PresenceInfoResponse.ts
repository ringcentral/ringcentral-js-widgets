import { ActiveCallInfo } from './ActiveCallInfo';
import { GetPresenceExtensionInfo } from './GetPresenceExtensionInfo';

export interface PresenceInfoResponse {
  /**
   * Link to the presence resource
   */
  uri: string;
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
  /**
   */
  activeCalls: ActiveCallInfo[];
  /**
   */
  extension: GetPresenceExtensionInfo;
  /**
   * Meetings presence status
   */
  meetingStatus: 'Connected' | 'Disconnected';
  /**
   * Telephony presence status. Returned if telephony status is changed
   */
  telephonyStatus:
    | 'NoCall'
    | 'CallConnected'
    | 'Ringing'
    | 'OnHold'
    | 'ParkedCall';
  /**
   * Aggregated presence status, calculated from a number of sources
   */
  presenceStatus: 'Offline' | 'Busy' | 'Available';
}
