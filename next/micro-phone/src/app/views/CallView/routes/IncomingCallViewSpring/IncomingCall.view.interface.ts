import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import { ICallAction } from '../../../../hooks';
import type { CallMetaInfo, OnCallActionType } from '../../../../services';

import type { IncomingCallPage } from './IncomingCallPage';

export interface IncomingCallViewOptions {
  component?: typeof IncomingCallPage;
}

export type IncomingCallViewProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled' | 'minimized'>;

export interface IncomingCallViewPanelProps {
  call: Call;
  actions: ICallAction[];
  /**
   * does current be multiple call view mode
   *
   * when queue call, there never have other call coming, so that be a type of mode
   */
  mode?: 'single' | 'multiple' | 'queue';
  /**
   * show close button beside expand button
   */
  showCloseButton: boolean;
  /**
   * onExpand event handler, if not provided, the expand button will not be shown
   */
  onExpand?: () => void;
  expanded: boolean;
  /**
   * does that ringing popup is minimized
   */
  minimized: boolean;
  onMinimized: (minimized: boolean) => void;
  onAction: OnCallActionType;
  forwardingNumbers: ForwardingNumberInfo[];
  classes?: {
    miniContainer?: string;
  };
}
