import React, { Component } from 'react';
// eslint-disable-next-line
import TabNavigationView from 'ringcentral-widget/components/TabNavigationView';
import DialPadIcon from 'ringcentral-widget/assets/images/DialPadNav.svg';
import CallsIcon from 'ringcentral-widget/assets/images/Calls.svg';
import MessageIcon from 'ringcentral-widget/assets/images/Messages.svg';
import SettingsIcon from 'ringcentral-widget/assets/images/Settings.svg';
import ContactIcon from 'ringcentral-widget/assets/images/Contact.svg';
import MoreMenuIcon from 'ringcentral-widget/assets/images/MoreMenu.svg';

import DialPadHoverIcon from 'ringcentral-widget/assets/images/DialPadHover.svg';
import CallsHoverIcon from 'ringcentral-widget/assets/images/CallsHover.svg';
import MessageHoverIcon from 'ringcentral-widget/assets/images/MessagesHover.svg';
import SettingsHoverIcon from 'ringcentral-widget/assets/images/SettingsHover.svg';
import ContactHoverIcon from 'ringcentral-widget/assets/images/ContactHover.svg';
import MoreMenuHoverIcon from 'ringcentral-widget/assets/images/MoreMenuHover.svg';

import ContactNavIcon from 'ringcentral-widget/assets/images/ContactsNavigation.svg';
import SettingsNavIcon from 'ringcentral-widget/assets/images/SettingsNavigation.svg';

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
