import { connect } from 'react-redux';
import AudioSettingsPanel from '../../components/AudioSettingsPanel';


function mapToProps(_, {
  phone: {
    audioSettings: {
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      availableInputDevices,
      inputDeviceId,
      availableOutputDevices,
      outputDeviceId,
      supportDevices,
    },
    locale: {
      currentLocale,
    },
  },
}) {
  return {
    currentLocale,
    dialButtonVolume,
    dialButtonMuted,
    ringtoneVolume,
    ringtoneMuted,
    callVolume,
    availableInputDevices,
    inputDeviceId,
    availableOutputDevices,
    outputDeviceId,
    supportDevices,
  };
}

function mapToFunctions(_, {
  phone: {
    router,
    audioSettings,
  },
}) {
  return {
    onBackButtonClick: () => {
      router.goBack();
    },
    onSave: (data) => {
      audioSettings.setData(data);
    },
  };
}

const AudioSettingsPage = connect(
  mapToProps,
  mapToFunctions,
)(AudioSettingsPanel);

export {
  mapToFunctions,
  mapToProps,
  AudioSettingsPage as default,
};
