import type { CallInfoCQ } from './CallInfoCQ';

export interface ActiveCallInfoWithoutSIP {
  /**
   * Internal identifier of a call
   */
  id: string;
  /**
   * Call direction
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * Identifies if a call belongs to the call queue
   */
  queueCall: boolean;
  /**
   * Phone number or extension number of a caller. For GCM transport type '_from' property should be used
   */
  from: string;
  /**
   * Name of a caller
   */
  fromName: string;
  /**
   * Phone number or extension number of a callee
   */
  to: string;
  /**
   * Name of a callee
   */
  toName: string;
  /**
   * Internal identifier of a call party
   */
  partyId: string;
  /**
   * Time when the call is actually started
   */
  startTime: string;
  /**
   * Internal identifier of a call session
   */
  sessionId: string;
  /**
   * Telephony call status
   */
  telephonyStatus:
    | 'NoCall'
    | 'CallConnected'
    | 'Ringing'
    | 'OnHold'
    | 'ParkedCall';
  /**
   * Telephony identifier of a call session
   */
  telephonySessionId: string;
  /**
   * Type of call termination. Supported for calls in 'NoCall' status. If the returned termination type is 'intermediate' it means the call is not actually ended, the connection is established on one of the devices
   */
  terminationType: 'final' | 'intermediate';
  /**
   */
  callInfo: CallInfoCQ;
}
