import {
  ConversationsSyncTabId,
  SyncTabId,
} from '@ringcentral-integration/micro-core/src/app/views';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  ComposeText,
  SMSOptStatus,
  SmsConsentCoverage,
  SmsCoverageCampaignType,
} from '../../src/app/services';
import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';
import { messageSenderStatus } from '../../src/app/services/MessageSender/messageSenderStatus';
import { ComposeTextViewSpring } from '../../src/app/views/ComposeTextViewSpring/ComposeText.view';
import { ComposeTextPanel } from '../../src/app/views/ComposeTextViewSpring/ComposeTextPanel';

jest.mock('@ringcentral-integration/micro-core/src/app/components', () => {
  const React = require('react');

  return {
    AppFooterNav: ({ children }: { children: React.ReactNode }) =>
      React.createElement('footer', null, children),
    AppHeaderNav: ({ children }: { children: React.ReactNode }) =>
      React.createElement('header', null, children),
  };
});

jest.mock('@ringcentral-integration/next-widgets/components', () => {
  const React = require('react');

  return {
    FromField: () =>
      React.createElement('div', { 'data-testid': 'from-field' }),
    MessageInput: () =>
      React.createElement('div', { 'data-testid': 'message-input' }),
    PageHeader: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
    SpringSpinnerOverlay: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
  };
});

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

const createAttachment = (name: string): Attachment =>
  ({
    name,
    size: 100,
    file: { name } as File,
  }) as Attachment;

const createComposeTextView = ({
  composeText: composeTextOverrides = {},
  callQueues: callQueuesOverrides,
  messageSender: messageSenderOverrides = {},
  smsConsent: smsConsentOverrides,
  smsConsentDialogView: smsConsentDialogViewOverrides,
}: {
  composeText?: Record<string, any>;
  callQueues?: Record<string, any>;
  messageSender?: Record<string, any>;
  smsConsent?: Record<string, any>;
  smsConsentDialogView?: Record<string, any>;
} = {}) => {
  const composeText = {
    ready: true,
    senderNumber: '+15550001111',
    typingToNumber: '',
    toNumbers: [{ phoneNumber: '+15550002222' }],
    requiredOptInToNumbers: [],
    messageText: 'hello',
    attachments: [] as Attachment[],
    hasInvalidToNumbers: false,
    disabledGroupMessage: false,
    createGroupChecked: false,
    maxRecipients: 10,
    send: jest.fn(),
    clean: jest.fn(),
    updateSenderNumber: jest.fn(),
    updateTypingToNumber: jest.fn(),
    cleanTypingToNumber: jest.fn(),
    addToNumbers: jest.fn(),
    removeToNumber: jest.fn(),
    updateMessageText: jest.fn(),
    addAttachments: jest.fn(),
    removeAttachment: jest.fn(),
    setCreateGroupChecked: jest.fn(),
    loadRecipientConsentData: jest.fn().mockResolvedValue(undefined),
    ...composeTextOverrides,
  };
  const smsConsent = {
    canAddConsent: true,
    ...smsConsentOverrides,
  };
  const smsConsentDialogView = {
    openAddConsentDialog: jest.fn(),
    ...smsConsentDialogViewOverrides,
  };
  const messageStore = {
    pushMessages: jest.fn(),
  };
  const queueMessageStore = {
    _hasPermission: false,
    pushMessages: jest.fn(),
  };
  const conversations = {
    acceptFileTypes: ['image/png'],
    relateCorrespondentEntity: jest.fn(),
  };
  const syncTabView = {
    setActive: jest.fn(),
  };
  const router = {
    push: jest.fn(),
  };
  const smsConversationsOptions = {
    checkDncStatusOfConversation: jest.fn().mockResolvedValue(undefined),
    autoLogTaskIfEnabled: jest.fn().mockResolvedValue(undefined),
  };
  const messageSender = {
    ready: true,
    idle: true,
    sendStatus: messageSenderStatus.sending,
    hasSmsPermission: true,
    useNumberFeatures: false,
    senderNumbersList: [
      {
        phoneNumber: '+15550001111',
        extension: { type: 'Department' },
      },
    ],
    receiveOnlyNumbers: [],
    registerableNumbers: [],
    ...messageSenderOverrides,
  };
  const callQueues = {
    getQueue: jest.fn(),
    ...callQueuesOverrides,
  };
  const view = Object.assign(Object.create(ComposeTextViewSpring.prototype), {
    logger: {
      error: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
    },
    _syncTabView: syncTabView,
    _portManager: {
      shared: false,
      isMainTab: true,
    },
    _composeText: composeText,
    _connectivityMonitor: {
      connectivity: true,
    },
    _contactSearch: {
      ready: true,
    },
    _conversations: conversations,
    _messageSender: messageSender,
    _messageStore: messageStore,
    _queueMessageStore: queueMessageStore,
    _rateLimiter: {
      restricted: false,
    },
    _appFeatures: {
      ready: true,
      hasSendMMSPermission: true,
    },
    _router: router,
    _numberFormatter: {
      normalizeNumber: jest.fn((phoneNumber) => phoneNumber),
    },
    _smsTemplateView: {
      component: () => null,
    },
    _smsConversationsOptions: smsConversationsOptions,
    _smsConsent: smsConsent,
    _smsConsentDialogView: smsConsentDialogView,
    _callQueues: callQueues,
  }) as ComposeTextViewSpring;

  return {
    view,
    mocks: {
      composeText,
      conversations,
      messageStore,
      queueMessageStore,
      router,
      smsConversationsOptions,
      syncTabView,
      callQueues,
      smsConsent,
      smsConsentDialogView,
    },
  };
};

