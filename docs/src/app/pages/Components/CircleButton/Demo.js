import React from 'react';
// eslint-disable-next-line
import CircleButton from 'ringcentral-widget/components/CircleButton';
import EndIcon from 'ringcentral-widget/assets/images/End.svg';

const props = {};
props.Icon = EndIcon;

/**
 * A example of `CircleButton`
 */
const CircleButtonDemo = () => (
  <CircleButton
    {...props}
  />
);
export default CircleButtonDemo;
