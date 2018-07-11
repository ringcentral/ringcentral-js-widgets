import React from 'react';
// eslint-disable-next-line
import RegionSettingsPanel from 'ringcentral-widgets/components/RegionSettingsPanel';
import styles from './styles.scss';

const props = {};
props.currentLocale = 'en-US';
props.availableCountries = [
  { id: '1', isoCode: 'US', callingCode: '1' },
  { id: '224', isoCode: 'GB', callingCode: '44' },
  { id: '39', isoCode: 'CA', callingCode: '1' },
  { id: '75', isoCode: 'FR', callingCode: '33' },
];
props.countryCode = 'US';
props.areaCode = '650';

/**
 * A example of `RegionSettingsPanel`
 */
const RegionSettingsPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <RegionSettingsPanel
      className={styles.root}
      {...props}
    />
  </div>
);
export default RegionSettingsPanelDemo;
