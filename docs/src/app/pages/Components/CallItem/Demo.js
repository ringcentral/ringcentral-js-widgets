import React from 'react';
// eslint-disable-next-line
import CallItem from 'ringcentral-widget/components/CallItem';

const props = {};
props.call = {
  direction: 'test string',
  startTime: 0,
  activityMatches: [],
  fromMatches: [],
  toMatches: [],
  from: {}
};
props.areaCode = 'test string';
props.countryCode = 'test string';
props.currentLocale = 'en-US';
props.active = false;
props.dateTimeFormatter = () => null;

/**
 * A example of `CallItem`
 */
const CallItemDemo = () => (
  <CallItem
    {...props}
  />
);
export default CallItemDemo;
