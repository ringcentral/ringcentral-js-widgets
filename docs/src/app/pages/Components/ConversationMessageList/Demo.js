import React from 'react';
// eslint-disable-next-line
import ConversationMessageList from 'ringcentral-widget/components/ConversationMessageList';

const props = {};
props.messages = [{
  creationTime: '2017-06-14T07:53:56.000Z',
  id: 1234,
  direction: 'Outbound',
  subject: 'How are you?'
}, {
  creationTime: '2017-06-14T07:54:56.000Z',
  id: 1235,
  direction: 'Inbound',
  subject: 'I\'m fine.'
}];
props.dateTimeFormatter = ({
    utcTimestamp,
  }) => new Date(utcTimestamp).toString();

/**
 * A example of `ConversationMessageList`
 */
const ConversationMessageListDemo = () => (
  <ConversationMessageList
    {...props}
  />
);
export default ConversationMessageListDemo;
