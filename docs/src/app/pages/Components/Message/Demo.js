import React from 'react';
// eslint-disable-next-line
import Message from 'ringcentral-widget/components/Message';

const props = {};
props.level = 'warning';
props.message = (<span>Warning Message</span>);
props.onDismiss = () => null;

/**
 * A example of `Message`
 */
const MessageDemo = () => (
  <Message
    {...props}
  />
);
export default MessageDemo;
