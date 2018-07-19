import { connect } from 'react-redux';
import CallingSettingsPanel from '../../components/CallingSettingsPanel';
import withPhone from '../../lib/withPhone';


function mapToProps(_, {
  phone: {
    callingSettings,
    brand,
    locale,
    webphone,
  },
}) {
  return {
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    callWithOptions: callingSettings.callWithOptions,
    callWith: callingSettings.callWith,
    myLocation: callingSettings.myLocation,
    ringoutPrompt: callingSettings.ringoutPrompt,
    availableNumbers: callingSettings.availableNumbers,
    disabled: !!(webphone && webphone.sessions.length > 0),
  };
}

function mapToFunctions(_, {
  phone: {
    callingSettings,
    routerInteraction,
  },
}) {
  return {
    onBackButtonClick: () => {
      routerInteraction.goBack();
    },
    onSave: ({ callWith, myLocation, ringoutPrompt }) => {
      callingSettings.setData({
        callWith, myLocation, ringoutPrompt,
      }, true);
    },
  };
}

const CallingSettingsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallingSettingsPanel));

export {
  mapToFunctions,
  mapToProps,
  CallingSettingsPage as default,
};
