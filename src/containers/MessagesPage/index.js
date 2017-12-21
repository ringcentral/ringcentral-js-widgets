import { connect } from 'react-redux';
import withPhone from '../../lib/withPhone';
import MessagesPanel from '../../components/MessagesPanel';


function mapToProps(_, {
  phone: {
    brand,
    locale,
    messages,
    contactMatcher,
    dateTimeFormat,
    regionSettings,
    rolesAndPermissions,
    call,
    conversationLogger,
    connectivityMonitor,
    rateLimiter,
    messageStore,
  },
  showTitle = false,
  enableContactFallback = false,
  showGroupNumberName = false,
}) {
  return ({
    showTitle,
    enableContactFallback,
    showGroupNumberName,
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    conversations: messages.filteredConversations,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: (
      !connectivityMonitor.connectivity ||
      rateLimiter.throttling
    ),
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
    loggingMap: (conversationLogger && conversationLogger.loggingMap),
    showSpinner: !(
      locale.ready &&
      messages.ready &&
      (!contactMatcher || contactMatcher.ready) &&
      dateTimeFormat.ready &&
      regionSettings.ready &&
      rolesAndPermissions.ready &&
      connectivityMonitor.ready &&
      rateLimiter.ready &&
      (!rolesAndPermissions || rolesAndPermissions.ready) &&
      (!call || call.ready) &&
      (!conversationLogger || conversationLogger.ready)
    ),
    searchInput: messages.searchInput,
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
    typeFilter: messages.typeFilter,
    textUnreadCounts: messageStore.textUnreadCounts,
    voiceUnreadCounts: messageStore.voiceUnreadCounts,
  });
}

function mapToFunctions(_, {
  phone: {
    dateTimeFormat,
    messages,
    messageStore,
    conversationLogger,
    contactMatcher,
    call,
    dialerUI,
    routerInteraction,
    composeText,
    contactSearch,
  },
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  dialerRoute = '/dialer',
  onCreateContact,
  onLogConversation,
  isLoggedContact,
  onViewContact,
  conversationDetailRoute = '/conversations/{conversationId}',
  composeTextRoute = '/composeText',
}) {
  return {
    dateTimeFormatter,
    onViewContact: onViewContact || (({ contact: { id, type } }) => {
      routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
    }),
    onCreateContact: onCreateContact ?
      async ({ phoneNumber, name, entityType }) => {
        const hasMatchNumber = await contactMatcher.hasMatchNumber({
          phoneNumber,
          ignoreCache: true
        });
        // console.debug('confirm hasMatchNumber:', hasMatchNumber);
        if (!hasMatchNumber) {
          await onCreateContact({ phoneNumber, name, entityType });
          await contactMatcher.forceMatchNumber({ phoneNumber });
        }
      } :
      undefined,
    onClickToDial: dialerUI ?
      (recipient) => {
        if (call.isIdle) {
          routerInteraction.push(dialerRoute);
          // for track router
          messageStore.onClickToCall({ fromType: recipient.fromType });
          dialerUI.call({ recipient });
        }
      } :
      undefined,
    onClickToSms: (contact, isDummyContact = false) => {
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
    },
    isLoggedContact,
    onLogConversation: onLogConversation ||
    (conversationLogger && (async ({ redirect = true, ...options }) => {
      await conversationLogger.logConversation({
        ...options,
        redirect,
      });
    })),
    onSearchInputChange: (e) => {
      messages.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail: (conversationId) => {
      routerInteraction.push(
        conversationDetailRoute.replace('{conversationId}', conversationId)
      );
    },
    readVoicemail: conversationId =>
      messageStore.readMessages(conversationId),
    markVoicemail: conversationId =>
      messageStore.unreadMessage(conversationId),
    unMarkVoicemail: (conversationId) => {
      messageStore.readMessages(conversationId);
      messageStore.unMarkMessage(conversationId);
    },
    composeText: () => routerInteraction.push(composeTextRoute),
    updateTypeFilter: type => messages.updateTypeFilter(type),
    deleteMessage: (conversationId) => {
      messageStore.deleteMessage(conversationId);
    },
  };
}
export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(MessagesPanel));
