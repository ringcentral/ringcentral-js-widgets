import type {
  Party,
  PartyStatusCode,
  SessionData,
} from 'ringcentral-call-control/lib/Session';

export interface IWarmTransferInfo {
  relatedTelephonySessionId: string;
  isOriginal: boolean;
}
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
  isConferenceCall: boolean;
  conferenceParticipants: {
    sessionId: string;
    telephonySessionId: string;
    partyId: string;
    isHost?: boolean;
    sessionName: string;
  }[];
}
