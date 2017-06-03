import React from 'react';
// eslint-disable-next-line
import CallAlert from 'ringcentral-widget/components/CallAlert';

const props = {};
props.regionSettingsUrl = 'test string';
props.message = {
  message: 'test string'
};
props.currentLocale = 'en-US';

/**
 * A example of `CallAlert`
 */
const CallAlertDemo = () => (
  <CallAlert
    {...props}
  />
);
export default CallAlertDemo;
