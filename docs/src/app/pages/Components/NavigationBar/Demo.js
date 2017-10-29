import React from 'react';
// eslint-disable-next-line
import NavigationBar from 'ringcentral-widget/components/NavigationBar';
import TabNavigationButton from 'ringcentral-widget/components/TabNavigationButton';
import DialPadIcon from 'ringcentral-widget/assets/images/DialPadNav.svg';
import CallsIcon from 'ringcentral-widget/assets/images/Calls.svg';
import HistoryIcon from 'ringcentral-widget/assets/images/CallHistory.svg';
import MessageIcon from 'ringcentral-widget/assets/images/Messages.svg';
import ComposeTextIcon from 'ringcentral-widget/assets/images/ComposeText.svg';

import DialPadHoverIcon from 'ringcentral-widget/assets/images/DialPadHover.svg';
import CallsHoverIcon from 'ringcentral-widget/assets/images/CallsHover.svg';
import HistoryHoverIcon from 'ringcentral-widget/assets/images/CallHistoryHover.svg';
import MessageHoverIcon from 'ringcentral-widget/assets/images/MessagesHover.svg';
import ComposeTextHoverIcon from 'ringcentral-widget/assets/images/ComposeTextHover.svg';

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
