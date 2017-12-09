import React from 'react';
// eslint-disable-next-line
import MessageTabButton from 'ringcentral-widgets/components/MessageTabButton';

const props = {};
props.icon = (<span>Node</span>);
props.width = undefined;

/**
 * A example of `MessageTabButton`
 */
const MessageTabButtonDemo = () => (
  <MessageTabButton
    {...props}
  />
);
export default MessageTabButtonDemo;
