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
  <div style={{
    position: 'relative',
    height: '100px',
    width: '100px',
  }}>
    <CircleButton
      {...props}
    />
  </div>
);
export default CircleButtonDemo;
