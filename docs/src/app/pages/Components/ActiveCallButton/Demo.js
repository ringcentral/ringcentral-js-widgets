import React from 'react';
// eslint-disable-next-line
import ActiveCallButton from 'ringcentral-widget/components/ActiveCallButton';

const props = {};
props.onClick = () => alert('clicked');
props.title = 'test string';

/**
 * A example of `ActiveCallButton`
 */
const ActiveCallButtonDemo = () => (
  <ActiveCallButton
    {...props}
  />
);
export default ActiveCallButtonDemo;
