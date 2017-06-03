import React from 'react';
// eslint-disable-next-line
import RegionSettingsAlert from 'ringcentral-widget/components/RegionSettingsAlert';

const props = {};
props.message = {
  message: 'test string'
};
props.regionSettingsUrl = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `RegionSettingsAlert`
 */
const RegionSettingsAlertDemo = () => (
  <RegionSettingsAlert
    {...props}
  />
);
export default RegionSettingsAlertDemo;
