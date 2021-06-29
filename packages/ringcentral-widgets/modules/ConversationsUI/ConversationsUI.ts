import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  Deps,
  ConversationsContainerProps,
  ConversationsPanelProps,
} from './ConversationsUI.interface';

@Module({
  name: 'ConversationsUI',
  deps: [
    'Brand',
    'Locale',
    'Conversations',
    'DateTimeFormat',
    'RegionSettings',
    'ExtensionFeatures',
    'Call',
    'ConnectivityMonitor',
    'RateLimiter',
    'MessageStore',
    'ConnectivityManager',
    'ExtensionInfo',
    'RouterInteraction',
    'ComposeText',
    'ContactSearch',
    { dep: 'DialerUI', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ConversationsUIOptions', optional: true },
  ],
})
export class ConversationsUI<T> extends RcUIModuleV2<Deps & T> {
  constructor(deps: Deps & T) {
    super({
      deps,
    });
  }

  getUIProps({
    showTitle = false,
    enableContactFallback = false,
    showGroupNumberName = false,
  }: ConversationsContainerProps): UIProps<ConversationsPanelProps> {
    const {
      brand,
      locale,
      conversations,
      contactMatcher,
      dateTimeFormat,
      regionSettings,
      extensionFeatures,
      call,
      conversationLogger,
      connectivityMonitor,
      rateLimiter,
      messageStore,
      connectivityManager,
      extensionInfo,
    } = this._deps;
    return {
      showTitle,
      enableContactFallback,
      showGroupNumberName,
      brand: brand.fullName,
      currentLocale: locale.currentLocale,
      currentSiteCode: extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled: extensionInfo?.isMultipleSiteEnabled ?? false,
      conversations: conversations.pagingConversations,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      disableLinks:
        connectivityManager.isOfflineMode ||
        connectivityManager.isVoipOnlyMode ||
        rateLimiter.throttling,
      disableCallButton:
        connectivityManager.isOfflineMode ||
        connectivityManager.isWebphoneUnavailableMode ||
        connectivityManager.isWebphoneInitializing ||
        rateLimiter.throttling,
      disableClickToDial: !(call && call.isIdle),
      outboundSmsPermission: extensionFeatures.hasOutboundSMSPermission,
      internalSmsPermission: extensionFeatures.hasInternalSMSPermission,
      composeTextPermission: extensionFeatures.hasComposeTextPermission,
      loggingMap: conversationLogger && conversationLogger.loggingMap,
      showSpinner: !(
        locale.ready &&
        conversations.ready &&
        (!contactMatcher || contactMatcher.ready) &&
        dateTimeFormat.ready &&
        regionSettings.ready &&
        extensionFeatures.ready &&
        connectivityMonitor.ready &&
        rateLimiter.ready &&
        (!call || call.ready) &&
        (!conversationLogger || conversationLogger.ready)
      ),
      searchInput: conversations.searchInput,
      autoLog: !!(conversationLogger && conversationLogger.autoLog),
      typeFilter: conversations.typeFilter,
      textUnreadCounts: messageStore.textUnreadCounts,
      voiceUnreadCounts: messageStore.voiceUnreadCounts,
      faxUnreadCounts: messageStore.faxUnreadCounts,
      readTextPermission: extensionFeatures.hasReadTextPermission,
      readVoicemailPermission: extensionFeatures.hasVoicemailPermission,
      readFaxPermission: extensionFeatures.hasReadFaxPermission,
      loadingNextPage: conversations.loadingOldConversations,
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
    const {
      dateTimeFormat,
      conversations,
      messageStore,
      conversationLogger,
      contactMatcher,
      call,
      dialerUI,
      routerInteraction,
      contactDetailsUI,
      composeText,
      contactSearch,
      extensionFeatures,
    } = this._deps;

    return {
      dateTimeFormatter:
        dateTimeFormatter ??
        ((...args) => dateTimeFormat.formatDateTime(...args)),
      onViewContact: showViewContact
        ? onViewContact ||
          (({ contact: { id, type } }) => {
            if (contactDetailsUI) {
              contactDetailsUI.showContactDetails({ id, type, direct: true });
            }
          })
        : null,
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber = await contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            // console.debug('confirm hasMatchNumber:', hasMatchNumber);
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      onClickToDial:
        dialerUI && extensionFeatures.isCallingEnabled
          ? (recipient) => {
              if (call.isIdle) {
                routerInteraction.push(dialerRoute);
                // for track router
                messageStore.onClickToCall({ fromType: recipient.fromType });
                dialerUI.call({ recipient });
              }
            }
          : undefined,
      onClickToSms: extensionFeatures.hasComposeTextPermission
        ? (contact, isDummyContact = false) => {
            if (routerInteraction) {
              routerInteraction.push(composeTextRoute);
            }
            // if contact autocomplete, if no match fill the number only
            if (contact.name && contact.phoneNumber && isDummyContact) {
              composeText.updateTypingToNumber(contact.name);
              contactSearch.search({ searchString: contact.name });
            } else {
              composeText.addToNumber(contact);
              if (composeText.typingToNumber === contact.phoneNumber) {
                composeText.cleanTypingToNumber();
              }
            }
            // for track
            messageStore.onClickToSMS();
          }
        : undefined,
      onLogConversation:
        onLogConversation ||
        (conversationLogger &&
          (async ({ redirect = true, ...options }) => {
            await conversationLogger.logConversation({
              ...options,
              redirect,
            });
          })),
      onSearchInputChange(e) {
        conversations.updateSearchInput(e.currentTarget.value);
      },
      showConversationDetail(conversationId) {
        routerInteraction.push(
          conversationDetailRoute.replace('{conversationId}', conversationId),
        );
      },
      readMessage(conversationId) {
        messageStore.readMessages(conversationId);
      },
      markMessage(conversationId) {
        messageStore.unreadMessage(conversationId);
      },
      unmarkMessage(conversationId) {
        messageStore.readMessages(conversationId);
        messageStore.onUnmarkMessages();
      },
      goToComposeText: () => routerInteraction.push(composeTextRoute),
      updateTypeFilter: (type) => conversations.updateTypeFilter(type),
      deleteMessage(conversationId) {
        conversations.deleteConversation(conversationId);
      },
      previewFaxMessages(uri, conversationId) {
        if (!previewFaxMessages) {
          window.open(uri);
        } else {
          previewFaxMessages(uri);
        }
        messageStore.readMessages(conversationId);
      },
      async loadNextPage() {
        await conversations.loadNextPage();
      },
      onUnmount() {
        if (conversations.currentPage > 2) {
          conversations.resetCurrentPage();
        }
      },
      onFaxDownload,
    };
  }
}
