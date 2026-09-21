import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ConversationAlert } from '../../src/app/views/ConversationViewSpring/ConversationAlert';
import {
  MovedToSharedTabAlert,
  OptOutAlert,
  SmsAccountCapabilityAlertContent,
  SmsConsentRequiredAlert,
} from '../../src/app/views/ConversationViewSpring/ConversationPanel';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => {
      const messages: Record<string, string> = {
        movedToSharedTabAlert:
          'Texting from the number {phoneNumber} has been moved to Shared tab.',
        replyInSharedTab: 'Reply in Shared tab',
      };

      return messages[key] ?? key;
    },
  }),
}));

const createConversationAlert = ({
  hasCompanySiteSupport = true,
  isSharedSenderNumber = true,
  hasPermission = true,
  smsPermissionReason = null,
  smsConsent,
  smsConsentDialogView,
}: {
  hasCompanySiteSupport?: boolean;
  isSharedSenderNumber?: boolean;
  hasPermission?: boolean;
  smsPermissionReason?: string | null;
  smsConsent?: any;
  smsConsentDialogView?: any;
} = {}) => {
  const messageSender = {
    senderNumberMap: new Map([['(555) 000-1111', {}]]),
    smsPermissionReason,
  };
  const numberFormatter = {
    formatNumber: jest.fn(() => '(555) 000-1111'),
  };
  const messageThread = {
    hasCompanySiteSupport,
    hasPermission,
    isSharedSmsSenderNumber: jest.fn(() => isSharedSenderNumber),
  };
  const smsOptOut = {
    getIsOptOutConversation: jest.fn(() => false),
  };
  const conversationAlert = new ConversationAlert(
    messageSender as any,
    numberFormatter as any,
    smsOptOut as any,
    messageThread as any,
    smsConsent,
    smsConsentDialogView,
  );

  return {
    conversationAlert,
    mocks: {
      messageThread,
      numberFormatter,
      smsOptOut,
    },
  };
};

