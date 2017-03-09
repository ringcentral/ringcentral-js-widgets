import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import dynamicsFont from '../../../src/assets/DynamicsFont/DynamicsFont.scss';
import TabNavigationView from '../../../src/components/TabNavigationView';
import RouterInteraction from '../../../src/modules/RouterInteraction';

const tabs = [
  {
    icon: <span className={dynamicsFont.setting} />,
    activityIcon: <span className={dynamicsFont.settingHover} />,
    label: 'Settings',
    path: '/settings',
    isActive: currentPath => (
      currentPath.substr(0, 9) === '/settings'
    ),
  },
  // {
  //   icon: <span className={rcFont.uniAE} />,
  //   label: 'Calls',
  //   path: '/calls',
  // },
  // {
  //   icon: <span className={rcFont.uniC8} />,
  //   label: 'History',
  //   path: '/history',
  // },
  // icon_conference
  {
    icon: <span className={dynamicsFont.iconConference} />,
    activityIcon: <span className={dynamicsFont.iconConference} />,
    // icon: <span className={RcFont.icon_conference} />,
    // activityIcon: <span className={RcFont.RC_Conference_pressed} />,
    label: 'Conference',
    path: '/conference',
  },
  {
    icon: <span className={dynamicsFont.iconCallDial} />,
    activityIcon: <span className={dynamicsFont.dialHover} />,
    label: 'Dial Pad',
    path: '/',
  },
  {
    icon: <span className={dynamicsFont.iconMessageAll} />,
    activityIcon: <span className={dynamicsFont.iconMessageAllHover} />,
    label: 'Messages',
    path: '/messages',
    noticeCounts: 0,
  },
  {
    icon: <span className={dynamicsFont.iconComposeText} />,
    activityIcon: <span className={dynamicsFont.iconComposeText} />,
    label: 'SMS',
    path: '/composeText',
    // noticeCounts: 2,
  },
];

const MainView = connect((state, props) => {
  const messageTab = tabs.find(tab =>
    tab.label === 'Messages'
  );
  if (messageTab) {
    messageTab.noticeCounts = props.messageStore.unreadCounts;
  }
  return {
    tabs,
    unreadCounts: props.messageStore.unreadCounts,
    currentPath: props.router.currentPath,
  };
})(TabNavigationView);

MainView.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  tabs: TabNavigationView.propTypes.tabs,
};

export default MainView;
