import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIProps,
  UIFunctions,
} from '@ringcentral-integration/core';
import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
import { CallingSettingsPanelProps } from '../../components/CallingSettingsPanel/CallingSettingsPenal.interface';
import { Deps } from './CallingSettingsUI.interface';

@Module({
  name: 'CallingSettingsUI',
  deps: [
    'CallingSettings',
    'Brand',
    'Locale',
    'RouterInteraction',
    { dep: 'Webphone', optional: true },
    { dep: 'CallingSettingsUIOptions', optional: true },
  ],
})
class CallingSettingsUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({ deps });
  }

  get showSpinner() {
    return !(
      this._deps.callingSettings.ready &&
      this._deps.brand.ready &&
      this._deps.locale.ready &&
      (!this._deps.webphone || this._deps.webphone.ready) &&
      this._deps.routerInteraction.ready
    );
  }

  get locationSearchable() {
    return !!(this._deps.callingSettingsUIOptions?.locationSearchable ?? true);
  }

  get ringtoneSettings() {
    return !!(this._deps.callingSettingsUIOptions?.ringtoneSettings ?? false);
  }

  getUIProps(): UIProps<CallingSettingsPanelProps> {
    return {
      brandCode: this._deps.brand.code,
      brandName: this._deps.brand.name,
      shortBrandName: this._deps.brand.shortName,
      fullBrandName: this._deps.brand.fullName,
      currentLocale: this._deps.locale.currentLocale,
      callWithOptions: this._deps.callingSettings.callWithOptions,
      callWith: this._deps.callingSettings.callWith,
      myLocation: this._deps.callingSettings.myLocation,
      ringoutPrompt: this._deps.callingSettings.ringoutPrompt,
      defaultRingoutPrompt: this._deps.callingSettings.defaultRingoutPrompt,
      availableNumbersWithLabel: this._deps.callingSettings
        .availableNumbersWithLabel,
      disabled: !!(
        this._deps.webphone && this._deps.webphone.sessions.length > 0
      ),
      showSpinner: this.showSpinner,
      locationSearchable: this.locationSearchable,
      showRingToneSettings:
        this.ringtoneSettings &&
        this._deps.callingSettings.isChangeRingToneAllowed,
      incomingAudioFile: this._deps.webphone?.incomingAudioFile,
      incomingAudio: this._deps.webphone?.incomingAudio,
      outgoingAudioFile: this._deps.webphone?.outgoingAudioFile,
      outgoingAudio: this._deps.webphone?.outgoingAudio,
      defaultIncomingAudioFile: this._deps.webphone?.defaultIncomingAudioFile,
      defaultIncomingAudio: this._deps.webphone?.defaultIncomingAudio,
      defaultOutgoingAudioFile: this._deps.webphone?.outgoingAudioFile,
      defaultOutgoingAudio: this._deps.webphone?.outgoingAudio,
    };
  }

  getUIFunctions(): UIFunctions<CallingSettingsPanelProps> {
    return {
      onBackButtonClick: () => this._deps.routerInteraction.goBack(),
      onSave: ({
        callWith,
        myLocation,
        ringoutPrompt,
        isCustomLocation,
        incomingAudio,
        incomingAudioFile,
        outgoingAudio,
        outgoingAudioFile,
      }) => {
        this._deps.callingSettings.setData(
          {
            callWith,
            myLocation,
            ringoutPrompt,
            isCustomLocation,
          },
          true,
        );
        if (this._deps.webphone && callWith === callingOptions.browser) {
          this._deps.webphone.setRingtone({
            incomingAudio,
            incomingAudioFile,
            outgoingAudio,
            outgoingAudioFile,
          });
        }
      },
    };
  }
}

export { CallingSettingsUI };
