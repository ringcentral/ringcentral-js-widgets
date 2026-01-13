import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';

export interface CallLogCallCtrlPanelProps {
  currentLocale?: string;
  isWide?: boolean;
  enableReply?: boolean;
  isCurrentDeviceCall?: boolean;
  isCurrentCall: boolean;
  warmTransferActiveTelephonySessionId?: string;
  transferRef?: React.RefObject<HTMLSpanElement>;
  isOnTransfer?: boolean;

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
  onMergeCall: () => Promise<void>;
  isCallQueueCall?: boolean;

}
