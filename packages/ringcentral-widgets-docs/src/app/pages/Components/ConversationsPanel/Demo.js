import React from 'react';
// eslint-disable-next-line
import ConversationsPanel from 'ringcentral-widgets/components/ConversationsPanel';

const props = {};
props.currentLocale = 'en-US';
props.goToComposeText = () => null;
props.markMessage = () => null;
props.readMessage = () => null;
props.unmarkMessage = () => null;
props.showConversationDetail = () => null;
props.onClickToDial = () => null;
props.onViewContact = () => null;
props.onCreateContact = () => null;
props.loadNextPage = () => null;
props.brand = 'RingCentral';
props.textUnreadCounts = 1;
props.voiceUnreadCounts = 0;
props.faxUnreadCounts = 0;
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
  creationTime: '2018-01-17T08:59:02.000Z',
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
  creationTime: '2018-01-16T08:59:02.000Z',
}];
props.countryCode = 'US';
props.areaCode = '657';
props.typeFilter = 'All';
props.dateTimeFormatter = ({ utcTimestamp }) => {
  const time = new Date(utcTimestamp);
  return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;
};
/**
 * A example of `ConversationsPanel`
 */
const ConversationsPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ConversationsPanel
      {...props}
    />
  </div>
);
export default ConversationsPanelDemo;
