import React from 'react';
// eslint-disable-next-line
import MessageStoreAlert from '@ringcentral-integration/widgets/components/AlertRenderer/MessageStoreAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string',
};

/**
 * A example of `MessageStoreAlert`
 */
const MessageStoreAlertDemo = () => <MessageStoreAlert {...props} />;
export default MessageStoreAlertDemo;
