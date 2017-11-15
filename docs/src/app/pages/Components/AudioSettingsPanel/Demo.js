import React from 'react';
// eslint-disable-next-line
import AudioSettingsPanel from 'ringcentral-widgets/components/AudioSettingsPanel';

const props = {};
props.currentLocale = 'en-US';
props.dialButtonVolume = 0.5;
props.ringtoneVolume = 0.5;
props.ringtoneMuted = false;
props.callVolume = 0.5;
props.dialButtonMuted = false;
props.onBackButtonClick = () => null;
props.availableInputDevices = [{
  deviceId: '12345',
  label: 'Input Device',
}];
props.inputDeviceId = '12345';
props.availableOutputDevices = [{
  deviceId: '1234',
  label: 'Output Device',
}];
props.outputDeviceId = '1234';
props.supportDevices = true;
props.onSave = () => null;
props.userMedia = true;
props.isWebRTC = true;
props.checkUserMedia = () => null;

/**
 * A example of `AudioSettingsPanel`
 */
const AudioSettingsPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <AudioSettingsPanel
      {...props}
    />
  </div>
);
export default AudioSettingsPanelDemo;
