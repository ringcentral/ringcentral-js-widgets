import React, { Component } from 'react';
// eslint-disable-next-line
import TabNavigationView from 'ringcentral-widget/components/TabNavigationView';
import dynamicsFont from 'ringcentral-widget/assets/DynamicsFont/DynamicsFont.scss';

const tabs = [
  {
    icon: <span className={dynamicsFont.dial} />,
    activeIcon: <span className={dynamicsFont.dialHover} />,
    label: 'Dial Pad',
    path: '/dialer',
  },
  {
    icon: <span className={dynamicsFont.active} />,
    activeIcon: <span className={dynamicsFont.activeHover} />,
    label: 'Calls',
    path: '/calls',
    isActive: currentPath => (
      currentPath === '/calls' || currentPath === '/calls/active'
    ),
  },
  {
    icon: <span className={dynamicsFont.message} />,
    activeIcon: <span className={dynamicsFont.messageHover} />,
    label: 'Messages',
    path: '/messages',
    noticeCounts: 1,
    isActive: currentPath => (
      currentPath === '/messages' || currentPath.indexOf('/conversations/') !== -1
    ),
  },
  {
    icon: <span className={dynamicsFont.menu} />,
    activeIcon: <span className={dynamicsFont.menuHover} />,
    label: 'More Menu',
    virtualPath: '!moreMenu',
    isActive: (currentPath, currentVirtualPath) => (
      currentVirtualPath === '!moreMenu'
    ),
    childTabs: [
      {
        icon: <span className={dynamicsFont.portrait} />,
        activeIcon: <span className={dynamicsFont.portrait} />,
        label: 'Contacts',
        path: '/contacts',
      },
      {
        icon: <span className={dynamicsFont.setting} />,
        activeIcon: <span className={dynamicsFont.settingHover} />,
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
