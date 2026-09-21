import {
  ConversationsSyncTabId,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  delegate,
  injectable,
  RcViewModule,
  state,
  storage,
  StoragePlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { type PropsWithChildren, useMemo } from 'react';

import {
  MessageStore,
  MessageThread,
  QueueConversations,
} from '../../services';
import { MessageThreadsView } from '../MessageThreadsView';

import type { ConversationListViewProps } from './Conversations.view.interface';
import { t } from './i18n';
import { QueueConversationsView } from './QueueConversations.view';

type ConversationsTabsViewProps = PropsWithChildren<ConversationListViewProps>;

@injectable({
  name: 'ConversationsTabsView',
})
export class ConversationsTabsView extends RcViewModule {
  @storage
  @state
  selectedConversationTab: ConversationsSyncTabId =
    ConversationsSyncTabId.PERSONAL;

  @action
  private _setSelectedConversationTab(tab: ConversationsSyncTabId) {
    this.selectedConversationTab = tab;
  }

  @delegate('server')
  async setSelectedConversationTab(tab: ConversationsSyncTabId) {
    this._setSelectedConversationTab(tab);
  }

  constructor(
    private _syncTabView: SyncTabView,
    private _storage: StoragePlugin,
    private _messageStore: MessageStore,
    private _messageThread: MessageThread,
    private _messageThreadsView: MessageThreadsView,
    private _queueConversations: QueueConversations,
    private _queueConversationsView: QueueConversationsView,
  ) {
    super();
    this._storage.enable(this);
  }

  component({ children, ...rest }: ConversationsTabsViewProps) {
    const {
      showShared,
      showCallQueue,
      personalUnreadCount,
      sharedUnreadCount,
      callQueueUnreadCount,
    } = useConnector(() => ({
      showShared: this._messageThread.hasPermission,
      showCallQueue: this._queueConversations.hasPermission,
      personalUnreadCount: this._messageStore.textUnreadCounts,
      sharedUnreadCount: this._messageThread.threadUnreadCount,
      callQueueUnreadCount: this._queueConversations.unreadCount,
    }));

    const tabs = useMemo(() => {
      const items = [
        {
          id: ConversationsSyncTabId.PERSONAL,
          label: t('direct'),
          BadgeProps: { count: personalUnreadCount },
          component: children,
        },
      ];

      if (showCallQueue) {
        items.push({
          id: ConversationsSyncTabId.QUEUE,
          label: t('queue'),
          BadgeProps: { count: callQueueUnreadCount },
          component: <this._queueConversationsView.component {...rest} />,
        });
      }

      if (showShared) {
        items.push({
          id: ConversationsSyncTabId.SHARED,
          label: t('shared'),
          BadgeProps: { count: sharedUnreadCount },
          component: <this._messageThreadsView.component {...rest} />,
        });
      }

      return items;
    }, [
      callQueueUnreadCount,
      children,
      personalUnreadCount,
      rest,
      sharedUnreadCount,
      showCallQueue,
      showShared,
    ]);

    if (tabs.length === 1) {
      return <>{children}</>;
    }

    return (
      <this._syncTabView.component
        id={SyncTabId.CONVERSATIONS}
        tabs={tabs}
        defaultValue={this.selectedConversationTab}
        onActiveChange={(value) => {
          void this.setSelectedConversationTab(value as ConversationsSyncTabId);
        }}
        data-sign="conversationsTabs"
        className="[&_.sui-tab]:max-w-none"
        variant="standard"
      />
    );
  }
}
