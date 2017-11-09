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


function getTabs({
  showMessages,
  showComposeText,
  unreadCounts,
  showConference,
}) {
  return [
    {
      icon: DialPadIcon,
      activeIcon: DialPadHoverIcon,
      label: 'Dial Pad',
      path: '/dialer',
    },
    {
      icon: CallsIcon,
      activeIcon: CallsHoverIcon,
      label: 'Calls',
      path: '/calls',
      isActive: currentPath => (
        currentPath === '/calls' || currentPath === '/calls/active'
      ),
    },
    {
      icon: HistoryIcon,
      activeIcon: HistoryHoverIcon,
      label: 'History',
      path: '/history',
    },
    showMessages && {
      icon: MessageIcon,
      activeIcon: MessageHoverIcon,
      label: 'Messages',
      path: '/messages',
      noticeCounts: unreadCounts,
      isActive: currentPath => (
        currentPath === '/messages' || currentPath.indexOf('/conversations/') !== -1
      ),
    },
    showComposeText && {
      icon: ComposeTextIcon,
      activeIcon: ComposeTextHoverIcon,
      label: 'Compose Text',
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
        } else if (currentPath === '/metting') {
          return <MeetingNavIcon />;
        } else if (currentPath === '/conference') {
          return <ConferenceNavIcon />;
        }
        return <MoreMenuHoverIcon />;
      },
      label: 'More Menu',
      virtualPath: '!moreMenu',
      isActive: (currentPath, currentVirtualPath) => (
        currentVirtualPath === '!moreMenu'
      ),
      childTabs: [
        {
          icon: ContactIcon,
          activeIcon: ContactHoverIcon,
          label: 'Contacts',
          path: '/contacts',
          isActive: currentPath => (
            currentPath.substr(0, 9) === '/contacts'
          ),
        },
        {
          icon: MeetingIcon,
          activeIcon: MeetingHoverIcon,
          label: 'Schedule Meeting',
          path: '/meeting',
        },
        showConference && {
          icon: ConferenceIcon,
          activeIcon: ConferenceHoverIcon,
          label: 'Schedule Conference',
          path: '/conference',
        },
        {
          icon: SettingsIcon,
          activeIcon: SettingsHoverIcon,
          label: 'Settings',
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
  const tabs = getTabs({
    unreadCounts,
    showComposeText,
    showMessages,
    showConference,
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
