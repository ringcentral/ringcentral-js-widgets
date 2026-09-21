import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
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
import {
  ConversationsSyncTabId,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  CallQueues,
  UserPhoneNumberInfo,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useMemo, useRef, useEffect } from 'react';

import {
  COMPOSE_TEXT_CONVERSATION,
  ComposeText,
  Conversations,
  type FilteredConversation,
  MessageSender,
  messageSenderStatus,
  MessageStore,
  type MessageThreadMessageResponse,
  QueueMessageStore,
  SmsConsent,
  type SmsConversationsOptions,
} from '../../services';
import { SmsConsentDialogView } from '../SmsConsentDialogView';
import { SmsOptOutView } from '../SmsOptOutView';
import { SmsTemplateView } from '../SmsTemplateView';

import type {
  ComposeTextPanelSpringProps,
  ComposeTextViewSpringOptions,
  ComposeTextViewSpringProps,
  SenderNumberOption,
} from './ComposeText.view.interface';
import { ComposeTextPanel } from './ComposeTextPanel';
import { t } from './ComposeTextPanel/i18n';

export const COMPOSE_TEXT_BACK_PATH = 'composeTextBackPath';

@injectable({
  name: 'ComposeTextViewSpring',
})
export class ComposeTextViewSpring extends RcViewModule {
  constructor(
    private _syncTabView: SyncTabView,
    private _composeText: ComposeText,
    private _connectivityMonitor: ConnectivityMonitor,
    private _contactSearch: ContactSearch,
    private _conversations: Conversations,
    private _messageSender: MessageSender,
    private _messageStore: MessageStore,
    private _queueMessageStore: QueueMessageStore,
    private _rateLimiter: RateLimiter,
    private _appFeatures: AppFeatures,
    private _router: RouterPlugin,
    private _numberFormatter: NumberFormatter,
    private _smsTemplateView: SmsTemplateView,
    private _callQueues: CallQueues,
    @optional('ComposeTextViewSpringOptions')
    private _composeTextViewOptions?: ComposeTextViewSpringOptions,
    @optional('SmsConversationsOptions')
    private _smsConversationsOptions?: SmsConversationsOptions,
    @optional() private _smsOptOutView?: SmsOptOutView,
    @optional() private _contactMatcher?: ContactMatcher,
    @optional() private _smsConsent?: SmsConsent,
    @optional() private _smsConsentDialogView?: SmsConsentDialogView,
    @optional() private _portManager?: PortManager,
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
    const requiredOptInCount = this._composeText.requiredOptInToNumbers.length;
    return {
      sendButtonDisabled:
        !(this._composeText.ready && this._messageSender.idle) ||
        isContentEmpty ||
        this._composeText.hasInvalidToNumbers ||
        (this._composeText.toNumbers.length === 0 &&
          this._composeText.typingToNumber.length === 0) ||
        !this._messageSender.hasSmsPermission ||
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.restricted,
      senderNumbers: this.senderNumbers,
      senderNumber: this._composeText.senderNumber,
      typingToNumber: this._composeText.typingToNumber,
      toNumbers: this._composeText.toNumbers,
      messageText: this._composeText.messageText,
      showSpinner: this.showSpinner,
      sending: this._messageSender.sendStatus === messageSenderStatus.sending,
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
      requiredOptInCount,
      canAddSmsConsent: this._smsConsent?.canAddConsent,
    };
  }

  @computed
  get senderNumbers(): SenderNumberOption[] {
    const senderNumbers = [
      ...this._messageSender.senderNumbersList.map((number) => ({
        ...number,
        displayLabel: this._getCallQueueName(number),
      })),
      ...this._messageSender.receiveOnlyNumbers.map((number) => ({
        ...number,
        disabled: true,
        displayLabel: this._getCallQueueName(number),
        statusLabel: t('incomingTextsOnly'),
      })),
      ...this._messageSender.registerableNumbers.map((number) => ({
        ...number,
        disabled: true,
        displayLabel: this._getCallQueueName(number),
        statusLabel: t('notSetUpForTexting'),
      })),
    ];

    return senderNumbers;
  }

  private _getCallQueue(number: UserPhoneNumberInfo) {
    const extension = number.extension;
    if (extension?.type !== 'Department' || !extension.id) {
      return undefined;
    }

    return this._callQueues?.getQueue(String(extension.id));
  }

  private _getCallQueueName(number: UserPhoneNumberInfo) {
    return this._getCallQueue(number)?.name;
  }

  @delegate('server')
  async handleAddSmsConsentClick() {
    const toNumber = this._composeText.requiredOptInToNumbers[0];
    this.logger.info('Opening add consent dialog for number', toNumber);
    const from = this._composeText.senderNumber;

    if (!from || !toNumber?.phoneNumber) {
      return;
    }

    this._smsConsentDialogView?.openAddConsentDialog({
      numbers: {
        from,
        to: toNumber.phoneNumber,
      },
      consentEntry: 'Text input box',
    });
  }

