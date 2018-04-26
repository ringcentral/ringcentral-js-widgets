import React from 'react';
// eslint-disable-next-line
import DialPad from 'ringcentral-widgets/components/DialPad';

const props = {};

/**
 * A example of `DialPad`
 */
const DialPadDemo = () => (
  <div style={{
    position: 'relative',
    height: '400px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <DialPad
      {...props}
    />
  </div>
);
export default DialPadDemo;
