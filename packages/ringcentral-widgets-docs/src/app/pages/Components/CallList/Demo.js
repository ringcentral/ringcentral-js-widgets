import React from 'react';
// eslint-disable-next-line
import CallList from 'ringcentral-widgets/components/CallList';

const props = {};
props.currentLocale = 'en-US';
props.calls = [{
  id: '1234',
  direction: 'Outbound',
  from: {
    phoneNumber: '+16507654321'
  },
  to: {
    phoneNumber: '+12055435432'
  },
  telephonyStatus: 'CallConnected',
  sipData: {
    toTag: 'aY8JwGA-xpRinSKQGl6BJzOLCWsmyEPm',
    fromTag: '10.13.22.253-5070-e2b88f40181740',
    remoteUri: 'sip:+12055435432@ringcentral.com',
    localUri: 'sip:+16507654321@ringcentral.com'
  },
  sessionId: '156530009020',
  startTime: 1496914055959,
  fromMatches: [],
  toMatches: [],
  activityMatches: [],
  duration: 20
}, {
  id: '2345',
  sessionId: '156529999020',
  startTime: 1496914031914,
  duration: 11,
  type: 'Voice',
  direction: 'Outbound',
  action: 'VoIP Call',
  result: 'Call connected',
  to: {
    phoneNumber: '+12055435432',
    name: 'EXAMPLE      AL',
    location: 'Example, AL'
  },
  from: {
    phoneNumber: '+16507654321',
    name: 'Test Huang'
  },
  fromMatches: [],
  toMatches: [],
  activityMatches: []
}];
props.areaCode = '650';
props.countryCode = 'US';
props.dateTimeFormatter = () => '12:00';
props.brand = 'RingCentral';

/**
 * A example of `CallList`
 */
const CallListDemo = () => (
  <CallList
    {...props}
  />
);
export default CallListDemo;
