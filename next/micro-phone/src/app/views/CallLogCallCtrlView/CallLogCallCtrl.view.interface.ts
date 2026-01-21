import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { CallLogCallCtrlPanel } from '@ringcentral-integration/widgets/components/CallLogCallCtrlPanel';

import type { ActiveCallControl, ActiveSession } from '../../services';

export interface CallLogCallCtrlViewOptions {
  component?: typeof CallLogCallCtrlPanel;
  showConferenceCall?: boolean;
}

export interface CallLogCallCtrlPanelProps {
  isWebphone: boolean;
  currentSession: ActiveSession;
  disableLinks: boolean;
  telephonySessionId: string;
  forwardingNumbers: ForwardingNumberInfo[];
  otherActiveCalls: boolean;
  isCurrentCall: boolean;
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
  onMergeCall: () => Promise<void>;
  onAddCall: () => Promise<void>;
  sendDTMF: (dtmfValue: string, telephonySessionId: string) => Promise<void>;
  answer: ActiveCallControl['answer'];
  forward: (phoneNumber: string, telephonySessionId: string) => void;
  reply: (telephonySessionId: string) => void;
  ignore: ActiveCallControl['ignore'];
  answerAndHold: ActiveCallControl['answerAndHold'];
  answerAndEnd: ActiveCallControl['answerAndEnd'];
  dialpadToggleTrack: (open: boolean) => void;
  clickForwardTrack: ActiveCallControl['clickForwardTrack'];
  allowPickupCall: boolean;
  showConferenceCall?: boolean;
  isCallQueueCall?: boolean;
}

export interface CallLogCallCtrlViewProps {
  telephonySessionId: string;
  isWide?: boolean;
  enableReply?: boolean;
  isCurrentDeviceCall?: boolean;
  warmTransferActiveTelephonySessionId?: string;
  currentLocale?: string;
 
}
