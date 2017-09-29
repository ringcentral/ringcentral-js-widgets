import React from 'react';
// eslint-disable-next-line
import ActiveCallDialPad from 'ringcentral-widget/components/ActiveCallDialPad';

const props = {};
props.onChange = () => null;
props.hiddenDialPad = () => null;
props.onHangup = () => null;
props.currentLocale = 'en-US';

/**
 * A example of `ActiveCallDialPad`
 */
const ActiveCallDialPadDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ActiveCallDialPad
      {...props}
    />
  </div>
);
export default ActiveCallDialPadDemo;
