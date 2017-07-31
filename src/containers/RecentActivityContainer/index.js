import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';
import RecentActivityPanel from '../../components/RecentActivityPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  currentLocale = locale.currentLocale,
  dateTimeFormat,
  recentMessages,
  recentCalls,
  contactMatcher,
  getSession
}) {
  const session = getSession();
  const unreadMessageCounts = recentMessages.unreadMessageCounts || 0;
  let currentContact = session.contactMatch;
  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  const phoneNumber = session.direction === callDirections.outbound ?
    session.to : session.from;
  if (!currentContact) {
    currentContact = contactMapping && contactMapping[phoneNumber];
    if (currentContact && currentContact.length >= 1) {
      currentContact = currentContact[0];
    }
  }
  return {
    currentLocale,
    title: i18n.getString('recentActivities', locale.currentLocale),
    showSpinner: !(
      dateTimeFormat.ready &&
      locale.ready &&
      contactMatcher.ready &&
      recentMessages.ready &&
      recentCalls.ready
    ),
    currentContact,
    isMessagesLoaded: recentMessages.isMessagesLoaded,
    messages: recentMessages.messages || [],
    isCallsLoaded: recentCalls.isCallsLoaded,
    calls: recentCalls.calls || [],
    unreadMessageCounts
  };
}

function mapToFunctions(_, {
  dateTimeFormat,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  recentMessages,
  recentCalls,
  navigateTo,
  getSession
}) {
  const session = getSession();
  return {
    dateTimeFormatter,
    navigateTo,
    getRecentMessages: contact => recentMessages.getMessages(contact),
    getRecentCalls: contact => recentCalls.getCalls(contact),
    cleanUpMessages: () => (
      !session
        ? recentMessages.cleanUpMessages()
        : () => {}
    ),
    cleanUpCalls: () => (
      !session
        ? recentCalls.cleanUpCalls()
        : () => {}
    )
  };
}

export default connect(mapToProps, mapToFunctions)(RecentActivityPanel);
