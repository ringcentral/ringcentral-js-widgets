import { Entity } from './Entity.interface';
import { ActiveCall } from './Presence.model';
import { NormalizedSession } from './Webphone.interface';

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
  from?: {
    phoneNumber?: string;
    extensionNumber?: string;
  };
  to?: {
    phoneNumber?: string;
    extensionNumber?: string;
  };
  startTime?: number;
  sessionId?: string;
  webphoneSession?: NormalizedSession;
  telephonyStatus?: ActiveCall['telephonyStatus'];
}

export type NormalizedCalls = NormalizedCall[];

export interface Call extends NormalizedCall {
  fromMatches?: Entity[];
  toMatches?: Entity[];
  activityMatches?: string[];
  toNumberEntity?: string;
}
