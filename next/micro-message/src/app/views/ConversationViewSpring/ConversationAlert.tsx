import { NumberFormatter } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';
import { type AlertProps } from '@ringcentral/spring-ui';
import React from 'react';

import {
  FormattedConversation,
  getConversationNumbers,
  MessageSender,
  MessageThread,
  SmsConsent,
  SmsOptOut,
} from '../../services';
import { SmsConsentDialogView } from '../SmsConsentDialogView';

import type { ConversationViewSpringOptions } from './Conversation.view.interface';
import {
  MovedToSharedTabAlert,
  OptOutAlert,
  SmsAccountCapabilityAlertContent,
  SmsCapabilityAlert,
  SmsConsentRequiredAlert,
} from './ConversationPanel';

type GetAlertInfoOptions = {
  onReplyInSharedTab?: () => Promise<void> | void;
};

@injectable({
  name: 'ConversationAlert',
})
export class ConversationAlert extends RcModule {
  constructor(
    private _messageSender: MessageSender,
    private _numberFormatter: NumberFormatter,
    @optional() private _smsOptOut?: SmsOptOut,
    @optional() private _messageThread?: MessageThread,
    @optional() private _smsConsent?: SmsConsent,
    @optional() private _smsConsentDialogView?: SmsConsentDialogView,
    @optional('ConversationViewOptions')
    private _conversationViewOptions?: ConversationViewSpringOptions,
  ) {
    super();
  }

  private _getConversationSenderPhoneNumber(
    conversation: FormattedConversation | undefined,
  ) {
    if (!conversation) {
      return undefined;
    }
    return conversation.direction === 'Outbound'
      ? conversation.from?.phoneNumber || conversation.from?.extensionNumber
      : conversation.to?.[0]?.phoneNumber ||
          conversation.to?.[0]?.extensionNumber;
  }

  getMovedToSharedTabInfo(conversation: FormattedConversation | undefined) {
    const phoneNumber = this._getConversationSenderPhoneNumber(conversation);

    if (
      !this._messageThread ||
      !phoneNumber ||
      !this._messageThread?.hasPermission
    ) {
      return null;
    }

    const shouldSendShared =
      this._messageThread.isSharedSmsSenderNumber(phoneNumber);

    if (!shouldSendShared) {
      return null;
    }

    return {
      phoneNumber: this._numberFormatter.formatNumber(phoneNumber),
    };
  }

  /**
   * Check if the conversation's phone number has SMS capability
   */
  getSmsSentCapability(conversation: FormattedConversation | undefined): {
    hasCapability: boolean;
    phoneNumber?: string;
  } {
    if (
      !conversation ||
      // in backend when be pager type of conversation, that not have sender permission check, that be internal, always have capability
      conversation.type === 'Pager'
    ) {
      return { hasCapability: true };
    }

    const phoneNumber = this._getConversationSenderPhoneNumber(conversation);

    if (!phoneNumber) {
      return { hasCapability: true };
    }

    const formattedPhoneNumber =
      this._numberFormatter.formatNumber(phoneNumber);

    const hasCapability =
      this._messageSender.senderNumberMap.has(formattedPhoneNumber);

    return {
      hasCapability,
      phoneNumber: formattedPhoneNumber,
    };
  }

  /**
   * Get alert information for a conversation
   */
  getAlertInfo(
    conversation?: FormattedConversation,
    options: GetAlertInfoOptions = {},
  ) {
    const { isOptOut: consentOptOut, requiredOptInLoss } =
      this._smsConsent?.getConsentStatusForConversation(conversation) || {};
    const isOptOut = Boolean(
      this._smsOptOut?.getIsOptOutConversation(conversation) || consentOptOut,
    );

    const movedToSharedTabInfo = options.onReplyInSharedTab
      ? this.getMovedToSharedTabInfo(conversation)
      : null;
    const smsCapabilityCheck = this.getSmsSentCapability(conversation);
    const notHasSmsCapability = !smsCapabilityCheck.hasCapability;
    const smsPermissionReason = this._messageSender.smsPermissionReason;

    let alertProps: AlertProps | undefined;
    if (smsPermissionReason === 'noComposePermission') {
      alertProps = {
        children: (
          <SmsAccountCapabilityAlertContent
            reason={smsPermissionReason}
            readOnly
            showIcon
          />
        ),
        severity: 'info',
      };
    } else if (notHasSmsCapability && smsCapabilityCheck.phoneNumber) {
      alertProps = {
        children: (
          <SmsCapabilityAlert phoneNumber={smsCapabilityCheck.phoneNumber} />
        ),
        severity: 'info',
      };
    } else if (movedToSharedTabInfo) {
      alertProps = {
        children: (
          <MovedToSharedTabAlert
            phoneNumber={movedToSharedTabInfo.phoneNumber}
            onReplyInSharedTab={options.onReplyInSharedTab!}
          />
        ),
        severity: 'info',
      };
    } else if (isOptOut) {
      alertProps = {
        children: <OptOutAlert />,
        severity: 'warning',
      };
    } else if (requiredOptInLoss) {
      alertProps = {
        children: (
          <SmsConsentRequiredAlert
            canAddConsent={this._smsConsent?.canAddConsent}
            onAddConsentClick={() => {
              const numbers = getConversationNumbers(conversation);
              if (numbers) {
                this._smsConsentDialogView?.openAddConsentDialog({
                  numbers,
                  consentEntry: 'Text conversation',
                });
              }
            }}
          />
        ),
        severity: 'info',
      };
    } else {
      alertProps = this._conversationViewOptions?.alertProps?.();
    }

    return {
      showAlert:
        !!movedToSharedTabInfo ||
        isOptOut ||
        requiredOptInLoss ||
        !!smsPermissionReason ||
        notHasSmsCapability ||
        this._conversationViewOptions?.showAlert?.() ||
        false,
      alertProps,
    };
  }
}
