import type { Call as ICall } from '../../interfaces/Call.interface';
import type { AccountInfo } from '../AccountInfo';
import type { ActiveCallControl } from '../ActiveCallControl';
import type { ActivityMatcher } from '../ActivityMatcher';
import type { Call } from '../Call';
import type { ConferenceCall } from '../ConferenceCall';
import type { ContactMatcher } from '../ContactMatcher';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { Presence } from '../Presence';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';
import type { Webphone } from '../Webphone';

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
  extensionInfo: ExtensionInfo;
}
