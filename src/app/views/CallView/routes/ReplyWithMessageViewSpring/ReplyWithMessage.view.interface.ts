import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  ReplyWithPattern,
  type ReplyWithPatternParams,
} from 'ringcentral-call-control/lib/Session';

import type { CallMetaInfo, OnCallActionType } from '../../../../services';

import type { ReplyWithMessagePanel } from './ReplyWithMessagePanel';

export interface ReplyWithMessageViewOptions {
  component?: typeof ReplyWithMessagePanel;
}

export interface OptionsItem {
  text: string;
  timeValue: number;
  timeUnits: ReplyWithPatternParams['timeUnit'];
}
export interface ReplyOption {
  options?: OptionsItem[];
  pattern: ReplyWithPattern;
  text: string;
}

export interface ReplyWithMessageViewPanelProps {
  call: Call;
  options: ReplyOption[];
  onAction: OnCallActionType;
  onOptionClick: (option: ReplyOption) => void;
  replayMessage: string;
  onReplayMessageChange: (val: string) => void;
}

export type ReplyWithMessageViewContainerProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled'>;

export interface ReplyWithMessageViewProps {
  //
}
export { ReplyWithPattern };
