import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  CallQueues,
  Grant,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  Initiator,
  PortDetector,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';

import { MessageSender } from '../../src/app/services/MessageSender';
import {
  ALL_CALL_QUEUES,
  QueueConversations,
} from '../../src/app/services/QueueConversations/QueueConversations';
import type { QueueConversationsOptions } from '../../src/app/services/QueueConversations/QueueConversations.interface';
import { QueueMessageStore } from '../../src/app/services/QueueConversations/QueueMessageStore';

const createMessage = (
  id: string,
  ownerExtensionId: string | undefined,
  overrides: Record<string, unknown> = {},
) =>
  ({
    id,
    conversationId: id,
    direction: 'Inbound',
    type: 'SMS',
    from: { phoneNumber: '+15550002222' },
    to: [{ phoneNumber: '+15550001111' }],
    owner: ownerExtensionId
      ? {
          extensionId: ownerExtensionId,
          name: `Queue ${ownerExtensionId}`,
        }
      : undefined,
    unreadCounts: 0,
    ...overrides,
  }) as unknown as Message;

const createQueueConversations = (options?: QueueConversationsOptions) => {
  const queues = new Map([
    [
      'q1',
      {
        id: 'q1',
        name: 'Zulu',
        extensionNumber: '1001',
      },
    ],
    [
      'q2',
      {
        id: 'q2',
        name: 'Alpha',
        extensionNumber: '1002',
      },
    ],
  ]);
  const grant = {
    grants: [
      {
        extension: { id: 'q1', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'q2', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'q3', type: 'Department' },
        callQueueSmsRecipient: false,
      },
    ],
    isCallQueueExtensionById: jest.fn((id: string) => id !== 'q3'),
  };
  const callQueues = {
    getQueue: jest.fn((id: string) => queues.get(id)),
  };
  const messages = [
    createMessage('conversation-1', 'q1', { unreadCounts: 1 }),
    createMessage('conversation-2', 'q2', {
      messageStatus: 'SendingFailed',
    }),
    createMessage('conversation-3', 'q3'),
    createMessage('conversation-4', undefined),
  ];
  const appFeatures = { hasReadTextPermission: true };
  const queueConversations = testBed({
    main: QueueConversations,
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'queue-conversations-test',
          type: 'Base',
        },
      },
      PortDetector,
      {
        provide: Initiator,
        useValue: {
          shouldActivate: false,
          beforeInitialize: jest.fn(),
        },
      },
      { provide: Toast, useValue: {} },
      {
        provide: Auth,
        useValue: { accessToken: 'token', loggedIn: true },
      },
      { provide: Client, useValue: {} },
      {
        provide: MessageSender,
        useValue: {
          events: { send: 'send' },
          on: jest.fn(),
        },
      },
      {
        provide: ExtensionInfo,
        useValue: { extensionNumber: '+15550001111' },
      },
      {
        provide: QueueMessageStore,
        useValue: { allConversations: messages, ready: true },
      },
      { provide: AppFeatures, useValue: appFeatures },
      { provide: RegionSettings, useValue: { ready: true } },
      { provide: Grant, useValue: grant },
      { provide: CallQueues, useValue: callQueues },
      ...(options
        ? [{ provide: 'QueueConversationsOptions', useValue: options }]
        : []),
    ],
  }).instance;
  queueConversations.currentPage = 3;
  queueConversations.inputContents = {
    'conversation-1': {
      conversationId: 'conversation-1',
      text: 'draft',
      attachments: [],
    },
  };
  Object.defineProperty(queueConversations, 'formattedConversations', {
    configurable: true,
    get: () => queueConversations.allConversations,
  });

  return {
    queueConversations,
    mocks: {
      callQueues,
      grant,
      appFeatures,
      messages,
    },
  };
};

describe('QueueConversations', () => {
  it('returns sorted SMS-recipient queues and filters stale conversations', () => {
    const { queueConversations, mocks } = createQueueConversations();

    expect(
      queueConversations.smsRecipientCallQueues.map(({ id }) => id),
    ).toEqual(['q2', 'q1']);
    expect(queueConversations.hasPermission).toBe(true);
    expect(queueConversations.allConversations.map(({ id }) => id)).toEqual([
      'conversation-1',
      'conversation-2',
    ]);
    expect(queueConversations.eligibleQueueIds).toEqual(new Set(['q2', 'q1']));

    mocks.appFeatures.hasReadTextPermission = false;
    expect(queueConversations.hasPermission).toBe(false);
  });

  it('disables permission and returns 0 unreadCount when enable option is false', () => {
    const { queueConversations } = createQueueConversations({ enable: false });

    expect(queueConversations.hasPermission).toBe(false);
    expect(queueConversations.unreadCount).toBe(0);
  });

  it('normalizes queue selections and resolves queue ownership', () => {
    const { queueConversations } = createQueueConversations();

    (queueConversations as any)._selectedCallQueueIds = ['q1', 'missing'];
    expect(queueConversations.selectedCallQueueIds).toEqual(['q1']);
    expect(queueConversations.selectedCallQueueId).toBe('q1');
    expect(
      queueConversations.getConversationQueueExtensionId('conversation-1'),
    ).toBe('q1');
    expect(queueConversations.getConversationQueue('conversation-1')).toEqual(
      expect.objectContaining({ id: 'q1' }),
    );

    (queueConversations as any)._selectedCallQueueIds = ['q1', 'q2'];
    expect(queueConversations.selectedCallQueueIds).toEqual([]);
    expect(queueConversations.selectedCallQueueId).toBeNull();
    expect(queueConversations.getConversationQueueExtensionId(undefined)).toBe(
      undefined,
    );
  });

  it.each([
    ['Unread', ['conversation-1']],
    ['Draft', ['conversation-1']],
    ['Failed', ['conversation-2']],
    ['All', ['conversation-1', 'conversation-2']],
  ] as const)('filters %s conversations', (filter, expectedIds) => {
    const { queueConversations } = createQueueConversations();
    (queueConversations as any).filter = filter;

    expect(
      queueConversations.filteredConversations.map(({ id }) => id),
    ).toEqual(expectedIds);
    expect(queueConversations.unreadCount).toBe(1);
  });

  it('applies queue selection before the status filter', () => {
    const { queueConversations } = createQueueConversations();
    (queueConversations as any)._selectedCallQueueIds = ['q2'];

    expect(
      queueConversations.filteredConversations.map(({ id }) => id),
    ).toEqual(['conversation-2']);
  });

  it('updates and resets the call queue search form', async () => {
    const { queueConversations } = createQueueConversations();

    await queueConversations.updateCallQueueSearchForm({
      searchInput: 'sales',
      filter: 'Unread',
      selectedCallQueueIds: ['q1', 'q1'],
    });

    expect(queueConversations.callQueueSearchForm).toEqual({
      searchInput: 'sales',
      filter: 'Unread',
      selectedCallQueueIds: ['q1'],
    });
    expect((queueConversations as any)._selectedCallQueueIds).toEqual(['q1']);
    expect((queueConversations as any).currentPage).toBe(1);

    await queueConversations.updateSelectedCallQueueId(ALL_CALL_QUEUES);
    expect(queueConversations.selectedCallQueueIds).toEqual([]);

    await queueConversations.updateSelectedCallQueueId('q2');
    expect(queueConversations.selectedCallQueueIds).toEqual(['q2']);

    await queueConversations.updateCallQueueSearchForm('reset');
    expect(queueConversations.callQueueSearchForm).toEqual({
      searchInput: '',
      filter: 'All',
      selectedCallQueueIds: [],
    });
  });
});
