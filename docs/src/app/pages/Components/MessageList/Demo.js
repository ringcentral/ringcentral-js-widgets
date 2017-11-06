import React from 'react';
// eslint-disable-next-line
import MessageList from 'ringcentral-widgets/components/MessageList';

const props = {};
props.currentLocale = 'en-US';
props.conversations = [{
  conversationId: 'test string'
}];
props.showConversationDetail = () => null;

/**
 * A example of `MessageList`
 */
const MessageListDemo = () => (
  <MessageList
    {...props}
  />
);
export default MessageListDemo;
