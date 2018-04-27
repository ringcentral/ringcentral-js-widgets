import React from 'react';
// eslint-disable-next-line
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';

const props = {};
props.brandId = 'test string';
props.callingSettingsUrl = 'test string';
props.currentLocale = 'en-US';
props.loginNumber = 'test string';
props.onLogoutButtonClick = () => null;
props.regionSettingsUrl = 'test string';
props.showRegion = false;
props.version = 'test string';

/**
 * A example of `SettingsPanel`
 */
const SettingsPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
  }}>
    <SettingsPanel
      {...props}
    />
  </div>
);
export default SettingsPanelDemo;
