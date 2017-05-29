import React from 'react';
// eslint-disable-next-line
import DialerPanel from 'ringcentral-widget/components/DialerPanel';

const props = {};
props.onCall = () => null;
props.currentLocale = 'en-US';

/**
 * A example of `DialerPanel`
 */
const DialerPanelDemo = () => (
  <DialerPanel
    {...props}
  />
);
export default DialerPanelDemo;
