import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2, track } from '@ringcentral-integration/core';

import type {
  ConversationContainerProps,
  ConversationPanelProps,
  Deps,
} from './ConversationUI.interface';

@Module({
  name: 'ConversationUI',
  deps: [
    'AppFeatures',
    'Brand',
    'Locale',
    'DateTimeFormat',
    'RegionSettings',
    'Conversations',
    'RateLimiter',
    'ConnectivityMonitor',
    'MessageStore',
    'RouterInteraction',
    'AccountInfo',
    'ExtensionInfo',
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationUIOptions', optional: true },
  ],
})
export class ConversationUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
  }

  getUIProps({
    params,
    enableContactFallback = false,
    showGroupNumberName = false,
    supportAttachment = false,
    supportEmoji = false,
    perPage = 20,
    inputExpandable,
  }: ConversationContainerProps): UIProps<ConversationPanelProps> {
    const disableLinks =
      this._deps.rateLimiter.throttling ||
      !this._deps.connectivityMonitor.connectivity;
    const showSpinner = !(
      this._deps.dateTimeFormat.ready &&
      (!this._deps.contactMatcher || this._deps.contactMatcher.ready) &&
      this._deps.regionSettings.ready &&
      this._deps.conversations.ready &&
      this._deps.rateLimiter.ready &&
      this._deps.connectivityMonitor.ready &&
      (!this._deps.conversationLogger || this._deps.conversationLogger.ready)
    );
    const currentConversation = this._deps.conversations.currentConversation;
    const hasInputContent =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.conversations.messageText.length > 0 ||
      (this._deps.conversations.attachments &&
        this._deps.conversations.attachments.length > 0);
    return {
      brand: this._deps.brand.name,
      enableContactFallback,
      showGroupNumberName,
      supportAttachment:
        this._deps.appFeatures.hasSendMMSPermission && supportAttachment,
      supportEmoji,
      currentLocale: this._deps.locale.currentLocale,
      conversationId: params.conversationId,
      sendButtonDisabled:
        this._deps.conversations.pushing ||
        disableLinks ||
        !hasInputContent ||
        showSpinner,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      showSpinner,
      recipients: currentConversation.recipients,
      messages: currentConversation.messages,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      messageText: this._deps.conversations.messageText,
      // @ts-expect-error TS(2322): Type 'Attachment[] | undefined' is not assignable ... Remove this comment to see the full error message
      attachments: this._deps.conversations.attachments,
      conversation: currentConversation,
      disableLinks,
      autoLog: !!this._deps.conversationLogger?.autoLog,
      perPage,
      loadingNextPage: this._deps.conversations.loadingOldMessages,
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      inputExpandable,
      enableCDC: this._deps.appFeatures.isCDCEnabled,
      isMultipleSiteEnabled: this._deps.extensionInfo?.isMultipleSiteEnabled,
      currentSiteCode: this._deps.extensionInfo?.site?.code,
      maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength,
    };
  }

  getUIFunctions({
    dateTimeFormatter,
    onLogConversation,
    conversationsPath = '/messages',
    renderExtraButton,
  }: ConversationContainerProps): UIFunctions<ConversationPanelProps> {
    let getMatcherContactName: ConversationPanelProps['getMatcherContactName'];
    let getMatcherContactList: ConversationPanelProps['getMatcherContactList'];
    let getMatcherContactNameList: ConversationPanelProps['getMatcherContactNameList'];
    if (this._deps.contactMatcher && this._deps.contactMatcher.ready) {
      getMatcherContactList = (phoneNumber) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const matcherNames = this._deps.contactMatcher.dataMapping[phoneNumber];
        if (matcherNames?.length > 0) {
          return matcherNames.map(
            (matcher) =>
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              `${matcher.name} | ${matcher.phoneNumbers[0].phoneType}`,
          );
        }
        return [];
      };
      getMatcherContactNameList = (phoneNumber) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const matcherNames = this._deps.contactMatcher.dataMapping[phoneNumber];
        if (matcherNames?.length > 0) {
          return matcherNames.map((matcher) => matcher.name);
        }
        return [];
      };
      // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null' is n... Remove this comment to see the full error message
      getMatcherContactName = (phoneNumber) => {
        const matcherNames = getMatcherContactNameList(phoneNumber);
        return matcherNames?.length > 0 ? matcherNames.join('&') : null;
      };
    }

    return {
      replyToReceivers: (text, attachments) =>
        // @ts-expect-error TS(2322): Type 'Promise<GetMessageInfoResponse | null>' is n... Remove this comment to see the full error message
        this._deps.conversations.replyToReceivers(text, attachments),
      unloadConversation: () => this._deps.conversations.unloadConversation(),
      loadConversation: (id) => this._deps.conversations.loadConversation(id),
      updateMessageText: (text) =>
        // @ts-expect-error TS(2322): Type 'Promise<boolean | undefined>' is not assigna... Remove this comment to see the full error message
        this._deps.conversations.updateMessageText(text),
      addAttachments: (attachment) =>
        this._deps.conversations.addAttachments(attachment),
      removeAttachment: (attachment) =>
        this._deps.conversations.removeAttachment(attachment),
      // @ts-expect-error TS(2322): Type '(options: Partial<FormatDateTimeOptions>) =>... Remove this comment to see the full error message
      dateTimeFormatter:
        dateTimeFormatter ??
        ((options) => this._deps.dateTimeFormat.formatDateTime(options)),
      formatPhone: (phoneNumber) =>
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
      // @ts-expect-error TS(2454): Variable 'getMatcherContactName' is used before be... Remove this comment to see the full error message
      getMatcherContactName,
      // @ts-expect-error TS(2454): Variable 'getMatcherContactList' is used before be... Remove this comment to see the full error message
      getMatcherContactList,
      // @ts-expect-error TS(2454): Variable 'getMatcherContactNameList' is used befor... Remove this comment to see the full error message
      getMatcherContactNameList,
      onLogConversation:
        onLogConversation ||
        (this._deps.conversationLogger &&
          (async ({ redirect = true, ...options }) => {
            await this._deps.conversationLogger.logConversation({
              ...options,
              redirect,
            });
          })),
      goBack: () => {
        this._deps.routerInteraction.push(conversationsPath);
      },
      readMessages: (id) => {
        this._deps.messageStore.readMessages(id);
      },
      loadPreviousMessages: () => {
        this._deps.conversations.fetchOldMessages();
      },
      renderExtraButton,
      onLinkClick: (href: string) =>
        this._trackClickConversationHyperlink(href),
    };
  }

  @track((_, href) => {
    let linkType = 'website';
    if (href.startsWith('mailto:')) {
      linkType = 'email';
    }
    return [
      trackEvents.clickConversationHyperlink,
      { 'Hyperlink type': linkType },
    ];
  })
  private _trackClickConversationHyperlink(href: string) {}
}
