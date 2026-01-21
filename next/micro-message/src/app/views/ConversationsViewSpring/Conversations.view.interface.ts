import { type MessageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import { HistoryAction } from '@ringcentral-integration/next-widgets/components/ActionMenuList/useHistoryActionButtons';
import type { StateSnapshot } from 'react-virtuoso';

import type {
  FilteredConversation,
  ReadStatusFilter,
  ThreadInfoRecord,
} from '../../services';

import type { UseConversationsActions } from './Conversations.view';
import type { ConversationsPage } from './ConversationsPage';

export interface ConversationsViewSpringOptions {
  component?: typeof ConversationsPage;
  showLogPopover?: boolean;
}

export type ConversationsViewSpringProps = {
  typeFilter: 'Text' | 'VoiceMail' | 'Fax';
};

export type ConversationsPanelSpringProps = {
  preparing: boolean;
  conversations: FilteredConversation[];
  loadingNextPage: boolean;
  disableLinks?: boolean;
  createNewEntityTooltip?: string;
  //
  lastPosition?: StateSnapshot;
  setLastPosition: (page: string, val?: StateSnapshot) => void;
  //
  searchInput: string;
  readStatusFilter: ReadStatusFilter;
  crmName?: string;
  showLogPopover?: boolean;
  showNewButton?: boolean;
  //
  useConversationItemInfo: (conversation: FilteredConversation) => {
    info: ReturnType<typeof useContactRenderInfoFromConversation>;
    actions: HistoryAction[];
    threadInfo?: ThreadInfoRecord;
    extensionId?: number;
  };
  useActionsHandler: UseConversationsActions;
  useItemRender?: (conversation: FilteredConversation, index: number) => void;
  //
  onNewClick?: (type: MessageTypes) => void;
  updateReadStatusFilterMap: (
    readStatus: ReadStatusFilter,
    type: MessageTypes,
  ) => void;
  onSearchInputChange: (options: React.ChangeEvent<HTMLInputElement>) => void;
} & ConversationsViewSpringProps;
