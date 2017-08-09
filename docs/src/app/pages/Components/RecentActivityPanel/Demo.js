import React from 'react';
// eslint-disable-next-line
import RecentActivityPanel from 'ringcentral-widget/components/RecentActivityPanel';

const props = {};
props.title = 'test string';
props.onPanelToggle = () => null;
props.expanded = false;

/**
 * A example of `RecentActivityPanel`
 */
const RecentActivityPanelDemo = () => (
  <RecentActivityPanel
    {...props}
  />
);
export default RecentActivityPanelDemo;
