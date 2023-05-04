import { Call } from '../../interfaces/Call.interface';
import { Entity } from '../../interfaces/Entity.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { AccountInfo } from '../AccountInfo';
import { ActivityMatcher } from '../ActivityMatcher';
import { CallLog } from '../CallLog';
import { CallMonitor } from '../CallMonitor';
import { ContactMatcher } from '../ContactMatcher';
import { Locale } from '../Locale';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';

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
