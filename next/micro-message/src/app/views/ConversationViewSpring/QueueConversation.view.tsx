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
import {
  ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE,
  SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE,
} from '@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher';
import React, { useEffect, useRef } from 'react';

import {
  buildToNumbersFromConversation,
  conversationsStatus,
  QueueConversations,
  QueueMessageStore,
  SmsConsent,
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
import {
  ConversationNoAccessPanel,
  ConversationPanel,
} from './ConversationPanel';

function sortByCreationTimeDesc<T extends { creationTime?: number }>(
  a: T,
  b: T,
) {
  if (!a.creationTime || !b.creationTime || a.creationTime === b.creationTime)
    return 0;
  return a.creationTime > b.creationTime ? 1 : -1;
}

const QUEUE_ACCEPT_FILE_TYPES =
  process.env.THEME_SYSTEM === 'spring-ui'
    ? SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.concat(
        ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE,
      ).join()
    : SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();

@injectable({
  name: 'QueueConversationView',
})
export class QueueConversationView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  @computed
  get messages() {
    const conversationId = this._queueConversations.currentConversationId;
    if (!conversationId) {
      return [];
    }

    return this._queueConversations
      .getMessages(conversationId)
      .sort((a, b) => sortByCreationTimeDesc(a, b));
  }

  constructor(
    private _smsTemplateView: SmsTemplateView,
    private _portManager: PortManager,
    private _queueMessageStore: QueueMessageStore,
    private _appFeatures: AppFeatures,
    private _regionSettings: RegionSettings,
    private _queueConversations: QueueConversations,
    private _rateLimiter: RateLimiter,
    private _connectivityMonitor: ConnectivityMonitor,
    private _router: RouterPlugin,
    private _integrationConfig: IntegrationConfig,
    private _smsConversations: SmsConversations,
    private _conversationsViewSpring: ConversationsViewSpring,
    private _conversationAlert: ConversationAlert,
    @optional() private _contactMatcher?: ContactMatcher,
    @optional('ConversationViewOptions')
    private _conversationViewOptions?: ConversationViewSpringOptions,
    @optional('SmsConversationsOptions')
    private _smsConversationsOptions?: SmsConversationsOptions,
    @optional() private _smsOptOutView?: SmsOptOutView,
    @optional() private _smsConsent?: SmsConsent,
  ) {
    super();
  }

  getUIProps(
    _: ConversationViewSpringProps,
  ): UIProps<ConversationViewSpringPanelProps> &
    Pick<ConversationViewSpringPanelProps, 'renderLogIndicator'> {
    const disableLinks =
      this._rateLimiter.restricted || !this._connectivityMonitor.connectivity;
    const conversationId = this._queueConversations.currentConversationId!;
    const showSpinner = !(
      (!this._contactMatcher || this._contactMatcher.ready) &&
      this._regionSettings.ready &&
      this._queueConversations.ready &&
      this._rateLimiter.ready &&
      this._connectivityMonitor.ready
    );

    const hasInputContent =
      (this._queueConversations.messageText &&
        this._queueConversations.messageText.length > 0) ||
      (this._queueConversations.attachments &&
        this._queueConversations.attachments.length > 0);
    const sending =
      this._queueConversations.conversationStatus[conversationId] ===
      conversationsStatus.pushing;

    const conversation =
      this._queueConversations.formattedConversationsMap.get(conversationId);

    const { showAlert, alertProps } = this._conversationAlert.getAlertInfo(
      conversation,
      {
        onReplyInSharedTab: () =>
          this._conversationsViewSpring.replyInSharedTab(conversation),
      },
    );

    return {
      messages: this.messages,
      attachments: this._queueConversations.attachments,
      acceptFileTypes: QUEUE_ACCEPT_FILE_TYPES,
      createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip,
      showLogPopover: this._conversationViewOptions?.showLogPopover,
      renderLogIndicator: this._conversationViewOptions?.renderLogIndicator,
      conversation,
      messageText: this._queueConversations.messageText,
      sendButtonDisabled:
        sending || disableLinks || !hasInputContent || showSpinner,
      sending,
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
        const currentConversationId =
          this._queueConversations.currentConversationId;
        if (!currentConversationId) return;

        const conversation =
          this._queueConversations.formattedConversationsMap.get(
            currentConversationId,
          );
        const toNumbers = buildToNumbersFromConversation(
          conversation,
          this._smsConversationsOptions?.dncEntityTypes,
        );
        const onDncVerify =
          this._smsConversationsOptions?.onDncVerifyBeforeReply;
        if (onDncVerify && toNumbers.length > 0) {
          const canSend = await onDncVerify(toNumbers);
          if (!canSend) return;
        }

        try {
          await this._queueConversations.replyToReceivers(text, attachments);
          this._smsConversationsOptions?.checkDncStatusOfConversation?.(
            currentConversationId,
          );
          this._smsConversationsOptions?.autoLogTaskIfEnabled?.(
            currentConversationId,
          );
        } catch (error) {
          this.logger.error('[SMS] auto-log failed', error);
        }
      },
      updateMessageText: async (text) => {
        return !!(await this._queueConversations.updateMessageText(text));
      },
      addAttachments: (attachments) =>
        this._queueConversations.addAttachments(attachments),
      removeAttachment: (attachment) =>
        this._queueConversations.removeAttachment(attachment),
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
      this._queueConversations._loadConversation(params.conversationId);

      if (this._portManager.shared && this._portManager.isMainTab) {
        this._queueConversations.loadConversation(params.conversationId);
      }
    });

    useEffect(() => {
      return () => {
        if (this._portManager.shared) {
          if (this._portManager.isMainTab) {
            this._queueConversations.unloadConversation();
          }
        } else {
          this._queueConversations.unloadConversation();
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

    useEffect(() => {
      if (!this._portManager.shared || this._portManager.isMainTab) {
        this._smsConsent?.loadConversationConsentData(conversation!);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationId]);

    useEffect(() => {
      if (!conversationId || messages.length === 0) return;

      if (this._portManager.shared) {
        if (this._portManager.isMainTab) {
          this._queueMessageStore.readMessages(conversationId);
        }
      } else {
        this._queueMessageStore.readMessages(conversationId);
      }
    }, [conversationId, messages]);

    if (!conversation) {
      this.logger.error('Conversation not found', {
        conversationId,
      });

      return <ConversationNoAccessPanel goBack={uiFunctions.goBack} />;
    }

    const Component =
      this._conversationViewOptions?.component || ConversationPanel;
    return (
      <Component
        {..._props}
        {...uiFunctions}
        conversation={conversation}
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
