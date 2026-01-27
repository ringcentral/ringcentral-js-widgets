import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type { CallMetaInfo, OnCallActionType } from '../../../../services';

import type { KeypadPage } from './KeypadPanel';

export interface KeypadViewOptions {
  component?: typeof KeypadPage;
}

export interface KeypadViewPanelProps {
  call: Call;
  callVolume: number;
  outputDeviceId: string;
  actionButtonDisabled: boolean;
  onAction: OnCallActionType;
  toNumber: string;
  onToNumberChange: (toNumber: string) => void;

  expanded: boolean;
  /**
   * onExpand event handler, if not provided, the expand button will not be shown
   */
  onExpand?: () => void;
}

export type KeypadViewProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled'>;
