import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import {
  action,
  delegate,
  injectable,
  RcViewModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';
import type { StateSnapshot } from 'react-virtuoso';

import {
  type FilteredConversation,
  QueueConversations,
  type QueueConversationFilter,
  type QueueMessage,
} from '../../services';

import type { ConversationListViewProps } from './Conversations.view.interface';
import { ConversationsList } from './ConversationsPage/ConversationsList';
import { t } from './ConversationsPage/i18n';
import { QueueConversationsFilter } from './QueueConversationsPage/QueueConversationsFilter';

@injectable({
  name: 'QueueConversationsView',
})
export class QueueConversationsView extends RcViewModule {
  @state
  lastPosition: StateSnapshot | null = null;

  @action
  private _setLastPosition(value?: StateSnapshot) {
    this.lastPosition = value ?? null;
  }

  @delegate('server')
  async setLastPosition(_page: string, value?: StateSnapshot) {
    this._setLastPosition(value);
  }

  constructor(private _queueConversations: QueueConversations) {
    super();
  }

  component({
    createNewEntityTooltip,
    useActionsHandler = () => async () => undefined,
    useConversationItemInfo = (conversation: FilteredConversation) => {
      const info = useContactRenderInfoFromConversation(conversation, {
        timePresentationMode: 'withoutTime',
        phoneNumberDisplayMode: 'phoneNumber',
      });
      const queueName =
        this._queueConversations.getConversationQueue(
          conversation.conversationId,
        )?.name ?? (conversation as QueueMessage).owner?.name;

      return {
        info,
        actions: [],
        queueName,
      };
    },
  }: Partial<ConversationListViewProps> = {}) {
    const {
      callQueues,
      conversations,
      filter,
      lastPosition,
      loadingNextPage,
      searchInput,
      selectedCallQueueIds,
    } = useConnector(() => ({
      callQueues: this._queueConversations.smsRecipientCallQueues,
      conversations: this._queueConversations.hasPermission
        ? this._queueConversations.pagingConversations
        : [],
      filter: this._queueConversations.filter,
      lastPosition: this.lastPosition,
      loadingNextPage: this._queueConversations.loadingOldConversations,
      searchInput: this._queueConversations.searchInput,
      selectedCallQueueIds: this._queueConversations.selectedCallQueueIds,
    }));

    const useQueueConversationItemInfo = (
      conversation: FilteredConversation,
    ) => {
      const { actions, extensionId, info, threadInfo } =
        useConversationItemInfo(conversation);
      const queueName =
        this._queueConversations.getConversationQueue(
          conversation.conversationId,
        )?.name ?? (conversation as QueueMessage).owner?.name;

      return {
        actions,
        extensionId,
        info,
        queueName,
        threadInfo,
      };
    };

    const notFoundMessage = searchInput ? t('noSearchResults') : undefined;

    return (
      <div className="flex flex-col h-full" data-sign="QueueConversationsPage">
        <QueueConversationsFilter
          searchInput={searchInput}
          filter={filter}
          selectedCallQueueIds={selectedCallQueueIds}
          callQueues={callQueues}
          onSearchInputChange={(value) => {
            void this._queueConversations.updateCallQueueSearchForm({
              searchInput: value,
            });
          }}
          onFilterChange={(value: QueueConversationFilter) => {
            void this._queueConversations.updateFilter(value);
          }}
          onCallQueuesChange={(queueIds) => {
            void this._queueConversations.updateSelectedCallQueueIds(queueIds);
          }}
          onReset={() => {
            void this._queueConversations.updateCallQueueSearchForm('reset');
          }}
        />
        <ConversationsList
          preparing={!this._queueConversations.ready}
          conversations={conversations}
          loadingNextPage={loadingNextPage}
          lastPosition={lastPosition ?? undefined}
          setLastPosition={(page, value) => {
            void this.setLastPosition(page, value);
          }}
          readStatusFilter={filter === 'Unread' ? 'Unread' : 'All'}
          typeFilter={messageTypes.text}
          useConversationItemInfo={useQueueConversationItemInfo}
          useActionsHandler={useActionsHandler}
          showLogPopover={false}
          createNewEntityTooltip={createNewEntityTooltip}
          notFoundMessage={notFoundMessage}
          className="h-full overflow-auto"
          onEndReached={() => {
            void this._queueConversations.loadNextPage();
          }}
        />
      </div>
    );
  }
}
