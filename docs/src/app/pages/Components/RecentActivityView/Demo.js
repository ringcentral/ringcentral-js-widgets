import React from 'react';
// eslint-disable-next-line
import RecentActivityView from 'ringcentral-widget/components/RecentActivityView';

const props = {};
props.showSpinner = false;
props.currentContact = {};
props.tabs = [];
props.defaultTab = 'test string';

/**
 * A example of `RecentActivityView`
 */
const RecentActivityViewDemo = () => (
  <RecentActivityView
    {...props}
  />
);
export default RecentActivityViewDemo;
