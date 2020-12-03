import { AccountInfo } from '../AccountInfoV2';
import { Storage } from '../StorageV2';
import { Presence } from '../PresenceV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { Webphone } from '../WebphoneV2';
import { Call } from '../CallV2';
import ConferenceCall from '../ConferenceCall';
import { ActivityMatcher } from '../ActivityMatcherV2';
import { TabManager } from '../TabManagerV2';
import { ActiveCallControl } from '../ActiveCallControlV2';
import { Call as ICall } from '../../interfaces/Call.interface';

export type CallEventCallback = (call: ICall) => void | Promise<void>;

export interface CallMonitorOptions {
  /**
   * Use telephony session, default `false`
   */
  useTelephonySession?: boolean;
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
