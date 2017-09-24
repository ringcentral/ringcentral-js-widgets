import React from 'react';
import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';
import RecentActivityPanel from '../../components/RecentActivityPanel';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import RecentActivityMessages from '../../components/RecentActivityMessages';
import RecentActivityCalls from '../../components/RecentActivityCalls';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import FaxIcon from '../../assets/images/Fax.svg';
import i18n from './i18n';

function getTabs({
  ready,
  currentLocale,
  dateTimeFormatter,
  navigateTo,
  recentMessages,
  recentCalls,
  currentContact,
  sessionId,
}) {
  if (!ready) return [];
  let messages = [];
  let calls = [];
  let unreadMessageCounts = 0;
  if (currentContact && currentContact.id) {
    const contactId = currentContact.id;
    const activityCardId = sessionId ? `${contactId}-${sessionId}` : contactId;
    if (recentMessages.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }
    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
    if (recentMessages.unreadMessageCounts[activityCardId]) {
      unreadMessageCounts = recentMessages.unreadMessageCounts[activityCardId];
    }
  }
  return [
    {
      icon: <VoicemailIcon width={21} height={21} />,
      label: i18n.getString('voicemail', currentLocale),
      path: 'voicemails',
      isActive: path => path === 'voicemails',
      view: null,
      getData: () => {},
      cleanUp: () => {}
    },
    {
      icon: <span className={dynamicsFont.composeText} />,
      label: i18n.getString('text', currentLocale),
      path: 'recentMessages',
      noticeCounts: unreadMessageCounts,
      isActive: path => path === 'recentMessages',
      view: (
        <RecentActivityMessages
          messages={messages}
          navigateTo={navigateTo}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isMessagesLoaded={recentMessages.isMessagesLoaded}
        />
      ),
      getData: (fromLocal) => {
        recentMessages.getMessages({ currentContact, fromLocal, sessionId });
      },
      cleanUp: () => recentMessages.cleanUpMessages({ contact: currentContact, sessionId })
    },
    {
      icon: <FaxIcon width={21} height={21} />,
      label: i18n.getString('fax', currentLocale),
      path: 'faxes',
      isActive: path => path === 'faxes',
      view: null,
      getData: () => {},
      cleanUp: () => {}
    },
    {
      icon: <span className={dynamicsFont.active} />,
      label: i18n.getString('call', currentLocale),
      path: 'recentCalls',
      isActive: path => path === 'recentCalls',
      view: (
        <RecentActivityCalls
          calls={calls}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isCallsLoaded={recentCalls.isCallsLoaded}
        />
      ),
      getData: () => {
        recentCalls.getCalls({ currentContact, sessionId });
      },
      cleanUp: () => recentCalls.cleanUpCalls({ contact: currentContact, sessionId })
    },
  ];
}

function mapToProps(_, {
  locale,
  currentLocale = locale.currentLocale,
  dateTimeFormat,
  navigateTo,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  recentMessages,
  recentCalls,
  contactMatcher,
  getSession
}) {
  const session = getSession();
  const sessionId = session.id;
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
  const ready =
    dateTimeFormat.ready &&
    locale.ready &&
    contactMatcher.ready &&
    recentMessages.ready &&
    recentCalls.ready;
  return {
    currentLocale,
    title: i18n.getString('recentActivities', locale.currentLocale),
    showSpinner: !ready,
    currentContact,
    calls: recentCalls.calls || [],
    tabs: getTabs({
      ready,
      currentLocale,
      dateTimeFormatter,
      navigateTo,
      currentContact,
      recentMessages,
      recentCalls,
      sessionId,
    }),
    defaultTab: 'recentCalls',
  };
}

export default connect(mapToProps)(RecentActivityPanel);
