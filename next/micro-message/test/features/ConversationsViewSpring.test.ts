import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import {
  ConversationsSyncTabId,
  SyncTabId,
} from '@ringcentral-integration/micro-core/src/app/views';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import { renderHook } from '@testing-library/react';

import type { FilteredConversation } from '../../src/app/services';
import { ConversationsViewSpring } from '../../src/app/views/ConversationsViewSpring';

jest.mock('@ringcentral-integration/micro-phone/src/app/hooks', () => ({
  useContactRenderInfoFromConversation: jest.fn(),
}));

jest.mock('@ringcentral-integration/next-core', () => {
  const actual = jest.requireActual('@ringcentral-integration/next-core');
  return {
    ...actual,
    useConnector: (selector: () => unknown) => selector(),
  };
});

const createConversation = (
  overrides: Partial<FilteredConversation> = {},
): FilteredConversation =>
  ({
    id: 'conversation-1',
    conversationId: 'conversation-1',
    type: messageTypes.sms,
    direction: 'Inbound',
    from: { phoneNumber: '+15550002222' },
    to: [{ phoneNumber: '+15550001111' }],
    self: { phoneNumber: '+15550001111' },
    correspondents: [{ phoneNumber: '+15550002222' }],
    correspondentMatchesList: [[]],
    correspondentMatches: [],
    conversationMatches: [],
    selfMatches: [],
    conversationLogId: '',
    unreadCounts: 0,
    isLogging: false,
    mmsAttachments: [],
    ...overrides,
  }) as FilteredConversation;

const createRenderInfo = (overrides: Record<string, unknown> = {}) => ({
  isTextMessage: true,
  isFax: false,
  isVoicemail: false,
  voicemailAttachmentExist: false,
  voicemailAttachmentUri: undefined,
  markAble: false,
  unreadCounts: 0,
  faxAttachmentExist: false,
  faxAttachmentDownloadUri: undefined,
  signalTo: true,
  signalSourceInfo: {
    phoneNumber: '+15550002222',
  },
  formattedPhoneNumber: '(555) 000-2222',
  matchedContact: {
    name: 'Jane Cooper',
  },
  getActionInfo: jest.fn(),
  copyNumber: jest.fn(),
  ...overrides,
});

const createConversationsView = ({
  canReadConsent = true,
}: {
  canReadConsent?: boolean;
} = {}) => {
  const modalView = {
    create: jest.fn(() => 'modal'),
    open: jest.fn(),
  };
  const smsConsentDialogView = {
    viewConsentDetails: jest.fn().mockResolvedValue(true),
  };
  const router = {
    currentPath: '/messages',
    push: jest.fn().mockResolvedValue(undefined),
  };
  const composeText = {
    clean: jest.fn().mockResolvedValue(undefined),
    updateSenderNumber: jest.fn().mockResolvedValue(undefined),
    addToNumbers: jest.fn().mockResolvedValue(true),
  };
  const syncTabView = {
    setActive: jest.fn(),
  };
  const messageThread = {
    getLatestThreadIdByParties: jest.fn(),
  };
  const view = new ConversationsViewSpring(
    modalView as any,
    { ready: true } as any,
    { ready: true } as any,
    { ready: true } as any,
    {
      ready: true,
      hasInternalSMSPermission: true,
      hasOutboundSMSPermission: true,
      hasComposeTextPermission: true,
      isCallingEnabled: true,
    } as any,
    { ready: true } as any,
    {
      ready: true,
      restricted: false,
    } as any,
    {
      onClickToSMS: jest.fn(),
    } as any,
    {
      isOfflineMode: false,
      isVoipOnlyMode: false,
      isWebphoneUnavailableMode: false,
      isWebphoneInitializing: false,
    } as any,
    router as any,
    {} as any,
    composeText as any,
    {
      shared: true,
      onServer: jest.fn(),
    } as any,
    {} as any,
    {
      name: 'CRM',
      getActionButtons: jest.fn(() => []),
    } as any,
    {
      checkIsSupportLog: jest.fn(() => false),
    } as any,
    {} as any,
    syncTabView as any,
    undefined,
    undefined,
    messageThread as any,
  );
  view.logger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  } as any;
  Object.defineProperties(view, {
    _call: {
      value: {
        isIdle: true,
      },
    },
    _messageSender: {
      value: {
        hasSmsPermission: true,
      },
    },
    _smsConsent: {
      value: {
        canReadConsent,
      },
    },
    _smsConsentDialogView: {
      value: smsConsentDialogView,
    },
  });

  return {
    composeText,
    messageThread,
    router,
    syncTabView,
    view,
    smsConsentDialogView,
  };
};

