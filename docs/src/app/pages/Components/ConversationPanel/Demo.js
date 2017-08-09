import React from 'react';
// eslint-disable-next-line
import ConversationPanel from 'ringcentral-widget/components/ConversationPanel';

const props = {};
props.replyToReceivers = () => null;
props.recipients = [{}];
props.sendButtonDisabled = false;
props.currentLocale = 'en-US';
props.showSpinner = false;
props.conversation = {};
props.areaCode = 'test string';
props.countryCode = 'test string';
props.dateTimeFormatter = () => null;
props.goBack = () => null;

/**
 * A example of `ConversationPanel`
 */
const ConversationPanelDemo = () => (
  <ConversationPanel
    {...props}
  />
);
export default ConversationPanelDemo;
