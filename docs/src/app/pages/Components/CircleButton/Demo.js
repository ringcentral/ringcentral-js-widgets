import React from 'react';
// eslint-disable-next-line
import CircleButton from 'ringcentral-widgets/components/CircleButton';
// eslint-disable-next-line
import EndIcon from 'ringcentral-widgets/assets/images/End.svg';

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
