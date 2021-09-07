/* eslint-disable react/prop-types */
import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
import HistoryIcon from '@ringcentral-integration/widgets/assets/images/CallHistory.svg';
import HistoryHoverIcon from '@ringcentral-integration/widgets/assets/images/CallHistoryHover.svg';
import CallsIcon from '@ringcentral-integration/widgets/assets/images/Calls.svg';
import CallsHoverIcon from '@ringcentral-integration/widgets/assets/images/CallsHover.svg';
import ConferenceIcon from '@ringcentral-integration/widgets/assets/images/Conference.svg';
import ConferenceHoverIcon from '@ringcentral-integration/widgets/assets/images/ConferenceHover.svg';
import ConferenceNavIcon from '@ringcentral-integration/widgets/assets/images/ConferenceNavigation.svg';
import ContactIcon from '@ringcentral-integration/widgets/assets/images/Contact.svg';
import ContactHoverIcon from '@ringcentral-integration/widgets/assets/images/ContactHover.svg';
import ContactNavIcon from '@ringcentral-integration/widgets/assets/images/ContactsNavigation.svg';
import DialPadHoverIcon from '@ringcentral-integration/widgets/assets/images/DialPadHover.svg';
import DialPadIcon from '@ringcentral-integration/widgets/assets/images/DialPadNav.svg';
import MeetingIcon from '@ringcentral-integration/widgets/assets/images/Meeting.svg';
import MeetingHoverIcon from '@ringcentral-integration/widgets/assets/images/MeetingHover.svg';
import MeetingNavIcon from '@ringcentral-integration/widgets/assets/images/MeetingNavigation.svg';
import MessageIcon from '@ringcentral-integration/widgets/assets/images/Messages.svg';
import MessageHoverIcon from '@ringcentral-integration/widgets/assets/images/MessagesHover.svg';
import MoreMenuIcon from '@ringcentral-integration/widgets/assets/images/MoreMenu.svg';
import MoreMenuHoverIcon from '@ringcentral-integration/widgets/assets/images/MoreMenuHover.svg';
import SettingsIcon from '@ringcentral-integration/widgets/assets/images/Settings.svg';
import SettingsHoverIcon from '@ringcentral-integration/widgets/assets/images/SettingsHover.svg';
import SettingsNavIcon from '@ringcentral-integration/widgets/assets/images/SettingsNavigation.svg';
import TabNavigationView from '@ringcentral-integration/widgets/components/TabNavigationView';
import hasActiveCalls from '@ringcentral-integration/widgets/lib/hasActiveCalls';
import { withPhone } from '@ringcentral-integration/widgets/lib/phoneContext';
import React from 'react';
import { connect } from 'react-redux';
import i18n from './i18n';

