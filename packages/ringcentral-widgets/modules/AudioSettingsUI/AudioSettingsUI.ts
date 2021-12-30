import { Module } from '@ringcentral-integration/commons/lib/di';
import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { AudioSettingsPanelProps, Deps } from './AudioSettingsUI.interface';

@Module({
  name: 'AudioSettingsUI',
  deps: [
    'AudioSettings',
    'Locale',
    'CallingSettings',
    'RouterInteraction',
    'CallMonitor',
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

  getUIProps(): UIProps<AudioSettingsPanelProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      dialButtonVolume: this._deps.audioSettings.dialButtonVolume,
      dialButtonMuted: this._deps.audioSettings.dialButtonMuted,
      ringtoneVolume: this._deps.audioSettings.ringtoneVolume,
      ringtoneMuted: this._deps.audioSettings.ringtoneMuted,
      callVolume: this._deps.audioSettings.callVolume,
      availableInputDevices: this._deps.audioSettings.availableInputDevices,
      inputDeviceId: this._deps.audioSettings.inputDeviceId,
      availableOutputDevices: this._deps.audioSettings.availableOutputDevices,
      outputDeviceId: this._deps.audioSettings.outputDeviceId,
      supportDevices: this._deps.audioSettings.supportDevices,
      userMedia: this._deps.audioSettings.userMedia,
      isWebRTC: this._deps.callingSettings.callWith === callingOptions.browser,
      outputDeviceDisabled:
        !this._deps.audioSettings.availableOutputDevices.length,
      inputDeviceDisabled: !!(
        !this._deps.audioSettings.availableInputDevices.length ||
        (this._deps.webphone && this._deps.webphone.sessions.length > 0) ||
        (this._deps.callMonitor.useTelephonySession &&
          this._deps.callMonitor.activeRingCalls.length +
            this._deps.callMonitor.activeOnHoldCalls.length +
            this._deps.callMonitor.activeCurrentCalls.length >
            0)
      ),
    };
  }

  getUIFunctions(): UIFunctions<AudioSettingsPanelProps> {
    return {
      onBackButtonClick: () => this._deps.routerInteraction.goBack(),
      onSave: (data) => this._deps.audioSettings.setData(data),
      checkUserMedia: () => this._deps.audioSettings.getUserMedia(),
    };
  }
}

export { AudioSettingsUI };
