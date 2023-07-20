import type { CallResultsValue } from '../enums/callResults';
import type { Entity } from './Entity.interface';
import type { ActiveCall } from './Presence.model';
import type { NormalizedSession } from './Webphone.interface';
import type { IWarmTransferInfo } from './ActiveSession.interface';

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
  telephonySession?: {
    status: string;
    id: string;
    direction: string;
  };
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
}

export type NormalizedCalls = NormalizedCall[];

export interface Call extends NormalizedCall {
  fromMatches?: Entity[];
  toMatches?: Entity[];
  activityMatches?: string[];
  toNumberEntity?: string;
  result?: CallResultsValue;
}
