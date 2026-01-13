import { Module } from '@ringcentral-integration/commons/lib/di';
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import {
  AudioInfo,
  MAX_CUSTOM_RINGTONE_COUNT,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import { TEST_STATE } from '@ringcentral-integration/commons/modules/VolumeInspector';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import { v4 as uuid } from 'uuid';

import { AudioSettingsPanelProps } from '../../components/AudioSettingsPanel';
import { AudioSettingsPanelProps as AudioSettingsPanelPropsV2 } from '../../components/AudioSettingsPanelV2';

import type { Deps } from './AudioSettingsUI.interface';

@Module({
  name: 'AudioSettingsUI',
  deps: [
    'AudioSettings',
    'Locale',
    'CallingSettings',
    'RouterInteraction',
    'CallMonitor',
    { dep: 'RingtoneConfiguration', optional: true },
    { dep: 'VolumeInspector', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'AudioSettingsUIOptions', optional: true },
  ],
})
class AudioSettingsUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  checkAllDevicesAreEmpty(devices: OmitFunctions<MediaDeviceInfo>[]) {
    return devices.every(
      (item) =>
        (item.label === '' && item.deviceId === '') ||
        (item.label === '' && item.deviceId === 'off'),
    );
  }

  getUIProps():
    | UIProps<AudioSettingsPanelProps>
    | UIProps<AudioSettingsPanelPropsV2> {
    const isHavingCall = !!(
      (this._deps.webphone && this._deps.webphone.sessions.length > 0) ||
      (this._deps.callMonitor.useTelephonySession &&
        this._deps.callMonitor.activeRingCalls.length +
          this._deps.callMonitor.activeOnHoldCalls.length +
          this._deps.callMonitor.activeCurrentCalls.length >
          0)
    );
    return {
      currentLocale: this._deps.locale.currentLocale,
      hasUserMedia: this._deps.audioSettings.hasUserMedia,
      isAGCEnabled: this._deps.audioSettings.isAGCEnabled,
      showAGCEnabled: this._deps.audioSettings.isSupportAGC,
      ringtoneVolume: this._deps.audioSettings.ringtoneVolume,
      callVolume: this._deps.audioSettings.callVolume,
      availableInputDevices: this._deps.audioSettings.availableInputDevices,
      inputDeviceId: this._deps.audioSettings.inputDeviceId,
      ringtoneDeviceId: this._deps.audioSettings.ringtoneDeviceId,
      availableOutputDevices: this._deps.audioSettings.availableOutputDevices,
      availableRingtoneDevices:
        this._deps.audioSettings.availableRingtoneDevices,
      outputDeviceId: this._deps.audioSettings.outputDeviceId,
      supportDevices: this._deps.audioSettings.supportDevices,
      userMedia: this._deps.audioSettings.userMedia,
      isWebRTC: this._deps.callingSettings.callWith === callingOptions.browser,
      outputDeviceDisabled:
        !this._deps.audioSettings.availableOutputDevices.length ||
        this.checkAllDevicesAreEmpty(
          this._deps.audioSettings.availableOutputDevices,
        ),
      inputDeviceDisabled: !!(
        !this._deps.audioSettings.availableInputDevices.length ||
        isHavingCall ||
        this.checkAllDevicesAreEmpty(
          this._deps.audioSettings.availableInputDevices,
        )
      ),
      ringtoneSelectDisabled: isHavingCall,
      showCallVolume: this._deps.audioSettingsUIOptions?.showCallVolume,
      showRingToneVolume: this._deps.audioSettingsUIOptions?.showRingToneVolume,
      volumeTestData: this._deps.volumeInspector?.data,
      selectedRingtoneId: this._deps.ringtoneConfiguration?.selectedRingtoneId,
      fullRingtoneList:
        this._deps.ringtoneConfiguration?.fullRingtoneList || [],
      isUploadRingtoneDisabled:
        this._deps.ringtoneConfiguration?.isUploadRingtoneDisabled,
      enableCustomRingtone:
        this._deps.ringtoneConfiguration?.enableCustomRingtone,
    };
  }

  getUIFunctions():
    | UIFunctions<AudioSettingsPanelProps>
    | UIFunctions<AudioSettingsPanelPropsV2> {
    return {
      onBackButtonClick: () => this._deps.routerInteraction.goBack(),
      onSave: (data) => this._deps.audioSettings.setData(data),
      checkUserMedia: () => this._deps.audioSettings.getUserMedia(),
      checkAudioAvailable: () =>
        this._deps.audioSettings.checkAudioAvailable({
          checkIfNoDevices: false,
        }),
      handleTestMicroClick: (testState: TEST_STATE) => {
        this._deps.volumeInspector?.handleTestMicroClick(testState);
      },
      handleTestSpeakerClick: (testState: TEST_STATE) => {
        this._deps.volumeInspector?.handleTestSpeakerClick(testState);
      },
      updateCurrentRingtone: (id) => {
        this.selectToRingtone(id);
      },
      removeCustomRingtone: (id) => {
        this._deps.ringtoneConfiguration?.removeCustomRingtone(id);
      },
      uploadCustomRingtone: (audioInfo: AudioInfo) => {
        const id = `custom-${uuid()}`;
        this._deps.ringtoneConfiguration?.uploadCustomRingtone({
          id,
          name: audioInfo.fileName,
          url: audioInfo.dataUrl,
          type: 'custom',
        });
        this.selectToRingtone(id);
      },
      showDangerAlert: (message) => {
        this._deps.ringtoneConfiguration?.showDangerAlert(message);
      },
    };
  }

  selectToRingtone(id: string) {
    if (!this._deps.ringtoneConfiguration) return;
    this._deps.ringtoneConfiguration.setSelectedRingtoneId(id);
    this._deps.ringtoneConfiguration.updateIncomingRingtone();
  }
}

export { AudioSettingsUI };
