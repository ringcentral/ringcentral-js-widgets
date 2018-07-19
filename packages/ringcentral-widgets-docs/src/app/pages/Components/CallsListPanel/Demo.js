import React from 'react';
// eslint-disable-next-line
import CallsListPanel from 'ringcentral-widgets/components/CallsListPanel';

const props = {};
props.currentLocale = 'en-US';
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
props.activeOnHoldCalls = [];
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
props.otherDeviceCalls = [];
props.showSpinner = false;
props.areaCode = '650';
props.countryCode = 'US';
props.formatPhone = () => null;
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
}];
props.disableLinks = false;
props.dateTimeFormatter = () => null;
props.onClickToSms = () => null;
props.onCreateContact = () => null;
props.webphoneAnswer = () => null;
props.webphoneReject = () => null;
props.webphoneHangup = () => null;
props.webphoneResume = () => null;
/**
 * A example of `CallsListPanel`
 */
const CallsListPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <CallsListPanel
      {...props}
    />
  </div>
);
export default CallsListPanelDemo;
