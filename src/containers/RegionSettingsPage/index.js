import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import RouterInteraction from '../../modules/RouterInteraction';
import RegionSettingsPanel from '../../components/RegionSettingsPanel';

function mapToProps(_, {
  locale,
  regionSettings,
}) {
  return {
    availableCountries: regionSettings.availableCountries,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  auth,
  regionSettings,
  router,
}) {
  return {
    onLogoutButtonClick: async () => {
      await auth.logout();
    },
    onBackButtonClick: () => {
      router.goBack();
    },
    onSave: ({ areaCode, countryCode }) => {
      regionSettings.setData({
        areaCode,
        countryCode,
      });
    },
  };
}

const RegionSettingsPage = connect(
  mapToProps,
  mapToFunctions,
)(RegionSettingsPanel);

const propTypes = {
  locale: PropTypes.instanceOf(Locale).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
};

RegionSettingsPage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  RegionSettingsPage as default,
};
