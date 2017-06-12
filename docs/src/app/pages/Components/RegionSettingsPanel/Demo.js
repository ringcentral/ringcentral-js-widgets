import React from 'react';
// eslint-disable-next-line
import RegionSettingsPanel from 'ringcentral-widget/components/RegionSettingsPanel';
import styles from './styles.scss';

const props = {};
props.currentLocale = 'en-US';
props.availableCountries = [
  {"id":"1","isoCode":"US","callingCode":"1"},
  {"id":"224","isoCode":"GB","callingCode":"44"},
  {"id":"39","isoCode":"CA","callingCode":"1"},
  {"id":"75","isoCode":"FR","callingCode":"33"}
];
props.countryCode = 'test string';
props.areaCode = 'test string';

/**
 * A example of `RegionSettingsPanel`
 */
const RegionSettingsPanelDemo = () => (
  <RegionSettingsPanel
    className={styles.root}
    {...props}
  />
);
export default RegionSettingsPanelDemo;
