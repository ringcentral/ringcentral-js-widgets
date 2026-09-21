import { trackEvent } from '@ringcentral-integration/micro-auth/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { conversationsStatus } from '../../src/app/services/Conversations/conversationsStatus';
import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';
import { QueueConversationView } from '../../src/app/views/ConversationViewSpring/QueueConversation.view';

jest.mock('@ringcentral-integration/micro-auth/src/app/services', () => {
  const actual = jest.requireActual(
    '@ringcentral-integration/micro-auth/src/app/services',
  );
  return {
    ...actual,
    trackEvent: jest.fn(),
  };
});

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

jest.mock('@ringcentral-integration/micro-core/src/app/components', () => {
  const React = require('react');

  return {
    AppHeaderNav: ({ children }: { children: React.ReactNode }) =>
      React.createElement('header', null, children),
  };
});

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => {
  const actual = jest.requireActual(
    '@ringcentral-integration/micro-core/src/app/hooks',
  );
  return {
    ...actual,
    useLocale: () => ({
      t: (key: string) => key,
    }),
  };
});

jest.mock('@ringcentral-integration/next-widgets/components', () => {
  const React = require('react');

  return {
    PageHeader: ({ onBackClick }: { onBackClick: () => void }) =>
      React.createElement(
        'button',
        {
          type: 'button',
          'data-sign': 'conversationNoAccessBack',
          onClick: onBackClick,
        },
        'back',
      ),
  };
});

jest.mock('@ringcentral-integration/micro-core/src/app/views', () => {
  const actual = jest.requireActual(
    '@ringcentral-integration/micro-core/src/app/views',
  );
  return {
    ...actual,
    slideOutViewTransition: jest.fn((callback: () => void) => callback()),
  };
});

const createAttachment = (name: string): Attachment =>
  ({
    name,
    size: 100,
    file: { name } as File,
  }) as Attachment;

const createQueueConversationView = () => {
  const conversation = {
    id: 'conversation-1',
    conversationId: 'conversation-1',
    direction: 'Inbound',
    to: [{ phoneNumber: '+15550001111' }],
    from: { phoneNumber: '+15550002222' },
    correspondents: [{ phoneNumber: '+15550002222' }],
    correspondentMatchesList: [[]],
    self: { phoneNumber: '+15550001111' },
    owner: {
      extensionId: 'queue-1',
      phoneNumber: '+15550001111',
    },
  };
  const attachments = [createAttachment('draft.png')];
  const queueConversations = {
    ready: true,
    currentConversationId: 'conversation-1',
    messageText: 'hello',
    attachments,
    conversationStatus: {
      'conversation-1': conversationsStatus.idle,
    },
    formattedConversationsMap: new Map([['conversation-1', conversation]]),
    getMessages: jest.fn(() => [
      { id: 'message-2', creationTime: 2 },
      { id: 'message-1', creationTime: 1 },
      { id: 'message-unknown' },
    ]),
    replyToReceivers: jest.fn().mockResolvedValue(undefined),
    updateMessageText: jest.fn().mockResolvedValue(true),
    addAttachments: jest.fn(),
    _loadConversation: jest.fn(),
    loadConversation: jest.fn(),
    removeAttachment: jest.fn(),
    unloadConversation: jest.fn(),
  };
  const smsConversationsOptions = {
    checkDncStatusOfConversation: jest.fn(),
    autoLogTaskIfEnabled: jest.fn(),
    onDncVerifyBeforeReply: jest.fn().mockResolvedValue(true),
    dncEntityTypes: ['Contact'],
  };
  const router = {
    push: jest.fn().mockResolvedValue(undefined),
    useParams: jest.fn((callback) =>
      callback({ conversationId: 'conversation-1' }),
    ),
  };
  const conversationAlert = {
    getAlertInfo: jest.fn(() => ({
      showAlert: false,
      alertProps: undefined,
    })),
  };
  const conversationsViewSpring = {
    useConversationItemInfo: jest.fn(),
    useActionsHandler: jest.fn(),
    replyInSharedTab: jest.fn().mockResolvedValue(undefined),
  };
  const smsConsent = {
    loadConversationConsentData: jest.fn(),
  };
  const queueMessageStore = {
    readMessages: jest.fn(),
  };
  const Panel = (props: any) =>
    React.createElement('div', {
      'data-sign': 'queueConversationPanel',
      'data-conversation-id': props.conversation.conversationId,
      'data-message-count': props.messages.length,
    });
  const view = Object.assign(Object.create(QueueConversationView.prototype), {
    logger: {
      error: jest.fn(),
    },
    _appFeatures: {
      hasSendMMSPermission: true,
    },
    _regionSettings: {
      ready: true,
    },
    _queueConversations: queueConversations,
    _queueMessageStore: queueMessageStore,
    _portManager: {
      shared: true,
      isMainTab: true,
    },
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
    _conversationViewOptions: {
      component: Panel,
    },
    _smsConsent: smsConsent,
    _smsConversationsOptions: smsConversationsOptions,
    _smsTemplateView: {
      component: () => null,
    },
  }) as QueueConversationView;
  Object.defineProperty(view, '_theme', {
    configurable: true,
    value: {
      reducedMotion: true,
    },
  });

  return {
    view,
    conversation,
    mocks: {
      queueConversations,
      conversationAlert,
      conversationsViewSpring,
      router,
      queueMessageStore,
      smsConsent,
      smsConversationsOptions,
    },
  };
};

