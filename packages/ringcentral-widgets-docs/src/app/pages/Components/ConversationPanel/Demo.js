import React from 'react';
// eslint-disable-next-line
import ConversationPanel from 'ringcentral-widgets/components/ConversationPanel';

const props = {};
props.replyToReceivers = () => null;
props.recipients = [{}];
props.sendButtonDisabled = false;
props.currentLocale = 'en-US';
props.showSpinner = false;
props.areaCode = '650';
props.countryCode = 'US';
props.dateTimeFormatter = () => null;
props.goBack = () => null;
props.messages = [];
props.brand = 'RingCentral';
props.conversation = {
  conversationMatches: [],
  correspondentMatches: [],
  correspondents: [],
};
props.conversationId = '1234';
props.formatPhone = p => p;
props.readMessages = () => null;
props.loadPreviousMessages = () => null;
props.unloadConversation = () => null;

/**
 * A example of `ConversationPanel`
 */
const ConversationPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ConversationPanel
      {...props}
    />
  </div>
);
export default ConversationPanelDemo;