describe('ConversationAlert', () => {
  it('builds moved-to-Shared tab alert info when reply callback is provided', () => {
    const { conversationAlert } = createConversationAlert();
    const onReplyInSharedTab = jest.fn();

    const result = conversationAlert.getAlertInfo(
      {
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any,
      {
        onReplyInSharedTab,
      },
    );

    expect(result.showAlert).toBe(true);
    expect(result.alertProps).toEqual(
      expect.objectContaining({
        severity: 'info',
      }),
    );

    const alertContent = result.alertProps!.children as any;
    expect(alertContent.type).toBe(MovedToSharedTabAlert);
    expect(alertContent.props.phoneNumber).toBe('(555) 000-1111');

    alertContent.props.onReplyInSharedTab();
    expect(onReplyInSharedTab).toHaveBeenCalledTimes(1);
  });

  it('renders moved-to-Shared tab alert link and invokes reply callback', () => {
    const onReplyInSharedTab = jest.fn();

    render(
      React.createElement(MovedToSharedTabAlert, {
        phoneNumber: '(555) 000-1111',
        onReplyInSharedTab,
      }),
    );

    expect(
      screen.getByText(
        'Texting from the number (555) 000-1111 has been moved to Shared tab.',
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reply in Shared tab'));

    expect(onReplyInSharedTab).toHaveBeenCalledTimes(1);
  });

  it('keeps moved-to-Shared tab alert disabled when reply callback is absent', () => {
    const { conversationAlert } = createConversationAlert();

    expect(
      conversationAlert.getAlertInfo({
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any),
    ).toEqual({
      showAlert: false,
      alertProps: undefined,
    });
  });

  it('marks inbound historical direct conversations as moved to Shared tab', () => {
    const { conversationAlert, mocks } = createConversationAlert();

    expect(
      conversationAlert.getMovedToSharedTabInfo({
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any),
    ).toEqual({
      phoneNumber: '(555) 000-1111',
    });

    expect(mocks.messageThread.isSharedSmsSenderNumber).toHaveBeenCalledWith(
      '+15550001111',
    );
    expect(mocks.numberFormatter.formatNumber).toHaveBeenCalledWith(
      '+15550001111',
    );
  });

  it('marks outbound historical direct conversations as moved to Shared tab', () => {
    const { conversationAlert, mocks } = createConversationAlert();

    expect(
      conversationAlert.getMovedToSharedTabInfo({
        direction: 'Outbound',
        from: { phoneNumber: '+15550001111' },
      } as any),
    ).toEqual({
      phoneNumber: '(555) 000-1111',
    });

    expect(mocks.messageThread.isSharedSmsSenderNumber).toHaveBeenCalledWith(
      '+15550001111',
    );
  });

  it('keeps direct conversations editable when site shared support is unavailable', () => {
    const { conversationAlert, mocks } = createConversationAlert({
      hasCompanySiteSupport: false,
      isSharedSenderNumber: false,
    });

    expect(
      conversationAlert.getMovedToSharedTabInfo({
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any),
    ).toBeNull();
    expect(mocks.messageThread.isSharedSmsSenderNumber).toHaveBeenCalledWith(
      '+15550001111',
    );
  });

  it('keeps direct conversations editable when company site support is available', () => {
    const { conversationAlert } = createConversationAlert({
      isSharedSenderNumber: false,
    });

    expect(
      conversationAlert.getMovedToSharedTabInfo({
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any),
    ).toBeNull();
  });

  it('keeps existing SMS permission alert before consent alerts', () => {
    const { conversationAlert } = createConversationAlert({
      smsPermissionReason: 'noComposePermission',
      smsConsent: {
        getConsentStatusForConversation: jest.fn(() => ({
          isOptOut: true,
          requiredOptInLoss: true,
        })),
        canAddConsent: true,
      },
    });

    const result = conversationAlert.getAlertInfo({
      direction: 'Inbound',
      to: [{ phoneNumber: '+15550001111' }],
    } as any);
    const alertContent = result.alertProps!.children as any;

    expect(alertContent.type).toBe(SmsAccountCapabilityAlertContent);
  });

  it.each(['noNumberAvailable', 'receiveOnlyNumber'])(
    'falls back to consent opt-out alert for %s',
    (smsPermissionReason) => {
      const { conversationAlert } = createConversationAlert({
        smsPermissionReason,
        smsConsent: {
          getConsentStatusForConversation: jest.fn(() => ({
            isOptOut: true,
            requiredOptInLoss: true,
          })),
        },
      });

      const result = conversationAlert.getAlertInfo({
        direction: 'Inbound',
        to: [{ phoneNumber: '+15550001111' }],
      } as any);
      const alertContent = result.alertProps!.children as any;

      expect(result.showAlert).toBe(true);
      expect(result.alertProps).toEqual(
        expect.objectContaining({
          severity: 'warning',
        }),
      );
      expect(alertContent.type).toBe(OptOutAlert);
    },
  );

  it('shows opt-out alert when effective consent has valid opt-out', () => {
    const { conversationAlert } = createConversationAlert({
      smsConsent: {
        getConsentStatusForConversation: jest.fn(() => ({
          isOptOut: true,
          requiredOptInLoss: false,
        })),
      },
    });

    const result = conversationAlert.getAlertInfo({
      direction: 'Inbound',
      to: [{ phoneNumber: '+15550001111' }],
    } as any);
    const alertContent = result.alertProps!.children as any;

    expect(result.showAlert).toBe(true);
    expect(alertContent.type).toBe(OptOutAlert);
  });

  it('shows consent required alert and opens add consent only for edit level', () => {
    const openAddConsentDialog = jest.fn();
    const conversation = {
      conversationId: 'conversation-1',
      type: 'Text',
      direction: 'Inbound',
      self: { phoneNumber: '+12025550100' },
      correspondents: [{ phoneNumber: '+16505550123' }],
    } as any;
    const { conversationAlert } = createConversationAlert({
      smsConsent: {
        getConsentStatusForConversation: jest.fn(() => ({
          isOptOut: false,
          requiredOptInLoss: true,
        })),
        canAddConsent: true,
      },
      smsConsentDialogView: {
        openAddConsentDialog,
      },
    });

    const result = conversationAlert.getAlertInfo(conversation);
    const alertContent = result.alertProps!.children as any;

    expect(alertContent.type).toBe(SmsConsentRequiredAlert);
    expect(alertContent.props.canAddConsent).toBe(true);

    alertContent.props.onAddConsentClick();

    expect(openAddConsentDialog).toHaveBeenCalledWith({
      numbers: {
        from: '+12025550100',
        to: '+16505550123',
      },
      consentEntry: 'Text conversation',
    });
  });

  it('hides add consent link when consent control level is read-only', () => {
    const { conversationAlert } = createConversationAlert({
      smsConsent: {
        getConsentStatusForConversation: jest.fn(() => ({
          isOptOut: false,
          requiredOptInLoss: true,
        })),
        canAddConsent: false,
      },
    });

    const result = conversationAlert.getAlertInfo({
      direction: 'Inbound',
      to: [{ phoneNumber: '+15550001111' }],
    } as any);
    const alertContent = result.alertProps!.children as any;

    expect(alertContent.type).toBe(SmsConsentRequiredAlert);
    expect(alertContent.props.canAddConsent).toBe(false);
  });
});
