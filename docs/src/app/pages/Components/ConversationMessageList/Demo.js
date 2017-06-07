import React from 'react';
// eslint-disable-next-line
import ConversationMessageList from 'ringcentral-widget/components/ConversationMessageList';

const props = {};
props.messages = [{}];
props.dateTimeFormatter = () => null;

/**
 * A example of `ConversationMessageList`
 */
const ConversationMessageListDemo = () => (
  <ConversationMessageList
    {...props}
  />
);
export default ConversationMessageListDemo;
