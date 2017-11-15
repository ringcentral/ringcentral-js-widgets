import { connect } from 'react-redux';
import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import AudioSettingsPanel from '../../components/AudioSettingsPanel';
import withPhone from '../../lib/withPhone';


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
      userMedia,
    },
    locale: {
      currentLocale,
    },
    callingSettings: {
      callWith,
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
    userMedia,
    isWebRTC: callWith === callingOptions.browser,
  };
}

function mapToFunctions(_, {
  phone: {
    routerInteraction,
    audioSettings,
  },
}) {
  return {
    onBackButtonClick: () => {
      routerInteraction.goBack();
    },
    onSave: (data) => {
      audioSettings.setData(data);
    },
    checkUserMedia: () => {
      audioSettings.getUserMedia();
    },
  };
}

const AudioSettingsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(AudioSettingsPanel));

export {
  mapToFunctions,
  mapToProps,
  AudioSettingsPage as default,
};
