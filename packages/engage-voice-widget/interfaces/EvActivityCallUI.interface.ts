import { BasicCallInfoProps } from 'ringcentral-widgets/components/BasicCallInfo';
import {
  CallLogPanelProps,
  CallStatus,
} from 'ringcentral-widgets/components/CallLogPanel';

import { EvSmallCallControlProps } from '../components/EvSmallCallControl';
import { EvCallData } from './EvData.interface';
import { EvTransferType } from '../enums';

type CallLogPanelCurrentLog = CallLogPanelProps['currentLog'];

export type EvCallLogTask = CallLogPanelCurrentLog['task'] & {
  dispositionId?: string;
  notes?: string;
};

export type EvCurrentLog = CallLogPanelCurrentLog & {
  currentEvRawCall: EvCallData;
  task: EvCallLogTask;
};

export interface CurrentCallControlPermission {
  allowHangupCall?: boolean;
  allowRequeueCall?: boolean;
  allowTransferCall?: boolean;
  allowHoldCall?: boolean;
  allowMuteCall?: boolean;
}

export type EvActivityCallUIProps = {
  currentLog: EvCurrentLog;
  /** The subject for call log info */
  basicInfo?: {
    subject?: string;
  } & Pick<BasicCallInfoProps, 'callInfos' | 'followInfos'>;
  isInbound: boolean;
  currentEvCall: EvCallData;
  status: CallStatus;
  disableDispose: boolean;
  saveStatus: 'saved' | 'saving' | 'submit';
  smallCallControlSize: 'medium' | 'small';
  currentCallControlPermission: CurrentCallControlPermission;
  disableInternalTransfer: boolean;
} & Pick<
  CallLogPanelProps,
  'currentLocale' | 'showSmallCallControl' | 'isWide'
> &
  Pick<
    EvSmallCallControlProps,
    | 'isOnMute'
    | 'isOnHold'
    | 'isInComingCall'
    | 'isOnActive'
    | 'disableTransfer'
    | 'disableHangup'
    | 'disableActive'
    | 'disableHold'
    | 'disableMute'
  >;

export type EvActivityCallUIFunctions = {
  disposeCall: () => Promise<void>;
  goToRequeueCallPage(): void;
  goToTransferCallPage(type: EvTransferType): void;
} & Pick<CallLogPanelProps, 'goBack' | 'onUpdateCallLog' | 'onSaveCallLog'> &
  Pick<
    EvSmallCallControlProps,
    | 'onMute'
    | 'onUnmute'
    | 'onHangup'
    | 'onReject'
    | 'onHold'
    | 'onUnHold'
    | 'onActive'
  >;
