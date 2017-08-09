import React from 'react';
// eslint-disable-next-line
import RecentActivityMessages from 'ringcentral-widget/components/RecentActivityMessages';

const props = {};
props.currentLocale = 'en-US';
props.messages = [];
props.isMessagesLoaded = false;
props.navigateTo = () => null;
props.dateTimeFormatter = () => null;

/**
 * A example of `RecentActivityMessages`
 */
const RecentActivityMessagesDemo = () => (
  <RecentActivityMessages
    {...props}
  />
);
export default RecentActivityMessagesDemo;
