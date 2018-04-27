import React from 'react';
// eslint-disable-next-line
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';

const props = {};
props.answer = () => null;
props.reject = () => null;
props.replyWithMessage = () => null;
props.toVoiceMail = () => null;
props.currentLocale = 'en-US';
props.forwardingNumbers = [{
  id: '123',
  label: 'Mobile',
  phoneNumber: '12345678',
}];
props.sessionId = '1234';
props.onForward = () => null;
props.searchContact = () => null;
props.searchContactList = [];
/**
 * A example of `IncomingCallPad`
 */
const IncomingCallPadDemo = () => (
  <IncomingCallPad
    {...props}
  />
);
export default IncomingCallPadDemo;
