import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  CallQueues,
  Grant,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  Initiator,
  PortDetector,
  PortManager,
  RouterPlugin,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import { of, Subject, tap } from 'rxjs';

import { ConversationLogger } from '../../src/app/services/ConversationLogger';
import {
  ATTACHMENT_SIZE_LIMITATION,
  MessageSender,
} from '../../src/app/services/MessageSender';
import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';
import { MessageThread } from '../../src/app/services/MessageThread/MessageThread';
import { SmsOptOut } from '../../src/app/services/SmsOptOut';

const createMessageThread = () => {
  const post = jest.fn();
  const multipartPost = jest.fn();
  const client = {
    service: {
      platform: jest.fn(() => ({
        post,
      })),
    },
    multipart: {
      post: multipartPost,
    },
  } as unknown as jest.Mocked<Client>;

  const auth = {
    ownerId: 'owner-ext-1',
    accessToken: 'token-1',
    beforeLogout$: { subscribe: jest.fn() },
  } as unknown as jest.Mocked<Auth>;

  const appFeatures = {
    hasReadMessagesPermission: true,
    hasMessageThreadCallQueueSupported: true,
    hasMessageThreadSiteSupported: false,
    hasMessageThreadsPermission: true,
  } as unknown as jest.Mocked<AppFeatures>;

  const storage = {
    enable: jest.fn(),
  } as unknown as jest.Mocked<StoragePlugin>;

  const router = {
    currentPath: '/messages',
  } as unknown as jest.Mocked<RouterPlugin>;

  const callQueues = {
    getQueue: jest.fn((id: string) => {
      if (id === 'queue-1') {
        return { id: 'queue-1', name: 'Sales Queue' };
      }
      return null;
    }),
    dataReady$: of([]),
  } as unknown as jest.Mocked<CallQueues>;

  const grant = {
    grants: [
      {
        extension: { id: 'queue-1', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'queue-2', type: 'Department' },
        callQueueSmsRecipient: false,
      },
    ],
    hasCompanyExtensionGrant: false,
    isSharedSmsRecipientGrant: jest.fn((id: string) => id === 'site-1'),
    dataReady$: of([]),
  } as unknown as jest.Mocked<Grant>;

  const messageSender = {
    uniqueManager: {
      dismissAll: jest.fn().mockResolvedValue(undefined),
    },
    validateContent: jest.fn().mockReturnValue(true),
    _onSendError: jest.fn().mockResolvedValue(undefined),
    senderNumbersList: [],
    senderNumberMap: new Map(),
  } as unknown as jest.Mocked<MessageSender>;

  const portManager = {
    shared: true,
    onServer: jest.fn(),
  } as unknown as jest.Mocked<PortManager>;

  const smsOptOut = {
    attachOptOutHint: jest.fn((_threadId: string, text: string) => text),
    resetOptOut: jest.fn(),
  } as unknown as jest.Mocked<SmsOptOut>;

  const extensionInfo = {
    extensionNumber: '+15550001111',
  } as unknown as jest.Mocked<ExtensionInfo>;

  const contactMatcher = {
    addQuerySource: jest.fn(),
    dataMapping: {},
    triggerMatch: jest.fn(),
  } as unknown as jest.Mocked<ContactMatcher>;

  const conversationLogger = {
    loggingMap: {},
    dataMapping: {},
  } as unknown as jest.Mocked<ConversationLogger>;

  const initiator = {
    shouldActivate: false,
    beforeInitialize: jest.fn(),
  } as unknown as jest.Mocked<Initiator>;

  const toast = {
    success: jest.fn(),
    danger: jest.fn(),
  } as unknown as jest.Mocked<Toast>;

  const messageThread = testBed({
    main: MessageThread,
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'message-thread-test',
          type: 'Base',
        },
      },
      PortDetector,
      { provide: Toast, useValue: toast },
      { provide: Auth, useValue: auth },
      { provide: Client, useValue: client },
      { provide: AppFeatures, useValue: appFeatures },
      { provide: StoragePlugin, useValue: storage },
      { provide: RouterPlugin, useValue: router },
      { provide: CallQueues, useValue: callQueues },
      { provide: Grant, useValue: grant },
      { provide: MessageSender, useValue: messageSender },
      { provide: PortManager, useValue: portManager },
      { provide: 'MessageThreadOptions', useValue: { enable: true } },
      { provide: SmsOptOut, useValue: smsOptOut },
      { provide: ExtensionInfo, useValue: extensionInfo },
      { provide: ContactMatcher, useValue: contactMatcher },
      { provide: ConversationLogger, useValue: conversationLogger },
      { provide: Initiator, useValue: initiator },
    ],
  }).instance;
  const numberFormatter = {
    formatNumber: jest.fn((number: string) => number),
  };

  Object.defineProperty(messageThread, '_numberFormatter', {
    configurable: true,
    value: numberFormatter,
  });

  return {
    messageThread,
    mocks: {
      post,
      multipartPost,
      client,
      auth,
      appFeatures,
      storage,
      router,
      callQueues,
      grant,
      messageSender,
      portManager,
      smsOptOut,
      extensionInfo,
      contactMatcher,
      conversationLogger,
      initiator,
      toast,
      numberFormatter,
    },
  };
};

