import React from 'react';
// eslint-disable-next-line
import Spinner from 'ringcentral-widgets/components/Spinner';

const props = {};

/**
 * A example of `Spinner`
 */
const SpinnerDemo = () => (
  <div style={{
    position: 'relative',
    height: '50px',
    width: '50px',
  }}>
    <Spinner
      {...props}
    />
  </div>
);
export default SpinnerDemo;
