import React from 'react';
// eslint-disable-next-line
import IncomingCallPad from 'ringcentral-widget/components/IncomingCallPad';

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
props.onForward = () => null;
/**
 * A example of `IncomingCallPad`
 */
const IncomingCallPadDemo = () => (
  <IncomingCallPad
    {...props}
  />
);
export default IncomingCallPadDemo;
