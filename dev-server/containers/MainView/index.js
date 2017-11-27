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
  showMessages,
  showComposeText,
  unreadCounts,
  showConference,
  showMeeting,
}) {
  return [
    {
      icon: DialPadIcon,
      activeIcon: DialPadHoverIcon,
      label: i18n.getString('dialpadLabel', currentLocale),
      path: '/dialer',
    },
    {
      icon: CallsIcon,
      activeIcon: CallsHoverIcon,
      label: i18n.getString('callsLabel', currentLocale),
      path: '/calls',
      isActive: currentPath => (
        currentPath === '/calls' || currentPath === '/calls/active'
      ),
    },
    {
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
    {
      // eslint-disable-next-line
      icon: ({ currentPath }) => {
        if (currentPath.substr(0, 9) === '/contacts') {
          return <ContactNavIcon />;
        } else if (currentPath === '/settings') {
          return <SettingsNavIcon />;
        } else if (currentPath === '/meeting') {
          return <MeetingNavIcon />;
        } else if (currentPath === '/conference') {
          return <ConferenceNavIcon />;
        }
        return <MoreMenuIcon />;
      },
      // activeIcon: MoreMenuHoverIcon,
      // eslint-disable-next-line
      activeIcon: ({ currentPath }) => {
        if (currentPath.substr(0, 9) === '/contacts') {
          return <ContactNavIcon />;
        } else if (currentPath === '/settings') {
          return <SettingsNavIcon />;
        } else if (currentPath === '/meeting') {
          return <MeetingNavIcon />;
        } else if (currentPath === '/conference') {
          return <ConferenceNavIcon />;
        }
        return <MoreMenuHoverIcon />;
      },
      label: i18n.getString('moreMenuLabel', currentLocale),
      virtualPath: '!moreMenu',
      isActive: (currentPath, currentVirtualPath) => (
        currentVirtualPath === '!moreMenu'
      ),
      childTabs: [
        {
          icon: ContactIcon,
          activeIcon: ContactHoverIcon,
          label: i18n.getString('contactsLabel', currentLocale),
          path: '/contacts',
          isActive: currentPath => (
            currentPath.substr(0, 9) === '/contacts'
          ),
        },
        showMeeting && {
          icon: MeetingIcon,
          activeIcon: MeetingHoverIcon,
          label: i18n.getString('meetingLabel', currentLocale),
          path: '/meeting',
        },
        showConference && {
          icon: ConferenceIcon,
          activeIcon: ConferenceHoverIcon,
          label: i18n.getString('conferenceLabel', currentLocale),
          path: '/conference',
        },
        {
          icon: SettingsIcon,
          activeIcon: SettingsHoverIcon,
          label: i18n.getString('settingsLabel', currentLocale),
          path: '/settings',
          isActive: currentPath => (
            currentPath.substr(0, 9) === '/settings'
          ),
        },
      ].filter(x => !!x),
    },
  ].filter(x => !!x);
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
  const serviceFeatures = rolesAndPermissions.serviceFeatures;
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
    showComposeText,
    showMessages,
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
