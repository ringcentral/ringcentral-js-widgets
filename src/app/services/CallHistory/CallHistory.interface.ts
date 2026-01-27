import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { ActiveCall } from '@ringcentral-integration/commons/interfaces/Presence.model';

export interface CallHistoryOptions {
  /**
   * enable cache, default true.
   */
  enableCache?: boolean;

  /**
   * set if enable the contact match with full phone numbers (phone number + extension), default is false
   */
  enableFullPhoneNumberMatch?: boolean;
  enableContactMatchInCallHistory?: boolean;
  contactMatchIgnoreCache?: boolean;
}

export interface CallItem extends ActiveCall {
  fromMatches: Entity[];
  toMatches: Entity[];
  activityMatches: string[];
  toNumberEntity?: string;
}

export type HistoryCall = CallItem &
  Call & {
    type: string;
    recording?: {
      contentUri: string;
      id: string;
      type: string;
      uri: string;
    };
    isConferenceCall?: boolean;
  };