function getTabs({
  currentLocale,
  showDialPad,
  showCalls,
  showHistory,
  showMessages,
  showContact,
  unreadCounts,
  showConference,
  showMeeting,
  conferenceCallEquipped,
}) {
  let tabs = [
    showDialPad && {
      icon: DialPadIcon,
      activeIcon: DialPadHoverIcon,
      label: i18n.getString('dialpadLabel', currentLocale),
      path: '/dialer',
      isActive: (currentPath) =>
        currentPath === '/dialer' ||
        (currentPath === '/calls' && conferenceCallEquipped),
    },
    showCalls && {
      icon: CallsIcon,
      activeIcon: CallsHoverIcon,
      label: i18n.getString('callsLabel', currentLocale),
      path: '/calls',
      isActive: (currentPath) =>
        currentPath === '/calls' || currentPath === '/calls/active',
    },
    showHistory && {
      icon: HistoryIcon,
      activeIcon: HistoryHoverIcon,
      label: i18n.getString('historyLabel', currentLocale),
      path: '/history',
    },
    showMessages && {
      icon: MessageIcon,
      activeIcon: MessageHoverIcon,
      label: i18n.getString('messagesLabel', currentLocale),
      path: '/messages',
      noticeCounts: unreadCounts,
      isActive: (currentPath) =>
        currentPath === '/messages' ||
        currentPath.indexOf('/conversations/') !== -1,
    },
    showContact && {
      icon: ContactIcon,
      activeIcon: ContactHoverIcon,
      moreMenuIcon: ContactNavIcon,
      label: i18n.getString('contactsLabel', currentLocale),
      path: '/contacts',
      isActive: (currentPath) => currentPath.substr(0, 9) === '/contacts',
    },
    showMeeting && {
      icon: MeetingIcon,
      activeIcon: MeetingHoverIcon,
      moreMenuIcon: MeetingNavIcon,
      label: i18n.getString('meetingLabel', currentLocale),
      path: '/meeting',
    },
    showConference && {
      icon: ConferenceIcon,
      activeIcon: ConferenceHoverIcon,
      moreMenuIcon: ConferenceNavIcon,
      label: i18n.getString('conferenceLabel', currentLocale),
      path: '/conference',
    },
    {
      icon: SettingsIcon,
      activeIcon: SettingsHoverIcon,
      moreMenuIcon: SettingsNavIcon,
      label: i18n.getString('settingsLabel', currentLocale),
      path: '/settings',
      isActive: (currentPath) => currentPath.substr(0, 9) === '/settings',
    },
  ].filter((x) => !!x);
  if (tabs.length > 5) {
    const childTabs = tabs.slice(4, tabs.length);
    tabs = tabs.slice(0, 4);
    tabs.push({
      icon({ currentPath }) {
        const childTab = childTabs.filter(
          (childTab) =>
            (currentPath === childTab.path ||
              currentPath.substr(0, 9) === childTab.path) &&
            childTab.moreMenuIcon,
        );
        if (childTab.length > 0) {
          const Icon = childTab[0].moreMenuIcon;
          return <Icon />;
        }
        return <MoreMenuIcon />;
      },
      activeIcon({ currentPath }) {
        const childTab = childTabs.filter(
          (childTab) =>
            (currentPath === childTab.path ||
              currentPath.substr(0, 9) === childTab.path) &&
            childTab.moreMenuIcon,
        );
        if (childTab.length > 0) {
          const Icon = childTab[0].moreMenuIcon;
          return <Icon />;
        }
        return <MoreMenuHoverIcon />;
      },
      label: i18n.getString('moreMenuLabel', currentLocale),
      virtualPath: '!moreMenu',
      isActive: (currentPath, currentVirtualPath) =>
        currentVirtualPath === '!moreMenu',
      childTabs,
    });
  }
  return tabs;
}

function mapToProps(
  _,
  {
    phone: {
      locale,
      messageStore,
      appFeatures,
      routerInteraction,
      callingSettings,
      conference,
      conferenceCall,
    },
  },
) {
  const unreadCounts = messageStore.unreadCounts || 0;
  const showDialPad = appFeatures.ready && appFeatures.isCallingEnabled;
  const showCalls =
    appFeatures.ready &&
    appFeatures.isCallingEnabled &&
    callingSettings.ready &&
    callingSettings.callWith !== callingOptions.browser;
  const showHistory = appFeatures.ready && appFeatures.hasReadExtensionCallLog;
  const showContact =
    appFeatures.ready &&
    (appFeatures.isCallingEnabled || appFeatures.hasReadMessagesPermission);
  const showMessages =
    appFeatures.ready && appFeatures.hasReadMessagesPermission;
  const showConference =
    appFeatures.ready && conference.data && appFeatures.hasConferencing;
  const showMeeting = appFeatures.ready && appFeatures.hasMeetingsPermission;
  const currentLocale = locale.currentLocale;
  const conferenceCallEquipped = !!conferenceCall;
  const tabs = getTabs({
    currentLocale,
    unreadCounts,
    showDialPad,
    showCalls,
    showHistory,
    showMessages,
    showContact,
    showConference,
    showMeeting,
    conferenceCallEquipped,
  });
  return {
    tabs,
    tabWidth: '20%',
    unreadCounts,
    currentPath: routerInteraction.currentPath,
  };
}

function mapToFunctions(_, { phone, phone: { routerInteraction } }) {
  return {
    goTo(path) {
      if (path) {
        if (path === '/dialer' && hasActiveCalls(phone)) {
          routerInteraction.push('/calls');
        } else {
          routerInteraction.push(path);
        }
      }
    },
  };
}

const MainView = withPhone(
  connect(mapToProps, mapToFunctions)(TabNavigationView),
);

export default MainView;
