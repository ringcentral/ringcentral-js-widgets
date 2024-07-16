import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import type { Session as SessionBase } from 'ringcentral-call/lib/Session';
import type { WebPhoneSession as WebphoneSessionBase } from 'ringcentral-web-phone/lib/session';

import type { extendedControlStatus } from '../enums/extendedControlStatus';

import type { Entity } from './Entity.interface';

export interface PartyData {
  partyId: string;
  telephonySessionId: string;
  sessionId: string;
}

export interface Session extends SessionBase {
  webphoneSession: WebphoneSession;
}

export interface WebphoneSession extends WebphoneSessionBase {
  toTag: string;
  fromTag: string;
  __rc_callId: string;
  __rc_direction: 'Outbound' | 'Inbound';
  __rc_callStatus: string;
  __rc_fromNumber: string;
  __rc_creationTime: number;
  __rc_isOnMute: boolean;
  __rc_isOnFlip: boolean;
  __rc_isOnTransfer: boolean;
  __rc_isToVoicemail: boolean;
  __rc_isForwarded: boolean;
  __rc_isReplied: boolean;
  __rc_recordStatus: string;
  __rc_contactMatch: { id: string };
  __rc_minimized: boolean;
  __rc_partyData?: PartyData;
  __rc_lastActiveTime: number;
  __rc_extendedControls?: string[];
  __rc_extendedControlStatus: ObjectMapValue<typeof extendedControlStatus>;
  __rc_transferSessionId?: string;
}

export interface NormalizedSession {
  id: string;
  callId: string;
  direction: 'Outbound' | 'Inbound';
  callStatus: string;
  to: string;
  toUserName: string;
  from: string;
  fromNumber: string;
  fromUserName: string;
  fromTag: string;
  toTag: string;
  startTime: number;
  creationTime: number;
  isOnHold: boolean;
  isOnMute: boolean;
  isOnFlip: boolean;
  isOnTransfer: boolean;
  isToVoicemail: boolean;
  isForwarded: boolean;
  isReplied: boolean;
  recordStatus: string;
  contactMatch: Entity;
  minimized: boolean;
  partyData: PartyData | null;
  lastActiveTime: number;
  cached: boolean;
  removed: boolean;
  callQueueName: string;
  warmTransferSessionId: string;
}
