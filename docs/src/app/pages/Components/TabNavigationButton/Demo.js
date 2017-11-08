import React from 'react';
// eslint-disable-next-line
import TabNavigationButton from 'ringcentral-widgets/components/TabNavigationButton';
import CallsIcon from 'ringcentral-widgets/assets/images/Calls.svg';
import CallsHoverIcon from 'ringcentral-widgets/assets/images/CallsHover.svg';

const props = {};
props.icon = <CallsIcon />;
props.activeIcon = <CallsHoverIcon />;
props.width = '100%';

/**
 * A example of `TabNavigationButton`
 */
const TabNavigationButtonDemo = () => (
  <div style={{ width: '200px', height: '46px', background: '#0684bd' }}>
    <TabNavigationButton
      {...props}
    />
  </div>
);
export default TabNavigationButtonDemo;
