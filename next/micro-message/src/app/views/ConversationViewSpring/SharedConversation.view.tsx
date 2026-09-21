import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  AppFeatures,
  Auth,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { BlockPlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useEffect, useMemo, useRef } from 'react';

import {
  ConversationLogger,
  Conversations,
  MessageThread,
  MessageThreadLogger,
  SmsConsent,
} from '../../services';
import { ConversationsViewSpring } from '../ConversationsViewSpring';
import { SmsOptOutView } from '../SmsOptOutView';
import { SmsTemplateView } from '../SmsTemplateView';

import type {
  ConversationViewSpringOptions,
  ConversationViewSpringPanelProps,
} from './Conversation.view.interface';
import { ConversationAlert } from './ConversationAlert';
import {
  ConversationNoAccessPanel,
  ConversationPanel,
} from './ConversationPanel';

type SharedConversationViewProps = {
  conversationId: string;
};

@injectable({
  name: 'SharedConversationView',
})
export class SharedConversationView extends RcViewModule {
  constructor(
    private _smsTemplateView: SmsTemplateView,
    private _theme: Theme,
    private _conversations: Conversations,
    private _auth: Auth,
    private _regionSettings: RegionSettings,
    private _rateLimiter: RateLimiter,
    private _appFeatures: AppFeatures,
    private _connectivityMonitor: ConnectivityMonitor,
    private _router: RouterPlugin,
    private _integrationConfig: IntegrationConfig,
    private _conversationsViewSpring: ConversationsViewSpring,
    private _messageThread: MessageThread,
    private _block: BlockPlugin,
    private _conversationAlert: ConversationAlert,
    @optional() private _conversationLogger?: ConversationLogger,
    @optional() private _contactMatcher?: ContactMatcher,
    @optional('ConversationViewOptions')
    private _conversationViewOptions?: ConversationViewSpringOptions,
    @optional() private _smsOptOutView?: SmsOptOutView,
    @optional() private _messageThreadLogger?: MessageThreadLogger,
    @optional() private _smsConsent?: SmsConsent,
    @optional() private _portManager?: PortManager,
  ) {
    super();
  }

  getUIProps({
    conversationId,
  }: SharedConversationViewProps): Omit<
    UIProps<ConversationViewSpringPanelProps>,
    'messages' | 'conversation'
  > &
    Partial<Pick<UIProps<ConversationViewSpringPanelProps>, 'conversation'>> &
    Pick<ConversationViewSpringPanelProps, 'renderLogIndicator'> {
    const disableLinks =
      this._rateLimiter.restricted || !this._connectivityMonitor.connectivity;

    const showSpinner = !(
      (!this._contactMatcher || this._contactMatcher.ready) &&
      this._regionSettings.ready &&
      this._rateLimiter.ready &&
      this._connectivityMonitor.ready &&
      (!this._conversationLogger || this._conversationLogger.ready)
    );

    const conversation =
      this._messageThread.getThreadConversation(conversationId);

    if (!conversation) {
      return {
        conversation,
        sendButtonDisabled: false,
      };
    }

    // use the result conversation id, because the exist conversationId from domain may be wrong because there already have new messages coming in
    const threadConversationId = conversation.conversationId!;

    const thread = this._messageThread.getThread(threadConversationId);
    const threadMetadata =
      this._messageThread.getThreadMetadata(threadConversationId);
    const sending = threadMetadata?.loading ?? false;
    const threadInputValue =
      this._messageThread.getInputValue(threadConversationId);
    const attachments =
      this._messageThread.getAttachments(threadConversationId);

    const { showAlert, alertProps } =
      this._conversationAlert.getAlertInfo(conversation);

    return {
      createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip,
      showLogPopover: this._conversationViewOptions?.showLogPopover,
      // don't show log indicator for shared conversation for now
      renderLogIndicator: undefined,
      conversation,
      messageText: threadInputValue,
      attachments,
      acceptFileTypes: this._conversations.acceptFileTypes,
      sendButtonDisabled: Boolean(
        disableLinks ||
        !(threadInputValue.length || attachments.length > 0) ||
        showSpinner ||
        sending,
      ),
      threadInfo: thread?.threadInfo,
      threadMetadata,
      sending,
      extensionId: this._auth.ownerId,
      supportAttachment: this._appFeatures.hasSendMMSPermission,
      showAlert,
      alertProps,
      showSharedSmsLogReminder:
        this._messageThreadLogger?.shouldShowSharedSmsLogReminder ?? false,
    };
  }