describe('ConversationsViewSpring', () => {
  beforeEach(() => {
    (useContactRenderInfoFromConversation as jest.Mock).mockReturnValue(
      createRenderInfo(),
    );
  });

  it('adds manage consent action for single text conversations when user can read consent', () => {
    const { view } = createConversationsView();
    const conversation = createConversation();

    const { result } = renderHook(() =>
      view.useConversationItemInfo(conversation, { pageType: 'list' }),
    );

    expect(result.current.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'manageConsent',
          disabled: false,
        }),
      ]),
    );
  });

  it('does not add manage consent action without read consent permission', () => {
    const { view } = createConversationsView({ canReadConsent: false });
    const conversation = createConversation();

    const { result } = renderHook(() =>
      view.useConversationItemInfo(conversation, { pageType: 'list' }),
    );

    expect(result.current.actions).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'manageConsent',
        }),
      ]),
    );
  });

  it('does not add manage consent action without signal render info', () => {
    (useContactRenderInfoFromConversation as jest.Mock).mockReturnValue(
      createRenderInfo({
        signalTo: false,
      }),
    );
    const { view } = createConversationsView();
    const conversation = createConversation();

    const { result } = renderHook(() =>
      view.useConversationItemInfo(conversation, { pageType: 'list' }),
    );

    expect(result.current.actions).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'manageConsent',
        }),
      ]),
    );
  });

  it('does not add manage consent action for group text conversations', () => {
    const { view } = createConversationsView();
    const conversation = createConversation({
      correspondents: [
        { phoneNumber: '+15550002222' },
        { phoneNumber: '+15550003333' },
      ],
    });

    const { result } = renderHook(() =>
      view.useConversationItemInfo(conversation, { pageType: 'list' }),
    );

    expect(result.current.actions).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'manageConsent',
        }),
      ]),
    );
  });

  it('opens compose with the historical conversation sender and recipient', async () => {
    const { composeText, messageThread, router, view } =
      createConversationsView();
    const conversation = createConversation();

    await view.replyInSharedTab(conversation);

    expect(messageThread.getLatestThreadIdByParties).toHaveBeenCalledWith(
      '+15550001111',
      '+15550002222',
    );
    expect(composeText.clean).toHaveBeenCalledTimes(1);
    expect(composeText.updateSenderNumber).toHaveBeenCalledWith('+15550001111');
    expect(composeText.addToNumbers).toHaveBeenCalledWith([
      {
        phoneNumber: '+15550002222',
        freeSolo: true,
      },
    ]);
    expect(router.push).toHaveBeenCalledWith('/composeText', {
      composeTextBackPath: '/messages',
    });
  });

  it('opens an existing shared thread for the historical conversation', async () => {
    const { composeText, messageThread, router, syncTabView, view } =
      createConversationsView();
    const conversation = createConversation();
    messageThread.getLatestThreadIdByParties.mockReturnValue('thread-1');

    await view.replyInSharedTab(conversation);

    expect(syncTabView.setActive).toHaveBeenCalledWith(
      SyncTabId.CONVERSATIONS,
      ConversationsSyncTabId.SHARED,
      { currentPath: '/conversations/thread-1' },
    );
    expect(router.push).not.toHaveBeenCalled();
    expect(composeText.clean).not.toHaveBeenCalled();
  });

  it('opens consent details with conversation numbers from manage consent action', async () => {
    const { view, smsConsentDialogView } = createConversationsView();
    const conversation = createConversation();
    const handler = view.useActionsHandler(
      conversation,
      createRenderInfo(),
      undefined as any,
    );

    await handler('manageConsent');

    expect(smsConsentDialogView.viewConsentDetails).toHaveBeenCalledWith({
      numbers: {
        from: '+15550001111',
        to: '+15550002222',
      },
      contactName: 'Jane Cooper',
      consentEntry: 'Text list',
    });
  });

  it('opens consent details from a conversation', async () => {
    const { view, smsConsentDialogView } = createConversationsView();
    const conversation = createConversation();
    const handler = view.useActionsHandler(
      conversation,
      createRenderInfo(),
      undefined as any,
    );

    await handler('viewConsent');

    expect(smsConsentDialogView.viewConsentDetails).toHaveBeenCalledWith({
      numbers: {
        from: '+15550001111',
        to: '+15550002222',
      },
      contactName: 'Jane Cooper',
      consentEntry: 'Text conversation',
    });
  });
});
