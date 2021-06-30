import {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { ForwardingNumberInfo } from '@rc-ex/core/definitions';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  activeCallControl: ActiveCallControl;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  callingSettings: CallingSettings;
  forwardingNumber: ForwardingNumber;
  callMonitor: CallMonitor;
  routerInteraction: RouterInteraction;
}

export interface CallLogCallCtrlContainerProps {
  telephonySessionId: string;
}

export interface CallLogCallCtrlPanelProps {
  isWebphone: boolean;
  currentSession: ActiveSession;
  disableLinks: boolean;
  telephonySessionId: string;
  forwardingNumbers: ForwardingNumberInfo[];
  otherActiveCalls: boolean;
  realOutboundCallStatus: string;
  mute: ActiveCallControl['mute'];
  unmute: ActiveCallControl['unmute'];
  hangUp: ActiveCallControl['hangUp'];
  reject: ActiveCallControl['reject'];
  onHold: ActiveCallControl['hold'];
  onUnHold: ActiveCallControl['unhold'];
  startRecord: ActiveCallControl['startRecord'];
  stopRecord: ActiveCallControl['stopRecord'];
  onTransfer: (telephonySessionId: string) => Promise<void>;
  sendDTMF: (dtmfValue: string, telephonySessionId: string) => Promise<void>;
  answer: ActiveCallControl['answer'];
  forward: (phoneNumber: string, telephonySessionId: string) => void;
  ignore: ActiveCallControl['ignore'];
  answerAndHold: ActiveCallControl['answerAndHold'];
  answerAndEnd: ActiveCallControl['answerAndEnd'];
  dialpadToggleTrack: (open: boolean) => void;
  clickForwardTrack: ActiveCallControl['clickForwardTrack'];
}
