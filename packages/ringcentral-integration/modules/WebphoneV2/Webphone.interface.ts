import { WebPhoneOptions } from 'ringcentral-web-phone';
import { NormalizedSession } from '../../interfaces/Webphone.interface';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { Alert } from '../AlertV2';
import { AppFeatures } from '../AppFeatures';
import { AudioSettings } from '../AudioSettingsV2';
import { Auth } from '../AuthV2';
import { AvailabilityMonitor } from '../AvailabilityMonitorV2';
import { Brand } from '../Brand';
import { ContactMatcher } from '../ContactMatcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { NumberValidate } from '../NumberValidateV2';
import { RegionSettings } from '../RegionSettingsV2';
import { Storage } from '../StorageV2';
import { TabManager } from '../TabManager';

export interface Deps {
  prefix: string;
  alert: Alert;
  auth: Auth;
  client: RingCentralClient;
  numberValidate: NumberValidate;
  extensionFeatures: ExtensionFeatures;
  appFeatures: AppFeatures;
  brand: Brand;
  regionSettings: RegionSettings;
  audioSettings: AudioSettings;
  storage: Storage;
  availabilityMonitor?: AvailabilityMonitor;
  tabManager?: TabManager;
  contactMatcher?: ContactMatcher;
  webphoneOptions: WebphoneOptions;
}
/**
 * Webphone Options
 * appKey: ringcentral client id
 * appName: app name for track
 * appVersion: app version for track
 * webphoneLogLevel: log level
 * onCall*: add handler when call event fired
 * webphoneSDKOptions: web phone sdk options
 * permissionCheck: if check phone number with numberValidate module
 * disconnectOnInactive: for support multiple tabs, disconnect connection in inactive tab
 * connectDelay: delay before creating web phone connection
 */
export interface WebphoneOptions {
  appKey: string;
  appName: string;
  appVersion: string;
  webphoneLogLevel?: number;
  onCallEnd?: () => CallEndHandler;
  onCallRing?: () => CallRingHandler;
  onCallStart?: () => CallStartHandler;
  onCallResume?: () => CallResumeHandler;
  onCallHold?: () => CallHoldHandler;
  onCallInit?: () => CallInitHandler;
  onBeforeCallResume?: () => BeforeCallResumeHandler;
  onBeforeCallEnd?: () => BeforeCallEndHandler;
  webphoneSDKOptions?: WebPhoneOptions;
  permissionCheck?: boolean;
  disconnectOnInactive?: boolean;
  connectDelay?: number;
  enableContactMatchWhenNewCall?: boolean;
}

export interface SwitchCallActiveCallParams {
  id: string;
  from: { phoneNumber: string };
  direction: string;
  to: { phoneNumber: string };
  sipData: {
    fromTag: string;
    toTag: string;
  };
}

export type OffEventHandler = () => void;

export type CallStartHandler = (
  session: NormalizedSession,
  activeSession: NormalizedSession,
) => void;

export type CallRingHandler = (
  session: NormalizedSession,
  ringSession: NormalizedSession,
) => void;

export type CallInitHandler = CallStartHandler;
export type BeforeCallEndHandler = CallStartHandler;
export type CallResumeHandler = CallStartHandler;
export type BeforeCallResumeHandler = CallStartHandler;
export type CallHoldHandler = CallStartHandler;

export type CallEndHandler = (
  session: NormalizedSession,
  activeSession: NormalizedSession,
  ringSession: NormalizedSession,
) => void;

export interface SessionReplyOptions {
  replyType: number;
  replyText: string;
  timeValue: string;
  timeUnits: string;
  callbackDirection: string;
}

export type WebphoneSessionRequestHeader = {
  raw: string;
};
export type WebphoneSessionRequestHeaders = {
  [name: string]: Array<WebphoneSessionRequestHeader>;
};
