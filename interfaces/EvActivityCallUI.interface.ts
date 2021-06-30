import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { BasicCallInfoProps } from '@ringcentral-integration/widgets/components/BasicCallInfo';
import { CallLogFieldsProps } from '@ringcentral-integration/widgets/components/CallLogFields';
import {
  CallLogPanelProps,
  CallStatus,
} from '@ringcentral-integration/widgets/components/CallLogPanel';

import { EvSmallCallControlProps } from '../components/EvSmallCallControl';
import { EvTransferType } from '../enums';
import { EvAgentScriptData, EvCallData, EvIvrData } from './EvData.interface';

type CallLogPanelCurrentLog = CallLogPanelProps['currentLog'];

export type EvCallLogTask = CallLogPanelCurrentLog['task'] & {
  dispositionId?: string;
  notes?: string;
};

export type EvCurrentLog = CallLogPanelCurrentLog & {
  currentEvRawCall: EvCallData;
  task: { [key: string]: any };
  showInfoMeta?: {
    entity: any;
    title: string;
  };
};

export const callLogMethods = ObjectMap.fromKeys(['create']);
export type CallLogMethods = keyof typeof callLogMethods;
export const saveStatus = ObjectMap.fromKeys(['saved', 'saving', 'submit']);
export type SaveStatus = keyof typeof saveStatus;

export type EvActivityCallUIProps = {
  scrollTo: string;
  currentLog: EvCurrentLog;
  showRecordCall: boolean;
  isRecording: boolean;
  disableRecordControl: boolean;
  disablePauseRecord: boolean;
  /** The subject for call log info */
  basicInfo?: {
    subject?: string;
  } & Pick<BasicCallInfoProps, 'callInfos' | 'followInfos'>;
  isInbound: boolean;
  currentEvCall: EvCallData;
  status: CallStatus;
  disableDispose: boolean;
  saveStatus: SaveStatus | CallLogMethods;
  isKeypadOpen?: boolean;
  keypadValue?: string;
  smallCallControlSize: 'medium' | 'small';
  currentCallControlPermission: {
    allowHangupCall?: boolean;
    allowRequeueCall?: boolean;
    allowTransferCall?: boolean;
    allowHoldCall?: boolean;
    allowRecordControl?: boolean;
    allowPauseRecord?: boolean;
  };
  disableInternalTransfer: boolean;
  showMuteButton: boolean;
  ivrAlertData: EvIvrData[];
  agentScriptData: EvAgentScriptData;
  referenceFieldOptions?: CallLogFieldsProps['referenceFieldOptions'];
  recordPauseCount: number;
  timeStamp: number;
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
  onCopySuccess: (name: string) => void;
  setKeypadIsOpen: (status: boolean) => void;
  setKeypadValue: (value: string) => void;
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
    | 'onRecord'
    | 'onStopRecord'
    | 'onResumeRecord'
    | 'onPauseRecord'
    | 'onRestartTimer'
  >;
