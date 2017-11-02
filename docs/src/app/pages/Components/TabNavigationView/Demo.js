import React, { Component } from 'react';
// eslint-disable-next-line
import TabNavigationView from 'ringcentral-widgets/components/TabNavigationView';
import DialPadIcon from 'ringcentral-widgets/assets/images/DialPadNav.svg';
import CallsIcon from 'ringcentral-widgets/assets/images/Calls.svg';
import MessageIcon from 'ringcentral-widgets/assets/images/Messages.svg';
import SettingsIcon from 'ringcentral-widgets/assets/images/Settings.svg';
import ContactIcon from 'ringcentral-widgets/assets/images/Contact.svg';
import MoreMenuIcon from 'ringcentral-widgets/assets/images/MoreMenu.svg';

import DialPadHoverIcon from 'ringcentral-widgets/assets/images/DialPadHover.svg';
import CallsHoverIcon from 'ringcentral-widgets/assets/images/CallsHover.svg';
import MessageHoverIcon from 'ringcentral-widgets/assets/images/MessagesHover.svg';
import SettingsHoverIcon from 'ringcentral-widgets/assets/images/SettingsHover.svg';
import ContactHoverIcon from 'ringcentral-widgets/assets/images/ContactHover.svg';
import MoreMenuHoverIcon from 'ringcentral-widgets/assets/images/MoreMenuHover.svg';

import ContactNavIcon from 'ringcentral-widgets/assets/images/ContactsNavigation.svg';
import SettingsNavIcon from 'ringcentral-widgets/assets/images/SettingsNavigation.svg';

const tabs = [
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
    icon: MessageIcon,
    activeIcon: MessageHoverIcon,
    label: 'Messages',
    path: '/messages',
    noticeCounts: 1,
    isActive: currentPath => (
      currentPath === '/messages' || currentPath.indexOf('/conversations/') !== -1
    ),
  },
  {
    icon: ({ currentPath }) => {
      if (currentPath === '/contacts') {
        return <ContactNavIcon />;
      } else if (currentPath === '/settings') {
        return <SettingsNavIcon />;
      }
      return <MoreMenuIcon />;
    },
    activeIcon: MoreMenuHoverIcon,
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
    ],
  },
];
/**
 * A example of `TabNavigationView`
 */
class TabNavigationViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/dialer',
      currentVirtualPath: '',
    };

    this.goTo = (path, virtualPath) => {
      this.setState({
        currentPath: path || '',
        currentVirtualPath: virtualPath || '',
      });
    };
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        height: '500px',
        width: '300px',
        border: '1px solid #f3f3f3',
      }}>
        <TabNavigationView
          currentPath={this.state.currentPath}
          currentVirtualPath={this.state.currentVirtualPath}
          tabs={tabs}
          goTo={this.goTo}
        />
      </div>
    );
  }
}

export default TabNavigationViewDemo;