  getUIFunctions(
    _: ComposeTextViewSpringProps,
  ): UIFunctions<ComposeTextPanelSpringProps> {
    return {
      send: async (text, attachments) => {
        try {
          if (this._composeTextViewOptions?.onDncVerify) {
            const toNumbers = this._composeText.toNumbers;
            const typingToNumber = this._composeText.typingToNumber;
            const trimmedTypingToNumber = typingToNumber?.trim?.();
            const effectiveToNumbers = trimmedTypingToNumber
              ? [
                  ...toNumbers,
                  { phoneNumber: trimmedTypingToNumber, freeSolo: true },
                ]
              : toNumbers;
            const send =
              await this._composeTextViewOptions?.onDncVerify(
                effectiveToNumbers,
              );
            if (!send) {
              return;
            }
          }
          const responses = await this._composeText.send(text, attachments);
          if (!responses || responses.length === 0) {
            return;
          }
          const isSmsResponses = !!(
            responses[0] &&
            (responses[0] as GetMessageInfoResponse)?.conversation?.id
          );

          if (isSmsResponses) {
            // when be queue message should push into queueMessageStore instead
            const res = responses as GetMessageInfoResponse[];
            const isPager = res[0].type === 'Pager';
            const isQueue = this.preInsertNewMessage(res, isPager);

            if (res.length === 1) {
              const conversationId = res[0]?.conversation?.id!;

              if (isQueue) {
                this.logger.log(
                  'Queue message sent, still not support check DNC status or auto-log',
                );
              } else {
                this.logger.log(
                  'Personal message sent, Checking DNC status and auto-log after send',
                );
                await this._smsConversationsOptions?.checkDncStatusOfConversation?.(
                  conversationId,
                );
                // Log conversation in background so navigation is not blocked
                const logTaskPromise =
                  this._smsConversationsOptions?.autoLogTaskIfEnabled?.(
                    conversationId,
                  );
                if (logTaskPromise) {
                  void logTaskPromise.catch((error: unknown) => {
                    this.logger?.error?.('Auto-log after send failed', error);
                  });
                }
              }

              this._syncTabView.setActive(
                SyncTabId.CONVERSATIONS,
                isQueue
                  ? ConversationsSyncTabId.QUEUE
                  : ConversationsSyncTabId.PERSONAL,
                { currentPath: `/conversations/${conversationId}` },
              );
            } else {
              this._router.push('/messages', {
                [SyncTabId.CONVERSATIONS]: ConversationsSyncTabId.PERSONAL,
              });
            }
            this._conversations.relateCorrespondentEntity(res);
          } else {
            const res = responses as MessageThreadMessageResponse[];
            const threadId = res[0]?.threadId;

            if (res.length === 1 && threadId) {
              this._syncTabView.setActive(
                SyncTabId.CONVERSATIONS,
                ConversationsSyncTabId.SHARED,
                { currentPath: `/conversations/${threadId}` },
              );
            } else {
              this._router.push('/messages', {
                [SyncTabId.CONVERSATIONS]: ConversationsSyncTabId.SHARED,
              });
            }
          }
          this._composeText.clean();
          return;
        } catch (err) {
          this.logger.error('Send message failed', err);
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
      onAddSmsConsentClick: () => this.handleAddSmsConsentClick(),
      updateMessageText: (...args) =>
        this._composeText.updateMessageText(...args),
      addAttachments: (...args) => this._composeText.addAttachments(...args),
      removeAttachment: (...args) =>
        this._composeText.removeAttachment(...args),
      onCreateGroupTextOptionChanged: (checked) => {
        this._composeText.setCreateGroupChecked(checked);
      },
      onBackClick: () => {
        const locationState = this._router.router?.location.state as
          | Record<string, unknown>
          | undefined;
        const backPath = locationState?.[COMPOSE_TEXT_BACK_PATH];

        this._router.push(
          typeof backPath === 'string' ? backPath : '/messages',
        );
      },
    };
  }

  private preInsertNewMessage(res: GetMessageInfoResponse[], isPager: boolean) {
    if (this._queueMessageStore._hasPermission && !isPager) {
      const sender = this.senderNumbers.find(
        (n) => n.phoneNumber === this._composeText.senderNumber,
      );

      const queue = sender && this._getCallQueue(sender);

      if (queue) {
        this._queueMessageStore.pushMessages(res);
        return Boolean(queue);
      }
    }

    this._messageStore.pushMessages(res);
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
    const senderNumber = _props.senderNumber;
    const toNumbersKey = useMemo(
      () => toNumbers.map(({ phoneNumber }) => phoneNumber).join('\n'),
      [toNumbers],
    );

    useEffect(() => {
      if (!this._portManager?.shared || this._portManager?.isMainTab) {
        this._composeText.loadRecipientConsentData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [senderNumber, toNumbersKey]);

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
