import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { CallCtrlContainer } from '@ringcentral-integration/widgets/components/CallCtrlContainer';

import type { ICallAction } from '../../../../hooks';
import type { CallMetaInfo, OnCallActionType } from '../../../../services';

export type AiNoteTipType = 'viewAiNote' | 'aiNoteStopped';
export interface AiNoteTipsMap {
  [telephonySessionId: string]: boolean;
}

export interface CallControlViewOptions {
  component?: typeof CallCtrlContainer;
}

export interface CallControlViewPanelProps {
  call: Call;
  transferringCalls: readonly [Call, Call] | null;
  actions: ICallAction[];
  flipNumbers: ForwardingNumberInfo[];
  onAction: OnCallActionType;
  expanded: boolean;
  aiNoteTipType?: AiNoteTipType;
  AudioCardComponent?: React.ReactNode;
  /**
   * onExpand event handler, if not provided, the expand button will not be shown
   */
  onExpand?: () => void;
  viewAiNote: () => void;
  onCloseAiNoteTip: () => void;
}

export type CallControlViewProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled'>;

export type CallCtrlLayoutType =
  | 'normalCtrl'
  | 'mergeCtrl'
  | 'conferenceCtrl'
  | 'completeTransferCtrl';
