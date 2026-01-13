import type { CallResultsValue } from '../enums/callResults';

import type {
  IWarmTransferInfo,
  ActiveCallControlSessionData,
} from './ActiveSession.interface';
import type { Entity } from './Entity.interface';
import type { ActiveCall } from './Presence.model';
import type { NormalizedSession, Session } from './Webphone.interface';

export interface CallerInfo {
  phoneNumber?: string;
  extensionId?: string; // for 1. call data from CallLog
  extensionNumber?: string;
  name?: string; // for data from CallLog
}

export interface NormalizedCall {
  id?: string;
  partyId?: string;
  direction?: ActiveCall['direction'];
  telephonySession?: Session;
  telephonySessionId?: string;
  toName?: string;
  fromName?: string;
  from?: CallerInfo;
  to?: CallerInfo;
  startTime?: number;
  sessionId: string;
  webphoneSession?: NormalizedSession;
  telephonyStatus?: ActiveCall['telephonyStatus'];
  duration?: number;
  warmTransferInfo?: IWarmTransferInfo;
  isRecording?: boolean;
  isConferenceCall?: boolean;
  conferenceParticipants?: ActiveCallControlSessionData['conferenceParticipants'];
  conferenceParticipantsMatchesList?: Entity[][];
  callQueueName?: string;
  offset?: number;
  /**
   * in queue call, when answered by other agent, the answered agent's id
   */
  delegate?: { id: string; name: string };
  delegationType?: string;
}

export type NormalizedCalls = NormalizedCall[];

export interface Call extends NormalizedCall {
  fromMatches?: Entity[];
  toMatches?: Entity[];
  activityMatches?: string[];
  toNumberEntity?: string;
  result?: CallResultsValue;
  isLogged?: boolean;
  hasSmartNote?: boolean;
  callSelectionInfo?: {
    displayedSelection?: Entity;
    selections?: Entity[];
  };
  /**
   * mark the call is ended from preinsert
   */
  __preinsert?: boolean;
}
