import React from 'react';
// eslint-disable-next-line
import TabNavigationButton from '@ringcentral-integration/widgets/components/TabNavigationButton';
import CallsIcon from '@ringcentral-integration/widgets/assets/images/Calls.svg';
import CallsHoverIcon from '@ringcentral-integration/widgets/assets/images/CallsHover.svg';

const props = {};
props.icon = <CallsIcon />;
props.activeIcon = <CallsHoverIcon />;
props.width = '100%';
props.height = 50;

/**
 * A example of `TabNavigationButton`
 */
const TabNavigationButtonDemo = () => (
  <div style={{ width: '200px', height: '46px', background: '#066FAC' }}>
    <TabNavigationButton {...props} />
  </div>
);
export default TabNavigationButtonDemo;