describe('QueueConversationView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds conversation props and sorts messages', () => {
    const { view, mocks } = createQueueConversationView();

    expect(view.getUIProps({})).toEqual(
      expect.objectContaining({
        acceptFileTypes: expect.any(String),
        attachments: [expect.objectContaining({ name: 'draft.png' })],
        displayLogStatus: true,
        messageText: 'hello',
        sendButtonDisabled: false,
        sending: false,
        supportAttachment: true,
      }),
    );
    expect(view.messages.map(({ id }) => id)).toEqual([
      'message-1',
      'message-2',
      'message-unknown',
    ]);

    mocks.queueConversations.currentConversationId = '';
    expect(view.messages).toEqual([]);
  });

  it('disables sending for pushing, restricted, empty, and loading states', () => {
    const { view, mocks } = createQueueConversationView();

    mocks.queueConversations.conversationStatus['conversation-1'] =
      conversationsStatus.pushing;
    expect(view.getUIProps({}).sendButtonDisabled).toBe(true);

    mocks.queueConversations.conversationStatus['conversation-1'] =
      conversationsStatus.idle;
    mocks.queueConversations.messageText = '';
    mocks.queueConversations.attachments = [];
    expect(view.getUIProps({}).sendButtonDisabled).toBe(true);

    (view as any)._contactMatcher = { ready: false };
    expect(view.getUIProps({}).sendButtonDisabled).toBe(true);
  });

  it('replies after DNC validation and runs post-send callbacks', async () => {
    const { view, mocks } = createQueueConversationView();
    const attachment = createAttachment('reply.png');

    await view.getUIFunctions({}).replyToReceivers('hello', [attachment]);

    expect(
      mocks.smsConversationsOptions.onDncVerifyBeforeReply,
    ).toHaveBeenCalledWith([
      {
        freeSolo: true,
        phoneNumber: '+15550002222',
      },
    ]);
    expect(mocks.queueConversations.replyToReceivers).toHaveBeenCalledWith(
      'hello',
      [attachment],
    );
    expect(
      mocks.smsConversationsOptions.checkDncStatusOfConversation,
    ).toHaveBeenCalledWith('conversation-1');
    expect(
      mocks.smsConversationsOptions.autoLogTaskIfEnabled,
    ).toHaveBeenCalledWith('conversation-1');
  });

  it('stops a reply without a conversation or after DNC rejection', async () => {
    const { view, mocks } = createQueueConversationView();
    const reply = view.getUIFunctions({}).replyToReceivers;

    mocks.queueConversations.currentConversationId = '';
    await reply('hello', []);
    expect(mocks.queueConversations.replyToReceivers).not.toHaveBeenCalled();

    mocks.queueConversations.currentConversationId = 'conversation-1';
    mocks.smsConversationsOptions.onDncVerifyBeforeReply.mockResolvedValue(
      false,
    );
    await reply('hello', []);
    expect(mocks.queueConversations.replyToReceivers).not.toHaveBeenCalled();
  });

  it('delegates input, attachment, link, and navigation actions', async () => {
    const { view, mocks } = createQueueConversationView();
    const functions = view.getUIFunctions({});
    const attachment = createAttachment('photo.png');

    await expect(functions.updateMessageText('updated')).resolves.toBe(true);
    functions.addAttachments([attachment]);
    functions.removeAttachment(attachment);
    functions.onLinkClick('mailto:support@example.com');
    functions.onLinkClick('https://example.com');
    await functions.goBack();

    expect(mocks.queueConversations.updateMessageText).toHaveBeenCalledWith(
      'updated',
    );
    expect(mocks.queueConversations.addAttachments).toHaveBeenCalledWith([
      attachment,
    ]);
    expect(mocks.queueConversations.removeAttachment).toHaveBeenCalledWith(
      attachment,
    );
    expect(trackEvent).toHaveBeenCalledTimes(2);
    expect(slideOutViewTransition).toHaveBeenCalledWith(
      expect.any(Function),
      true,
    );
    expect(mocks.router.push).toHaveBeenCalledWith('/messages');
  });

  it('logs reply failures without rejecting the UI action', async () => {
    const { view, mocks } = createQueueConversationView();
    const error = new Error('reply failed');
    mocks.queueConversations.replyToReceivers.mockRejectedValue(error);

    await expect(
      view.getUIFunctions({}).replyToReceivers('hello', []),
    ).resolves.toBeUndefined();

    expect((view as any).logger.error).toHaveBeenCalledWith(
      '[SMS] auto-log failed',
      error,
    );
  });

  it('loads, renders, reads, and unloads a queue conversation in the main tab', () => {
    const { view, mocks } = createQueueConversationView();
    const Component = view.component.bind(view);
    const rendered = render(React.createElement(Component, {}));

    expect(mocks.router.useParams).toHaveBeenCalledTimes(1);
    expect(mocks.queueConversations._loadConversation).toHaveBeenCalledWith(
      'conversation-1',
    );
    expect(mocks.queueConversations.loadConversation).toHaveBeenCalledWith(
      'conversation-1',
    );
    expect(mocks.smsConsent.loadConversationConsentData).toHaveBeenCalledWith(
      expect.objectContaining({ conversationId: 'conversation-1' }),
    );
    expect(mocks.queueMessageStore.readMessages).toHaveBeenCalledWith(
      'conversation-1',
    );
    expect(
      document.querySelector('[data-sign="queueConversationPanel"]'),
    ).toHaveAttribute('data-message-count', '3');

    rendered.unmount();
    expect(mocks.queueConversations.unloadConversation).toHaveBeenCalledTimes(
      1,
    );
  });

  it('avoids main-tab side effects in a shared client tab', () => {
    const { view, mocks } = createQueueConversationView();
    (view as any)._portManager.isMainTab = false;
    const Component = view.component.bind(view);
    const rendered = render(React.createElement(Component, {}));

    expect(mocks.queueConversations._loadConversation).toHaveBeenCalledWith(
      'conversation-1',
    );
    expect(mocks.queueConversations.loadConversation).not.toHaveBeenCalled();
    expect(mocks.smsConsent.loadConversationConsentData).not.toHaveBeenCalled();
    expect(mocks.queueMessageStore.readMessages).not.toHaveBeenCalled();

    rendered.unmount();
    expect(mocks.queueConversations.unloadConversation).not.toHaveBeenCalled();
  });

  it('renders a no-access panel when the requested conversation is unavailable', () => {
    const { view, mocks } = createQueueConversationView();
    mocks.queueConversations.formattedConversationsMap.clear();
    const Component = view.component.bind(view);
    const { container } = render(React.createElement(Component, {}));

    expect(
      container.querySelector('[data-sign="conversationNoAccessPanel"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-sign="conversationNoAccessMessage"]'),
    ).toHaveTextContent('noAccessToSendFromNumber');

    fireEvent.click(
      container.querySelector('[data-sign="conversationNoAccessBack"]')!,
    );

    expect(slideOutViewTransition).toHaveBeenCalledWith(
      expect.any(Function),
      true,
    );
    expect(mocks.router.push).toHaveBeenCalledWith('/messages');
    expect((view as any).logger.error).toHaveBeenCalledWith(
      'Conversation not found',
      {
        conversationId: undefined,
      },
    );
  });
});
