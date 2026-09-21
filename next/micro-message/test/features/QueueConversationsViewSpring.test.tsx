import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { QueueConversationsView } from '../../src/app/views/ConversationsViewSpring/QueueConversations.view';

jest.mock('@ringcentral-integration/micro-phone/src/app/hooks', () => ({
  useContactRenderInfoFromConversation: jest.fn(() => ({
    formattedPhoneNumber: '(555) 000-2222',
  })),
}));

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

jest.mock(
  '../../src/app/views/ConversationsViewSpring/QueueConversationsPage/QueueConversationsFilter',
  () => ({
    QueueConversationsFilter: ({
      onCallQueuesChange,
      onFilterChange,
      onReset,
      onSearchInputChange,
      selectedCallQueueIds,
    }: any) => (
      <div
        data-sign="queueFilter"
        data-selected={selectedCallQueueIds.join(',')}
      >
        <button
          data-sign="changeSearch"
          onClick={() => onSearchInputChange('updated')}
        />
        <button
          data-sign="changeFilter"
          onClick={() => onFilterChange('Unread')}
        />
        <button
          data-sign="changeQueues"
          onClick={() => onCallQueuesChange(['q2'])}
        />
        <button data-sign="resetFilter" onClick={onReset} />
      </div>
    ),
  }),
);

jest.mock(
  '../../src/app/views/ConversationsViewSpring/ConversationsPage/ConversationsList',
  () => ({
    ConversationsList: ({
      conversations,
      notFoundMessage,
      onEndReached,
      readStatusFilter,
      setLastPosition,
      useConversationItemInfo,
    }: any) => {
      const info = conversations[0]
        ? useConversationItemInfo(conversations[0])
        : undefined;
      return (
        <div
          data-sign="mockQueueList"
          data-count={conversations.length}
          data-not-found={notFoundMessage}
          data-queue-name={info?.queueName}
          data-read-filter={readStatusFilter}
        >
          <button data-sign="loadNext" onClick={onEndReached} />
          <button
            data-sign="savePosition"
            onClick={() => setLastPosition('queue', { ranges: [] })}
          />
        </div>
      );
    },
  }),
);

const createQueueConversationsView = ({
  hasPermission = true,
  searchInput = 'missing',
}: {
  hasPermission?: boolean;
  searchInput?: string;
} = {}) => {
  const conversation = {
    id: 'conversation-1',
    conversationId: 'conversation-1',
    owner: {
      name: 'Owner Queue',
    },
  };
  const queueConversations = {
    smsRecipientCallQueues: [{ id: 'q1', name: 'Sales' }],
    hasPermission,
    pagingConversations: [conversation],
    filter: 'Unread',
    loadingOldConversations: false,
    searchInput,
    selectedCallQueueIds: ['q1'],
    ready: true,
    getConversationQueue: jest.fn(() => ({ name: 'Resolved Queue' })),
    loadNextPage: jest.fn().mockResolvedValue(undefined),
    updateCallQueueSearchForm: jest.fn().mockResolvedValue(undefined),
    updateFilter: jest.fn().mockResolvedValue(undefined),
    updateSelectedCallQueueIds: jest.fn().mockResolvedValue(undefined),
  };
  const view = new QueueConversationsView(queueConversations as any);
  const useConversationItemInfo = jest.fn(() => ({
    actions: ['action'],
    extensionId: 'extension-1',
    info: { name: 'Customer' },
    threadInfo: { id: 'thread-1' },
  }));

  return {
    queueConversations,
    useConversationItemInfo,
    view,
  };
};

describe('QueueConversationsView', () => {
  it('renders queue conversations and delegates list/filter actions', () => {
    const { queueConversations, useConversationItemInfo, view } =
      createQueueConversationsView();
    const Component = view.component.bind(view);

    render(
      <Component
        createNewEntityTooltip="create"
        useConversationItemInfo={useConversationItemInfo}
      />,
    );

    const list = document.querySelector(
      '[data-sign="mockQueueList"]',
    ) as HTMLElement;
    expect(list).toHaveAttribute('data-count', '1');
    expect(list).toHaveAttribute('data-not-found', 'No search results found');
    expect(list).toHaveAttribute('data-queue-name', 'Resolved Queue');
    expect(list).toHaveAttribute('data-read-filter', 'Unread');

    fireEvent.click(
      document.querySelector('[data-sign="changeSearch"]') as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector('[data-sign="changeFilter"]') as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector('[data-sign="changeQueues"]') as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector('[data-sign="resetFilter"]') as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector('[data-sign="loadNext"]') as HTMLButtonElement,
    );

    expect(
      queueConversations.updateCallQueueSearchForm,
    ).toHaveBeenNthCalledWith(1, {
      searchInput: 'updated',
    });
    expect(queueConversations.updateFilter).toHaveBeenCalledWith('Unread');
    expect(queueConversations.updateSelectedCallQueueIds).toHaveBeenCalledWith([
      'q2',
    ]);
    expect(
      queueConversations.updateCallQueueSearchForm,
    ).toHaveBeenNthCalledWith(2, 'reset');
    expect(queueConversations.loadNextPage).toHaveBeenCalledTimes(1);
  });

  it('hides conversations without permission and omits empty-search messaging', () => {
    const { view } = createQueueConversationsView({
      hasPermission: false,
      searchInput: '',
    });
    const Component = view.component.bind(view);

    render(<Component />);

    const list = document.querySelector(
      '[data-sign="mockQueueList"]',
    ) as HTMLElement;
    expect(list).toHaveAttribute('data-count', '0');
    expect(list).not.toHaveAttribute('data-not-found');
    expect(list).toHaveAttribute('data-read-filter', 'Unread');
  });

  it('uses default contact info and falls back to the message owner queue name', () => {
    const { queueConversations, view } = createQueueConversationsView({
      searchInput: '',
    });
    queueConversations.getConversationQueue.mockReturnValue(undefined);
    const Component = view.component.bind(view);

    render(<Component />);

    const list = document.querySelector(
      '[data-sign="mockQueueList"]',
    ) as HTMLElement;
    expect(list).toHaveAttribute('data-count', '1');
    expect(list).toHaveAttribute('data-queue-name', 'Owner Queue');
  });
});
