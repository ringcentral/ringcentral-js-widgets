import type {
  Party,
  PartyStatusCode,
  SessionData,
} from 'ringcentral-call-control/lib/Session';

import type { CallerInfo } from './Call.interface';

export interface IWarmTransferInfo {
  relatedTelephonySessionId: string;
  isOriginal: boolean;
}
export type ConferenceSession = {
  sessionId: string;
  telephonySessionId: string;
  partyId: string;
  isHost?: boolean;
  sessionName: string;
  // the all info of the session
  info: CallerInfo;
  /**
   * if this session is from call queue that will have the QueueName in this field
   */
  queueName?: string;
};

export interface ActiveCallControlSessionData extends SessionData {
  party: Party;
  telephonySessionId: string;
  telephonySession?: any;
  sessionId: string;
  activeCallId: string;
  status: PartyStatusCode;
  direction: any;
  otherParties: any;
  recordings: any;
  from: any;
  to: any;
  startTime: number;
  isRecording?: boolean;
  isOnMute?: boolean;
  isConferenceCall: boolean;
  conferenceParticipants: ConferenceSession[];
  callQueueName?: string;
}
