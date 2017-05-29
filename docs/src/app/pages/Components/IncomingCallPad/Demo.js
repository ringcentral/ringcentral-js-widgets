import React from 'react';
// eslint-disable-next-line
import IncomingCallPad from 'ringcentral-widget/components/IncomingCallPad';

const props = {};
props.answer = () => null;
props.reject = () => null;
props.toVoiceMail = () => null;

/**
 * A example of `IncomingCallPad`
 */
const IncomingCallPadDemo = () => (
  <IncomingCallPad
    {...props}
  />
);
export default IncomingCallPadDemo;
