import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';
import { SharedConversationView } from '../../src/app/views/ConversationViewSpring/SharedConversation.view';

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

const createSharedConversationView = () => {
  const attachment = createAttachment('thread.png');
  const conversation = {
    conversationId: 'thread-1',
  };
  const sendThreadMessage = jest
    .fn()
    .mockResolvedValue({ threadId: 'thread-2' });
  const messageThread = {
    data: {
      threads: {
        'thread-1': {
          threadInfo: {
            status: 'Open',
          },
        },
      },
    },
    getThreadConversation: jest.fn(() => conversation),
    getThread: jest.fn(() => ({
      threadInfo: {
        status: 'Open',
      },
    })),
    getThreadMessages: jest.fn(() => []),
    getThreadMetadata: jest.fn(() => ({})),
    getInputValue: jest.fn(() => ''),
    getAttachments: jest.fn(() => [attachment]),
    sendThreadMessage,
    setInputValue: jest.fn(),
    addAttachments: jest.fn(),
    removeAttachment: jest.fn(),
  };
  const block = {
    next: jest.fn((fn: () => Promise<void>) => fn()),
  };
  const router = {
    push: jest.fn(),
  };
  const view = Object.assign(Object.create(SharedConversationView.prototype), {
    logger: {
      error: jest.fn(),
    },
    _theme: {
      reducedMotion: true,
    },
    _conversations: {
      acceptFileTypes: ['image/png'],
    },
    _auth: {
      ownerId: 'owner-1',
    },
    _appFeatures: {
      hasSendMMSPermission: true,
    },
    _regionSettings: {
      ready: true,
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
    _conversationsViewSpring: {
      useConversationItemInfo: jest.fn(),
      useActionsHandler: jest.fn(),
    },
    _messageThread: messageThread,
    _block: block,
    _conversationAlert: {
      getAlertInfo: jest.fn(() => ({
        showAlert: false,
        alertProps: undefined,
      })),
    },
    _messageThreadLogger: {
      shouldShowSharedSmsLogReminder: false,
      dismissSharedSmsLogReminder: jest.fn(),
    },
  }) as SharedConversationView;

  return {
    view,
    attachment,
    mocks: {
      block,
      messageThread,
      router,
      sendThreadMessage,
    },
  };
};

describe('SharedConversationView', () => {
  it('allows sending with attachments when message text is empty', () => {
    const { view, attachment } = createSharedConversationView();

    expect(view.getUIProps({ conversationId: 'thread-1' })).toEqual(
      expect.objectContaining({
        attachments: [attachment],
        sendButtonDisabled: false,
        sending: false,
      }),
    );
  });

  it('marks conversation sending while thread metadata is loading', () => {
    const { view, mocks } = createSharedConversationView();
    mocks.messageThread.getThreadMetadata.mockReturnValue({ loading: true });

    expect(view.getUIProps({ conversationId: 'thread-1' })).toEqual(
      expect.objectContaining({
        sendButtonDisabled: true,
        sending: true,
      }),
    );
  });

  it('passes attachments when replying to an active thread', async () => {
    const { view, attachment, mocks } = createSharedConversationView();

    await view
      .getUIFunctions({ conversationId: 'thread-1' })
      .replyToReceivers('hello', [attachment]);

    expect(mocks.sendThreadMessage).toHaveBeenCalledWith(
      'thread-1',
      'hello',
      false,
      [attachment],
    );
  });

  it('passes attachments and navigates when replying to a resolved thread', async () => {
    const { view, attachment, mocks } = createSharedConversationView();
    mocks.messageThread.data.threads['thread-1'].threadInfo.status = 'Resolved';

    await view
      .getUIFunctions({ conversationId: 'thread-1' })
      .replyToReceivers('hello', [attachment]);

    expect(mocks.block.next).toHaveBeenCalledTimes(1);
    expect(mocks.sendThreadMessage).toHaveBeenCalledWith(
      'thread-1',
      'hello',
      true,
      [attachment],
    );
    expect(mocks.router.push).toHaveBeenCalledWith('/conversations/thread-2');
  });

  it('delegates attachment updates to MessageThread', () => {
    const { view, attachment, mocks } = createSharedConversationView();
    const uiFunctions = view.getUIFunctions({ conversationId: 'thread-1' });

    uiFunctions.addAttachments!([attachment]);
    uiFunctions.removeAttachment!(attachment);

    expect(mocks.messageThread.addAttachments).toHaveBeenCalledWith(
      'thread-1',
      [attachment],
    );
    expect(mocks.messageThread.removeAttachment).toHaveBeenCalledWith(
      'thread-1',
      attachment,
    );
  });

  it('renders a no-access panel when the requested conversation is unavailable', () => {
    const { view, mocks } = createSharedConversationView();
    mocks.messageThread.getThreadConversation.mockReturnValue(undefined);
    const Component = view.component.bind(view);
    const { container } = render(
      React.createElement(Component, { conversationId: 'thread-1' }),
    );

    expect(
      container.querySelector('[data-sign="conversationNoAccessPanel"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-sign="conversationNoAccessMessage"]'),
    ).toHaveTextContent('noAccessToSendFromNumber');

    fireEvent.click(
      container.querySelector('[data-sign="conversationNoAccessBack"]')!,
    );

    expect(mocks.router.push).toHaveBeenCalledWith('/messages');
    expect((view as any).logger.error).toHaveBeenCalledWith(
      'Conversation not found',
      {
        conversationId: 'thread-1',
      },
    );
  });
});
