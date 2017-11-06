import React from 'react';
// eslint-disable-next-line
import IncomingCallPanel from 'ringcentral-widgets/components/IncomingCallPanel';

const props = {};
props.currentLocale = 'en-US';
props.answer = () => null;
props.reject = () => null;
props.toVoiceMail = () => null;
props.replyWithMessage = () => null;
props.formatPhone = phone => phone;
props.nameMatches = [];
props.fallBackName = 'Unknown';
props.areaCode = '';
props.countryCode = '';
props.phoneNumber = '1234567890';
props.selectedMatcherIndex = 0;
props.onSelectMatcherName = () => null;
props.onBackButtonClick = () => null;
props.forwardingNumbers = [{
  id: '123',
  label: 'Mobile',
  phoneNumber: '12345678',
}];
props.onForward = () => null;
/**
 * A example of `IncomingCallPanel`
 */
const IncomingCallPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <IncomingCallPanel
      {...props}
    />
  </div>
);
export default IncomingCallPanelDemo;
