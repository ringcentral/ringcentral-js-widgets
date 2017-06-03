import React from 'react';
// eslint-disable-next-line
import MessageSenderAlert from 'ringcentral-widget/components/MessageSenderAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string'
};
props.regionSettingsUrl = 'test string';

/**
 * A example of `MessageSenderAlert`
 */
const MessageSenderAlertDemo = () => (
  <MessageSenderAlert
    {...props}
  />
);
export default MessageSenderAlertDemo;
