import React from 'react';
// eslint-disable-next-line
import NavigationBar from 'ringcentral-widget/components/NavigationBar';

const props = {};
props.currentPath = 'test string';

/**
 * A example of `NavigationBar`
 */
const NavigationBarDemo = () => (
  <NavigationBar
    {...props}
  />
);
export default NavigationBarDemo;
