import React from 'react';
// eslint-disable-next-line
import MessageItem from 'ringcentral-widgets/components/MessageItem';

const props = {};
props.conversation = {
  id: '1',
  conversationId: '1',
  subject: 'subject text',
  correspondents: [{
    phoneNumber: '123456789',
  }],
  correspondentMatches: [],
  conversationMatches: [],
  unreadCounts: 0,
  type: 'SMS',
};
props.areaCode = '650';
props.countryCode = 'US';
props.currentLocale = 'en-US';
props.dateTimeFormatter = () => null;
props.showConversationDetail = () => null;
props.brand = 'RingCentral';
props.markMessage = () => null;
props.readMessage = () => null;
props.unmarkMessage = () => null;
props.onClickToDial = () => null;
props.onCreateContact = () => null;
/**
 * A example of `MessageItem`
 */
const MessageItemDemo = () => (
  <MessageItem
    {...props}
  />
);
export default MessageItemDemo;
