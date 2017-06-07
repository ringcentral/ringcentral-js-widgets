import React from 'react';
// eslint-disable-next-line
import ComposeTextPanel from 'ringcentral-widget/components/ComposeTextPanel';

const props = {};
props.send = () => null;
props.senderNumbers = ['test string'];
props.sendButtonDisabled = false;
props.formatPhone = () => null;
props.formatContactPhone = () => null;
props.searchContact = () => null;
props.searchContactList = [{
  name: 'test string',
  entityType: 'test string',
  phoneType: 'test string',
  phoneNumber: 'test string'
}];
props.currentLocale = 'en-US';
props.updateSenderNumber = () => null;
props.updateTypingToNumber = () => null;
props.cleanTypingToNumber = () => null;
props.addToNumber = () => null;
props.removeToNumber = () => null;
props.updateMessageText = () => null;
props.toNumbers = [{
  phoneNumber: 'test string'
}];

/**
 * A example of `ComposeTextPanel`
 */
const ComposeTextPanelDemo = () => (
  <ComposeTextPanel
    {...props}
  />
);
export default ComposeTextPanelDemo;
