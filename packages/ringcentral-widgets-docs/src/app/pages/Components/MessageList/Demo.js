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
  type: 'SMS',
  creationTime: '2018-01-16T08:59:02.000Z',
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
  type: 'SMS',
  creationTime: '2018-01-17T08:59:02.000Z',
}];
props.dateTimeFormatter = ({ utcTimestamp }) => {
  const time = new Date(utcTimestamp);
  return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;
};
props.brand = 'RingCentral';
props.showConversationDetail = () => null;
props.countryCode = 'US';
props.areaCode = '650';
props.markMessage = () => null;
props.readMessage = () => null;
props.unmarkMessage = () => null;
props.onClickToDial = () => null;
props.onCreateContact = () => null;

/**
 * A example of `MessageList`
 */
const MessageListDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <MessageList
      {...props}
    />
  </div>
);
export default MessageListDemo;
