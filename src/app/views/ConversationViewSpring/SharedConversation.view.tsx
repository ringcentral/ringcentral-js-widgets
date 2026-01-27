import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  ConnectivityMonitor,
  ExtensionInfo,
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
  RcViewModule,
  RouterPlugin,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useMemo, useRef } from 'react';

import { ConversationLogger, MessageThread } from '../../services';
import { ConversationsViewSpring } from '../ConversationsViewSpring';
import { SmsOptOutView } from '../SmsOptOutView';
import { SmsTemplateView } from '../SmsTemplateView';

import type {
  ConversationViewSpringOptions,
  ConversationViewSpringPanelProps,
} from './Conversation.view.interface';
import { ConversationAlert } from './ConversationAlert';
import { ConversationPanel } from './ConversationPanel';

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
    private _extensionInfo: ExtensionInfo,
    private _regionSettings: RegionSettings,
    private _rateLimiter: RateLimiter,
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
  ) {
    super();
  }

  getUIProps({
    conversationId,
  }: SharedConversationViewProps): Omit<
    UIProps<ConversationViewSpringPanelProps>,
    'messages' | 'conversation'
  > &
    Partial<Pick<UIProps<ConversationViewSpringPanelProps>, 'conversation'>> {
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
    const threadInputValue =
      this._messageThread.getInputValue(threadConversationId);

    const { showAlert, alertProps } =
      this._conversationAlert.getAlertInfo(conversation);

    return {
      createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip,
      showLogPopover: this._conversationViewOptions?.showLogPopover,
      conversation,
      messageText: threadInputValue,
      sendButtonDisabled: Boolean(
        disableLinks ||
          !threadInputValue.length ||
          showSpinner ||
          threadMetadata?.loading,
      ),
      threadInfo: thread?.threadInfo,
      threadMetadata,
      extensionId: this._extensionInfo?.id,
      supportAttachment: false,
      showAlert,
      alertProps,
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
      replyToReceivers: async (text) => {
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
            );

            if (response) {
              await this._router.push(`/conversations/${response.threadId}`);
            }
          });

          return;
        }

        // For active threads, use sendThreadMessage
        await this._messageThread.sendThreadMessage(conversationId, text);
      },
      updateMessageText: async (text) => {
        if (!conversationId) return;
        this._messageThread.setInputValue(conversationId, text);
        return true;
      },
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

    if (!conversation) {
      this.logger.error('Conversation not found', {
        conversationId: props.conversationId,
      });
      return null;
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
