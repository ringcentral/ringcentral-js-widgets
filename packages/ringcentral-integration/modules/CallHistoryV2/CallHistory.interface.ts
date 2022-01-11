import { Call } from '../../interfaces/Call.interface';
import { Entity } from '../../interfaces/Entity.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { AccountInfo } from '../AccountInfoV2';
import { ActivityMatcher } from '../ActivityMatcherV2';
import { CallLog } from '../CallLogV2';
import { CallMonitor } from '../CallMonitorV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { Locale } from '../Locale';
import { Storage } from '../StorageV2';
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
