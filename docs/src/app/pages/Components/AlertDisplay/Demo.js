import React from 'react';
// eslint-disable-next-line
import AlertDisplay from 'ringcentral-widget/components/AlertDisplay';
import styles from './styles.scss';

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
  },{
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
 * A example of `AlertDisplay`
 */
const AlertDisplayDemo = () => (
  <div className={styles.root}>
    <AlertDisplay
      messages={props.messages}
      {...props}
    />
  </div>
);
export default AlertDisplayDemo;
