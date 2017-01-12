import { PropTypes } from 'react';
import { connect } from 'react-redux';
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
  brand: PropTypes.object.isRequired,
  callingSettings: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};


export default CallingSettingsPage;
