import type { HistoryCall } from '../../services';
import type {
  UseCallHistoryItemInfo,
  UseCallsListActions,
} from '../CallsListViewSpring';

export interface CallDetailViewOptions {}

export interface CallDetailViewProps {
  //
}

export type CallDetailViewPanelProps = {
  currentCallLog: HistoryCall;
  goBack: () => void;
  useCallHistoryItemInfo: UseCallHistoryItemInfo;
  useActionsHandler: UseCallsListActions;
  /**
   * the footer element of the page
   */
  footer?: React.ReactNode;
};
