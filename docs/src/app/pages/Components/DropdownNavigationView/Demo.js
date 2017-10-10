import React from 'react';
// eslint-disable-next-line
import DropdownNavigationView from 'ringcentral-widget/components/DropdownNavigationView';
// eslint-disable-next-line
import dynamicsFont from 'ringcentral-widget/assets/DynamicsFont/DynamicsFont.scss';

const props = {};
props.goTo = () => null;
props.currentPath = '/settings';
props.tabs = [{
  icon: (<span className={dynamicsFont.menu} />),
  activeIcon: (<span className={dynamicsFont.menuHover} />),
  label: 'More Menu',
  virtualPath: '!moreMenu',
  isActive: () => true,
  childTabs: [{
    icon: (<span className={dynamicsFont.portrait} />),
    activeIcon: (<span className={dynamicsFont.portrait} />),
    label: 'Contacts',
    path: '/contacts',
  }, {
    icon: (<span className={dynamicsFont.setting} />),
    activeIcon: (<span className={dynamicsFont.settingHover} />),
    label: 'Settings',
    path: '/settings',
  }],
}];

/**
 * A example of `DropdownNavigationView`
 */
const DropdownNavigationViewDemo = () => (
  <div style={{
    position: 'relative',
    height: '100px',
  }}>
    <DropdownNavigationView
      {...props}
    />
  </div>
);
export default DropdownNavigationViewDemo;
