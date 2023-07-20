import type { Call } from '../../interfaces/Call.interface';
import type { Entity } from '../../interfaces/Entity.interface';
import type { ActiveCall } from '../../interfaces/Presence.model';
import type { AccountInfo } from '../AccountInfo';
import type { ActivityMatcher } from '../ActivityMatcher';
import type { CallLog } from '../CallLog';
import type { CallMonitor } from '../CallMonitor';
import type { ContactMatcher } from '../ContactMatcher';
import type { Locale } from '../Locale';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';

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
}

export interface Deps {
  accountInfo: AccountInfo;
  callLog: CallLog;
  callMonitor: CallMonitor;
  locale: Locale;
  storage: Storage;
  activityMatcher?: ActivityMatcher;
  contactMatcher?: ContactMatcher;
  tabManager?: TabManager;
  callHistoryOptions?: CallHistoryOptions;
}

interface CallItem extends ActiveCall {
  fromMatches: Entity[];
  toMatches: Entity[];
  activityMatches: string[];
  toNumberEntity?: string;
}

export type HistoryCall = (Call | CallItem) & {
  recording?: {
    contentUri: string;
    id: string;
    type: string;
    uri: string;
  };
};
