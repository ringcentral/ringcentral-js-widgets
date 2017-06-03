import React from 'react';
// eslint-disable-next-line
import CallList from 'ringcentral-widget/components/CallList';

const props = {};
props.currentLocale = 'en-US';
props.calls = [];
props.areaCode = 'test string';
props.countryCode = 'test string';
props.dateTimeFormatter = () => null;

/**
 * A example of `CallList`
 */
const CallListDemo = () => (
  <CallList
    {...props}
  />
);
export default CallListDemo;