  getUIFunctions({
    conversationId,
  }: SharedConversationViewProps): UIFunctions<ConversationViewSpringPanelProps> {
    return {
      useConversationItemInfo: (conversation) =>
        this._conversationsViewSpring.useConversationItemInfo(conversation, {
          pageType: 'text',
        }),
      useActionsHandler: this._conversationsViewSpring.useActionsHandler,
      replyToReceivers: async (text, attachments) => {
        if (!conversationId) return;

        const threads = this._messageThread.data.threads;
        const thread = threads[conversationId];
        const threadInfo = thread?.threadInfo;
        const isResolved = threadInfo?.status === 'Resolved';

        if (isResolved) {
          await this._block.next(async () => {
            const response = await this._messageThread.sendThreadMessage(
              conversationId,
              text,
              // For resolved threads, don't send threadId (backend will create new thread)
              true,
              attachments,
            );

            if (response) {
              await this._router.push(`/conversations/${response.threadId}`);
            }
          });

          return;
        }

        // For active threads, use sendThreadMessage
        await this._messageThread.sendThreadMessage(
          conversationId,
          text,
          false,
          attachments,
        );
      },
      updateMessageText: async (text) => {
        if (!conversationId) return;
        this._messageThread.setInputValue(conversationId, text);
        return true;
      },
      addAttachments: (attachments) =>
        this._messageThread.addAttachments(conversationId, attachments),
      removeAttachment: (attachment) =>
        this._messageThread.removeAttachment(conversationId, attachment),
      onLinkClick: (href: string) => {
        let linkType = 'website';
        if (href.startsWith('mailto:')) {
          linkType = 'email';
        }

        trackEvent<any>(trackEvents.clickConversationHyperlink, {
          'Hyperlink type': linkType,
        });
      },
      goBack: async () => {
        await slideOutViewTransition(
          () => this._router.push('/messages'),
          this._theme?.reducedMotion,
        );
      },
      onDismissSharedSmsLogReminder: () => {
        this._messageThreadLogger?.dismissSharedSmsLogReminder();
      },
    };
  }

  component(props: SharedConversationViewProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const uiFunctions = useMemo(() => this.getUIFunctions(props), [props]);

    const messages = useConnector(() =>
      this._messageThread.getThreadMessages(props.conversationId),
    );

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const { conversation, ...rest } = _props;

    useEffect(() => {
      if (!this._portManager?.shared || this._portManager?.isMainTab) {
        this._smsConsent?.loadConversationConsentData(conversation!);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation?.conversationId]);

    if (!conversation) {
      this.logger.error('Conversation not found', {
        conversationId: props.conversationId,
      });

      return <ConversationNoAccessPanel goBack={uiFunctions.goBack} />;
    }

    const Component =
      this._conversationViewOptions?.component || ConversationPanel;
    return (
      <Component
        {...rest}
        {...uiFunctions}
        conversation={conversation}
        timeKey="lastModifiedTime"
        messages={messages}
        inputRef={inputRef}
        toolbar={
          <>
            <this._smsTemplateView.component targetInputRef={inputRef} />
            {this._smsOptOutView && (
              <this._smsOptOutView.component conversation={conversation} />
            )}
          </>
        }
        endAdornment={
          this._smsOptOutView ? (
            <this._smsOptOutView.Chip conversation={conversation} />
          ) : undefined
        }
      />
    );
  }
}
