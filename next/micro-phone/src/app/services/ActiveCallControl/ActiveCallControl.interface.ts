import type { TelephonyStatus } from '@ringcentral-integration/commons/enums/telephonyStatus';
import type { IWarmTransferInfo } from '@ringcentral-integration/commons/interfaces/ActiveSession.interface';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { IPickUpCallParams as OriginalPickUpCallParams } from 'ringcentral-call';
import type { Direction } from 'ringcentral-call-control/lib/Session';

export type { ActiveCallControlSessionData } from '@ringcentral-integration/commons/interfaces/ActiveSession.interface';

export interface ActiveCallControlOptions {
  polling?: boolean;
  ttl?: number;
  timeToRetry?: number;
  permissionCheck?: boolean;
  // conference call do not has session id, for uif project, disable this feature for now.
  skipConferenceCall?: boolean;
  /**
   * does support leave conference as host feature
   *
   * @default false
   */
  getEnableLeaveConferenceAsHost?: () => boolean;
}

export interface ModuleMakeCallParams {
  fromNumber?: string;
  toNumber: string;
  homeCountryId?: string;
  extendedControls?: object;
  transferSessionId?: string;
}

export interface ActiveSession {
  telephonySessionId: string;
  partyId: string;
  direction: Direction;
  from: string;
  fromNumber: string;
  fromUserName: string;
  to: string;
  toNumber: string;
  toUserName: string;
  id: string;
  sessionId: string;
  callStatus: TelephonyStatus;
  startTime: number;
  creationTime: string;
  toMatches: Entity[];
  fromMatches: Entity[];
  recordStatus: string;
  isReject: boolean;
  /**
   * the mute state will group the local mute state and server mute state
   *
   * that may be different from local and server, local always have the highest priority
   *
   * for example
   *
   * the follow flow will make the session on server mute be different with local webphone client
   * mute => hold => unhold, the original data from rc-call-control will auto unmute, but local still be mute
   */
  isOnMute: boolean;
  isOnHold: boolean;
  // TODO: below fields not be correct data, avoid to use them
  /**
   * @deprecated
   */
  isForwarded: boolean;
  /**
   * @deprecated
   */
  isOnFlip: boolean;
  /**
   * @deprecated
   */
  isOnTransfer: boolean;
  /**
   * @deprecated
   */
  isReplied: boolean;
  /**
   * @deprecated
   */
  isToVoicemail: boolean;
  /**
   * @deprecated
   */
  lastHoldingTime: number;
  /**
   * @deprecated
   */
  minimized: boolean;
  /**
   * @deprecated
   */
  removed: boolean;
}

export type ICurrentDeviceCallsMap = Record<string, string>;

export interface ITransferCallSessionMapping {
  [telephonySessionId: string]: IWarmTransferInfo;
}

export type IPickUpCallParams = Omit<
  OriginalPickUpCallParams,
  'sessionDescriptionHandlerOptions'
>;

export type IPickUpCallDataMap = Record<string, IPickUpCallParams>;

export interface TelephonySessionsCallAnsweredElsewhereEvent {
  telephonySessionId: string;
  accountId: string;
  representedBy: RepresentedBy;
  callQueuePartyInfo: CallQueuePartyInfo;
}

interface CallQueuePartyInfo {
  accountId: string;
  extensionId: string;
  id: string;
  direction: string;
  to: To;
  from: From;
  sipData: SipData;
  status: Status;
  park: Park;
  missedCall: boolean;
  standAlone: boolean;
  muted: boolean;
  uiCallInfo: UiCallInfo;
}

interface UiCallInfo {
  primary: Primary;
  additional: Primary;
}

interface Primary {
  type: string;
  value: string;
}

interface Park {}

interface Status {
  code: string;
  rcc: boolean;
}

interface SipData {
  callId: string;
  toTag: string;
  fromTag: string;
}

interface From {
  phoneNumber: string;
  name: string;
  extensionId: string;
  deviceId: string;
}

interface To {
  phoneNumber: string;
  name: string;
  extensionId: string;
}

export interface RepresentedBy {
  extensionId: string;
}

export interface TelephonySessionsMissedCallsEvent {
  uuid: string;
  event: string;
  timestamp: string;
  extensionId: number;
  action: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  subscriptionId: string;
  ownerId: string;
  callInfo: CallInfo;
  queueCall: boolean;
  reason: string;
  srvLvl: string;
  srvLvlExt: string;
  telephonySessionId: string;
  sessionId: string;
  partyId: string;
  sid: string;
}

interface CallInfo {
  primary: Primary;
  additional: Primary;
}

interface Primary {
  type: string;
  value: string;
}
