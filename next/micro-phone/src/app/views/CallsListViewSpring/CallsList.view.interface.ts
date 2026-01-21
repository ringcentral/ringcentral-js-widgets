import type CallsListPanel from '@ringcentral-integration/widgets/components/CallsListPanel';
import type { StateSnapshot } from 'react-virtuoso';

import type { HistoryCall } from '../../services';

import { UseCallHistoryItemInfo, UseCallsListActions } from './CallsList.view';

export type ViewCallsFilterType =
  | undefined
  | 'all'
  | 'missed'
  | 'outgoing'
  | 'incoming'
  | 'logged'
  | 'unlogged';

export interface CallsListViewSpringOptions {
  component?: typeof CallsListPanel;
  /**
   * if true, will display the CRM log status in the calls list filter
   *
   * @default false
   */
  displayCRMLog?: boolean;
}

export interface CallsListViewSpringProps {}

export interface CallsListPanelSpringProps {
  calls: HistoryCall[];
  searchInput?: string;
  onSearchInputChange?: (value: string) => void;
  lastPosition?: StateSnapshot;
  setLastPosition: (type: ViewCallsFilterType, state: StateSnapshot) => void;
  viewCallsFilter?: ViewCallsFilterType;
  setViewCallsFilter?: (value: ViewCallsFilterType) => void;
  viewCallsFilterSelections: { label: string; value: string }[];
  useCallHistoryItemInfo: UseCallHistoryItemInfo;
  useActionsHandler: UseCallsListActions;
  useItemRender?: (call: HistoryCall, index: number) => void;
  viewCallsLoggedStatusMapping?: Record<string, boolean>;
  onFocus?: () => void;
}
