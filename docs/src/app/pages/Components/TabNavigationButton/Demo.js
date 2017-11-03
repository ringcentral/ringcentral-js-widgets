import React from 'react';
// eslint-disable-next-line
import TabNavigationButton from 'ringcentral-widget/components/TabNavigationButton';
import CallsIcon from 'ringcentral-widget/assets/images/Calls.svg';
import CallsHoverIcon from 'ringcentral-widget/assets/images/CallsHover.svg';

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