const createSmsConfiguration = () => ({
  phoneNumberId: '513003004',
  phoneNumber: '+12025550100',
  smsCampaignInfo: {
    id: '983782004',
    coverageType: SmsCoverageCampaignType.Promotional,
    consentSettings: {
      optInRequired: true,
      coverage: {
        optIn: SmsCoverageCampaignType.Promotional,
        optOut: SmsCoverageCampaignType.Account,
      },
    },
  },
});

const createEffectiveConsent = (explicitConsents?: any[]) => ({
  explicitConsents,
  campaignSettings: {
    campaignType: 'Promotional',
    optInRequired: true,
  },
});

const createComposeText = ({
  senderNumber = '+12025550100',
  toNumbers = [{ phoneNumber: '+16505550123' }],
  typingToNumber = '',
  effectiveConsent,
  smsConfiguration = createSmsConfiguration(),
}: {
  senderNumber?: string;
  toNumbers?: Array<{ phoneNumber: string; error?: boolean }>;
  typingToNumber?: string;
  effectiveConsent?: any;
  smsConfiguration?: any;
} = {}) => {
  const messageSender = {
    send: jest
      .fn()
      .mockResolvedValue([{ conversation: { id: 'conversation-1' } }]),
    senderNumbersList: [{ phoneNumber: senderNumber }],
  };
  const smsConsent = {
    ensureSmsConfigurationState: jest.fn().mockResolvedValue({
      data: smsConfiguration,
    }),
    ensureEffectiveConsentForNumberPairs: jest
      .fn()
      .mockResolvedValue(undefined),
    loadEffectiveConsentForNumberPairs: jest.fn().mockResolvedValue(undefined),
    loadEffectiveConsentForNumbers: jest.fn().mockResolvedValue(undefined),
    getConsentStatus: jest.fn(({ to }: { to: string }) => {
      const explicitConsents = effectiveConsent?.explicitConsents;
      if (!explicitConsents) {
        return {};
      }

      const normalizedTo = to.replace(/[^\d+]/g, '');
      const recipientConsents = explicitConsents.filter(
        (consent: { to: string }) =>
          consent.to.replace(/[^\d+]/g, '') === normalizedTo,
      );
      const isOptOut = recipientConsents.some(
        (consent: { optStatus: SMSOptStatus }) =>
          consent.optStatus === SMSOptStatus.OptOut,
      );
      const hasOptIn = recipientConsents.some(
        (consent: { optStatus: SMSOptStatus }) =>
          consent.optStatus === SMSOptStatus.OptIn,
      );

      return {
        isOptOut,
        requiredOptInLoss: Boolean(
          smsConfiguration?.smsCampaignInfo?.consentSettings?.optInRequired &&
          !hasOptIn,
        ),
      };
    }),
  };
  const composeText = Object.assign(Object.create(ComposeText.prototype), {
    senderNumber,
    typingToNumber,
    _toNumbers: toNumbers,
    _smsConsent: smsConsent,
    _smsOptOut: undefined,
    _messageSender: messageSender,
    _composeTextOptions: undefined,
    _smsHooks: [],
    _router: {
      currentPath: '/composeText',
    },
    logger: {
      log: jest.fn(),
    },
    createGroupChecked: true,
  }) as ComposeText;

  (composeText as any)._validatePhoneNumber = jest.fn().mockResolvedValue(true);

  return {
    composeText,
    mocks: {
      messageSender,
      smsConsent,
    },
  };
};

