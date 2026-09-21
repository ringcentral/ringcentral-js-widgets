import * as nextCore from '@ringcentral-integration/next-core';
import { of } from 'rxjs';

import { MessageThreadsView } from '../../src/app/views/MessageThreadsView/MessageThreads.view';

type Conversation = {
  conversationId: string;
  correspondents?: Array<{
    name?: string;
    phoneNumber?: string;
    extensionNumber?: string;
  }>;
  subject?: string;
};

const buildView = () => {
  const threads = {
    't-open-me': {
      threadInfo: {
        status: 'Open',
        owner: { extensionId: 'q1' },
        assignee: { extensionId: '101' },
      },
      unreadCount: 3,
    },
    't-open-other': {
      threadInfo: {
        status: 'Open',
        owner: { extensionId: 'q2' },
        assignee: { extensionId: '202' },
      },
      unreadCount: 1,
    },
    't-open-unassigned': {
      threadInfo: {
        status: 'Open',
        owner: { extensionId: 'q3' },
      },
      unreadCount: 0,
    },
    't-resolved': {
      threadInfo: {
        status: 'Resolved',
        owner: { extensionId: 'q1' },
        assignee: { extensionId: '303' },
      },
      unreadCount: 0,
    },
  } as Record<string, any>;

  const conversations: Conversation[] = [
    {
      conversationId: 't-open-me',
      correspondents: [
        { name: 'Alice', phoneNumber: '1111', extensionNumber: '1001' },
      ],
      subject: 'Need help with account',
    },
    {
      conversationId: 't-open-other',
      correspondents: [
        { name: 'Bob', phoneNumber: '2222', extensionNumber: '1002' },
      ],
      subject: 'Resolved issue from user',
    },
    {
      conversationId: 't-open-unassigned',
      correspondents: [
        { name: 'Charlie', phoneNumber: '3333', extensionNumber: '1003' },
      ],
      subject: 'Queue item',
    },
    {
      conversationId: 't-resolved',
      correspondents: [
        { name: 'David', phoneNumber: '4444', extensionNumber: '1004' },
      ],
      subject: 'Done thread',
    },
  ];

  const messageThread = {
    data: { threads },
    hasPermission: true,
    hasPermission$: of(false),
    historyLoading: false,
    threadUnreadCount: 2,
    threadConversationsInfo: {
      conversations,
      map: new Map(),
    },
    smsRecipients: [
      { id: 'q1', name: 'Queue 1' },
      { id: 'q2', name: 'Queue 2' },
      { id: 'q3', name: 'Queue 3' },
    ],
    getThread: jest.fn((threadId: string) => threads[threadId]),
    getThreadGroup: jest.fn(() => ({ unreadCount: 2 })),
    isThreadId: jest.fn(() => true),
    getThreadMessages: jest.fn((threadId: string) => {
      if (threadId === 't-open-unassigned') {
        return [{ subject: 'follow up token from queue' }];
      }
      return [{ subject: '' }];
    }),
    setUnreadCount: jest.fn(),
    resolveThread: jest.fn().mockResolvedValue(undefined),
    reopenResolvedThread: jest.fn().mockResolvedValue(undefined),
    assignThread: jest.fn().mockResolvedValue(undefined),
    unassignThread: jest.fn().mockResolvedValue(undefined),
    showAssignedToYouToast: jest.fn(),
    loadMoreMessages: jest.fn(),
  } as any;

  const modalView = {
    create: jest.fn(() => 'assign-thread-modal'),
    open: jest.fn(),
  } as any;

  const router = {
    currentPath: '/messages',
    push: jest.fn().mockResolvedValue(undefined),
  } as any;

  const toast = {
    success: jest.fn(),
    danger: jest.fn(),
  } as any;

  const auth = {
    ownerId: '101',
  } as any;

  const view = new MessageThreadsView(
    {
      getSmsSentCapability: jest.fn(() => ({ hasCapability: true })),
    } as any,
    {
      getSmsRecipients: jest.fn(() => []),
      getSmsRecipientsLoading: jest.fn(() => false),
      loadSmsRecipients: jest.fn(),
    } as any,
    modalView,
    messageThread,
    router,
    toast,
    auth,
    {
      shared: true,
      onServer: jest.fn(),
    } as any,
  );

  return {
    view,
    mocks: {
      messageThread,
      modalView,
      router,
      toast,
      auth,
      portManager: (view as any)._portManager,
    },
  };
};

