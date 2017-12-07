import React from 'react';
// eslint-disable-next-line
import MessagesPanel from 'ringcentral-widgets/components/MessagesPanel';

const props = {};
props.currentLocale = 'en-US';
props.composeText = () => null;
props.readVoicemail = () => null;
props.showConversationDetail = () => null;
props.textUnreadCounts = 0;
props.voiceUnreadCounts = 0;

/**
 * A example of `MessagesPanel`
 */
const MessagesPanelDemo = () => (
  <MessagesPanel
    {...props}
  />
);
export default MessagesPanelDemo;