describe('ComposeTextViewSpring', () => {
  it('keeps department sender numbers and exposes sending state', () => {
    const { view } = createComposeTextView();

    expect(view.getUIProps({}).senderNumbers).toEqual([
      {
        phoneNumber: '+15550001111',
        extension: { type: 'Department' },
      },
    ]);
    expect(view.getUIProps({}).sending).toBe(true);
  });

  it('shows call queue name for queue sender numbers', () => {
    const { view, mocks } = createComposeTextView({
      messageSender: {
        senderNumbersList: [
          {
            phoneNumber: '+15550001111',
            usageType: 'DirectNumber',
            extension: { id: 'queue-1', type: 'Department' },
          },
          {
            phoneNumber: '+15550002222',
            usageType: 'DirectNumber',
          },
        ],
      },
      callQueues: {
        getQueue: jest.fn((queueId: string) =>
          queueId === 'queue-1'
            ? { id: 'queue-1', name: 'Support Queue' }
            : undefined,
        ),
      },
    });

    expect(view.getUIProps({}).senderNumbers).toEqual([
      {
        phoneNumber: '+15550001111',
        usageType: 'DirectNumber',
        extension: { id: 'queue-1', type: 'Department' },
        displayLabel: 'Support Queue',
      },
      {
        phoneNumber: '+15550002222',
        usageType: 'DirectNumber',
        displayLabel: undefined,
      },
    ]);
    expect(mocks.callQueues.getQueue).toHaveBeenCalledWith('queue-1');
  });

  it('navigates to personal conversation for one SMS response', async () => {
    const { view, mocks } = createComposeTextView();
    const response = {
      id: 1,
      conversation: { id: 'sms-conversation-1' },
    };
    mocks.composeText.send.mockResolvedValue([response]);

    await view.getUIFunctions({}).send('hello', []);

    expect(mocks.messageStore.pushMessages).toHaveBeenCalledWith([response]);
    expect(
      mocks.smsConversationsOptions.checkDncStatusOfConversation,
    ).toHaveBeenCalledWith('sms-conversation-1');
    expect(mocks.syncTabView.setActive).toHaveBeenCalledWith(
      SyncTabId.CONVERSATIONS,
      ConversationsSyncTabId.PERSONAL,
      { currentPath: '/conversations/sms-conversation-1' },
    );
    expect(mocks.conversations.relateCorrespondentEntity).toHaveBeenCalledWith([
      response,
    ]);
    expect(mocks.composeText.clean).toHaveBeenCalledTimes(1);
  });

  it('navigates a Pager response to the direct conversation for a queue sender', async () => {
    const { view, mocks } = createComposeTextView({
      messageSender: {
        senderNumbersList: [
          {
            phoneNumber: '+15550001111',
            extension: { id: 'queue-1', type: 'Department' },
          },
        ],
      },
      callQueues: {
        getQueue: jest.fn().mockReturnValue({
          id: 'queue-1',
          name: 'Support Queue',
        }),
      },
    });
    mocks.queueMessageStore._hasPermission = true;
    const response = {
      id: 1,
      type: 'Pager',
      conversation: { id: 'pager-conversation-1' },
    };
    mocks.composeText.send.mockResolvedValue([response]);

    await view.getUIFunctions({}).send('hello', []);

    expect(mocks.messageStore.pushMessages).toHaveBeenCalledWith([response]);
    expect(mocks.queueMessageStore.pushMessages).not.toHaveBeenCalled();
    expect(
      mocks.smsConversationsOptions.checkDncStatusOfConversation,
    ).toHaveBeenCalledWith('pager-conversation-1');
    expect(mocks.syncTabView.setActive).toHaveBeenCalledWith(
      SyncTabId.CONVERSATIONS,
      ConversationsSyncTabId.PERSONAL,
      { currentPath: '/conversations/pager-conversation-1' },
    );
  });

  it('navigates an SMS response to the queue conversation for a queue sender', async () => {
    const { view, mocks } = createComposeTextView({
      messageSender: {
        senderNumbersList: [
          {
            phoneNumber: '+15550001111',
            extension: { id: 'queue-1', type: 'Department' },
          },
        ],
      },
      callQueues: {
        getQueue: jest.fn().mockReturnValue({
          id: 'queue-1',
          name: 'Support Queue',
        }),
      },
    });
    mocks.queueMessageStore._hasPermission = true;
    const response = {
      id: 1,
      type: 'SMS',
      conversation: { id: 'queue-conversation-1' },
    };
    mocks.composeText.send.mockResolvedValue([response]);

    await view.getUIFunctions({}).send('hello', []);

    expect(mocks.queueMessageStore.pushMessages).toHaveBeenCalledWith([
      response,
    ]);
    expect(mocks.messageStore.pushMessages).not.toHaveBeenCalled();
    expect(
      mocks.smsConversationsOptions.checkDncStatusOfConversation,
    ).not.toHaveBeenCalled();
    expect(mocks.syncTabView.setActive).toHaveBeenCalledWith(
      SyncTabId.CONVERSATIONS,
      ConversationsSyncTabId.QUEUE,
      { currentPath: '/conversations/queue-conversation-1' },
    );
  });

  it('navigates to shared conversation for one message thread response', async () => {
    const { view, mocks } = createComposeTextView();
    mocks.composeText.send.mockResolvedValue([
      {
        id: 'message-1',
        threadId: 'thread-1',
      },
    ]);

    await view.getUIFunctions({}).send('hello', [createAttachment('a.png')]);

    expect(mocks.messageStore.pushMessages).not.toHaveBeenCalled();
    expect(
      mocks.conversations.relateCorrespondentEntity,
    ).not.toHaveBeenCalled();
    expect(mocks.syncTabView.setActive).toHaveBeenCalledWith(
      SyncTabId.CONVERSATIONS,
      ConversationsSyncTabId.SHARED,
      { currentPath: '/conversations/thread-1' },
    );
    expect(mocks.composeText.clean).toHaveBeenCalledTimes(1);
  });

  it('routes grouped message thread responses back to shared message list', async () => {
    const { view, mocks } = createComposeTextView();
    mocks.composeText.send.mockResolvedValue([
      { id: 'message-1', threadId: 'thread-1' },
      { id: 'message-2', threadId: 'thread-2' },
    ]);

    await view.getUIFunctions({}).send('hello', []);

    expect(mocks.router.push).toHaveBeenCalledWith('/messages', {
      [SyncTabId.CONVERSATIONS]: ConversationsSyncTabId.SHARED,
    });
  });

  it('exposes required opt-in alert state and opens add consent with effective consent refresh', () => {
    const requiredOptInToNumbers = [
      {
        phoneNumber: '+16505550123',
        error: true,
        errorReason: 'requiredOptIn',
      },
    ];
    const { view, mocks } = createComposeTextView({
      composeText: {
        toNumbers: requiredOptInToNumbers,
        requiredOptInToNumbers,
        hasInvalidToNumbers: true,
      },
    });

    expect(view.getUIProps({})).toEqual(
      expect.objectContaining({
        requiredOptInCount: 1,
        canAddSmsConsent: true,
      }),
    );

    view.getUIFunctions({}).onAddSmsConsentClick?.();

    expect(
      mocks.smsConsentDialogView.openAddConsentDialog,
    ).toHaveBeenCalledWith({
      numbers: {
        from: '+15550001111',
        to: '+16505550123',
      },
      consentEntry: 'Text input box',
    });
  });

  it('marks required opt-in alert as multiple when more than one recipient is blocked', () => {
    const requiredOptInToNumbers = [
      { phoneNumber: '+16505550123', errorReason: 'requiredOptIn' },
      { phoneNumber: '+16505550124', errorReason: 'requiredOptIn' },
    ];
    const { view } = createComposeTextView({
      composeText: {
        toNumbers: requiredOptInToNumbers,
        requiredOptInToNumbers,
      },
    });

    expect(view.getUIProps({}).requiredOptInCount).toBe(2);
  });

  it('loads recipient consent data when sender or selected recipients change', () => {
    const { view, mocks } = createComposeTextView();
    (view as any)._composeTextViewOptions = {
      component: () => null,
    };
    const Component = view.component.bind(view);

    const { rerender } = render(React.createElement(Component));

    expect(mocks.composeText.loadRecipientConsentData).toHaveBeenCalledWith();
    expect(mocks.composeText.loadRecipientConsentData).toHaveBeenCalledTimes(1);

    mocks.composeText.senderNumber = '+15550003333';
    rerender(React.createElement(Component));
    expect(mocks.composeText.loadRecipientConsentData).toHaveBeenCalledTimes(2);

    mocks.composeText.toNumbers = [{ phoneNumber: '+15550004444' }];
    rerender(React.createElement(Component));
    expect(mocks.composeText.loadRecipientConsentData).toHaveBeenCalledTimes(3);
  });
});

