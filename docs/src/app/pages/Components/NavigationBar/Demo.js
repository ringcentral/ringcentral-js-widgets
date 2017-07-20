import React from 'react';
// eslint-disable-next-line
import NavigationBar from 'ringcentral-widget/components/NavigationBar';
import TabNavigationButton from 'ringcentral-widget/components/TabNavigationButton';
import dynamicsFont from 'ringcentral-widget/assets/DynamicsFont/DynamicsFont.scss';

const props = {};
props.currentPath = 'test string';

/**
 * A example of `NavigationBar`
 */
const unreadCounts = 99;
props.tabs = [
  {
    icon: <span className={dynamicsFont.dial} />,
    activeIcon: <span className={dynamicsFont.dialHover} />,
    label: 'Dial Pad',
    path: '/',
  },
  {
    icon: <span className={dynamicsFont.active} />,
    activeIcon: <span className={dynamicsFont.activeHover} />,
    label: 'Calls',
    path: '/calls',
  },
  {
    icon: <span className={dynamicsFont.history} />,
    activeIcon: <span className={dynamicsFont.historyHover} />,
    label: 'History',
    path: '/history',
  },
  {
    icon: <span className={dynamicsFont.message} />,
    activeIcon: <span className={dynamicsFont.messageHover} />,
    label: 'Messages',
    path: '/messages',
    noticeCounts: unreadCounts,
    isActive: () => true
  },
  {
    icon: <span className={dynamicsFont.composeText} />,
    activeIcon: <span className={dynamicsFont.composeTextHover} />,
    label: 'Compose Text',
    path: '/composeText',
  },
  {
    icon: <span className={dynamicsFont.conference} />,
    activeIcon: <span className={dynamicsFont.conferenceHover} />,
    label: 'Conference',
    path: '/conference',
  },
  {
    icon: <span className={dynamicsFont.setting} />,
    activeIcon: <span className={dynamicsFont.settingHover} />,
    label: 'Settings',
    path: '/settings',
  },
];

props.goTo = (path) => alert(`go to ${path}`)
const NavigationBarDemo = () => (
  <NavigationBar
    button={TabNavigationButton}
    {...props}
  />
);
export default NavigationBarDemo;
