import React from 'react';
// eslint-disable-next-line
import ReplyWithMessage from 'ringcentral-widget/components/ReplyWithMessage';

const props = {};
props.onCancel = () => null;
props.onReply = () => null;
props.currentLocale = 'en-US';
props.onChange = () => null;

/**
 * A example of `ReplyWithMessage`
 */
const ReplyWithMessageDemo = () => (
  <div style={{
    position: 'relative',
    width: '250px',
    border: '1px solid #f3f3f3',
  }}>
    <ReplyWithMessage
      {...props}
    />
  </div>
);
export default ReplyWithMessageDemo;
