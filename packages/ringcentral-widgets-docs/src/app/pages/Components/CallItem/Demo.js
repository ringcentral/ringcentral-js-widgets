import React from 'react';
// eslint-disable-next-line
import CallItem from 'ringcentral-widgets/components/CallItem';

const props = {};
props.call = {
  direction: 'Inbound',
  startTime: 0,
  activityMatches: [],
  fromMatches: [],
  toMatches: [],
  from: {
    phoneNumber: '+1234567890'
  },
  to: {},
};
props.areaCode = '650';
props.countryCode = 'US';
props.currentLocale = 'en-US';
props.active = false;
props.dateTimeFormatter = () => null;
props.brand = 'RingCentral';
props.onClickToSms = () => null;
props.onClickToDial = () => null;

/**
 * A example of `CallItem`
 */
const CallItemDemo = () => (
  <CallItem
    {...props}
  />
);
export default CallItemDemo;
