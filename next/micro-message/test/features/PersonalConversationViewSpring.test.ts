import { conversationsStatus } from '../../src/app/services/Conversations/conversationsStatus';
import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';
import { PersonalConversationViewSpring } from '../../src/app/views/ConversationViewSpring/PersonalConversation.view';

const createAttachment = (name: string): Attachment =>
  ({
    name,
    size: 100,
    file: { name } as File,
  }) as Attachment;

const createPersonalConversationView = () => {
  const conversation = {
    id: 'conversation-1',
    conversationId: 'conversation-1',
    direction: 'Inbound',
    to: [{ phoneNumber: '+15550001111' }],
    from: { phoneNumber: '+15550002222' },
    correspondents: [{ phoneNumber: '+15550002222' }],
    correspondentMatchesList: [[]],
    self: { phoneNumber: '+15550001111' },
  };
  const conversations = {
    ready: true,
    currentConversationId: 'conversation-1',
    messageText: 'hello',
    attachments: [] as Attachment[],
    acceptFileTypes: ['image/png'],
    conversationStatus: {
      'conversation-1': conversationsStatus.idle,
      'conversation-2': conversationsStatus.pushing,
    },
    formattedConversationsMap: new Map([['conversation-1', conversation]]),
    getMessages: jest.fn(() => []),
    replyToReceivers: jest.fn().mockResolvedValue(undefined),
    updateMessageText: jest.fn(),
    addAttachments: jest.fn(),
    removeAttachment: jest.fn(),
  };
  const smsConversationsOptions = {
    checkDncStatusOfConversation: jest.fn(),
    autoLogTaskIfEnabled: jest.fn(),
    onDncVerifyBeforeReply: jest.fn().mockResolvedValue(true),
  };
  const router = {
    push: jest.fn().mockResolvedValue(undefined),
  };
  const syncTabView = {
    setActive: jest.fn(),
  };
  const composeText = {
    clean: jest.fn().mockResolvedValue(undefined),
    updateSenderNumber: jest.fn().mockResolvedValue(undefined),
    addToNumbers: jest.fn().mockResolvedValue(true),
  };
  const messageThread = {
    getLatestThreadIdByParties: jest.fn(),
  };
  const conversationAlert = {
    getAlertInfo: jest.fn(
      (
        _conversation?: unknown,
        _options?: { onReplyInSharedTab?: () => void },
      ) => ({
        showAlert: false,
        alertProps: undefined as
          | { children?: unknown; severity?: string }
          | undefined,
      }),
    ),
  };
  const conversationsViewSpring = {
    useConversationItemInfo: jest.fn(),
    useActionsHandler: jest.fn(),
    replyInSharedTab: jest.fn().mockResolvedValue(undefined),
  };
  const view = Object.assign(
    Object.create(PersonalConversationViewSpring.prototype),
    {
      logger: {
        error: jest.fn(),
      },
      _messageStore: {},
      _appFeatures: {
        hasSendMMSPermission: true,
      },
      _regionSettings: {
        ready: true,
      },
      _conversations: conversations,
      _composeText: composeText,
      _messageThread: messageThread,
      _rateLimiter: {
        ready: true,
        restricted: false,
      },
      _connectivityMonitor: {
        ready: true,
        connectivity: true,
      },
      _router: router,
      _integrationConfig: {
        createNewEntityTooltip: 'create',
      },
      _smsConversations: {
        checkIsSupportLog: jest.fn(() => true),
      },
      _conversationsViewSpring: conversationsViewSpring,
      _conversationAlert: conversationAlert,
      _smsConversationsOptions: smsConversationsOptions,
      _syncTabView: syncTabView,
    },
  ) as PersonalConversationViewSpring;

  return {
    view,
    conversation,
    mocks: {
      conversations,
      composeText,
      messageThread,
      conversationAlert,
      conversationsViewSpring,
      router,
      syncTabView,
      smsConversationsOptions,
    },
  };
};

describe('PersonalConversationViewSpring', () => {
  it('uses current conversation pushing state for sending props', () => {
    const { view, mocks } = createPersonalConversationView();

    expect(view.getUIProps({})).toEqual(
      expect.objectContaining({
        sendButtonDisabled: false,
        sending: false,
      }),
    );

    mocks.conversations.conversationStatus['conversation-1'] =
      conversationsStatus.pushing;
    expect(view.getUIProps({})).toEqual(
      expect.objectContaining({
        sendButtonDisabled: true,
        sending: true,
      }),
    );
  });

  it('passes attachments when replying and runs post-send side effects', async () => {
    const { view, mocks } = createPersonalConversationView();
    const attachment = createAttachment('reply.png');

    await view.getUIFunctions({}).replyToReceivers('hello', [attachment]);

    expect(mocks.conversations.replyToReceivers).toHaveBeenCalledWith('hello', [
      attachment,
    ]);
    expect(
      mocks.smsConversationsOptions.onDncVerifyBeforeReply,
    ).toHaveBeenCalledWith(
      [
        {
          phoneNumber: '+15550002222',
          freeSolo: true,
        },
      ],
      'conversation-1',
    );
    expect(
      mocks.smsConversationsOptions.checkDncStatusOfConversation,
    ).toHaveBeenCalledWith('conversation-1');
    expect(
      mocks.smsConversationsOptions.autoLogTaskIfEnabled,
    ).toHaveBeenCalledWith('conversation-1');
  });

  it('delegates historical direct company/site replies to the conversations view', async () => {
    const { view, mocks } = createPersonalConversationView();
    mocks.conversationAlert.getAlertInfo.mockImplementation(
      (
        _conversation: unknown,
        { onReplyInSharedTab }: { onReplyInSharedTab?: () => void } = {},
      ) => ({
        showAlert: true,
        alertProps: {
          children: {
            props: {
              phoneNumber: '(555) 000-1111',
              onReplyInSharedTab: onReplyInSharedTab!,
            },
          },
          severity: 'info',
        },
      }),
    );

    const props = view.getUIProps({});

    expect(mocks.conversationAlert.getAlertInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId: 'conversation-1',
      }),
      {
        onReplyInSharedTab: expect.any(Function),
      },
    );
    expect(props.showAlert).toBe(true);
    expect(props.alertProps).toEqual(
      expect.objectContaining({
        severity: 'info',
      }),
    );

    const alertContent = props.alertProps!.children as any;
    expect(alertContent.props.phoneNumber).toBe('(555) 000-1111');

    await alertContent.props.onReplyInSharedTab();

    expect(mocks.conversationsViewSpring.replyInSharedTab).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId: 'conversation-1',
      }),
    );
  });
});
