import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityMonitor,
  ExtensionInfo,
  RateLimiter,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  DateTimeFormat,
  Locale,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import JunoConversationPanel from '@ringcentral-integration/widgets/components/ConversationPanel';
import React, { useRef } from 'react';

import {
  ConversationLogger,
  Conversations,
  MessageStore,
} from '../../services';

import type {
  ConversationPanelProps,
  ConversationViewOptions,
  ConversationViewProps,
  IParams,
} from './Conversation.view.interface';

@injectable({
  name: 'ConversationView',
})
export class ConversationView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  private params: IParams = {};

  get conversationId() {
    return this.params.conversationId!;
  }

  constructor(
    protected _appFeatures: AppFeatures,
    protected _brand: Brand,
    protected _locale: Locale,
    protected _dateTimeFormat: DateTimeFormat,
    protected _regionSettings: RegionSettings,
    protected _conversations: Conversations,
    protected _rateLimiter: RateLimiter,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _messageStore: MessageStore,
    protected _router: RouterPlugin,
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
    @optional() protected _conversationLogger?: ConversationLogger,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional('ConversationViewOptions')
    protected _conversationViewOptions?: ConversationViewOptions,
  ) {
    super();
  }

  getUIProps({
    enableContactFallback = false,
    showGroupNumberName = process.env.THEME_SYSTEM === 'spring-ui',
    supportAttachment = process.env.THEME_SYSTEM === 'spring-ui',
    supportEmoji = process.env.THEME_SYSTEM === 'spring-ui',
    showContactDisplayPlaceholder = process.env.THEME_SYSTEM === 'spring-ui',
    inputExpandable = process.env.THEME_SYSTEM === 'spring-ui',
    perPage = 20,
  }: ConversationViewProps): UIProps<ConversationPanelProps> {
    const disableLinks =
      this._rateLimiter.restricted || !this._connectivityMonitor.connectivity;
    const showSpinner = !(
      this._dateTimeFormat.ready &&
      (!this._contactMatcher || this._contactMatcher.ready) &&
      this._regionSettings.ready &&
      this._conversations.ready &&
      this._rateLimiter.ready &&
      this._connectivityMonitor.ready &&
      (!this._conversationLogger || this._conversationLogger.ready)
    );
    const currentConversation = this._conversations.currentConversation;
    const hasInputContent =
      (this._conversations.messageText &&
        this._conversations.messageText.length > 0) ||
      (this._conversations.attachments &&
        this._conversations.attachments.length > 0);
    const conversationId = this.conversationId;
    const isLogged = !!(
      conversationId &&
      this._conversationLogger?.getIsInLoggedStatus?.(conversationId)
    );
    return {
      brand: this._brand.name as string,
      enableContactFallback,
      showContactDisplayPlaceholder,
      showGroupNumberName,
      supportAttachment:
        this._appFeatures.hasSendMMSPermission && supportAttachment,
      supportEmoji,
      currentLocale: this._locale.currentLocale,
      conversationId: conversationId,
      sendButtonDisabled:
        this._conversations.pushing ||
        disableLinks ||
        !hasInputContent ||
        showSpinner,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      showSpinner,
      recipients: currentConversation.recipients,
      messages: currentConversation.messages,
      messageText: this._conversations.messageText,
      attachments: this._conversations.attachments,
      // TODO: remove the currentConversation, should just messages, not need bring with other data, that already be inside `formattedConversations`
      conversation: currentConversation,
      disableLinks,
      autoLog:
        !!this._conversationLogger?.autoLog ||
        !!this._conversationLogger?.serverAutoLog,
      perPage,
      loadingNextPage: this._conversations.loadingOldMessages,
      inputExpandable: !!inputExpandable,
      enableCDC: this._appFeatures.isCDCEnabled,
      isMultipleSiteEnabled: this._extensionInfo?.isMultipleSiteEnabled,
      currentSiteCode: this._extensionInfo?.site?.code,
      maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
      disableAutoSelect: true,
      acceptFileTypes: this._conversations.acceptFileTypes,
    };
  }

  private _defaultOnLogConversation: NonNullable<
    ConversationViewProps['onLogConversation']
  > = async ({ redirect = true, ...options }) => {
    await this._conversationLogger?.logConversation({
      ...options,
      redirect,
    });
  };

  private _defaultDateTimeFormatter: NonNullable<
    ConversationViewProps['dateTimeFormatter']
  > = (options) => this._dateTimeFormat.formatDateTime(options)!;

  // let getMatcherContactName: ConversationPanelProps['getMatcherContactName'];
  // let getMatcherContactList: ;
  // let getMatcherContactNameList: ConversationPanelProps['getMatcherContactNameList'];
  getMatcherContactList: ConversationPanelProps['getMatcherContactList'] = (
    phoneNumber,
  ) => {
    if (this._contactMatcher?.ready) {
      const matcherNames = this._contactMatcher.dataMapping[phoneNumber];
      if (matcherNames?.length > 0) {
        return matcherNames.map(
          (matcher) =>
            `${matcher.name} | ${matcher.phoneNumbers?.[0].phoneType}`,
        );
      }
    }

    return [];
  };
  getMatcherContactNameList: ConversationPanelProps['getMatcherContactNameList'] =
    (phoneNumber) => {
      if (this._contactMatcher?.ready) {
        const matcherNames = this._contactMatcher.dataMapping[phoneNumber];
        if (matcherNames?.length > 0) {
          return matcherNames.map((matcher) => matcher.name);
        }
      }

      return [];
    };

  getMatcherContactName: ConversationPanelProps['getMatcherContactName'] = (
    phoneNumber,
  ) => {
    const matcherNames = this.getMatcherContactNameList(phoneNumber);
    return matcherNames?.length > 0 ? matcherNames.join('&') : null;
  };

  getUIFunctions({
    dateTimeFormatter = this._defaultDateTimeFormatter,
    onLogConversation = this._defaultOnLogConversation,
    conversationsPath = '/messages',
    renderExtraButton,
  }: ConversationViewProps): UIFunctions<ConversationPanelProps> {
    return {
      replyToReceivers: (text, attachments) =>
        this._conversations.replyToReceivers(text, attachments),
      unloadConversation: () => this._conversations.unloadConversation(),
      loadConversation: (id) => this._conversations.loadConversation(id),
      updateMessageText: async (text) =>
        !!(await this._conversations.updateMessageText(text)),
      addAttachments: (attachments) =>
        this._conversations.addAttachments(attachments),
      removeAttachment: (attachment) =>
        this._conversations.removeAttachment(attachment),
      dateTimeFormatter,
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        })!,
      getMatcherContactName: this.getMatcherContactName,
      getMatcherContactList: this.getMatcherContactList,
      getMatcherContactNameList: this.getMatcherContactNameList,
      onLogConversation,
      goBack: async () => {
        await slideOutViewTransition(
          () => this._router.push(conversationsPath),
          this._theme?.reducedMotion,
        );
      },
      readMessages: (id) => {
        this._messageStore.readMessages(id);
      },
      loadPreviousMessages: () => {
        this._conversations.fetchOldMessages();
      },
      renderExtraButton,
      onLinkClick: (href) => this._trackClickConversationHyperlink(href),
    };
  }

  @track((_: ConversationView, href: string) => {
    let linkType = 'website';
    if (href.startsWith('mailto:')) {
      linkType = 'email';
    }
    return [
      trackEvents.clickConversationHyperlink,
      { 'Hyperlink type': linkType },
    ];
  })
  private _trackClickConversationHyperlink(href: string) {
    //
  }

  component(props: ConversationViewProps) {
    this.params = useParams<IParams>();

    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._conversationViewOptions?.component || JunoConversationPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
