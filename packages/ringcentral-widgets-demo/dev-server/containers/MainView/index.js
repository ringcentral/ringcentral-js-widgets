import React from 'react';
import { connect } from 'react-redux';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import TabNavigationView from 'ringcentral-widgets/components/TabNavigationView';
import withPhone from 'ringcentral-widgets/lib/withPhone';

import DialPadIcon from 'ringcentral-widgets/assets/images/DialPadNav.svg';
import CallsIcon from 'ringcentral-widgets/assets/images/Calls.svg';
import HistoryIcon from 'ringcentral-widgets/assets/images/CallHistory.svg';
import MessageIcon from 'ringcentral-widgets/assets/images/Messages.svg';
import MoreMenuIcon from 'ringcentral-widgets/assets/images/MoreMenu.svg';
import ContactIcon from 'ringcentral-widgets/assets/images/Contact.svg';
import MeetingIcon from 'ringcentral-widgets/assets/images/Meeting.svg';
import ConferenceIcon from 'ringcentral-widgets/assets/images/Conference.svg';
import SettingsIcon from 'ringcentral-widgets/assets/images/Settings.svg';

import DialPadHoverIcon from 'ringcentral-widgets/assets/images/DialPadHover.svg';
import CallsHoverIcon from 'ringcentral-widgets/assets/images/CallsHover.svg';
import HistoryHoverIcon from 'ringcentral-widgets/assets/images/CallHistoryHover.svg';
import MessageHoverIcon from 'ringcentral-widgets/assets/images/MessagesHover.svg';
import MoreMenuHoverIcon from 'ringcentral-widgets/assets/images/MoreMenuHover.svg';
import ContactHoverIcon from 'ringcentral-widgets/assets/images/ContactHover.svg';
import MeetingHoverIcon from 'ringcentral-widgets/assets/images/MeetingHover.svg';
import ConferenceHoverIcon from 'ringcentral-widgets/assets/images/ConferenceHover.svg';
import SettingsHoverIcon from 'ringcentral-widgets/assets/images/SettingsHover.svg';

import ContactNavIcon from 'ringcentral-widgets/assets/images/ContactsNavigation.svg';
import MeetingNavIcon from 'ringcentral-widgets/assets/images/MeetingNavigation.svg';
import ConferenceNavIcon from 'ringcentral-widgets/assets/images/ConferenceNavigation.svg';
import SettingsNavIcon from 'ringcentral-widgets/assets/images/SettingsNavigation.svg';

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
      isActive: currentPath => (
        currentPath === '/dialer'
        || (currentPath === '/calls' && conferenceCallEquipped)
      ),
    },
    showCalls && {
      icon: CallsIcon,
      activeIcon: CallsHoverIcon,
      label: i18n.getString('callsLabel', currentLocale),
      path: '/calls',
      isActive: currentPath => (
        currentPath === '/calls' || currentPath === '/calls/active'
      ),
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
      isActive: currentPath => (
        currentPath === '/messages' || currentPath.indexOf('/conversations/') !== -1
      ),
    },
    showContact && {
      icon: ContactIcon,
      activeIcon: ContactHoverIcon,
      moreMenuIcon: ContactNavIcon,
      label: i18n.getString('contactsLabel', currentLocale),
      path: '/contacts',
      isActive: currentPath => (
        currentPath.substr(0, 9) === '/contacts'
      ),
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
      isActive: currentPath => (
        currentPath.substr(0, 9) === '/settings'
      ),
    }
  ].filter(x => !!x);
  if (tabs.length > 5) {
    const childTabs = tabs.slice(4, tabs.length);
    tabs = tabs.slice(0, 4);
    tabs.push({
      icon({ currentPath }) {
        const childTab = childTabs.filter(childTab => (
          (currentPath === childTab.path || currentPath.substr(0, 9) === childTab.path)
          && childTab.moreMenuIcon
        ));
        if (childTab.length > 0) {
          const Icon = childTab[0].moreMenuIcon;
          return <Icon />;
        }
        return <MoreMenuIcon />;
      },
      activeIcon({ currentPath }) {
        const childTab = childTabs.filter(childTab => (
          (currentPath === childTab.path || currentPath.substr(0, 9) === childTab.path)
          && childTab.moreMenuIcon
        ));
        if (childTab.length > 0) {
          const Icon = childTab[0].moreMenuIcon;
          return <Icon />;
        }
        return <MoreMenuHoverIcon />;
      },
      label: i18n.getString('moreMenuLabel', currentLocale),
      virtualPath: '!moreMenu',
      isActive: (currentPath, currentVirtualPath) => (
        currentVirtualPath === '!moreMenu'
      ),
      childTabs
    });
  }
  return tabs;
}

function mapToProps(_, {
  phone: {
    locale,
    messageStore,
    rolesAndPermissions,
    routerInteraction,
    callingSettings,
    conference,
    conferenceCall,
  },
}) {
  const unreadCounts = messageStore.unreadCounts || 0;
  const showDialPad = rolesAndPermissions.ready && rolesAndPermissions.callingEnabled;
  const showCalls = rolesAndPermissions.ready && rolesAndPermissions.callingEnabled &&
    callingSettings.ready &&
    callingSettings.callWith !== callingOptions.browser;
  const showHistory = rolesAndPermissions.ready && rolesAndPermissions.permissions.ReadCallLog;
  const showContact = rolesAndPermissions.ready && (
    rolesAndPermissions.callingEnabled || rolesAndPermissions.hasReadMessagesPermission
  );
  const showMessages = rolesAndPermissions.ready && rolesAndPermissions.hasReadMessagesPermission;
  const showConference = (
    rolesAndPermissions.ready &&
    conference.data &&
    rolesAndPermissions.permissions.OrganizeConference
  );
  const showMeeting = (
    rolesAndPermissions.ready &&
    rolesAndPermissions.permissions.Meetings
  );
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

function mapToFunctions(_, {
  phone: {
    routerInteraction,
    callingSettings,
    conferenceCall,
    webphone,
  },
}) {
  const conferenceCallEquipped = !!conferenceCall;
  return {
    goTo(path) {
      if (path) {
        if (
          path === '/dialer'
          && conferenceCallEquipped
          && webphone.sessions.length
          && callingSettings.callingMode === callingModes.webphone
        ) {
          routerInteraction.push('/calls');
        } else {
          routerInteraction.push(path);
        }
      }
    },
  };
}

const MainView = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(TabNavigationView));

export default MainView;
