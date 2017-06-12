import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Brand from 'ringcentral-integration/modules/Brand';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import Locale from 'ringcentral-integration/modules/Locale';
import RouterIntegration from '../../modules/RouterInteraction';
import CallingSettingsPanel from '../../components/CallingSettingsPanel';


function mapToProps(_, {
  callingSettings,
  brand,
  locale,
  webphone,
}) {
  return {
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    callWithOptions: callingSettings.callWithOptions,
    callWith: callingSettings.callWith,
    myLocation: callingSettings.myLocation,
    ringoutPrompt: callingSettings.ringoutPrompt,
    availableNumbers: callingSettings.availableNumbers,
    disabled: webphone && (webphone.sessions.length > 0),
  };
}

function mapToFunctions(_, {
  callingSettings,
  router,
}) {
  return {
    onBackButtonClick: () => {
      router.goBack();
    },
    onSave: ({ callWith, myLocation, ringoutPrompt }) => {
      callingSettings.setData({
        callWith, myLocation, ringoutPrompt,
      }, true);
    },
  };
}

const CallingSettingsPage = connect(
  mapToProps,
  mapToFunctions,
)(CallingSettingsPanel);

const propTypes = {
  brand: PropTypes.instanceOf(Brand).isRequired,
  callingSettings: PropTypes.instanceOf(CallingSettings).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  router: PropTypes.instanceOf(RouterIntegration).isRequired,
};

CallingSettingsPage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  CallingSettingsPage as default,
};
