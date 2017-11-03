import React from 'react';
// eslint-disable-next-line
import DropdownNavigationView from 'ringcentral-widget/components/DropdownNavigationView';
// eslint-disable-next-line
import ContactIcon from 'ringcentral-widget/assets/images/Contact.svg';
import SettingsIcon from 'ringcentral-widget/assets/images/Settings.svg';
import ContactHoverIcon from 'ringcentral-widget/assets/images/ContactHover.svg';
import SettingsHoverIcon from 'ringcentral-widget/assets/images/SettingsHover.svg';

const props = {};
props.goTo = () => null;
props.currentPath = '/settings';
props.tabs = [{
  icon: ContactIcon,
  activeIcon: ContactHoverIcon,
  label: 'Contacts',
  path: '/contacts',
}, {
  icon: SettingsIcon,
  activeIcon: SettingsHoverIcon,
  label: 'Settings',
  path: '/settings',
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
