import React from 'react';
// eslint-disable-next-line
import SpinnerOverlay from 'ringcentral-widgets/components/SpinnerOverlay';

const props = {};

/**
 * A example of `SpinnerOverlay`
 */
const SpinnerOverlayDemo = () => (
  <div style={{
    position: 'relative',
    height: '300px',
    width: '300px',
  }}>
    <SpinnerOverlay
      {...props}
    />
  </div>
);
export default SpinnerOverlayDemo;
