import type { CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StateSnapshot } from 'react-virtuoso';

import type { MessageThread } from '../../services';
import type { ConversationsPanelSpringProps } from '../ConversationsViewSpring/Conversations.view.interface';

import type { AssignmentOption, AssignmentOptionValue } from './utils';

export type SharedFilterType = 'All' | 'AssignedToMe' | 'Unread';
export type StatusFilterType = ('Open' | 'Resolved')[];

export type SharedSearchForm = {
  searchInput: string;
  filter: SharedFilterType;
  statusFilter: StatusFilterType;
  selectedAssignees: AssignmentOptionValue[];
  selectedCallQueues: string[];
};

export type MessageThreadsViewProps = Pick<
  ConversationsPanelSpringProps,
  | 'useConversationItemInfo'
  | 'useActionsHandler'
  | 'useItemRender'
  | 'showLogPopover'
  | 'createNewEntityTooltip'
>;

export type MessageThreadPanelSelfProps = {
  form: SharedSearchForm;
  threadConversations: MessageThread['threadConversationsInfo']['conversations'];
  lastPosition?: StateSnapshot;
  loading?: boolean;
  callQueues?: CallQueueInfo[];
  assignmentOptions: readonly AssignmentOption[];
  onSharedSearchFormUpdate?: (
    updates: Partial<SharedSearchForm> | 'reset',
  ) => void;
  setLastPosition: (page: string, val?: StateSnapshot) => void;
  onEndReached: () => void;
};

export type MessageThreadPanelProps = MessageThreadPanelSelfProps &
  MessageThreadsViewProps;