const createAttachment = (name: string, size = 100): Attachment =>
  ({
    name,
    size,
    file: { name } as File,
  }) as Attachment;

const prepareBasicThreadData = (messageThread: MessageThread) => {
  (messageThread as any).data = {
    threads: {
      t1: {
        threadId: 't1',
        unreadCount: 2,
        messages: ['m1'],
        threadInfo: {
          id: 't1',
          status: 'Open',
          availability: 'Alive',
          owner: { extensionId: 'queue-1' },
          ownerParty: { phoneNumber: '+15550001111' },
          guestParty: { phoneNumber: '+15550002222' },
          creationTime: '2026-01-01T00:00:00.000Z',
          lastModifiedTime: '2026-01-01T00:01:00.000Z',
        },
      },
    },
    messages: {
      m1: {
        id: 'm1',
        threadId: 't1',
        recordType: 'AliveMessage',
        text: 'hello',
        direction: 'Inbound',
        creationTime: '2026-01-01T00:00:00.000Z',
        lastModifiedTime: '2026-01-01T00:01:00.000Z',
      },
    },
    token: null,
    entriesToken: null,
  };
};

describe('MessageThread', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('computes queue permissions and unique numbers', () => {
    const { messageThread, mocks } = createMessageThread();
    prepareBasicThreadData(messageThread);

    expect(messageThread.smsRecipients).toEqual([
      { id: 'queue-1', name: 'Sales Queue' },
    ]);
    expect(messageThread.smsRecipients).toEqual([
      { id: 'queue-1', name: 'Sales Queue' },
    ]);
    expect(messageThread.hasPermission).toBe(true);
    expect(messageThread.uniqueNumbers).toEqual(['+15550002222']);
    expect(messageThread.conversationLogIds).toEqual(['t1']);

    mocks.appFeatures.hasReadMessagesPermission = false;
    expect(messageThread.hasPermission).toBe(false);
  });

  it('filters SMS recipient queues and sites by feature flag and grant types', () => {
    const { messageThread, mocks } = createMessageThread();
    mocks.grant.grants = [
      {
        extension: { id: 'queue-1', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'queue-2', type: 'Department' },
        smsRecipient: true,
      },
      {
        extension: {
          id: 'site-1',
          name: 'Site 1',
          type: 'Site',
          extensionNumber: '101',
          uri: 'http://site-1',
        },
        smsRecipient: true,
      },
      {
        extension: {
          id: 'company-1',
          name: 'Company',
          type: 'CompanyExtension',
          extensionNumber: '1000',
          uri: 'http://company-1',
        },
        smsRecipient: true,
      },
      {
        extension: { id: 'user-1', type: 'User' },
        smsRecipient: true,
      },
    ] as any;
    mocks.callQueues.getQueue.mockImplementation((id: string) => ({
      id,
      name: id,
    }));

    // When both call queue and site are supported
    mocks.appFeatures.hasMessageThreadCallQueueSupported = true;
    mocks.appFeatures.hasMessageThreadSiteSupported = true;
    expect(messageThread.smsRecipients).toEqual([
      { id: 'queue-1', name: 'queue-1' },
      { id: 'queue-2', name: 'queue-2' },
      {
        id: 'site-1',
        name: 'Site 1',
        extensionNumber: '101',
        extensionType: 'Site',
        uri: 'http://site-1',
      },
      {
        id: 'company-1',
        name: 'Company',
        extensionNumber: '1000',
        extensionType: 'CompanyExtension',
        uri: 'http://company-1',
      },
    ]);
    expect(messageThread.smsRecipients).toEqual(messageThread.smsRecipients);

    // When site is not supported
    mocks.appFeatures.hasMessageThreadSiteSupported = false;
    expect(messageThread.smsRecipients).toEqual([
      { id: 'queue-1', name: 'queue-1' },
      { id: 'queue-2', name: 'queue-2' },
    ]);

    // When call queue is not supported
    mocks.appFeatures.hasMessageThreadSiteSupported = true;
    mocks.appFeatures.hasMessageThreadCallQueueSupported = false;
    expect(messageThread.smsRecipients).toEqual([
      {
        id: 'site-1',
        name: 'Site 1',
        extensionNumber: '101',
        extensionType: 'Site',
        uri: 'http://site-1',
      },
      {
        id: 'company-1',
        name: 'Company',
        extensionNumber: '1000',
        extensionType: 'CompanyExtension',
        uri: 'http://company-1',
      },
    ]);

    // When neither is supported
    mocks.appFeatures.hasMessageThreadSiteSupported = false;
    expect(messageThread.smsRecipients).toEqual([]);
  });

  it('allows message thread permission through site support when no queue exists', () => {
    const { messageThread, mocks } = createMessageThread();
    mocks.grant.grants = [] as any;

    expect(messageThread.hasPermission).toBe(false);

    mocks.appFeatures.hasMessageThreadSiteSupported = true;
    (mocks.grant as any).hasCompanyExtensionGrant = true;
    (mocks.messageSender as any).senderNumbersList = [
      { phoneNumber: '+15550001111', usageType: 'MainCompanyNumber' },
    ];
    (mocks.messageSender as any).senderNumberMap = new Map([
      ['+15550001111', { usageType: 'MainCompanyNumber' }],
    ]);
    expect(messageThread.hasPermission).toBe(true);

    (mocks.grant as any).hasCompanyExtensionGrant = false;
    expect(messageThread.hasPermission).toBe(false);

    (mocks.grant as any).hasCompanyExtensionGrant = true;
    mocks.appFeatures.hasMessageThreadsPermission = false;
    expect(messageThread.hasPermission).toBe(false);
  });

  it('checks shared SMS sender number using formatted sender map', () => {
    const { messageThread, mocks } = createMessageThread();
    const formatNumber = jest.fn(() => '(650) 555-1111');
    Object.defineProperty(messageThread, '_numberFormatter', {
      configurable: true,
      value: {
        formatNumber,
      },
    });
    (mocks.messageSender as any).senderNumberMap = new Map([
      ['(650) 555-1111', { usageType: 'MainCompanyNumber' }],
    ]);
    (mocks.grant as any).hasCompanyExtensionGrant = true;

    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);

    mocks.appFeatures.hasMessageThreadSiteSupported = true;
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(true);

    (mocks.messageSender as any).senderNumberMap = new Map([
      ['(650) 555-1111', { usageType: 'CompanyNumber' }],
    ]);
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(true);

    (mocks.grant as any).hasCompanyExtensionGrant = false;
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);
    (mocks.grant as any).hasCompanyExtensionGrant = true;

    (mocks.messageSender as any).senderNumberMap = new Map([
      ['(650) 555-1111', { usageType: 'DirectNumber' }],
    ]);
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);

    (mocks.messageSender as any).senderNumberMap = new Map([
      [
        '(650) 555-1111',
        {
          extension: { id: 'site-1', type: 'Site' },
          usageType: 'DirectNumber',
        },
      ],
    ]);
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(true);

    mocks.appFeatures.hasMessageThreadSiteSupported = false;
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);
    mocks.appFeatures.hasMessageThreadSiteSupported = true;

    (mocks.messageSender as any).senderNumberMap = new Map([
      [
        '(650) 555-1111',
        {
          extension: { id: 'dept-1', type: 'Department' },
          usageType: 'DirectNumber',
        },
      ],
    ]);
    mocks.grant.isSharedSmsRecipientGrant = jest.fn(
      (id: string) => id === 'site-1' || id === 'dept-1',
    );
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(true);

    mocks.appFeatures.hasMessageThreadCallQueueSupported = false;
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);
    mocks.appFeatures.hasMessageThreadCallQueueSupported = true;

    (mocks.messageSender as any).senderNumberMap = new Map([
      [
        '(650) 555-1111',
        {
          extension: { id: 'direct-ext-1', type: 'User' },
          usageType: 'DirectNumber',
        },
      ],
    ]);
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);

    (mocks.messageSender as any).senderNumberMap = new Map();
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);

    formatNumber.mockReturnValue('');
    (mocks.messageSender as any).senderNumberMap = new Map([
      ['(650) 555-1111', { usageType: 'MainCompanyNumber' }],
    ]);
    expect(messageThread.isSharedSmsSenderNumber('+16505551111')).toBe(false);
  });

  it('converts timestamp and maps subject by record type', () => {
    const { messageThread } = createMessageThread();

    expect((messageThread as any).convertTimestamp(undefined)).toBeUndefined();
    expect((messageThread as any).convertTimestamp('bad-date')).toBeUndefined();
    expect(
      (messageThread as any).convertTimestamp('2026-01-01T00:00:00.000Z'),
    ).toBe(1767225600000);

    expect(
      (messageThread as any).getSubjectByRecordType({
        recordType: 'AliveMessage',
        text: 'sms text',
      }),
    ).toBe('sms text');

    expect(
      (messageThread as any).getSubjectByRecordType({
        recordType: 'ThreadResolvedHint',
      }),
    ).not.toBe('');
    expect(
      (messageThread as any).getSubjectByRecordType({
        recordType: 'ThreadAssignedHint',
        assignee: {
          extensionId: 'owner-ext-1',
          name: 'Me',
        },
      }),
    ).not.toBe('');
    expect(
      (messageThread as any).getSubjectByRecordType({
        recordType: 'ThreadAssignedHint',
        previousAssignee: {
          extensionId: 'other',
          name: 'Other',
        },
      }),
    ).not.toBe('');
  });

  it('converts thread records to message shape with correct from/to', () => {
    const { messageThread } = createMessageThread();
    prepareBasicThreadData(messageThread);

    const inbound = (messageThread as any).convertThreadRecordToMessage({
      id: 'm1',
      threadId: 't1',
      recordType: 'AliveMessage',
      text: 'inbound',
      direction: 'Inbound',
      creationTime: '2026-01-01T00:00:00.000Z',
      lastModifiedTime: '2026-01-01T00:00:01.000Z',
    });
    expect(inbound.from.phoneNumber).toBe('+15550002222');
    expect(inbound.to[0].phoneNumber).toBe('+15550001111');

    const outbound = (messageThread as any).convertThreadRecordToMessage({
      id: 'm2',
      threadId: 't1',
      recordType: 'AliveMessage',
      text: 'outbound',
      direction: 'Outbound',
      creationTime: '2026-01-01T00:00:00.000Z',
      lastModifiedTime: '2026-01-01T00:00:01.000Z',
    });
    expect(outbound.from.phoneNumber).toBe('+15550001111');
    expect(outbound.to[0].phoneNumber).toBe('+15550002222');

    const withAttachment = (messageThread as any).convertThreadRecordToMessage({
      id: 'm3',
      threadId: 't1',
      recordType: 'AliveMessage',
      text: 'image',
      direction: 'Inbound',
      creationTime: '2026-01-01T00:00:00.000Z',
      lastModifiedTime: '2026-01-01T00:00:01.000Z',
      attachments: [
        {
          id: '123',
          contentUri: '/content/123',
          contentType: 'image/png',
          filename: 'photo.png',
          size: 321,
          width: 640,
          height: 480,
        },
      ],
    });
    expect(withAttachment.mmsAttachments).toEqual([
      {
        id: 123,
        uri: '/content/123?access_token=token-1&shouldCache=true',
        contentType: 'image/png',
        fileName: 'photo.png',
        size: 321,
        width: 640,
        height: 480,
      },
    ]);
  });

  it('builds grouped threads map with anchors for resolved history threads', () => {
    const { messageThread } = createMessageThread();
    (messageThread as any).data = {
      threads: {
        't-resolved': {
          threadId: 't-resolved',
          unreadCount: 1,
          messages: ['m-resolved'],
          threadInfo: {
            id: 't-resolved',
            status: 'Resolved',
            statusReason: 'Manual',
            availability: 'Alive',
            owner: { extensionId: 'queue-1' },
            ownerParty: { phoneNumber: '+15550001111' },
            guestParty: { phoneNumber: '+15550002222' },
            creationTime: '2026-01-01T00:00:00.000Z',
            lastModifiedTime: '2026-01-01T00:01:00.000Z',
          },
        },
      },
      messages: {
        'm-resolved': {
          id: 'm-resolved',
          threadId: 't-resolved',
          recordType: 'AliveMessage',
          text: 'history message',
          direction: 'Inbound',
          creationTime: '2026-01-01T00:00:00.000Z',
          lastModifiedTime: '2026-01-01T00:01:00.000Z',
        },
      },
      token: null,
      entriesToken: null,
    };

    const grouped = messageThread.groupedThreadsMap;
    const group = Array.from(grouped.values())[0];

    expect(group.threadRecords.map((r) => r.recordType)).toEqual([
      'ThreadCreatedHint',
      'AliveMessage',
      'ThreadResolvedHint',
    ]);
    expect(group.messages).toHaveLength(3);
  });

  it('retrieves thread messages/group and unread count helpers', () => {
    const { messageThread } = createMessageThread();
    prepareBasicThreadData(messageThread);

    expect(messageThread.isThreadId('t1')).toBe(true);
    expect(messageThread.threadUnreadCount).toBe(2);
    expect(messageThread.getThreadGroup('t1')).toBeDefined();
    expect(messageThread.getThreadMessages('t1')).toHaveLength(1);
    expect(
      messageThread.getThreadLogMessages('t1').map(({ id }) => id),
    ).toEqual(['m1']);
    expect(messageThread.getThreadMessages('missing')).toEqual([]);

    const getThreadMessagesSpy = jest
      .spyOn(messageThread, 'getThreadMessages')
      .mockReturnValue(undefined as any);

    expect(messageThread.getThreadLogMessages('missing')).toEqual([]);

    getThreadMessagesSpy.mockRestore();
  });

  it('finds the latest thread id by owner and guest phone numbers', () => {
    const { messageThread } = createMessageThread();
    (messageThread as any).data = {
      threads: {
        't-old': {
          threadId: 't-old',
          messages: [],
          threadInfo: {
            id: 't-old',
            status: 'Open',
            availability: 'Alive',
            owner: { extensionId: 'queue-1' },
            ownerParty: { phoneNumber: '+15550001111' },
            guestParty: { phoneNumber: '+15550002222' },
            creationTime: '2026-01-01T00:00:00.000Z',
            lastModifiedTime: '2026-01-01T00:01:00.000Z',
          },
        },
        't-latest': {
          threadId: 't-latest',
          messages: [],
          threadInfo: {
            id: 't-latest',
            status: 'Open',
            availability: 'Alive',
            owner: { extensionId: 'queue-1' },
            ownerParty: { phoneNumber: '+15550001111' },
            guestParty: { phoneNumber: '+15550002222' },
            creationTime: '2026-01-01T00:02:00.000Z',
            lastModifiedTime: '2026-01-01T00:03:00.000Z',
          },
        },
        't-other': {
          threadId: 't-other',
          messages: [],
          threadInfo: {
            id: 't-other',
            status: 'Open',
            availability: 'Alive',
            owner: { extensionId: 'queue-1' },
            ownerParty: { phoneNumber: '+15550001111' },
            guestParty: { phoneNumber: '+15550003333' },
            creationTime: '2026-01-01T00:04:00.000Z',
            lastModifiedTime: '2026-01-01T00:05:00.000Z',
          },
        },
      },
      messages: {},
      token: null,
      entriesToken: null,
    };

    expect(
      messageThread.getLatestThreadIdByParties('+15550001111', '+15550002222'),
    ).toBe('t-latest');
    expect(
      messageThread.getLatestThreadByParties('+15550001111', '+15550002222')
        ?.threadId,
    ).toBe('t-latest');
    expect(
      messageThread.getLatestThreadIdByParties('+15550001111', '+15550003333'),
    ).toBe('t-other');
    expect(
      messageThread.getLatestThreadIdByParties('+15550001111', '+15550004444'),
    ).toBeUndefined();
  });

  it('builds thread conversations with latest message attachments', () => {
    const { messageThread } = createMessageThread();
    prepareBasicThreadData(messageThread);
    (messageThread as any).data.messages.m1.attachments = [
      {
        id: '456',
        contentUri: '/content/456',
        contentType: 'image/jpeg',
        filename: 'latest.jpg',
        size: 123,
      },
    ];

    const conversation = messageThread.threadConversationsInfo.conversations[0];

    expect(conversation.mmsAttachments).toEqual([
      {
        id: 456,
        uri: '/content/456?access_token=token-1&shouldCache=true',
        contentType: 'image/jpeg',
        fileName: 'latest.jpg',
        size: 123,
        width: undefined,
        height: undefined,
      },
    ]);
  });

  it('uses logged associations as thread conversation matches', () => {
    const { messageThread, mocks } = createMessageThread();
    prepareBasicThreadData(messageThread);
    const phoneMatch = {
      id: 'phone-match',
      name: 'Phone Match',
      type: 'contacts',
    };
    const loggedAssociation = {
      id: 'logged-association',
      name: 'Logged Association',
      type: 'contacts',
    };
    mocks.contactMatcher.dataMapping = {
      '+15550002222': [phoneMatch],
    } as never;
    mocks.conversationLogger.dataMapping = {
      t1: [loggedAssociation],
    } as never;

    const conversation = messageThread.threadConversationsInfo.conversations[0];

    expect(conversation.conversationMatches).toEqual([loggedAssociation]);
    expect(conversation.correspondentMatches).toEqual([phoneMatch]);
  });

  it('adds, replaces, removes, limits and resets attachments by conversation', async () => {
    const { messageThread, mocks } = createMessageThread();
    prepareBasicThreadData(messageThread);
    const first = createAttachment('first.png');
    const firstReplacement = createAttachment('first.png', 200);
    const second = createAttachment('second.png');

    await messageThread.addAttachments('t1', [first]);
    await messageThread.addAttachments('t1', [firstReplacement, second]);
    expect(messageThread.getAttachments('t1')).toEqual([
      firstReplacement,
      second,
    ]);

    await messageThread.removeAttachment('t1', firstReplacement);
    expect(messageThread.getAttachments('t1')).toEqual([second]);

    await messageThread.addAttachments(
      't1',
      Array.from({ length: 10 }, (_, index) =>
        createAttachment(`extra-${index}.png`),
      ),
    );
    expect(mocks.toast.danger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
    expect(messageThread.getAttachments('t1')).toEqual([second]);

    await messageThread.addAttachments('t1', [
      createAttachment('large.png', ATTACHMENT_SIZE_LIMITATION),
    ]);
    expect(mocks.toast.danger).toHaveBeenCalledTimes(2);
    expect(messageThread.getAttachments('t1')).toEqual([second]);

    messageThread.resetAttachments('t1');
    expect(messageThread.getAttachments('t1')).toEqual([]);
  });

  it('sends thread message with validation, opt-out and reopen flow', async () => {
    const { messageThread, mocks } = createMessageThread();
    prepareBasicThreadData(messageThread);
    const attachment = createAttachment('photo.png');
    await messageThread.addAttachments('t1', [attachment]);
    const sendSpy = jest
      .spyOn(messageThread as any, '_sendThreadMessage')
      .mockResolvedValue({ id: 'sent-1' });
    const toastSpy = jest.spyOn(messageThread, 'showAssignedToYouToast');
    mocks.smsOptOut.attachOptOutHint.mockReturnValue('hello [optout]');

    await messageThread.sendThreadMessage('t1', 'hello', true, [attachment]);

    expect(mocks.messageSender.validateContent).toHaveBeenCalledWith(
      'hello [optout]',
      [attachment],
      false,
    );
    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        threadId: null,
        text: 'hello [optout]',
        attachments: [attachment],
      }),
    );
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(mocks.smsOptOut.resetOptOut).toHaveBeenCalledWith('t1');
    expect(messageThread.getAttachments('t1')).toEqual([]);
  });

  it('sends a new thread message with explicit parties', async () => {
    const { messageThread, mocks } = createMessageThread();
    const attachment = createAttachment('new-thread.png');
    const sendSpy = jest
      .spyOn(messageThread as any, '_sendThreadMessage')
      .mockResolvedValue({ id: 'sent-1' });

    await messageThread.sendNewThreadMessage({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222', '+15550003333'],
      text: 'hello',
      attachments: [attachment],
    });

    expect(mocks.messageSender.validateContent).toHaveBeenCalledWith(
      'hello',
      [attachment],
      false,
    );
    expect(sendSpy).toHaveBeenCalledWith({
      threadId: null,
      text: 'hello',
      from: { phoneNumber: '+15550001111' },
      to: [{ phoneNumber: '+15550002222' }, { phoneNumber: '+15550003333' }],
      attachments: [attachment],
    });
  });

  it('assigns and reuses an existing open thread when sending from compose', async () => {
    const { messageThread } = createMessageThread();
    prepareBasicThreadData(messageThread);
    (messageThread as any).data.threads.t1.threadInfo.assignee = {
      extensionId: 'another-owner',
    };
    const assignSpy = jest
      .spyOn(messageThread, 'assignThread')
      .mockResolvedValue(undefined);
    const sendSpy = jest
      .spyOn(messageThread as any, '_sendThreadMessage')
      .mockResolvedValue({ id: 'sent-1' });

    await messageThread.sendNewThreadMessage({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
    });

    expect(assignSpy).toHaveBeenCalledWith('t1', 'owner-ext-1');
    expect(assignSpy.mock.invocationCallOrder[0]).toBeLessThan(
      sendSpy.mock.invocationCallOrder[0],
    );
    expect(sendSpy).toHaveBeenCalledWith({
      threadId: 't1',
      text: 'hello',
      from: { phoneNumber: '+15550001111' },
      to: [{ phoneNumber: '+15550002222' }],
      attachments: [],
    });
  });

  it('creates a new thread when the matching thread is resolved', async () => {
    const { messageThread } = createMessageThread();
    prepareBasicThreadData(messageThread);
    (messageThread as any).data.threads.t1.threadInfo.status = 'Resolved';
    const assignSpy = jest.spyOn(messageThread, 'assignThread');
    const sendSpy = jest
      .spyOn(messageThread as any, '_sendThreadMessage')
      .mockResolvedValue({ id: 'sent-1' });

    await messageThread.sendNewThreadMessage({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
    });

    expect(assignSpy).not.toHaveBeenCalled();
    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        threadId: null,
      }),
    );
  });

  it('does not send when validation fails and handles missing thread info errors', async () => {
    const { messageThread, mocks } = createMessageThread();
    prepareBasicThreadData(messageThread);
    const sendSpy = jest.spyOn(messageThread as any, '_sendThreadMessage');
    mocks.messageSender.validateContent.mockReturnValue(false);

    await messageThread.sendThreadMessage('t1', 'bad content');
    expect(sendSpy).not.toHaveBeenCalled();

    (messageThread as any).data.threads.t1.threadInfo.ownerParty = {};
    await messageThread.sendThreadMessage('t1', 'err');
    expect(mocks.messageSender._onSendError).toHaveBeenCalled();
  });

  it('posts send message body with or without threadId and waits sync done', async () => {
    const { messageThread, mocks } = createMessageThread();
    mocks.post.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: 'sent-1' }),
    } as any);
    const waitSpy = jest
      .spyOn(messageThread as any, 'emitUpdateAndWaitSyncDone')
      .mockResolvedValue(undefined);
    const loadingSpy = jest.spyOn(messageThread as any, 'setThreadLoading');

    await (messageThread as any)._sendThreadMessage({
      threadId: 't1',
      text: 'hello',
      from: { phoneNumber: '+15550001111' },
      to: [{ phoneNumber: '+15550002222' }],
    });
    expect(mocks.post).toHaveBeenLastCalledWith(
      '/restapi/v1.0/account/~/message-threads/messages',
      {
        threadId: 't1',
        from: { phoneNumber: '+15550001111' },
        to: [{ phoneNumber: '+15550002222' }],
        text: 'hello',
      },
    );
    expect(loadingSpy).toHaveBeenCalledWith('t1', true);
    expect(loadingSpy).toHaveBeenCalledWith('t1', false);

    await (messageThread as any)._sendThreadMessage({
      threadId: null,
      text: 'hello2',
      from: { phoneNumber: '+15550001111' },
      to: [{ phoneNumber: '+15550002222' }],
    });
    expect(mocks.post).toHaveBeenLastCalledWith(
      '/restapi/v1.0/account/~/message-threads/messages',
      {
        from: { phoneNumber: '+15550001111' },
        to: [{ phoneNumber: '+15550002222' }],
        text: 'hello2',
      },
    );
    expect(waitSpy).toHaveBeenCalledTimes(2);
  });

  it('posts multipart thread message when attachments exist', async () => {
    const { messageThread, mocks } = createMessageThread();
    const attachment = createAttachment('thread.png');
    mocks.multipartPost.mockResolvedValue({ id: 'sent-attachment' });
    const waitSpy = jest
      .spyOn(messageThread as any, 'emitUpdateAndWaitSyncDone')
      .mockResolvedValue(undefined);

    await expect(
      (messageThread as any)._sendThreadMessage({
        threadId: 't1',
        text: 'hello',
        from: { phoneNumber: '+15550001111' },
        to: [{ phoneNumber: '+15550002222' }],
        attachments: [attachment],
      }),
    ).resolves.toEqual({ id: 'sent-attachment' });

    expect(mocks.post).not.toHaveBeenCalled();
    expect(mocks.multipartPost).toHaveBeenCalledWith(
      '/restapi/v1.0/account/~/message-threads/messages',
      {
        fields: {
          metadata: {
            threadId: 't1',
            from: { phoneNumber: '+15550001111' },
            to: [{ phoneNumber: '+15550002222' }],
            text: 'hello',
          },
        },
        files: {
          attachments: [attachment.file],
        },
      },
    );
    expect(waitSpy).toHaveBeenCalledTimes(1);
  });

  it('shows assigned toast via toast service', () => {
    const { messageThread, mocks } = createMessageThread();

    messageThread.showAssignedToYouToast();

    expect(mocks.toast.success).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });

  it('filters out foreign threads and does not count them in threadUnreadCount', () => {
    const { messageThread } = createMessageThread();

    // queue-1 is eligible recipient from grant mock
    expect(messageThread.smsRecipientExtensionIds).toContain('queue-1');

    // Sync a valid thread and a foreign thread
    (messageThread as any).syncThreadSuccess({
      records: [
        {
          id: 'valid-thread',
          status: 'Open',
          owner: { extensionId: 'queue-1' },
          ownerParty: { phoneNumber: '+15551111111' },
          guestParty: { phoneNumber: '+15552222222' },
        },
        {
          id: 'foreign-thread',
          status: 'Open',
          owner: { extensionId: 'foreign-queue' },
          ownerParty: { phoneNumber: '+15553333333' },
          guestParty: { phoneNumber: '+15554444444' },
        },
        {
          id: 'unknown-owner-thread',
          status: 'Open',
          ownerParty: { phoneNumber: '+15555555555' },
          guestParty: { phoneNumber: '+15556666666' },
        },
      ],
    });

    expect(messageThread.getThread('valid-thread')).toBeDefined();
    expect(messageThread.getThread('foreign-thread')).toBeDefined();
    expect(messageThread.getThread('unknown-owner-thread')).toBeDefined();

    const validHashId = (messageThread as any).getConversationHashId(
      'valid-thread',
    );
    const foreignHashId = (messageThread as any).getConversationHashId(
      'foreign-thread',
    );
    expect(messageThread.groupedThreadsMap.has(validHashId)).toBe(true);
    expect(messageThread.groupedThreadsMap.has(foreignHashId)).toBe(false);

    // Sync entries for valid thread
    (messageThread as any).syncEntriesSuccess({
      records: [
        {
          id: 'msg-1',
          threadId: 'valid-thread',
          recordType: 'AliveMessage',
          direction: 'Inbound',
          author: { extensionId: 'external' },
          lastModifiedTime: new Date().toISOString(),
        },
      ],
    });

    expect(messageThread.data.threads['valid-thread'].unreadCount).toBe(1);
    expect(messageThread.threadUnreadCount).toBe(1);
    expect(
      messageThread.threadConversationsInfo.conversations.find(
        (c) => c.conversationId === 'valid-thread',
      ),
    ).toBeDefined();
    expect(
      messageThread.threadConversationsInfo.conversations.find(
        (c) => c.conversationId === 'foreign-thread',
      ),
    ).toBeUndefined();
    expect(
      messageThread.threadConversationsInfo.conversations.find(
        (c) => c.conversationId === 'unknown-owner-thread',
      ),
    ).toBeUndefined();

    // When a live message arrives for an unknown thread before thread metadata arrives,
    // a stub thread is temporarily created by syncEntriesSuccess
    (messageThread as any).syncEntriesSuccess(
      {
        records: [
          {
            id: 'foreign-msg',
            threadId: 'foreign-stub',
            recordType: 'AliveMessage',
            direction: 'Inbound',
            author: { extensionId: 'external' },
            lastModifiedTime: new Date().toISOString(),
          },
        ],
      },
      true,
    );
    expect(messageThread.data.threads['foreign-stub']).toBeDefined();

    // When syncThreadSuccess encounters the foreign thread metadata, foreign thread is not counted in threadUnreadCount
    (messageThread as any).syncThreadSuccess({
      records: [
        {
          id: 'foreign-stub',
          status: 'Open',
          owner: { extensionId: 'foreign-queue' },
        },
      ],
    });
    expect(messageThread.data.threads['foreign-stub']).toBeDefined();
    expect(messageThread.threadUnreadCount).toBe(1);
    expect(
      messageThread.threadConversationsInfo.conversations.find(
        (c) => c.conversationId === 'foreign-stub',
      ),
    ).toBeUndefined();
  });

  it('passes ownerExtensionIds to listThreads and listThreadMessages in _loadInitialHistory', async () => {
    const { messageThread, mocks } = createMessageThread();

    const listThreadsSpy = jest
      .spyOn(messageThread, 'listThreads')
      .mockResolvedValue({
        records: [],
        paging: { page: 1, perPage: 100, totalPages: 1, totalElements: 0 },
      });

    await (messageThread as any)._loadInitialHistory();

    expect(listThreadsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerExtensionIds: ['queue-1'],
      }),
    );
  });

  it('waits for grant and callQueues dataReady$ before evaluating smsRecipientExtensionIds', async () => {
    const { messageThread, mocks } = createMessageThread();

    let grantReadyResolved = false;
    const grantReadySubject = new Subject<any>();

    mocks.grant.dataReady$ = grantReadySubject.pipe(
      tap(() => {
        grantReadyResolved = true;
      }),
    ) as any;

    const listThreadsSpy = jest
      .spyOn(messageThread, 'listThreads')
      .mockResolvedValue({
        records: [],
        paging: { page: 1, perPage: 100, totalPages: 1, totalElements: 0 },
      });

    const loadPromise = (messageThread as any)._loadInitialHistory();

    // Not yet called because grant dataReady$ has not emitted
    expect(listThreadsSpy).not.toHaveBeenCalled();
    expect(grantReadyResolved).toBe(false);

    // Emit grant dataReady$
    grantReadySubject.next([]);

    await loadPromise;

    expect(grantReadyResolved).toBe(true);
    expect(listThreadsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerExtensionIds: ['queue-1'],
      }),
    );
  });
});
