import { connect } from 'react-redux';
import { PropTypes } from 'react';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import RouterInteraction from '../../modules/RouterInteraction';
import RegionSettingsPanel from '../../components/RegionSettingsPanel';

const RegionSettingsPage = connect((_, props) => ({
  availableCountries: props.regionSettings.availableCountries,
  countryCode: props.regionSettings.countryCode,
  areaCode: props.regionSettings.areaCode,
  currentLocale: props.locale.currentLocale,
}), (_, props) => ({
  onLogoutButtonClick: async () => {
    await props.auth.logout();
  },
  onBackButtonClick: () => {
    props.router.history.goBack();
  },
  onSave: ({ areaCode, countryCode }) => {
    props.regionSettings.setData({
      areaCode,
      countryCode,
    });
  },
}))(RegionSettingsPanel);

RegionSettingsPage.propTypes = {
  locale: PropTypes.instanceOf(Locale).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
};

export default RegionSettingsPage;
