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
  <ActiveCallDialPad
    {...props}
  />
);
export default ActiveCallDialPadDemo;
