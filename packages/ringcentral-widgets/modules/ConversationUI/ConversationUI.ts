import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { Attachment } from '@ringcentral-integration/commons/modules/MessageSenderV2';
import { FormatDateTimeOptions } from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import {
  Deps,
  ConversationContainerProps,
  ConversationPanelProps,
  OnLogConversationOptions,
} from './ConversationUI.interface';

@Module({
  name: 'ConversationUI',
  deps: [
    'Brand',
    'Locale',
    'DateTimeFormat',
    'RegionSettings',
    'Conversations',
    'RateLimiter',
    'ConnectivityMonitor',
    'MessageStore',
    'RouterInteraction',
    { dep: 'ConversationLogger', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'ConversationUIOptions', optional: true },
  ],
})
export class ConversationUI<T> extends RcUIModuleV2<Deps & T> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    params,
    enableContactFallback = false,
    showGroupNumberName = false,
    supportAttachment = false,
    perPage = 20,
    inputExpandable,
  }: ConversationContainerProps): UIProps<ConversationPanelProps> {
    const {
      brand,
      locale,
      conversationLogger,
      dateTimeFormat,
      contactMatcher,
      regionSettings,
      conversations,
      rateLimiter,
      connectivityMonitor,
    } = this._deps;
    const disableLinks =
      rateLimiter.throttling || !connectivityMonitor.connectivity;
    const showSpinner = !(
      dateTimeFormat.ready &&
      (!contactMatcher || contactMatcher.ready) &&
      regionSettings.ready &&
      conversations.ready &&
      rateLimiter.ready &&
      connectivityMonitor.ready &&
      (!conversationLogger || conversationLogger.ready)
    );
    const currentConversation = conversations.currentConversation;
    const hasInputContent =
      conversations.messageText.length > 0 ||
      (conversations.attachments && conversations.attachments.length > 0);
    return {
      brand: brand.fullName,
      enableContactFallback,
      showGroupNumberName,
      supportAttachment,
      currentLocale: locale.currentLocale,
      conversationId: params.conversationId,
      sendButtonDisabled:
        conversations.pushing ||
        disableLinks ||
        !hasInputContent ||
        showSpinner,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      showSpinner,
      recipients: currentConversation.recipients,
      messages: currentConversation.messages,
      messageText: conversations.messageText,
      attachments: conversations.attachments,
      conversation: currentConversation,
      disableLinks,
      autoLog: !!conversationLogger?.autoLog,
      perPage,
      loadingNextPage: conversations.loadingOldMessages,
      inputExpandable,
    };
  }

  getUIFunctions({
    dateTimeFormatter,
    onLogConversation,
    conversationsPath = '/messages',
    renderExtraButton,
  }: ConversationContainerProps): UIFunctions<ConversationPanelProps> {
    const {
      contactMatcher,
      dateTimeFormat,
      routerInteraction,
      conversationLogger,
      regionSettings,
      conversations,
      messageStore,
    } = this._deps;
    let getMatcherContactName: ConversationPanelProps['getMatcherContactName'];
    let getMatcherContactList: ConversationPanelProps['getMatcherContactList'];
    let getMatcherContactNameList: ConversationPanelProps['getMatcherContactNameList'];
    if (contactMatcher && contactMatcher.ready) {
      getMatcherContactList = (phoneNumber) => {
        const matcherNames = contactMatcher.dataMapping[phoneNumber];
        if (matcherNames?.length > 0) {
          return matcherNames.map(
            (matcher) =>
              `${matcher.name} | ${matcher.phoneNumbers[0].phoneType}`,
          );
        }
        return [];
      };
      getMatcherContactNameList = (phoneNumber) => {
        const matcherNames = contactMatcher.dataMapping[phoneNumber];
        if (matcherNames?.length > 0) {
          return matcherNames.map((matcher) => matcher.name);
        }
        return [];
      };
      getMatcherContactName = (phoneNumber) => {
        const matcherNames = getMatcherContactNameList(phoneNumber);
        return matcherNames?.length > 0 ? matcherNames.join('&') : null;
      };
    }

    return {
      replyToReceivers: (text: string, attachments?: Attachment[]) =>
        conversations.replyToReceivers(text, attachments),
      unloadConversation: () => conversations.unloadConversation(),
      loadConversation: (id: string) => conversations.loadConversation(id),
      updateMessageText: (text: string) =>
        conversations.updateMessageText(text),
      addAttachment: (attachment: Attachment) =>
        conversations.addAttachment(attachment),
      removeAttachment: (attachment: Attachment) =>
        conversations.removeAttachment(attachment),
      dateTimeFormatter:
        dateTimeFormatter ??
        ((options: Partial<FormatDateTimeOptions>) =>
          dateTimeFormat.formatDateTime(options)),
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
        }),
      getMatcherContactName,
      getMatcherContactList,
      getMatcherContactNameList,
      onLogConversation:
        onLogConversation ||
        (conversationLogger &&
          (async ({
            redirect = true,
            ...options
          }: OnLogConversationOptions) => {
            await conversationLogger.logConversation({
              ...options,
              redirect,
            });
          })),
      goBack() {
        routerInteraction.push(conversationsPath);
      },
      readMessages(id: string) {
        messageStore.readMessages(id);
      },
      loadPreviousMessages() {
        conversations.fetchOldMessages();
      },
      renderExtraButton,
    };
  }
}
