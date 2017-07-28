import React from 'react';
import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';
import RecentActivityPanel from '../../components/RecentActivityPanel';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';

function getTabs({ unreadCounts }) {
  return [
    {
      icon: <span className={dynamicsFont.active} />,
      label: 'Calls',
      path: 'recentCalls',
      isActive: path => path === 'recentCalls'
    },
    {
      icon: <span className={dynamicsFont.composeText} />,
      label: 'Messages',
      path: 'recentMessages',
      noticeCounts: unreadCounts,
      isActive: path => path === 'recentMessages'
    }
  ];
}

function mapToProps(_, {
  locale,
  currentLocale = locale.currentLocale,
  dateTimeFormat,
  recentMessages,
  recentCalls,
  webphone,
  contactMatcher
}) {
  const unreadCounts = recentMessages.unreadMessageCounts || 0;
  const currentSession = webphone.currentSession || {};
  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  const phoneNumber = currentSession.direction === callDirections.outbound ?
      currentSession.to : currentSession.from;
  let currentContact = currentSession.contactMatch;
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
    tabs: getTabs({ unreadCounts })
  };
}

function mapToFunctions(_, {
  router,
  dateTimeFormat,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  recentMessages,
  recentCalls,
  webphone,
}) {
  return {
    dateTimeFormatter,
    navigateTo(path) {
      webphone.toggleMinimized();
      router.push(path);
    },
    getRecentMessages: contact => recentMessages.getMessages(contact),
    getRecentCalls: contact => recentCalls.getCalls(contact),
    cleanUpMessages: () => (
      !webphone.currentSession
        ? recentMessages.cleanUpMessages()
        : () => {}
    ),
    cleanUpCalls: () => (
      !webphone.currentSession
        ? recentCalls.cleanUpCalls()
        : () => {}
    )
  };
}

export default connect(mapToProps, mapToFunctions)(RecentActivityPanel);
