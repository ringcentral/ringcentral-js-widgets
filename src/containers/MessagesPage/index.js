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
  },
  showTitle = false,
  enableContactFallback = false,
}) {
  return ({
    showTitle,
    enableContactFallback,
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
    routerInteraction,
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
    onViewContact: onViewContact || (({ contact }) => {
      const id = contact.id;
      const type = contact.type;
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
    onClickToDial: call ?
    (phoneNumber) => {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } :
    undefined,
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
    readVoicemail: (conversationId) => {
      messageStore.readMessages(conversationId);
    },
    composeText: () => routerInteraction.push(composeTextRoute),
    updateTypeFilter: type => messages.updateTypeFilter(type),
  };
}
export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(MessagesPanel));
