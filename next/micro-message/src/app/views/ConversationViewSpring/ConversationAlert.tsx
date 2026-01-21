import { NumberFormatter } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';
import type { AlertProps } from '@ringcentral/spring-ui';
import React from 'react';

import {
  FormattedConversation,
  MessageSender,
  SmsOptOut,
} from '../../services';

import type { ConversationViewSpringOptions } from './Conversation.view.interface';
import { OptOutAlert, SmsCapabilityAlert } from './ConversationPanel';

@injectable({
  name: 'ConversationAlert',
})
export class ConversationAlert extends RcModule {
  constructor(
    private _messageSender: MessageSender,
    private _numberFormatter: NumberFormatter,
    @optional() private _smsOptOut?: SmsOptOut,
    @optional('ConversationViewOptions')
    private _conversationViewOptions?: ConversationViewSpringOptions,
  ) {
    super();
  }

  /**
   * Check if the conversation's phone number has SMS capability
   */
  getSmsSentCapability(conversation: FormattedConversation): {
    hasCapability: boolean;
    phoneNumber?: string;
  } {
    if (!conversation) {
      return { hasCapability: true };
    }

    const phoneNumber =
      conversation.direction === 'Outbound'
        ? conversation.from?.phoneNumber
        : conversation.to?.[0]?.phoneNumber;

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
  getAlertInfo(conversation: FormattedConversation) {
    const isOptOut = this._smsOptOut?.getIsOptOutConversation(conversation);

    const smsCapabilityCheck = this.getSmsSentCapability(conversation);
    const notHasSmsCapability = !smsCapabilityCheck.hasCapability;

    let alertProps: AlertProps | undefined;
    if (isOptOut) {
      alertProps = {
        children: <OptOutAlert />,
        severity: 'warning',
      };
    } else if (notHasSmsCapability && smsCapabilityCheck.phoneNumber) {
      alertProps = {
        children: (
          <SmsCapabilityAlert phoneNumber={smsCapabilityCheck.phoneNumber} />
        ),
        severity: 'info',
      };
    } else {
      alertProps = this._conversationViewOptions?.alertProps?.();
    }

    return {
      showAlert:
        isOptOut ||
        notHasSmsCapability ||
        this._conversationViewOptions?.showAlert?.() ||
        false,
      alertProps,
    };
  }
}
