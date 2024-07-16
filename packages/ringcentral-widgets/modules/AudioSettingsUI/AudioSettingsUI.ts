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
    { dep: 'Alert', optional: true },
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
        !this._deps.audioSettings.availableOutputDevices.length,
      inputDeviceDisabled: !!(
        !this._deps.audioSettings.availableInputDevices.length || isHavingCall
      ),
      ringtoneSelectDisabled: isHavingCall,
      showCallVolume: this._deps.audioSettingsUIOptions?.showCallVolume,
      showRingToneVolume: this._deps.audioSettingsUIOptions?.showRingToneVolume,
      volumeTestData: this._deps.volumeInspector
        ? {
            volume: this._deps.volumeInspector.volume,
            countDown: this._deps.volumeInspector.countDown,
            testState: this._deps.volumeInspector.testState,
            isRecording:
              this._deps.volumeInspector.testState === TEST_STATE.RECORDS_AUDIO,
            type: this._deps.volumeInspector.type,
          }
        : undefined,
      selectedRingtoneId: this._deps.ringtoneConfiguration?.selectedRingtoneId,
      fullRingtoneList:
        this._deps.ringtoneConfiguration?.fullRingtoneList || [],
      isUploadRingtoneDisabled:
        this._deps.ringtoneConfiguration?.customRingtoneList &&
        this._deps.ringtoneConfiguration?.customRingtoneList?.length >=
          MAX_CUSTOM_RINGTONE_COUNT,
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
      showAlert: () => this._deps.audioSettings.showAlert(),
      handleTestMicroClick: (testState: TEST_STATE) => {
        switch (testState) {
          case TEST_STATE.IDLE:
            this._deps.volumeInspector?.startRecording();
            break;
          case TEST_STATE.RECORDS_AUDIO:
            this._deps.volumeInspector?.stopRecording();
            break;
          case TEST_STATE.PLAYS_AUDIO:
            this._deps.volumeInspector?.completeTest();
            break;
        }
      },
      handleTestSpeakerClick: (testState: TEST_STATE) => {
        switch (testState) {
          case TEST_STATE.IDLE:
            this._deps.volumeInspector?.startPlaySampleAudio();
            break;
          case TEST_STATE.PLAYS_AUDIO:
            this._deps.volumeInspector?.completeTest();
            break;
        }
      },
      updateCurrentRingtone: (id) => {
        this._deps.ringtoneConfiguration?.setSelectedRingtoneId(id);
        this._deps.ringtoneConfiguration?.updateIncomingRingtone();
      },
      removeCustomRingtone: (id) => {
        const hasCustomRingtone =
          this._deps.ringtoneConfiguration?.customRingtoneList.find(
            (ringtone) => ringtone.id === id,
          );
        if (!id || !hasCustomRingtone) {
          this._deps.alert?.danger({
            message: audioSettingsErrors.deleteRingtoneFailed,
          });
        }
        this._deps.ringtoneConfiguration?.removeCustomRingtone(id);
        // if the remove one the selected ringtone, set the first default ringtone as selected
        if (id === this._deps.ringtoneConfiguration?.selectedRingtoneId) {
          this.selectToRingtone(
            this._deps.ringtoneConfiguration?.defaultRingtoneList[0].id,
          );
        }
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
      showDangerAlert: (message: string) => {
        if (message) {
          this._deps.alert?.danger({
            message,
          });
        }
      },
    };
  }

  selectToRingtone(id: string) {
    this._deps.ringtoneConfiguration?.setSelectedRingtoneId(id);
    this._deps.ringtoneConfiguration?.updateIncomingRingtone();
  }
}

export { AudioSettingsUI };
