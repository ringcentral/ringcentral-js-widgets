import React from 'react';
// eslint-disable-next-line
import TabNavigationView from 'ringcentral-widget/components/TabNavigationView';

const props = {};
props.currentPath = 'test string';

/**
 * A example of `TabNavigationView`
 */
const TabNavigationViewDemo = () => (
  <TabNavigationView
    {...props}
  />
);
export default TabNavigationViewDemo;
