import React from 'react';
import { connect } from 'react-redux';

import withPhone from 'ringcentral-widgets/lib/withPhone';

import TabNavigationView from 'ringcentral-widgets/components/TabNavigationView';

import SettingsIcon from 'ringcentral-widgets/assets/images/Settings.svg';

import SettingsHoverIcon from 'ringcentral-widgets/assets/images/SettingsHover.svg';

const TABS = [
  {
    icon: SettingsIcon,
    activeIcon: SettingsHoverIcon,
    label: 'Settings',
    path: '/settings',
    isActive: currentPath => (
      currentPath.substr(0, 9) === '/settings'
    ),
  }
];

function mapToProps(_, {
  phone: {
    routerInteraction,
  },
}) {
  return {
    tabs: TABS,
    currentPath: routerInteraction.currentPath,
  };
}
function mapToFunctions(_, {
  phone: {
    routerInteraction,
  }
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
