import React from 'react';
// eslint-disable-next-line
import DialButton from 'ringcentral-widgets/components/DialButton';

const props = {};
props.btn = {
  value: '1'
};

/**
 * A example of `DialButton`
 */
const DialButtonDemo = () => (
  <div style={{
    height: '100px',
    width: '100px',
  }}>
    <DialButton
      {...props}
    />
  </div>
);
export default DialButtonDemo;
