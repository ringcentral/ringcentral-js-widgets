import React from 'react';
// eslint-disable-next-line
import MessageInput from 'ringcentral-widgets/components/MessageInput';

const props = {};
props.value = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `MessageInput`
 */
const MessageInputDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <MessageInput
      {...props}
    />
  </div>
);
export default MessageInputDemo;
