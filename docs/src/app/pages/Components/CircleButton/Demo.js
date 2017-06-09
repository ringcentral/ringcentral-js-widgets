import React from 'react';
// eslint-disable-next-line
import CircleButton from 'ringcentral-widget/components/CircleButton';
// eslint-disable-next-line
import EndIcon from 'ringcentral-widget/assets/images/End.svg';

const props = {};
props.icon = EndIcon;

/**
 * A example of `CircleButton`
 */
const CircleButtonDemo = () => (
  <CircleButton
    {...props}
  />
);
export default CircleButtonDemo;