describe('ComposeText consent checks', () => {
  it('loads effective consent data for selected recipients', async () => {
    const { composeText, mocks } = createComposeText({
      toNumbers: [
        { phoneNumber: '+16505550123' },
        { phoneNumber: '+16505550124' },
      ],
      typingToNumber: '+16505550125',
    });

    await composeText.loadRecipientConsentData();

    expect(mocks.smsConsent.ensureSmsConfigurationState).toHaveBeenCalledWith(
      '+12025550100',
    );
    expect(
      mocks.smsConsent.ensureEffectiveConsentForNumberPairs,
    ).toHaveBeenCalledWith([
      {
        from: '+12025550100',
        to: '+16505550123',
      },
      {
        from: '+12025550100',
        to: '+16505550124',
      },
    ]);
  });

  it('marks selected recipients that require opt-in', () => {
    const { composeText } = createComposeText({
      effectiveConsent: createEffectiveConsent([]),
    });

    expect(composeText.toNumbers[0]).toEqual(
      expect.objectContaining({
        error: true,
        errorReason: 'requiredOptIn',
      }),
    );
    expect(composeText.hasInvalidToNumbers).toBe(true);
  });

  it('does not mark selected recipients before effective consent is loaded', () => {
    const { composeText } = createComposeText();

    expect(composeText.toNumbers[0].error).toBeUndefined();
    expect(composeText.toNumbers[0].errorReason).toBeUndefined();
    expect(composeText.hasInvalidToNumbers).toBe(false);
  });

  it('keeps opt-out as the highest-priority consent error', () => {
    const { composeText } = createComposeText({
      effectiveConsent: createEffectiveConsent([
        {
          to: '+16505550123',
          optStatus: SMSOptStatus.OptOut,
          coverage: SmsConsentCoverage.Account,
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ]),
    });

    expect(composeText.toNumbers[0]).toEqual(
      expect.objectContaining({
        error: true,
        errorReason: 'optOut',
      }),
    );
  });

  it('sends when the selected recipient has valid opt-in consent', async () => {
    const { composeText, mocks } = createComposeText({
      effectiveConsent: createEffectiveConsent([
        {
          to: '+16505550123',
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.CampaignType,
          campaignType: 'Promotional',
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ]),
    });

    await composeText.send('hello');

    expect(mocks.messageSender.send).toHaveBeenCalledWith(
      expect.objectContaining({
        fromNumber: '+12025550100',
        toNumbers: ['+16505550123'],
        text: 'hello',
      }),
    );
  });

  it('loads effective consent for typing number before sending it', async () => {
    const { composeText, mocks } = createComposeText({
      toNumbers: [],
      typingToNumber: '+16505550125',
      effectiveConsent: createEffectiveConsent([
        {
          to: '+16505550125',
          optStatus: SMSOptStatus.OptIn,
          coverage: SmsConsentCoverage.CampaignType,
          campaignType: 'Promotional',
          source: 'Api',
          lastModifiedTime: '2026-06-03T06:00:08.203931Z',
        },
      ]),
    });
    await composeText.send('hello');

    expect(
      mocks.smsConsent.loadEffectiveConsentForNumbers,
    ).toHaveBeenCalledWith({
      from: '+12025550100',
      to: '+16505550125',
    });
    expect(mocks.messageSender.send).toHaveBeenCalledWith(
      expect.objectContaining({
        fromNumber: '+12025550100',
        toNumbers: ['+16505550125'],
        text: 'hello',
      }),
    );
  });
});

describe('ComposeTextPanel consent alert', () => {
  const baseProps = {
    send: jest.fn(),
    onBackClick: jest.fn(),
    toNumbers: [],
    attachments: [],
    createGroupChecked: false,
    acceptFileTypes: ['image/png'],
    messageText: 'hello',
    allowedCreateGroupText: false,
    senderNumber: '+15550001111',
    maxRecipients: 10,
    addAttachments: jest.fn(),
    senderNumbers: [{ phoneNumber: '+15550001111' }],
    typingToNumber: '',
    removeAttachment: jest.fn(),
    updateMessageText: jest.fn(),
    sendButtonDisabled: false,
    updateTypingToNumber: jest.fn(),
    updateSenderNumber: jest.fn(),
    cleanTypingToNumber: jest.fn(),
    addToNumbers: jest.fn(),
    removeToNumber: jest.fn(),
    onCreateGroupTextOptionChanged: jest.fn(),
    ContactSearch: () =>
      React.createElement('div', { 'data-testid': 'contact-search' }),
  };

  it('hides message input and shows the multiple-recipient consent copy', () => {
    render(
      React.createElement(ComposeTextPanel, {
        ...baseProps,
        requiredOptInCount: 2,
      }),
    );

    expect(
      screen.getByText(
        'Texting to recipients who have not opted in is blocked by your admin.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('message-input')).not.toBeInTheDocument();
  });
});
