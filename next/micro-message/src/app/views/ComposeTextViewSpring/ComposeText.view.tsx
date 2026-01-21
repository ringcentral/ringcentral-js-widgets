import {
  AppFeatures,
  ConnectivityMonitor,
  NumberFormatter,
  RateLimiter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import type { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useMemo, useRef } from 'react';

import {
  COMPOSE_TEXT_CONVERSATION,
  ComposeText,
  Conversations,
  type FilteredConversation,
  MessageSender,
  MessageStore,
  type SmsConversationsOptions,
} from '../../services';
import { SmsOptOutView } from '../SmsOptOutView';
import { SmsTemplateView } from '../SmsTemplateView';

import type {
  ComposeTextPanelSpringProps,
  ComposeTextViewSpringOptions,
  ComposeTextViewSpringProps,
} from './ComposeText.view.interface';
import { ComposeTextPanel } from './ComposeTextPanel';

@injectable({
  name: 'ComposeTextViewSpring',
})
export class ComposeTextViewSpring extends RcViewModule {
  constructor(
    private _composeText: ComposeText,
    private _connectivityMonitor: ConnectivityMonitor,
    private _contactSearch: ContactSearch,
    private _conversations: Conversations,
    private _messageSender: MessageSender,
    private _messageStore: MessageStore,
    private _rateLimiter: RateLimiter,
    private _appFeatures: AppFeatures,
    private _router: RouterPlugin,
    private _numberFormatter: NumberFormatter,
    private _smsTemplateView: SmsTemplateView,
    @optional('ComposeTextViewSpringOptions')
    private _composeTextViewOptions?: ComposeTextViewSpringOptions,
    @optional('SmsConversationsOptions')
    private _smsConversationsOptions?: SmsConversationsOptions,
    @optional() private _smsOptOutView?: SmsOptOutView,
    @optional() private _contactMatcher?: ContactMatcher,
  ) {
    super();
  }

  @dynamic('ContactSearchView')
  private readonly _contactSearchView?: ContactSearchView;

  get showSpinner() {
    return !(
      this._composeText.ready &&
      this._messageSender.ready &&
      this._appFeatures.ready &&
      this._contactSearch.ready
    );
  }

  getUIProps(
    _: ComposeTextViewSpringProps,
  ): UIProps<ComposeTextPanelSpringProps> {
    const isContentEmpty =
      this._composeText.messageText.length === 0 &&
      (!this._composeText.attachments ||
        this._composeText.attachments.length === 0);

    return {
      sendButtonDisabled:
        !(this._composeText.ready && this._messageSender.idle) ||
        isContentEmpty ||
        this._composeText.hasInvalidToNumbers ||
        (this._composeText.toNumbers.length === 0 &&
          this._composeText.typingToNumber.length === 0) ||
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.restricted,
      senderNumbers: this.senderNumbers,
      senderNumber: this._composeText.senderNumber,
      typingToNumber: this._composeText.typingToNumber,
      toNumbers: this._composeText.toNumbers,
      messageText: this._composeText.messageText,
      showSpinner: this.showSpinner,
      attachments: this._composeText.attachments,
      supportAttachment: this._appFeatures.hasSendMMSPermission,
      allowedCreateGroupText:
        this._appFeatures.hasSendMMSPermission &&
        this._composeText.toNumbers.length > 1 &&
        !this._composeText.disabledGroupMessage,
      createGroupChecked: this._composeText.createGroupChecked,
      maxRecipients: this._composeText.maxRecipients,
      acceptFileTypes: this._conversations.acceptFileTypes,
      disabledGroupMessage: this._composeText.disabledGroupMessage,
    };
  }

  // TODO: we currently don't support send sms from department number, so we need to filter out department numbers to avoid user not able to see the messages from department number
  @computed
  get senderNumbers() {
    return this._messageSender.senderNumbersList.filter(
      (number) => number.extension?.type !== 'Department',
    );
  }

  getUIFunctions(
    _: ComposeTextViewSpringProps,
  ): UIFunctions<ComposeTextPanelSpringProps> {
    return {
      send: async (text, attachments) => {
        try {
          if (this._composeTextViewOptions?.onDncVerify) {
            const send = await this._composeTextViewOptions?.onDncVerify(
              this._composeText.toNumbers,
            );
            if (!send) {
              return;
            }
          }
          const responses = await this._composeText.send(text, attachments);
          if (!responses || responses.length === 0) {
            return;
          }
          this._messageStore.pushMessages(responses as any);
          if (responses.length === 1) {
            const firstItem = responses[0] as any;
            const conversationId = firstItem?.conversation?.id;
            if (!conversationId) {
              return;
            }
            await this._smsConversationsOptions?.checkDncStatusOfConversation?.(
              conversationId!,
            );
            await this._smsConversationsOptions?.autoLogTaskIfEnabled?.(
              conversationId!,
            );
            this._router.push(`/conversations/${conversationId}`);
          } else {
            this._router.push('/messages');
          }
          this._conversations.relateCorrespondentEntity(responses as any);
          this._composeText.clean();
          return;
        } catch (err) {
          console.log(err);
        }
      },
      updateSenderNumber: (phoneNumber) =>
        this._composeText.updateSenderNumber(phoneNumber),
      updateTypingToNumber: (toNumber: string) => {
        this._composeText.updateTypingToNumber(toNumber);
      },
      cleanTypingToNumber: () => this._composeText.cleanTypingToNumber(),
      addToNumbers: (toNumbers) => this._composeText.addToNumbers(toNumbers),
      removeToNumber: (toNumber) => this._composeText.removeToNumber(toNumber),
      updateMessageText: (...args) =>
        this._composeText.updateMessageText(...args),
      addAttachments: (...args) => this._composeText.addAttachments(...args),
      removeAttachment: (...args) =>
        this._composeText.removeAttachment(...args),
      onCreateGroupTextOptionChanged: (checked) => {
        this._composeText.setCreateGroupChecked(checked);
      },
      onBackClick: () => this._router.push('/messages'),
    };
  }

  component(props: ComposeTextViewSpringProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._composeTextViewOptions?.component || ComposeTextPanel;

    const toNumbers = _props.toNumbers;

    const contactMapping = useConnector(
      () => this._contactMatcher?.dataMapping,
    );

    // find a way to add data to dataMapping
    const conversation = useMemo(
      () =>
        this._smsOptOutView
          ? ({
              ...COMPOSE_TEXT_CONVERSATION,
              correspondentMatchesList: toNumbers.map((toNumber) => {
                // normalize number to ensure the number is matcher mapping with same key
                const normalizedNumber = this._numberFormatter.normalizeNumber(
                  toNumber.phoneNumber,
                );

                return contactMapping?.[normalizedNumber] || [];
              }),
            } as FilteredConversation)
          : undefined,
      [contactMapping, toNumbers],
    );

    return (
      <Component
        {..._props}
        {...uiFunctions}
        ContactSearch={this._contactSearchView?.component}
        inputRef={inputRef}
        toolbar={
          <>
            <this._smsTemplateView.component targetInputRef={inputRef} />
            {conversation && this._smsOptOutView && (
              <this._smsOptOutView.component conversation={conversation} />
            )}
          </>
        }
        endAdornment={
          conversation && this._smsOptOutView ? (
            <this._smsOptOutView.Chip conversation={conversation} />
          ) : undefined
        }
      />
    );
  }
}
