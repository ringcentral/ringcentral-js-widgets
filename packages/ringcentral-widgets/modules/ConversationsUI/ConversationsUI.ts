import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
  ConversationsContainerProps,
  ConversationsPanelProps,
  Deps,
} from './ConversationsUI.interface';

@Module({
  name: 'ConversationsUI',
  deps: [
    'Brand',
    'Locale',
    'Conversations',
    'DateTimeFormat',
    'RegionSettings',
    'AppFeatures',
    'Call',
    'ConnectivityMonitor',
    'RateLimiter',
    'MessageStore',
    'ConnectivityManager',
    'ExtensionInfo',
    'RouterInteraction',
    'ComposeText',
    'ContactSearch',
    'AccountInfo',
    { dep: 'DialerUI', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ConversationsUIOptions', optional: true },
  ],
})
export class ConversationsUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
  }

  getUIProps({
    showTitle = false,
    enableContactFallback = false,
    showGroupNumberName = false,
  }: ConversationsContainerProps): UIProps<ConversationsPanelProps> {
    return {
      showTitle,
      enableContactFallback,
      showGroupNumberName,
      brand: this._deps.brand.name,
      currentLocale: this._deps.locale.currentLocale,
      currentSiteCode: this._deps.extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
      conversations: this._deps.conversations.pagingConversations,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      disableLinks:
        this._deps.connectivityManager.isOfflineMode ||
        this._deps.connectivityManager.isVoipOnlyMode ||
        this._deps.rateLimiter.throttling,
      disableCallButton:
        this._deps.connectivityManager.isOfflineMode ||
        this._deps.connectivityManager.isWebphoneUnavailableMode ||
        this._deps.connectivityManager.isWebphoneInitializing ||
        this._deps.rateLimiter.throttling,
      disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
      outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
      composeTextPermission: this._deps.appFeatures.hasComposeTextPermission,
      loggingMap:
        this._deps.conversationLogger &&
        this._deps.conversationLogger.loggingMap,
      showSpinner: !(
        this._deps.locale.ready &&
        this._deps.conversations.ready &&
        (!this._deps.contactMatcher || this._deps.contactMatcher.ready) &&
        this._deps.dateTimeFormat.ready &&
        this._deps.regionSettings.ready &&
        this._deps.appFeatures.ready &&
        this._deps.connectivityMonitor.ready &&
        this._deps.rateLimiter.ready &&
        (!this._deps.call || this._deps.call.ready) &&
        (!this._deps.conversationLogger || this._deps.conversationLogger.ready)
      ),
      searchInput: this._deps.conversations.searchInput,
      autoLog: !!(
        this._deps.conversationLogger && this._deps.conversationLogger.autoLog
      ),
      typeFilter: this._deps.conversations.typeFilter,
      textUnreadCounts: this._deps.messageStore.textUnreadCounts,
      voiceUnreadCounts: this._deps.messageStore.voiceUnreadCounts,
      faxUnreadCounts: this._deps.messageStore.faxUnreadCounts,
      readTextPermission: this._deps.appFeatures.hasReadTextPermission,
      readVoicemailPermission: this._deps.appFeatures.hasVoicemailPermission,
      readFaxPermission: this._deps.appFeatures.hasReadFaxPermission,
      loadingNextPage: this._deps.conversations.loadingOldConversations,
      enableCDC: this._deps.appFeatures.isCDCEnabled,
      maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength,
    };
  }

  getUIFunctions({
    showViewContact = true,
    dateTimeFormatter,
    dialerRoute = '/dialer',
    onCreateContact,
    onLogConversation,
    onViewContact,
    conversationDetailRoute = '/conversations/{conversationId}',
    composeTextRoute = '/composeText',
    previewFaxMessages,
    onFaxDownload,
  }: ConversationsContainerProps): UIFunctions<ConversationsPanelProps> {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled: this._deps.extensionInfo.isMultipleSiteEnabled,
          siteCode: this._deps.extensionInfo.site?.code,
        }),
      // @ts-expect-error TS(2322): Type '(options: Partial<FormatDateTimeOptions>) =>... Remove this comment to see the full error message
      dateTimeFormatter:
        dateTimeFormatter ??
        ((...args) => this._deps.dateTimeFormat.formatDateTime(...args)),
      // @ts-expect-error TS(2322): Type '((options: OnViewContactOptions) => void) | ... Remove this comment to see the full error message
      onViewContact: showViewContact
        ? onViewContact ||
          (({ contact: { id, type } }) => {
            if (this._deps.contactDetailsUI) {
              this._deps.contactDetailsUI.showContactDetails({
                id,
                type,
                direct: true,
              });
            }
          })
        : null,
      // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber =
              await this._deps.contactMatcher.hasMatchNumber({
                phoneNumber,
                ignoreCache: true,
              });
            // console.debug('confirm hasMatchNumber:', hasMatchNumber);
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._deps.contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      onClickToDial:
        this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled
          ? (recipient) => {
              if (this._deps.call.isIdle) {
                this._deps.routerInteraction.push(dialerRoute);
                // for track router
                this._deps.messageStore.onClickToCall({
                  fromType: recipient.fromType,
                });
                this._deps.dialerUI.call({
                  recipient,
                  isStandAlone: window?.runner?._standAlone,
                });
              }
            }
          : undefined,
      onClickToSms: this._deps.appFeatures.hasComposeTextPermission
        ? (contact, isDummyContact = false) => {
            if (this._deps.routerInteraction) {
              this._deps.routerInteraction.push(composeTextRoute);
            }
            // if contact autocomplete, if no match fill the number only
            if (contact.name && contact.phoneNumber && isDummyContact) {
              this._deps.composeText.updateTypingToNumber(contact.name);
              this._deps.contactSearch.search({ searchString: contact.name });
            } else {
              this._deps.composeText.addToNumber(contact);
              if (
                this._deps.composeText.typingToNumber === contact.phoneNumber
              ) {
                this._deps.composeText.cleanTypingToNumber();
              }
            }
            // for track
            this._deps.messageStore.onClickToSMS();
          }
        : undefined,
      onLogConversation:
        onLogConversation ||
        (this._deps.conversationLogger &&
          (async ({ redirect = true, ...options }) => {
            await this._deps.conversationLogger.logConversation({
              ...options,
              redirect,
            });
          })),
      onSearchInputChange: (e) => {
        this._deps.conversations.updateSearchInput(e.currentTarget.value);
      },
      showConversationDetail: (conversationId) => {
        this._deps.routerInteraction.push(
          conversationDetailRoute.replace('{conversationId}', conversationId),
        );
      },
      readMessage: (conversationId) => {
        this._deps.messageStore.readMessages(conversationId);
      },
      markMessage: (conversationId) => {
        this._deps.messageStore.unreadMessage(conversationId);
      },
      unmarkMessage: (conversationId) => {
        this._deps.messageStore.readMessages(conversationId);
        this._deps.messageStore.onUnmarkMessages();
      },
      goToComposeText: () =>
        this._deps.routerInteraction.push(composeTextRoute),
      updateTypeFilter: (type) =>
        this._deps.conversations.updateTypeFilter(type),
      deleteMessage: (conversationId) => {
        this._deps.conversations.deleteConversation(conversationId);
      },
      previewFaxMessages: (uri, conversationId) => {
        if (!previewFaxMessages) {
          window.open(uri);
        } else {
          previewFaxMessages(uri);
        }
        this._deps.messageStore.readMessages(conversationId);
      },
      loadNextPage: async () => {
        await this._deps.conversations.loadNextPage();
      },
      onUnmount: () => {
        if (this._deps.conversations.currentPage > 2) {
          this._deps.conversations.resetCurrentPage();
        }
      },
      // @ts-expect-error TS(2322): Type '((options: { uri: string; }) => void) | unde... Remove this comment to see the full error message
      onFaxDownload,
    };
  }
}
