import { render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import { ConversationsListItem } from './ConversationsListItem';

jest.mock('../../../MessageThreadsView/useThreadInfoDisplay', () => ({
  useThreadInfoDisplay: () => ({
    ThreadStatus: () => <span data-testid="thread-status" />,
    queueName: undefined,
  }),
}));

jest.mock('../../useConversationActionButtons', () => ({
  useConversationActionButtons: () => null,
}));

const MockUnread = (props: any) => (
  <span
    data-sign={
      props.type === 'standard' ? 'unread-count-badge' : props['data-sign']
    }
  />
);

const buildInfo = ({
  isFax,
  isTextMessage,
}: {
  isFax: boolean;
  isTextMessage: boolean;
}) => ({
  DisplayName: () => <span data-testid="display-name">John Doe</span>,
  displayType: isFax ? 'Fax' : isTextMessage ? 'Text' : 'Voicemail',
  Avatar: () => <span data-testid="avatar" />,
  Unread: MockUnread,
  unreadCounts: 1,
  displayDescription: 'conversation description',
  isFax,
  isTextMessage,
  creationTime: '10:00 AM',
  logged: null,
});

const renderItem = ({
  isFax,
  isTextMessage,
  typeFilter,
}: {
  isFax: boolean;
  isTextMessage: boolean;
  typeFilter: 'Text' | 'Fax' | 'Voicemail';
}) => {
  const useConversationItemInfo = jest.fn(() => ({
    info: buildInfo({ isFax, isTextMessage }),
    actions: [],
    extensionId: 'ext-1',
    threadInfo: undefined,
    queueName: undefined,
  }));
  const useActionsHandler = jest.fn(() => jest.fn());

  return render(
    <ConversationsListItem
      conversation={{ conversationId: 'conversation-1' } as any}
      index={0}
      typeFilter={typeFilter}
      useConversationItemInfo={useConversationItemInfo as any}
      useActionsHandler={useActionsHandler as any}
      useItemRender={jest.fn()}
    />,
  );
};

describe('ConversationsListItem unread count badge (RCINT-49645)', () => {
  it('hides the unread count badge for fax conversations but keeps the unread dot', () => {
    renderItem({ isFax: true, isTextMessage: false, typeFilter: 'Fax' });

    expect(screen.queryByTestId('unread-count-badge')).not.toBeInTheDocument();
    expect(screen.getByTestId('unread-conversationItem')).toBeInTheDocument();
  });

  it('hides the unread count badge for voicemail conversations but keeps the unread dot', () => {
    renderItem({ isFax: false, isTextMessage: false, typeFilter: 'Voicemail' });

    expect(screen.queryByTestId('unread-count-badge')).not.toBeInTheDocument();
    expect(screen.getByTestId('unread-conversationItem')).toBeInTheDocument();
  });

  it('shows the unread count badge for text conversations', () => {
    renderItem({ isFax: false, isTextMessage: true, typeFilter: 'Text' });

    expect(screen.getByTestId('unread-count-badge')).toBeInTheDocument();
    expect(screen.getByTestId('unread-conversationItem')).toBeInTheDocument();
  });
});
