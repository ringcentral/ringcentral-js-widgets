import { WebPhoneOptions } from 'ringcentral-web-phone';

import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import { RingCentralClient } from '../../lib/RingCentralClient';
import NumberValidate from '../NumberValidate';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import { Brand } from '../BrandV2';
import RegionSettings from '../RegionSettings';
import AudioSettings from '../AudioSettings';
// import Storage from '../Storage';
import { Storage } from '../StorageV2';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { TabManager } from '../TabManagerV2';
import ContactMatcher from '../ContactMatcher';
import { NormalizedSession } from '../../interfaces/Webphone.interface';

export interface Deps {
  prefix: string;
  alert: Alert;
  auth: Auth;
  client: RingCentralClient;
  numberValidate: NumberValidate;
  rolesAndPermissions: RolesAndPermissions;
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
