import { Module } from 'ringcentral-integration/lib/di';
import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import {
  CallingSettingsPanelUIProps,
  CallingSettingsPanelUIFunctions,
} from '../../components/CallingSettingsPanel/CallingSettingsPenal.interface';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'CallingSettingsUI',
  deps: [
    'CallingSettings',
    'Brand',
    'Locale',
    { dep: 'Webphone', optional: true },
    'RouterInteraction',
    { dep: 'CallingSettingsUIOptions', optional: true },
  ],
})
export class CallingSettingsUI extends RcUIModule {
  _callingSettings: any;
  _brand: any;
  _locale: any;
  _webphone: any;
  _routerInteraction: any;
  _locationSearchable: boolean;
  _ringtoneSettings: boolean;

  constructor({
    callingSettings,
    brand,
    locale,
    webphone,
    routerInteraction,
    locationSearchable = true,
    ringtoneSettings = false,
    ...options
  }) {
    super({ ...options });
    this._callingSettings = callingSettings;
    this._brand = brand;
    this._locale = locale;
    this._webphone = webphone;
    this._routerInteraction = routerInteraction;
    this._locationSearchable = locationSearchable;
    this._ringtoneSettings = ringtoneSettings;
  }

  get showSpinner() {
    return !(
      this._callingSettings.ready &&
      this._brand.ready &&
      this._locale.ready &&
      (!this._webphone || this._webphone.ready) &&
      this._routerInteraction.ready
    );
  }

  get locationSearchable() {
    return !!this._locationSearchable;
  }

  getUIProps(): CallingSettingsPanelUIProps {
    return {
      brandCode: this._brand.code,
      brandName: this._brand.name,
      currentLocale: this._locale.currentLocale,
      callWithOptions: this._callingSettings.callWithOptions,
      callWith: this._callingSettings.callWith,
      myLocation: this._callingSettings.myLocation,
      ringoutPrompt: this._callingSettings.ringoutPrompt,
      defaultRingoutPrompt: this._callingSettings.defaultRingoutPrompt,
      availableNumbersWithLabel: this._callingSettings
        .availableNumbersWithLabel,
      disabled: !!(this._webphone && this._webphone.sessions.length > 0),
      showSpinner: this.showSpinner,
      locationSearchable: this.locationSearchable,
      showRingToneSettings:
        this._ringtoneSettings && this._callingSettings.isChangeRingToneAllowed,
      incomingAudioFile: this._webphone?.incomingAudioFile,
      incomingAudio: this._webphone?.incomingAudio,
      outgoingAudioFile: this._webphone?.outgoingAudioFile,
      outgoingAudio: this._webphone?.outgoingAudio,
      defaultIncomingAudioFile: this._webphone?.defaultIncomingAudioFile,
      defaultIncomingAudio: this._webphone?.defaultIncomingAudio,
      defaultOutgoingAudioFile: this._webphone?.outgoingAudioFile,
      defaultOutgoingAudio: this._webphone?.outgoingAudio,
    };
  }

  getUIFunctions(): CallingSettingsPanelUIFunctions {
    return {
      onBackButtonClick: () => this._routerInteraction.goBack(),
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
        this._callingSettings.setData(
          {
            callWith,
            myLocation,
            ringoutPrompt,
            isCustomLocation,
          },
          true,
        );
        if (this._webphone && callWith === callingOptions.browser) {
          this._webphone.setRingtone({
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
