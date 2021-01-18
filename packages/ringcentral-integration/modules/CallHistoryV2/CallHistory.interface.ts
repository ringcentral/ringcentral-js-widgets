import { AccountInfo } from '../AccountInfoV2';
import { CallLog } from '../CallLogV2';
import { CallMonitor } from '../CallMonitorV2';
import { Locale } from '../LocaleV2';
import { Storage } from '../StorageV2';
import { ActivityMatcher } from '../ActivityMatcherV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { TabManager } from '../TabManagerV2';
import { Call } from '../../interfaces/Call.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { Entity } from '../../interfaces/Entity.interface';

export interface CallHistoryOptions {
  /**
   * enable cache, default true.
   */
  enableCache: boolean;
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

export interface EndedCall extends Call {
  result: 'Disconnected';
}

interface CallItem extends ActiveCall {
  fromMatches: Entity[];
  toMatches: Entity[];
  activityMatches: string[];
  toNumberEntity?: string;
}

export type HistoryCall = EndedCall | CallItem;
