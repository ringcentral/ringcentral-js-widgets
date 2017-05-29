import React from 'react';
// eslint-disable-next-line
import AlertDisplay from 'ringcentral-widget/components/AlertDisplay';

const props = {};
props.dismiss = () => null;
props.currentLocale = 'en-US';
props.messages = [
  {
    id: '123',
    level: 'warning',
    message: 'message',
  }
];

// eslint-disable-next-line
function MessageRender({ message }) {
  return (
    <span>{ message.message }</span>
  );
}

props.getRenderer = () => MessageRender;
/**
 * A example of `AlertDisplay`
 */
const AlertDisplayDemo = () => (
  <AlertDisplay
    {...props}
  />
);
export default AlertDisplayDemo;
