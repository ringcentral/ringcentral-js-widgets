import { Call as ICall } from '../../interfaces/Call.interface';
import { AccountInfo } from '../AccountInfoV2';
import { ActiveCallControl } from '../ActiveCallControlV2';
import { ActivityMatcher } from '../ActivityMatcherV2';
import { Call } from '../CallV2';
import ConferenceCall from '../ConferenceCall';
import { ContactMatcher } from '../ContactMatcherV2';
import { Presence } from '../PresenceV2';
import { Storage } from '../StorageV2';
import { TabManager } from '../TabManager';
import { Webphone } from '../WebphoneV2';

export type CallEventCallback = (call: ICall) => void | Promise<void>;

export interface CallMonitorOptions {
  /**
   * Use telephony session, default `false`
   */
  useTelephonySession?: boolean;
  enableContactMatchWhenNewCall?: boolean;
}

export interface Deps {
  accountInfo: AccountInfo;
  storage: Storage;
  presence: Presence;
  contactMatcher?: ContactMatcher;
  webphone?: Webphone;
  call?: Call;
  conferenceCall?: ConferenceCall;
  activityMatcher?: ActivityMatcher;
  tabManager?: TabManager;
  activeCallControl?: ActiveCallControl;
  callMonitorOptions?: CallMonitorOptions;
}
