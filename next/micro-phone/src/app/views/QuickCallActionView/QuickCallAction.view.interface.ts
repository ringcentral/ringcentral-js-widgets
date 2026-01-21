import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type { ICallAction } from '../../hooks';
import type { OnCallActionType } from '../../services';

import type { QuickCallActionPanel } from './QuickCallActionPanel';

export interface QuickCallActionViewOptions {
  component?: typeof QuickCallActionPanel;
}

export interface QuickCallActionViewPanelProps {
  currentCall?: Call;
  ringCalls: Call[];
  holdingCalls: Call[];
  activeCalls: Call[];
  swapCalls: Call[];
  mergeCalls: Call[];
  actions: ICallAction[];
  onAction: OnCallActionType;
  swapMenuOpened: boolean;
  onSwapMenuOpen: (open: boolean) => void;
  mergeMenuOpened: boolean;
  onMergeMenuOpen: (open: boolean) => void;
}

export interface QuickCallActionViewProps {}