describe('MessageThreadsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('filters thread conversations with status, assignee, unread, queue and search rules', () => {
    const { view } = buildView();

    Object.assign(view.sharedSearchForm, {
      filter: 'All',
      statusFilter: ['Resolved'],
      selectedAssignees: [
        '__CURRENT_USER__',
        '__ASSIGNED_TO_OTHERS__',
        '__UNASSIGNED__',
      ],
      selectedRecipientExtensionIds: ['q1', 'q2', 'q3'],
      searchInput: '',
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-resolved']);

    Object.assign(view.sharedSearchForm, {
      statusFilter: ['Open', 'Resolved'],
      selectedAssignees: ['__CURRENT_USER__'],
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-open-me']);

    Object.assign(view.sharedSearchForm, {
      filter: 'Unread',
      selectedAssignees: [
        '__CURRENT_USER__',
        '__ASSIGNED_TO_OTHERS__',
        '__UNASSIGNED__',
      ],
      selectedRecipientExtensionIds: ['q1', 'q2', 'q3'],
      searchInput: '',
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-open-me', 't-open-other']);

    Object.assign(view.sharedSearchForm, {
      filter: 'All',
      selectedRecipientExtensionIds: ['q1'],
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-open-me', 't-resolved']);

    Object.assign(view.sharedSearchForm, {
      selectedRecipientExtensionIds: ['q1', 'q2', 'q3'],
      searchInput: 'alice',
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-open-me']);

    Object.assign(view.sharedSearchForm, {
      searchInput: 'follow up token',
    });
    expect(
      view.filteredThreadConversations.map((c) => c.conversationId),
    ).toEqual(['t-open-unassigned']);
  });

  it('handles processThreadAction branches and errors', async () => {
    const { view, mocks } = buildView();

    await expect(
      view.processThreadAction(undefined, 'assignToMe' as any),
    ).resolves.toBe(false);
    await expect(
      view.processThreadAction('t-open-me', 'unknown' as any),
    ).resolves.toBe(false);

    await expect(
      view.processThreadAction('t-open-me', 'resolveThread'),
    ).resolves.toBe(true);
    expect(mocks.messageThread.resolveThread).toHaveBeenCalledWith('t-open-me');

    await expect(
      view.processThreadAction('t-open-me', 'assignThread'),
    ).resolves.toBe(true);
    await expect(
      view.processThreadAction('t-open-me', 'reassignThread'),
    ).resolves.toBe(true);
    expect(mocks.modalView.open).toHaveBeenCalledTimes(2);

    await expect(
      view.processThreadAction('t-open-me', 'unassignThread'),
    ).resolves.toBe(true);
    expect(mocks.messageThread.unassignThread).toHaveBeenCalledWith(
      't-open-me',
    );
    expect(mocks.toast.success).toHaveBeenCalled();

    mocks.messageThread.unassignThread.mockRejectedValueOnce(new Error('boom'));
    await expect(
      view.processThreadAction('t-open-me', 'unassignThread'),
    ).rejects.toThrow('boom');
    expect(mocks.toast.danger).toHaveBeenCalled();
  });

  it('handles resolve/assign catch branches with danger toast', async () => {
    const { view, mocks } = buildView();

    mocks.messageThread.resolveThread.mockRejectedValueOnce(
      new Error('resolve fail'),
    );
    await expect(
      view.processThreadAction('t-open-me', 'resolveThread'),
    ).rejects.toThrow('resolve fail');
    expect(mocks.toast.danger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );

    mocks.messageThread.assignThread.mockRejectedValueOnce(
      new Error('assign fail'),
    );
    await expect(
      view.processThreadAction('t-open-me', 'assignToMe'),
    ).rejects.toThrow('assign fail');
    expect(mocks.toast.danger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });

  it('handles assignToMe for open/resolved thread and missing extensionId', async () => {
    const { view, mocks } = buildView();

    await expect(
      view.processThreadAction('t-open-me', 'assignToMe'),
    ).resolves.toBe(true);
    expect(mocks.messageThread.assignThread).toHaveBeenCalledWith(
      't-open-me',
      '101',
    );
    expect(mocks.router.push).toHaveBeenCalledWith('/conversations/t-open-me');
    expect(mocks.messageThread.showAssignedToYouToast).toHaveBeenCalled();

    await expect(
      view.processThreadAction('t-resolved', 'assignToMe'),
    ).resolves.toBe(true);
    expect(mocks.messageThread.reopenResolvedThread).toHaveBeenCalledWith(
      't-resolved',
    );
    expect(mocks.router.push).toHaveBeenCalledWith('/conversations/t-resolved');

    mocks.auth.ownerId = '';
    await expect(
      view.processThreadAction('t-open-other', 'assignToMe'),
    ).resolves.toBe(true);
    expect(mocks.messageThread.assignThread).not.toHaveBeenCalledWith(
      't-open-other',
      '',
    );
  });

  it('does not redirect after assignToMe when the user navigates away', async () => {
    const { view, mocks } = buildView();
    let finishAssign: (() => void) | undefined;
    mocks.messageThread.assignThread.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          finishAssign = resolve;
        }),
    );

    const assignPromise = view.processThreadAction('t-open-me', 'assignToMe');
    mocks.router.currentPath = '/settings';
    finishAssign?.();

    await expect(assignPromise).resolves.toBe(true);
    expect(mocks.router.push).not.toHaveBeenCalled();
    expect(mocks.messageThread.showAssignedToYouToast).toHaveBeenCalled();
  });

  it('returns ui props/functions and respects hasPermission for thread list', () => {
    const { view, mocks } = buildView();
    view.sharedSearchForm.selectedRecipientExtensionIds = ['q1', 'q2', 'q3'];

    const uiPropsWhenPermission = (view as any).getUIProps();
    expect(uiPropsWhenPermission.threadConversations.length).toBeGreaterThan(0);

    mocks.messageThread.hasPermission = false;
    const uiPropsNoPermission = (view as any).getUIProps();
    expect(uiPropsNoPermission.threadConversations).toEqual([]);

    const uiFunctions = (view as any).getUIFunctions();
    uiFunctions.onEndReached();
    expect(mocks.messageThread.loadMoreMessages).toHaveBeenCalled();
  });

  it('registers shared onServer callback and handles thread/listener updates', () => {
    const { view, mocks } = buildView();
    const onServer = mocks.portManager.onServer as jest.Mock;
    expect(onServer).toHaveBeenCalledTimes(1);

    mocks.messageThread.hasPermission$ = of(true);
    mocks.messageThread.getThreadGroup.mockReturnValue({ unreadCount: 2 });
    view.sharedSearchForm.selectedRecipientExtensionIds = ['q2', 'ghost'];

    const fromWatchValueSpy = jest
      .spyOn(nextCore, 'fromWatchValue')
      .mockImplementation((_target: any, selector: () => any) => {
        const selected = selector();
        if (typeof selected === 'string') {
          return of('/conversations/t-open-me') as any;
        }
        if (Array.isArray(selected)) {
          return of([
            { id: 'q1', name: 'Queue 1' },
            { id: 'q2', name: 'Queue 2' },
            { id: 'q3', name: 'Queue 3' },
          ]) as any;
        }
        return of(2) as any;
      });

    const updateSharedSearchFormSpy = jest
      .spyOn(view as any, 'updateSharedSearchForm')
      .mockImplementation(jest.fn());

    const bindCallback = onServer.mock.calls[0][0];
    bindCallback();

    expect(fromWatchValueSpy).toHaveBeenCalledTimes(3);
    expect(mocks.messageThread.setUnreadCount).toHaveBeenCalledWith(
      't-open-me',
    );
    expect(updateSharedSearchFormSpy).toHaveBeenCalledWith({
      selectedRecipientExtensionIds: ['q2'],
    });
  });
});
