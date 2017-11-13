import React from 'react';
// eslint-disable-next-line
import CallItem from 'ringcentral-widgets/components/CallItem';

const props = {};
props.call = {
  direction: 'test string',
  startTime: 0,
  activityMatches: [],
  fromMatches: [],
  toMatches: [],
  from: {},
  to: {},
};
props.areaCode = 'test string';
props.countryCode = 'test string';
props.currentLocale = 'en-US';
props.active = false;
props.dateTimeFormatter = () => null;
props.barnd = 'RingCentral';

/**
 * A example of `CallItem`
 */
const CallItemDemo = () => (
  <CallItem
    {...props}
  />
);
export default CallItemDemo;
