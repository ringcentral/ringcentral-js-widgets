import React from 'react';
// eslint-disable-next-line
import AnimationAlert from 'ringcentral-widget/components/AnimationAlert';

const props = {};
props.dismiss = () => null;
props.currentLocale = 'en-US';
props.messages = [
  {
    id: '111',
    level: 'success',
    message: 'success message',
  },
  {
    id: '222',
    level: 'info',
    message: 'info message',
  }, {
    id: '333',
    level: 'warning',
    message: 'warning message',
  }, {
    id: '444',
    level: 'danger',
    message: 'danger',
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
 * A example of `AnimationAlert`
 */
const AnimationAlertDemo = () => (
  <div style={{
    position: 'relative',
    height: '200px',
  }}>
    <AnimationAlert
      {...props}
    />
  </div>
);
export default AnimationAlertDemo;
