import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityManager,
  ConnectivityMonitor,
  ExtensionInfo,
  RateLimiter,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactDetailsView } from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  Brand,
  DateTimeFormat,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { Call } from '@ringcentral-integration/micro-phone/src/app/services';
import type { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import {
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { ConversationsPanel } from '@ringcentral-integration/widgets/components/ConversationsPanel';
import React, { useRef } from 'react';

import {
  ComposeText,
  ConversationLogger,
  Conversations,
  MessageStore,
} from '../../services';

import type {
  ConversationsPanelProps,
  ConversationsViewOptions,
  ConversationsViewProps,
} from './Conversations.view.interface';

@injectable({
  name: 'ConversationsView',
})
export class ConversationsView extends RcViewModule {
  constructor(
    protected _brand: Brand,
    protected _locale: Locale,
    protected _conversations: Conversations,
    protected _dateTimeFormat: DateTimeFormat,
    protected _regionSettings: RegionSettings,
    protected _appFeatures: AppFeatures,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _rateLimiter: RateLimiter,
    protected _messageStore: MessageStore,
    protected _connectivityManager: ConnectivityManager,
    protected _extensionInfo: ExtensionInfo,
    protected _router: RouterPlugin,
    protected _composeText: ComposeText,
    protected _contactSearch: ContactSearch,
    protected _accountInfo: AccountInfo,
    @optional() protected _contactDetailsView?: ContactDetailsView,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional() protected _conversationLogger?: ConversationLogger,
    @optional('ConversationsViewOptions')
    protected _conversationsViewOptions?: ConversationsViewOptions,
  ) {
    super();
  }

  @dynamic('Call')
  protected readonly _call?: Call;

  @dynamic('DialerView')
  protected readonly _dialerView?: DialerView;

  getUIProps({
    showTitle = false,
    enableContactFallback = false,
    showGroupNumberName = false,
  }: ConversationsViewProps): UIProps<ConversationsPanelProps> {
    return {
      showTitle,
      enableContactFallback,
      showGroupNumberName,
      brand: this._brand.name,
      currentLocale: this._locale.currentLocale,
      currentSiteCode: this._extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._extensionInfo?.isMultipleSiteEnabled ?? false,
      conversations: this._conversations.pagingConversations,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      disableLinks:
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isVoipOnlyMode ||
        this._rateLimiter.restricted,
      disableCallButton:
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isWebphoneUnavailableMode ||
        this._connectivityManager.isWebphoneInitializing ||
        this._rateLimiter.restricted,
      disableClickToDial: !(this._call && this._call.isIdle),
      outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
      composeTextPermission: this._appFeatures.hasComposeTextPermission,
      loggingMap: (this._conversationLogger &&
        this._conversationLogger.loggingMap)!,
      showSpinner: !(
        this._locale.ready &&
        this._conversations.ready &&
        (!this._contactMatcher || this._contactMatcher.ready) &&
        this._dateTimeFormat.ready &&
        this._regionSettings.ready &&
        this._appFeatures.ready &&
        this._connectivityMonitor.ready &&
        this._rateLimiter.ready &&
        (!this._call || this._call.ready) &&
        (!this._conversationLogger || this._conversationLogger.ready)
      ),
      searchInput: this._conversations.searchInput,
      autoLog: !!(this._conversationLogger && this._conversationLogger.autoLog),
      typeFilter: this._conversations.typeFilter,
      textUnreadCounts: this._messageStore.textUnreadCounts,
      voiceUnreadCounts: this._messageStore.voiceUnreadCounts,
      faxUnreadCounts: this._messageStore.faxUnreadCounts,
      readTextPermission: this._appFeatures.hasReadTextPermission,
      readVoicemailPermission: this._appFeatures.hasVoicemailPermission,
      readFaxPermission: this._appFeatures.hasReadFaxPermission,
      loadingNextPage: this._conversations.loadingOldConversations,
      enableCDC: this._appFeatures.isCDCEnabled,
      maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
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
  }: ConversationsViewProps): UIFunctions<ConversationsPanelProps> {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled,
          siteCode: this._extensionInfo.site?.code,
        }),
      dateTimeFormatter:
        dateTimeFormatter ??
        ((...args) => this._dateTimeFormat.formatDateTime(...args)),
      onViewContact: showViewContact
        ? onViewContact ||
          (({ contact: { id, type } }) => {
            if (this._contactDetailsView) {
              this._contactDetailsView.showContactDetails({
                id,
                type,
                direct: true,
              });
            }
          })
        : undefined,
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber = await this._contactMatcher?.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            // console.debug('confirm hasMatchNumber:', hasMatchNumber);
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._contactMatcher?.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      onClickToDial:
        this._dialerView && this._appFeatures.isCallingEnabled
          ? (recipient) => {
              if (this._call?.isIdle) {
                this._router.push(dialerRoute);
                // for track router
                this._messageStore.onClickToCall({
                  fromType: recipient.fromType,
                });
                this._dialerView!.call({
                  recipient,
                });
              }
            }
          : undefined,
      onClickToSms: this._appFeatures.hasComposeTextPermission
        ? (contact, isDummyContact = false) => {
            if (this._router) {
              this._router.push(composeTextRoute);
            }
            // if contact autocomplete, if no match fill the number only
            if (contact.name && contact.phoneNumber && isDummyContact) {
              this._composeText.updateTypingToNumber(contact.name);
              this._contactSearch.search({ searchString: contact.name });
            } else {
              this._composeText.addToNumber(contact);
              if (this._composeText.typingToNumber === contact.phoneNumber) {
                this._composeText.cleanTypingToNumber();
              }
            }
            // for track
            this._messageStore.onClickToSMS();
          }
        : undefined,
      onLogConversation: (onLogConversation ||
        (this._conversationLogger &&
          (async ({ redirect = true, ...options }) => {
            await this._conversationLogger?.logConversation({
              ...options,
              redirect,
            });
          })))!,
      onSearchInputChange: (e) => {
        this._conversations.updateSearchInput(e.currentTarget.value);
      },
      showConversationDetail: (conversationId) => {
        this._router.push(
          conversationDetailRoute.replace('{conversationId}', conversationId),
        );
      },
      readMessage: (conversationId) => {
        this._messageStore.readMessages(conversationId);
      },
      markMessage: (conversationId) => {
        this._messageStore.unreadMessage(conversationId);
      },
      unmarkMessage: (conversationId) => {
        this._messageStore.readMessages(conversationId);
        this._messageStore.onUnmarkMessages();
      },
      goToComposeText: () => this._router.push(composeTextRoute),
      updateTypeFilter: (type) => this._conversations.updateTypeFilter(type),
      deleteMessage: (conversationId) => {
        this._conversations.deleteConversation(conversationId);
      },
      previewFaxMessages: (uri, conversationId) => {
        if (!previewFaxMessages) {
          window.open(uri);
        } else {
          previewFaxMessages(uri);
        }
        this._messageStore.readMessages(conversationId);
      },
      loadNextPage: async () => {
        await this._conversations.loadNextPage();
      },
      onUnmount: () => {
        if (this._conversations.currentPage > 2) {
          this._conversations.resetCurrentPage();
        }
      },
      onFaxDownload,
    };
  }

  component(props: ConversationsViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    // TODO: fix type
    const _props: any = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._conversationsViewOptions?.component || ConversationsPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
