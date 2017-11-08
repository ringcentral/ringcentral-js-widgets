import React from 'react';
// eslint-disable-next-line
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
// eslint-disable-next-line
import KeypadIcon from 'ringcentral-widgets/assets/images/Dialpad.svg';

const props = {};
// eslint-disable-next-line
props.onClick = () => alert('clicked');
props.title = 'KeyPad';
props.icon = KeypadIcon;

/**
 * A example of `ActiveCallButton`
 */
const ActiveCallButtonDemo = () => (
  <ActiveCallButton
    {...props}
  />
);
export default ActiveCallButtonDemo;
