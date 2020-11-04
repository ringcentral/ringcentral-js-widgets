import { WebPhoneSession as WebphoneSessionBase } from 'ringcentral-web-phone/lib/session';
import { WebPhoneOptions } from 'ringcentral-web-phone';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

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

import { extendedControlStatus } from './extendedControlStatus';

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

export interface PartyData {
  partyId: string;
  telephonySessionId: string;
}

export interface WebphoneSession extends WebphoneSessionBase {
  toTag: string;
  fromTag: string;
  __rc_callId: string;
  __rc_direction: 'Outbound' | 'Inbound';
  __rc_callStatus: string;
  __rc_fromNumber: string;
  __rc_creationTime: number;
  __rc_isOnMute: boolean;
  __rc_isOnFlip: boolean;
  __rc_isOnTransfer: boolean;
  __rc_isToVoicemail: boolean;
  __rc_isForwarded: boolean;
  __rc_isReplied: boolean;
  __rc_recordStatus: string;
  __rc_contactMatch: { id: string };
  __rc_minimized: boolean;
  __rc_partyData?: PartyData;
  __rc_lastActiveTime: number;
  __rc_extendedControls: string;
  __rc_extendedControlStatus: ObjectMapValue<typeof extendedControlStatus>;
}

export interface NormalizedSession {
  id: string;
  callId: string;
  direction: 'Outbound' | 'Inbound';
  callStatus: string;
  to: string;
  toUserName: string;
  from: string;
  fromNumber: string;
  fromUserName: string;
  fromTag: string;
  toTag: string;
  startTime: number;
  creationTime: number;
  isOnHold: boolean;
  isOnMute: boolean;
  isOnFlip: boolean;
  isOnTransfer: boolean;
  isToVoicemail: boolean;
  isForwarded: boolean;
  isReplied: boolean;
  recordStatus: string;
  contactMatch: { id: string };
  minimized: boolean;
  partyData: PartyData;
  lastActiveTime: number;
  cached: boolean;
  removed: boolean;
  callQueueName: string;
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
}
export type WebphoneSessionRequestHeaders = {
  [name: string]: Array<WebphoneSessionRequestHeader>
}
