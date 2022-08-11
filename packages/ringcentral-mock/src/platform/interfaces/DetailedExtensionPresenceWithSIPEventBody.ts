import { ActiveCallInfo } from './ActiveCallInfo';

// Notification payload body
export interface DetailedExtensionPresenceWithSIPEventBody {
  /**
   * Internal identifier of an extension
   * Default: ~
   */
  extensionId: string;
  /**
   * Telephony presence status. Returned if telephony status is changed.
   */
  telephonyStatus:
    | 'NoCall'
    | 'CallConnected'
    | 'Ringing'
    | 'OnHold'
    | 'ParkedCall';
  /**
   * List of the latest 7 active calls on extension
   */
  activeCalls: ActiveCallInfo[];
  /**
   * Order number of a notification to state the chronology
   */
  sequence: number;
  /**
   * Aggregated presence status, calculated from a number of sources
   */
  presenceStatus: 'Offline' | 'Busy' | 'Available';
  /**
   * User-defined presence status (as previously published by the user)
   */
  userStatus: 'Offline' | 'Busy' | 'Available';
  /**
   * Meetings presence status
   */
  meetingStatus: 'Connected' | 'Disconnected';
  /**
   * Extended DnD (Do not Disturb) status
   */
  dndStatus:
    | 'TakeAllCalls'
    | 'DoNotAcceptAnyCalls'
    | 'DoNotAcceptDepartmentCalls'
    | 'TakeDepartmentCallsOnly';
  /**
   * If 'True' enables other extensions to see the extension presence status
   */
  allowSeeMyPresence: boolean;
  /**
   * If 'True' enables to ring extension phone, if any user monitored by this extension is ringing
   */
  ringOnMonitoredCall: boolean;
  /**
   * If 'True' enables the extension user to pick up a monitored line on hold
   */
  pickUpCallsOnHold: boolean;
  /**
   * Total number of active calls on extension at the present moment
   */
  totalActiveCalls: number;
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
