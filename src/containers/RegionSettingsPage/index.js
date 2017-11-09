import { connect } from 'react-redux';
import RegionSettingsPanel from '../../components/RegionSettingsPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    locale,
    regionSettings,
  },
}) {
  return {
    availableCountries: regionSettings.availableCountries,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    auth,
    regionSettings,
    router,
  },
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

const RegionSettingsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(RegionSettingsPanel));

export {
  mapToFunctions,
  mapToProps,
  RegionSettingsPage as default,
};
