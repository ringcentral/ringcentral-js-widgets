import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import type { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';

import type { RouterInteraction } from '../RouterInteraction';

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
  allowPickupCall?: boolean;
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
