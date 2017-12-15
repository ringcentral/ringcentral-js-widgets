import React from 'react';
// eslint-disable-next-line
import MessageList from 'ringcentral-widgets/components/MessageList';

const props = {};
props.currentLocale = 'en-US';
props.conversations = [{
  id: 1,
  conversationId: '1',
  subject: 'subject text',
  correspondents: [{
    phoneNumber: '123456789',
  }],
  correspondentMatches: [],
  conversationMatches: [],
  unreadCounts: 0,
}, {
  id: 2,
  conversationId: '2',
  subject: 'subject text2',
  correspondents: [{
    phoneNumber: '123456788',
  }],
  correspondentMatches: [],
  conversationMatches: [],
  unreadCounts: 1,
}];
props.dateTimeFormatter = ({ utcTimestamp }) => utcTimestamp;
props.brand = 'RingCentral';
props.showConversationDetail = () => null;
props.countryCode = '+1';
props.areaCode = '+1';
props.markVoicemail = () => null;
props.readVoicemail = () => null;
props.onClickToDial = () => null;
props.onCreateContact = () => null;

/**
 * A example of `MessageList`
 */
const MessageListDemo = () => (
  <MessageList
    {...props}
  />
);
export default MessageListDemo;
