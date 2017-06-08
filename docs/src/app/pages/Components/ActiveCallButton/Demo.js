import React from 'react';
// eslint-disable-next-line
import ActiveCallButton from 'ringcentral-widget/components/ActiveCallButton';
// eslint-disable-next-line
import KeypadIcon from 'ringcentral-widget/assets/images/Dialpad.svg';

const props = {};
props.onClick = () => alert('clicked');
props.title = 'KeyPad';
props.Icon = KeypadIcon;

/**
 * A example of `ActiveCallButton`
 */
const ActiveCallButtonDemo = () => (
  <ActiveCallButton
    {...props}
  />
);
export default ActiveCallButtonDemo;
