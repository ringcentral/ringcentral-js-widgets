import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { WebPhoneOptions } from 'ringcentral-web-phone';

/**
 * Webphone Options
 * appKey: ringcentral client id
 * appName: app name for track
 * appVersion: app version for track
 * webphoneLogLevel: log level
 * onCall*: add handler when call event fired
 * webphoneSDKOptions: web phone sdk options
 * permissionCheck: if check phone number with numberValidate module
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
  connectDelay?: number;
  enableContactMatchWhenNewCall?: boolean;
  /**
   * Maximum time (ms) to wait for websocket/subscription recovery after SIP reconnects.
   * Default handled in implementation when value not provided.
   */
  webSocketRecoveryTimeout?: number;
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

export type TPickupInboundCall = {
  sessionId: string;
  toNumber: string;
  fromNumber: string;
  serverId: string;
  telephonySessionId: string;
};

export interface IncomingRequest {
  body: string;
  callId: string;
  cseq: number;
  data: string;
  from: {
    parameters: Record<string, unknown>;
    type: number;
    uri: unknown;
    _displayName: string;
  };
  fromTag: string;
  headers: Record<string, Array<unknown>>;
  method: string;
  ruri: {
    parameters: Record<string, unknown>;
    type: number;
    headers: Record<string, unknown>;
    raw: Record<string, unknown>;
    normal: Record<string, unknown>;
  };
  to: {
    parameters: Record<string, unknown>;
    type: number;
    uri: unknown;
    _displayName: string;
  };
  toTag: string;
  type: number;
  via: {
    protocol: string;
    transport: string;
    host_type: string;
    host: string;
    port: number;
  };
  viaBranch: string;
}
