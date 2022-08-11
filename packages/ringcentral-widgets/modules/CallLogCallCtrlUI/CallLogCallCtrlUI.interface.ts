import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';

import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  activeCallControl: ActiveCallControl;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  callingSettings: CallingSettings;
  forwardingNumber: ForwardingNumber;
  callMonitor: CallMonitor;
  routerInteraction: RouterInteraction;
  extensionFeatures: ExtensionFeatures;
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
  onCompleteWarmTransfer: ActiveCallControl['completeWarmTransfer'];
  onTransfer: (telephonySessionId: string) => Promise<void>;
  sendDTMF: (dtmfValue: string, telephonySessionId: string) => Promise<void>;
  answer: ActiveCallControl['answer'];
  forward: (phoneNumber: string, telephonySessionId: string) => void;
  reply: (telephonySessionId: string) => void;
  ignore: ActiveCallControl['ignore'];
  answerAndHold: ActiveCallControl['answerAndHold'];
  answerAndEnd: ActiveCallControl['answerAndEnd'];
  dialpadToggleTrack: (open: boolean) => void;
  clickForwardTrack: ActiveCallControl['clickForwardTrack'];
}
