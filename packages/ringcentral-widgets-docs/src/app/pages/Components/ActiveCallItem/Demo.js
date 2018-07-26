import React from 'react';
// eslint-disable-next-line
import ActiveCallItem from 'ringcentral-widgets/components/ActiveCallItem';

const props = {};
props.call = {
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
};
props.areaCode = '650';
props.countryCode = 'US';
props.currentLocale = 'en-US';
props.formatPhone = () => null;
props.webphoneAnswer = () => null;
props.webphoneReject = () => null;
props.webphoneHangup = () => null;
props.webphoneResume = () => null;
props.onClickToSms = () => null;
props.outboundSmsPermission = true;
props.internalSmsPermission = true;
/**
 * A example of `ActiveCallItem`
 */
const ActiveCallItemDemo = () => (
  <ActiveCallItem
    {...props}
  />
);
export default ActiveCallItemDemo;
