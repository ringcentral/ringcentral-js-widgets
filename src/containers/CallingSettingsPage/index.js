import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Brand from 'ringcentral-integration/modules/Brand';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import Locale from 'ringcentral-integration/modules/Locale';
import RouterIntegration from '../../modules/RouterInteraction';
import CallingSettingsPanel from '../../components/CallingSettingsPanel';

const CallingSettingsPage = connect((_, props) => ({
  brand: props.brand.fullName,
  currentLocale: props.locale.currentLocale,
  callWithOptions: props.callingSettings.callWithOptions,
  callWith: props.callingSettings.callWith,
  myLocation: props.callingSettings.myLocation,
  ringoutPrompt: props.callingSettings.ringoutPrompt,
  availableNumbers: props.callingSettings.availableNumbers,
}), (_, props) => ({
  onBackButtonClick: () => {
    props.router.history.goBack();
  },
  onSave: ({ callWith, myLocation, ringoutPrompt }) => {
    props.callingSettings.setData({
      callWith, myLocation, ringoutPrompt,
    }, true);
  },
}))(CallingSettingsPanel);

CallingSettingsPage.propTypes = {
  brand: PropTypes.instanceOf(Brand).isRequired,
  callingSettings: PropTypes.instanceOf(CallingSettings).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  router: PropTypes.instanceOf(RouterIntegration).isRequired,
};


export default CallingSettingsPage;
