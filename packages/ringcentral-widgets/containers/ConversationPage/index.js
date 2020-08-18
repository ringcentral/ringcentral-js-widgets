import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import ConversationPanel from '../../components/ConversationPanel';
import { withPhone } from '../../lib/phoneContext';

export function mapToProps(
  _,
  {
    phone: {
      brand,
      locale,
      conversationLogger,
      dateTimeFormat,
      contactMatcher,
      regionSettings,
      conversations,
      rateLimiter,
      connectivityMonitor,
    },
    params,
    enableContactFallback = false,
    showGroupNumberName = false,
    supportAttachment = false,
    perPage = 20,
    inputExpandable,
  },
) {
  const disableLinks =
    rateLimiter.isThrottling || !connectivityMonitor.connectivity;
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
      conversations.pushing || disableLinks || !hasInputContent || showSpinner,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    showSpinner,
    recipients: currentConversation.recipients,
    messages: currentConversation.messages,
    messageText: conversations.messageText,
    attachments: conversations.attachments,
    conversation: currentConversation,
    disableLinks,
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
    perPage,
    loadingNextPage: conversations.loadingOldMessages,
    inputExpandable,
  };
}

export function mapToFunctions(
  _,
  {
    phone: {
      contactMatcher,
      dateTimeFormat,
      routerInteraction,
      conversationLogger,
      regionSettings,
      conversations,
      messageStore,
    },
    dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
    isLoggedContact,
    onLogConversation,
    conversationsPath = '/messages',
    renderExtraButton,
  },
) {
  let getMatcherContactName;
  let getMatcherContactList;
  let getMatcherContactNameList;
  if (contactMatcher && contactMatcher.ready) {
    getMatcherContactList = (phoneNumber) => {
      const matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(
          (matcher) => `${matcher.name} | ${matcher.phoneNumbers[0].phoneType}`,
        );
      }
      return [];
    };
    getMatcherContactNameList = (phoneNumber) => {
      const matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map((matcher) => matcher.name);
      }
      return [];
    };
    getMatcherContactName = (phoneNumber) => {
      const matcherNames = getMatcherContactNameList(phoneNumber);
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.join('&');
      }
      return null;
    };
  }

  return {
    replyToReceivers: (...args) => conversations.replyToReceivers(...args),
    unloadConversation: () => conversations.unloadConversation(),
    loadConversation: (id) => conversations.loadConversation(id),
    updateMessageText: (text) => conversations.updateMessageText(text),
    addAttachment: (attachment) => conversations.addAttachment(attachment),
    removeAttachment: (attachment) => conversations.removeAttachment(attachment),
    dateTimeFormatter,
    formatPhone: (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      }),
    getMatcherContactName,
    getMatcherContactList,
    getMatcherContactNameList,
    isLoggedContact,
    onLogConversation:
      onLogConversation ||
      (conversationLogger &&
        (async ({ redirect = true, ...options }) => {
          await conversationLogger.logConversation({
            ...options,
            redirect,
          });
        })),
    goBack() {
      routerInteraction.push(conversationsPath);
    },
    readMessages(id) {
      messageStore.readMessages(id);
    },
    loadPreviousMessages() {
      conversations.fetchOldMessages();
    },
    renderExtraButton,
  };
}

export default withPhone(
  connect(
    mapToProps,
    mapToFunctions,
  )(ConversationPanel),
);
