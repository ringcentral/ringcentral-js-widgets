import React from 'react';
// eslint-disable-next-line
import TabNavigationButton from 'ringcentral-widget/components/TabNavigationButton';

const props = {};
props.icon = (<span>Node</span>);
props.activeIcon = (<span>Node</span>);
props.width = undefined;

/**
 * A example of `TabNavigationButton`
 */
const TabNavigationButtonDemo = () => (
  <TabNavigationButton
    {...props}
  />
);
export default TabNavigationButtonDemo;
