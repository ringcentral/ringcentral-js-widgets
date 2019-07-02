import { Module } from 'ringcentral-integration/lib/di';
import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'AudioSettingsUI',
  deps: [
    'AudioSettings',
    'Locale',
    'CallingSettings',
    'RouterInteraction',
    { dep: 'Webphone', optional: true },
  ],
})
export default class AudioSettingsUI extends RcUIModule {
  constructor({
    audioSettings,
    locale,
    callingSettings,
    routerInteraction,
    webphone,
    ...options
  }) {
    super({
      ...options,
    });
    this._audioSettings = audioSettings;
    this._locale = locale;
    this._callingSettings = callingSettings;
    this._routerInteraction = routerInteraction;
    this._webphone = webphone;
  }

  getUIProps() {
    return {
      currentLocale: this._locale.currentLocale,
      dialButtonVolume: this._audioSettings.dialButtonVolume,
      dialButtonMuted: this._audioSettings.dialButtonMuted,
      ringtoneVolume: this._audioSettings.ringtoneVolume,
      ringtoneMuted: this._audioSettings.ringtoneMuted,
      callVolume: this._audioSettings.callVolume,
      availableInputDevices: this._audioSettings.availableInputDevices,
      inputDeviceId: this._audioSettings.inputDeviceId,
      availableOutputDevices: this._audioSettings.availableOutputDevices,
      outputDeviceId: this._audioSettings.outputDeviceId,
      supportDevices: this._audioSettings.supportDevices,
      userMedia: this._audioSettings.userMedia,
      isWebRTC: this._callingSettings.callWith === callingOptions.browser,
      outputDeviceDisabled: !this._audioSettings.availableOutputDevices.length,
      inputDeviceDisabled: !!(
        !this._audioSettings.availableInputDevices.length ||
        (this._webphone && this._webphone.sessions.length > 0)
      ),
    };
  }

  getUIFunctions() {
    return {
      onBackButtonClick: () => this._routerInteraction.goBack(),
      onSave: data => this._audioSettings.setData(data),
      checkUserMedia: () => this._audioSettings.getUserMedia(),
    };
  }
}
