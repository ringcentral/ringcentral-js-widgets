import React from 'react';
// eslint-disable-next-line
import RecentActivityNavigationButton from 'ringcentral-widget/components/RecentActivityNavigationButton';

const props = {};
props.icon = (<span>Node</span>);
props.width = undefined;

/**
 * A example of `RecentActivityNavigationButton`
 */
const RecentActivityNavigationButtonDemo = () => (
  <RecentActivityNavigationButton
    {...props}
  />
);
export default RecentActivityNavigationButtonDemo;
