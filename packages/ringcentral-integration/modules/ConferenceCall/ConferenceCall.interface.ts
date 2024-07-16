import type CallParty from '@rc-ex/core/lib/definitions/CallParty';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import type calleeTypes from '../../enums/calleeTypes';
import type { NormalizedCall } from '../../interfaces/Call.interface';
import type { Entity } from '../../interfaces/Entity.interface';
import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { Call } from '../Call';
import type { CallingSettings } from '../CallingSettings';
import type { ConnectivityMonitor } from '../ConnectivityMonitor';
import type { ContactMatcher } from '../ContactMatcher';
import type { sessionStatus, Webphone } from '../Webphone';

interface ConferenceCallOptions {
  pulling?: boolean;
  capacity?: number;
  timeout?: number;
}

export interface Deps extends ConferenceCallOptions {
  alert: Alert;
  auth: Auth;
  availabilityMonitor?: AvailabilityMonitor;
  call: Call;
  callingSettings: CallingSettings;
  client: any;
  connectivityMonitor: ConnectivityMonitor;
  contactMatcher?: ContactMatcher;
  appFeatures: AppFeatures;
  webphone?: Webphone;
  conferenceCallOptions?: ConferenceCallOptions;
}

export type SessionType =
  | 'Call'
  | 'RingOut'
  | 'RingMe'
  | 'Conference'
  | 'GreetingsRecording'
  | 'VerificationCall'
  | 'Zoom'
  | 'CallOut';

// https://developers.ringcentral.com/api-reference/Call-Control/createConferenceCallSession
export interface Conference {
  creationTime: string;
  id: string;
  origin: {
    type: SessionType;
  };
  parties: Party[];
  voiceCallToken: string;
}

export interface PartyState {
  rcId: string;
  avatarUrl: string;
  partyName: string;
  partyNumber: string;
  calleeType: keyof typeof calleeTypes;
  id: string;
}
export interface LastCallInfo {
  calleeType: ObjectMapValue<typeof calleeTypes>;
  avatarUrl?: string;
  extraNum?: number;
  name?: string;
  phoneNumber?: string;
  status?: ObjectMapValue<typeof sessionStatus>;
  lastCallContact?: Entity;
}

export interface ConferenceState {
  conference: Conference;
  sessionId: string;
  profiles: PartyState[];
}

export interface ConferencesState {
  [key: string]: ConferenceState;
}

export interface MergingPair {
  fromSessionId?: string;
  toSessionId?: string;
}

export type Party = AbstractParty<ConferenceRole, CallStatus, SessionType>;

export type AbstractParty<
  Role extends ConferenceRole,
  Status extends CallStatus,
  PartySessionType extends SessionType,
> = CallParty &
  (Role extends 'Host'
    ? {
        // Deprecated: Information on call owner
        owner: { accountId: string; extensionId: string };
        to: { name: 'Conference'; phoneNumber: 'conference' };
        conferenceRole: Role;
      }
    : Role extends 'Participant'
    ? {
        conferenceRole: Role;
      }
    : never) &
  (PartySessionType extends 'RingOut'
    ? {
        ringOutRole: RingRole;
      }
    : PartySessionType extends 'RingMe'
    ? {
        ringMeRole: RingRole;
      }
    : {}) & {
    status: (Status extends 'Disconnected'
      ? {
          // Reason for call termination. For 'Disconnected' code only
          reason?: PartyDisconnectReason;
        }
      : Status extends 'Gone'
      ? {
          // Peer session/party details. Valid in 'Gone' state of a call
          peerId: Pick<
            NormalizedCall,
            'sessionId' | 'telephonySessionId' | 'partyId'
          >;
        }
      : {}) & {
      code: Status;
      description?: string;
    };
  };

// internal types
type ConferenceRole = 'Host' | 'Participant';

export type CallDirection = 'Outbound' | 'Inbound';

export type CallStatus =
  | 'Setup'
  | 'Proceeding'
  | 'Answered'
  | 'Disconnected'
  | 'Gone'
  | 'Parked'
  | 'Hold'
  | 'VoiceMail'
  | 'FaxReceive'
  | 'VoiceMailScreening';

interface CallPartyInfo {
  deviceId?: string;
  extensionId?: string;
  phoneNumber: string;
  name?: string;
}

export type PartyDisconnectReason =
  | 'Pickup'
  | 'Supervising'
  | 'TakeOver'
  | 'Timeout'
  | 'BlindTransfer'
  | 'RccTransfer'
  | 'AttendedTransfer'
  | 'CallerInputRedirect'
  | 'CallFlip'
  | 'ParkLocation'
  | 'DtmfTransfer'
  | 'AgentAnswered'
  | 'AgentDropped'
  | 'Rejected'
  | 'Cancelled'
  | 'InternalError'
  | 'NoAnswer'
  | 'TargetBusy'
  | 'InvalidNumber'
  | 'InternationalDisabled'
  | 'DestinationBlocked'
  | 'NotEnoughFunds'
  | 'NoSuchUser'
  | 'CallPark'
  | 'CallRedirected'
  | 'CallReplied'
  | 'CallSwitch'
  | 'CallFinished'
  | 'CallDropped';

type RingRole = 'Initiator' | 'Target';

interface Recording {
  id: string;
  active: boolean;
}

interface IBaseParty {
  // Internal identifier of a party
  id: string;
  muted: boolean;
  // If 'True' then the party is not connected to a session voice conference, 'False' means the party is connected to other parties in a session
  standAlone: boolean;
  // Call park information
  park?: {
    id: string;
  };
  accountId: string;
  extensionId: string;
  recordings?: Recording[];
  from: CallPartyInfo;
  to: CallPartyInfo;
  direction: CallDirection;
  attributes?: object;
}
