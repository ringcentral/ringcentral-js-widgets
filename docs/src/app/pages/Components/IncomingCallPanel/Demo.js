import React from 'react';
// eslint-disable-next-line
import IncomingCallPanel from 'ringcentral-widget/components/IncomingCallPanel';

const props = {};
props.currentLocale = 'en-US';
props.answer = () => null;
props.reject = () => null;
props.toVoiceMail = () => null;
props.replyWithMessage = () => null;
props.formatPhone = () => null;

/**
 * A example of `IncomingCallPanel`
 */
const IncomingCallPanelDemo = () => (
  <IncomingCallPanel
    {...props}
  />
);
export default IncomingCallPanelDemo;
