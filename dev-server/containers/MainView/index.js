import React from 'react';
import { connect } from 'react-redux';
import TabNavigationView from '../../../src/components/TabNavigationView';
import DialPadIcon from '../../../src/assets/images/DialPadNav.svg';
import CallsIcon from '../../../src/assets/images/Calls.svg';
import HistoryIcon from '../../../src/assets/images/CallHistory.svg';
import MessageIcon from '../../../src/assets/images/Messages.svg';
import ComposeTextIcon from '../../../src/assets/images/ComposeText.svg';
import MoreMenuIcon from '../../../src/assets/images/MoreMenu.svg';
import ContactIcon from '../../../src/assets/images/Contact.svg';
import MeetingIcon from '../../../src/assets/images/Meeting.svg';
import ConferenceIcon from '../../../src/assets/images/Conference.svg';
import SettingsIcon from '../../../src/assets/images/Settings.svg';

import DialPadHoverIcon from '../../../src/assets/images/DialPadHover.svg';
import CallsHoverIcon from '../../../src/assets/images/CallsHover.svg';
import HistoryHoverIcon from '../../../src/assets/images/CallHistoryHover.svg';
import MessageHoverIcon from '../../../src/assets/images/MessagesHover.svg';
import ComposeTextHoverIcon from '../../../src/assets/images/ComposeTextHover.svg';
import MoreMenuHoverIcon from '../../../src/assets/images/MoreMenuHover.svg';
import ContactHoverIcon from '../../../src/assets/images/ContactHover.svg';
import MeetingHoverIcon from '../../../src/assets/images/MeetingHover.svg';
import ConferenceHoverIcon from '../../../src/assets/images/ConferenceHover.svg';
import SettingsHoverIcon from '../../../src/assets/images/SettingsHover.svg';

import ContactNavIcon from '../../../src/assets/images/ContactsNavigation.svg';
import MeetingNavIcon from '../../../src/assets/images/MeetingNavigation.svg';
import ConferenceNavIcon from '../../../src/assets/images/ConferenceNavigation.svg';
import SettingsNavIcon from '../../../src/assets/images/SettingsNavigation.svg';
import withPhone from '../../../src/lib/withPhone';

import i18n from './i18n';


function getTabs({
  currentLocale,
  showDialPad,
  showCalls,
  showHistory,
  showMessages,
  showComposeText,
  showContact,
  unreadCounts,
  showConference,
  showMeeting,
}) {
  let tabs = [
    showDialPad && {
      icon: DialPadIcon,
      activeIcon: DialPadHoverIcon,
      label: i18n.getString('dialpadLabel', currentLocale),
      path: '/dialer',
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
    showComposeText && {
      icon: ComposeTextIcon,
      activeIcon: ComposeTextHoverIcon,
      label: i18n.getString('composeTextLabel', currentLocale),
      path: '/composeText',
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
      icon: ({ currentPath }) => {
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
      activeIcon: ({ currentPath }) => {
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
  },
}) {
  const unreadCounts = messageStore.unreadCounts || 0;
  const { serviceFeatures } = rolesAndPermissions;
  const showDialPad = true;
  const showCalls = true;
  const showHistory = true;
  const showContact = true;
  const showComposeText = (
    rolesAndPermissions.ready &&
    (
      (serviceFeatures.Pager && serviceFeatures.Pager.enabled) ||
      (serviceFeatures.SMS && serviceFeatures.SMS.enabled)
    )
  );
  const showMessages = (
    rolesAndPermissions.ready &&
    (
      (
        serviceFeatures.PagerReceiving &&
        serviceFeatures.PagerReceiving.enabled
      ) ||
      (
        serviceFeatures.SMSReceiving &&
        serviceFeatures.SMSReceiving.enabled
      ) ||
      (
        serviceFeatures.Voicemail &&
        serviceFeatures.Voicemail.enabled
      )
    )
  );
  const showConference = (
    rolesAndPermissions.ready &&
    rolesAndPermissions.permissions.OrganizeConference
  );
  const showMeeting = (
    rolesAndPermissions.ready &&
    rolesAndPermissions.permissions.Meetings
  );
  const currentLocale = locale.currentLocale;
  const tabs = getTabs({
    currentLocale,
    unreadCounts,
    showDialPad,
    showCalls,
    showHistory,
    showComposeText,
    showMessages,
    showContact,
    showConference,
    showMeeting,
  });
  return {
    tabs,
    unreadCounts,
    currentPath: routerInteraction.currentPath,
  };
}
function mapToFunctions(_, {
  phone: {
    routerInteraction,
  },
}) {
  return {
    goTo: (path) => {
      if (path) {
        routerInteraction.push(path);
      }
    },
  };
}

const MainView = withPhone(connect(
  mapToProps,
  mapToFunctions
)(TabNavigationView));

export default MainView;
