import { connect } from 'react-redux';
import { PropTypes } from 'react';
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
  locale: PropTypes.object.isRequired,
  regionSettings: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default RegionSettingsPage;
