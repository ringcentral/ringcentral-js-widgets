import React from 'react';
// eslint-disable-next-line
import ReplyWithMessage from 'ringcentral-widget/components/ReplyWithMessage';

const props = {};
props.onCancel = () => null;
props.onReply = () => null;
props.currentLocale = 'en-US';

/**
 * A example of `ReplyWithMessage`
 */
const ReplyWithMessageDemo = () => (
  <ReplyWithMessage
    {...props}
  />
);
export default ReplyWithMessageDemo;
