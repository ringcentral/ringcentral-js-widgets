import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  AppFeatures,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { type Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  computed,
  dynamic,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useEffect, useRef } from 'react';

import {
  ConversationLogger,
  Conversations,
  MessageStore,
  SmsConversations,
  type SmsConversationsOptions,
} from '../../services';
import { ConversationsViewSpring } from '../ConversationsViewSpring';
import { SmsOptOutView } from '../SmsOptOutView';
import { SmsTemplateView } from '../SmsTemplateView';

import type {
  ConversationViewSpringOptions,
  ConversationViewSpringPanelProps,
  ConversationViewSpringProps,
} from './Conversation.view.interface';
import { ConversationAlert } from './ConversationAlert';
import { ConversationPanel } from './ConversationPanel';

function sortByCreationTimeDesc<T extends { creationTime?: number }>(
  a: T,
  b: T,
) {
  if (!a.creationTime || !b.creationTime || a.creationTime === b.creationTime)
    return 0;
  return a.creationTime > b.creationTime ? 1 : -1;
}

@injectable({
  name: 'PersonalConversationViewSpring',
})
export class PersonalConversationViewSpring extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  @computed
  get messages() {
    const conversationId = this._conversations.currentConversationId;
    if (!conversationId) {
      return [];
    }

    return this._conversations
      .getMessages(conversationId)
      .sort((a, b) => sortByCreationTimeDesc(a, b));
  }

  constructor(
    private _smsTemplateView: SmsTemplateView,
    private _portManager: PortManager,
    private _messageStore: MessageStore,
    private _appFeatures: AppFeatures,
    private _regionSettings: RegionSettings,
    private _conversations: Conversations,
    private _rateLimiter: RateLimiter,
    private _connectivityMonitor: ConnectivityMonitor,
    private _router: RouterPlugin,
    private _integrationConfig: IntegrationConfig,
    private _smsConversations: SmsConversations,
    private _conversationsViewSpring: ConversationsViewSpring,
    private _conversationAlert: ConversationAlert,
    @optional() private _conversationLogger?: ConversationLogger,
    @optional() private _contactMatcher?: ContactMatcher,
    @optional('ConversationViewOptions')
    private _conversationViewOptions?: ConversationViewSpringOptions,
    @optional('SmsConversationsOptions')
    private _smsConversationsOptions?: SmsConversationsOptions,
    @optional() private _smsOptOutView?: SmsOptOutView,
  ) {
    super();
  }

  getUIProps(
    _: ConversationViewSpringProps,
  ): UIProps<ConversationViewSpringPanelProps> {
    const disableLinks =
      this._rateLimiter.restricted || !this._connectivityMonitor.connectivity;
    const conversationId = this._conversations.currentConversationId!;
    const showSpinner = !(
      (!this._contactMatcher || this._contactMatcher.ready) &&
      this._regionSettings.ready &&
      this._conversations.ready &&
      this._rateLimiter.ready &&
      this._connectivityMonitor.ready &&
      (!this._conversationLogger || this._conversationLogger.ready)
    );

    const hasInputContent =
      (this._conversations.messageText &&
        this._conversations.messageText.length > 0) ||
      (this._conversations.attachments &&
        this._conversations.attachments.length > 0);

    const conversation =
      this._conversations.formattedConversationsMap.get(conversationId)!;

    const { showAlert, alertProps } =
      this._conversationAlert.getAlertInfo(conversation);

    return {
      messages: this.messages,
      attachments: this._conversations.attachments,
      acceptFileTypes: this._conversations.acceptFileTypes,
      createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip,
      showLogPopover: this._conversationViewOptions?.showLogPopover,
      conversation,
      messageText: this._conversations.messageText,
      sendButtonDisabled:
        this._conversations.pushing ||
        disableLinks ||
        !hasInputContent ||
        showSpinner,
      displayLogStatus: this._smsConversations.checkIsSupportLog(conversation),
      supportAttachment: this._appFeatures.hasSendMMSPermission,
      showAlert,
      alertProps,
    };
  }

  getUIFunctions(
    _: ConversationViewSpringProps,
  ): UIFunctions<ConversationViewSpringPanelProps> {
    return {
      useConversationItemInfo: (conversation) =>
        this._conversationsViewSpring.useConversationItemInfo(conversation, {
          pageType: 'text',
        }),
      useActionsHandler: this._conversationsViewSpring.useActionsHandler,
      replyToReceivers: async (text, attachments) => {
        const currentConversationId = this._conversations.currentConversationId;
        if (!currentConversationId) return;

        const sendPromise = this._conversations.replyToReceivers(
          text,
          attachments,
        );

        sendPromise
          .then(() => {
            this._smsConversationsOptions?.checkDncStatusOfConversation?.(
              currentConversationId,
            );
            this._smsConversationsOptions?.autoLogTaskIfEnabled?.(
              currentConversationId,
            );
          })
          .catch((error) => {
            this.logger.error('[SMS] auto-log failed', error);
          });
      },
      updateMessageText: async (text) => {
        return !!(await this._conversations.updateMessageText(text));
      },
      addAttachments: (attachments) =>
        this._conversations.addAttachments(attachments),
      removeAttachment: (attachment) =>
        this._conversations.removeAttachment(attachment),
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

  component(props: ConversationViewSpringProps) {
    this._router.useParams<{ conversationId: string }>((params) => {
      // use sync method to avoid the data not conversationId when into the conversation view
      this._conversations._loadConversation(params.conversationId);

      // also sync state to server in worker mode to avoid state sync back with empty data
      if (this._portManager.shared && this._portManager.isMainTab) {
        this._conversations.loadConversation(params.conversationId);
      }
    });

    useEffect(() => {
      return () => {
        if (this._portManager.shared) {
          if (this._portManager.isMainTab) {
            this._conversations.unloadConversation();
          }
        } else {
          this._conversations.unloadConversation();
        }
      };
    }, []);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const { conversation, messages } = _props;

    const conversationId = conversation?.conversationId;

    // when enter this page, mark all messages as read
    useEffect(() => {
      if (!conversationId || messages.length === 0) return;

      if (this._portManager.shared) {
        if (this._portManager.isMainTab) {
          this._messageStore.readMessages(conversationId);
        }
      } else {
        this._messageStore.readMessages(conversationId);
      }
    }, [conversationId, messages]);

    if (!conversation) {
      return null;
    }

    const Component =
      this._conversationViewOptions?.component || ConversationPanel;
    return (
      <Component
        {..._props}
        {...uiFunctions}
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
