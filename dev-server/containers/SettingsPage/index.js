import { PropTypes } from 'react';
import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import SettingsPanel from '../../../src/components/SettingsPanel';

const SettingsPage = connect((_, props) => {
  const loggedIn = props.auth.loginStatus === loginStatus.loggedIn;
  const loginNumber = (loggedIn &&
    props.accountInfo.ready &&
    props.extensionInfo.ready
  ) ?
    formatNumber({
      phoneNumber: `${
        props.accountInfo.mainCompanyNumber
      }*${props.extensionInfo.extensionNumber}`,
      countryCode: props.regionSettings.countryCode,
      areaCode: props.regionSettings.areaCode,
    }) :
    '';
  return {
    showRegion: loggedIn && props.brand.id === '1210' && (
      props.regionSettings.availableCountries.length > 1 ||
      !!props.regionSettings.availableCountries.find(c => c.isoCode === 'US') ||
      !!props.regionSettings.availableCountries.find(c => c.isoCode === 'CA')
    ),
    loginNumber,
    version: props.phone.version,
    currentLocale: props.locale.currentLocale,
    brandId: props.brand.id,
    callingSettingsUrl: props.callingSettingsUrl,
    regionSettingsUrl: props.regionSettingsUrl,
  };
}, (_, props) => ({
  onLogoutButtonClick: async () => {
    await props.auth.logout();
    props.router.history.replace('/welcome');
  },
}))(SettingsPanel);

SettingsPage.propTypes = {
  phone: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  brand: PropTypes.object.isRequired,
  regionSettings: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
  extensionInfo: PropTypes.object.isRequired,
};

export default SettingsPage;
