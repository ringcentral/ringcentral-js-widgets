import React from 'react';
// eslint-disable-next-line
import RegionSettingsPanel from 'ringcentral-widget/components/RegionSettingsPanel';

const props = {};
props.currentLocale = 'en-US';
props.availableCountries = [{}];
props.countryCode = 'test string';
props.areaCode = 'test string';

/**
 * A example of `RegionSettingsPanel`
 */
const RegionSettingsPanelDemo = () => (
  <RegionSettingsPanel
    {...props}
  />
);
export default RegionSettingsPanelDemo;
