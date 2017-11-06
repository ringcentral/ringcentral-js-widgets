import React from 'react';
// eslint-disable-next-line
import CallingSettingsAlert from 'ringcentral-widgets/components/CallingSettingsAlert';

const props = {};
props.message = {
  message: 'test string'
};
props.currentLocale = 'en-US';
props.brand = 'test string';
props.callingSettingsUrl = 'test string';

/**
 * A example of `CallingSettingsAlert`
 */
const CallingSettingsAlertDemo = () => (
  <CallingSettingsAlert
    {...props}
  />
);
export default CallingSettingsAlertDemo;
