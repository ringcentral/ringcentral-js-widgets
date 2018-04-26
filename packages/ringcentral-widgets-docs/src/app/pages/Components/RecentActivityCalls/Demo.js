import React from 'react';
// eslint-disable-next-line
import RecentActivityCalls from 'ringcentral-widgets/components/RecentActivityCalls';

const props = {};
props.currentLocale = 'en-US';
props.calls = [];
props.isCallsLoaded = false;
props.dateTimeFormatter = () => null;

/**
 * A example of `RecentActivityCalls`
 */
const RecentActivityCallsDemo = () => (
  <RecentActivityCalls
    {...props}
  />
);
export default RecentActivityCallsDemo;
