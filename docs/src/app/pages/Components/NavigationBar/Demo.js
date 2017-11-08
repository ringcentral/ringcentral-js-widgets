import React from 'react';
// eslint-disable-next-line
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import TabNavigationButton from 'ringcentral-widgets/components/TabNavigationButton';
import DialPadIcon from 'ringcentral-widgets/assets/images/DialPadNav.svg';
import CallsIcon from 'ringcentral-widgets/assets/images/Calls.svg';
import HistoryIcon from 'ringcentral-widgets/assets/images/CallHistory.svg';
import MessageIcon from 'ringcentral-widgets/assets/images/Messages.svg';
import ComposeTextIcon from 'ringcentral-widgets/assets/images/ComposeText.svg';

import DialPadHoverIcon from 'ringcentral-widgets/assets/images/DialPadHover.svg';
import CallsHoverIcon from 'ringcentral-widgets/assets/images/CallsHover.svg';
import HistoryHoverIcon from 'ringcentral-widgets/assets/images/CallHistoryHover.svg';
import MessageHoverIcon from 'ringcentral-widgets/assets/images/MessagesHover.svg';
import ComposeTextHoverIcon from 'ringcentral-widgets/assets/images/ComposeTextHover.svg';

const props = {};
props.currentPath = 'test string';

/**
 * A example of `NavigationBar`
 */
const unreadCounts = 99;
props.tabs = [
  {
    icon: DialPadIcon,
    activeIcon: DialPadHoverIcon,
    label: 'Dial Pad',
    path: '/',
  },
  {
    icon: CallsIcon,
    activeIcon: CallsHoverIcon,
    label: 'Calls',
    path: '/calls',
  },
  {
    icon: HistoryIcon,
    activeIcon: HistoryHoverIcon,
    label: 'History',
    path: '/history',
  },
  {
    icon: MessageIcon,
    activeIcon: MessageHoverIcon,
    label: 'Messages',
    path: '/messages',
    noticeCounts: unreadCounts,
    isActive: () => true
  },
  {
    icon: ComposeTextIcon,
    activeIcon: ComposeTextHoverIcon,
    label: 'Compose Text',
    path: '/composeText',
  },
];

props.goTo = path => alert(`go to ${path}`);
const NavigationBarDemo = () => (
  <NavigationBar
    button={TabNavigationButton}
    {...props}
  />
);
export default NavigationBarDemo;
