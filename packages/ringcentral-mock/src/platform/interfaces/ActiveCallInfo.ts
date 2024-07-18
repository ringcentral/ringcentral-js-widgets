import type { CallInfoCQ } from './CallInfoCQ';
import type { DetailedCallInfo } from './DetailedCallInfo';

export interface ActiveCallInfo {
  /**
   */
  id: string;
  /**
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
   * Time when the call is actually started
   */
  startTime: string;
  /**
   * Telephony presence status
   */
  telephonyStatus:
    | 'NoCall'
    | 'CallConnected'
    | 'Ringing'
    | 'OnHold'
    | 'ParkedCall';
  /**
   */
  sipData: DetailedCallInfo;
  /**
   */
  sessionId: string;
  /**
   * Telephony identifier of a call session
   */
  telephonySessionId: string;
  /**
   * Extension ID of the call owner on whose behalf a call is performed
   */
  onBehalfOf: string;
  /**
   * Internal identifier of a call party
   */
  partyId: string;
  /**
   */
  terminationType: string;
  /**
   */
  callInfo: CallInfoCQ;
}
