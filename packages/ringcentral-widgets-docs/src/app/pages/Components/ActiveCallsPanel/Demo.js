import React from 'react';
// eslint-disable-next-line
import ActiveCallsPanel from 'ringcentral-widgets/components/ActiveCallsPanel';

const props = {};
props.hasCalls = true;
props.currentLocale = 'en-US';
props.activeCurrentCalls = [{
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
  webphoneSession: {
    callStatus: 'webphone-session-connected',
    contactMatch: undefined,
    creationTime: 1502689319826,
    direction: 'Outbound',
    from: '+16507654321',
    fromUserName: undefined,
    id: 'hivsv0eih5158g',
    isOnFlip: false,
    isOnHold: false,
    isOnMute: false,
    isOnTransfer: false,
    minimized: false,
    recordStatus: 'webphone-record-idle',
    startTime: 1502689321886,
    to: '+12055435432',
    toUserName: undefined,
  },
}];
props.activeOnHoldCalls = [];
props.activeRingCalls = [{
  id: '1234',
  direction: 'Inbound',
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
  webphoneSession: {
    callStatus: 'webphone-session-connecting',
    contactMatch: undefined,
    creationTime: 1502689319826,
    direction: 'Inbound',
    from: '+16507654321',
    fromUserName: undefined,
    id: 'hivsv0eih5158g',
    isOnFlip: false,
    isOnHold: false,
    isOnMute: false,
    isOnTransfer: false,
    minimized: false,
    recordStatus: 'webphone-record-idle',
    startTime: 1502689321886,
    to: '+12055435432',
    toUserName: undefined,
  },
}];
props.otherDeviceCalls = [{
  id: '2345',
  sessionId: '156529999020',
  startTime: 1496914031914,
  duration: 11,
  direction: 'Outbound',
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
props.showSpinner = false;
props.areaCode = '650';
props.countryCode = 'US';
props.formatPhone = () => null;
props.onClickToSms = () => null;
props.onCreateContact = () => null;
props.webphoneAnswer = () => null;
props.webphoneReject = () => null;
props.webphoneHangup = () => null;
props.webphoneResume = () => null;
/**
 * A example of `ActiveCallsPanel`
 */
const ActiveCallsPanelDemo = () => (
  <ActiveCallsPanel
    {...props}
  />
);
export default ActiveCallsPanelDemo;
