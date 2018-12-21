import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'CallingSettingsUI',
  deps: [
    'CallingSettings',
    'Brand',
    'Locale',
    { dep: 'Webphone', optional: true },
    'RouterInteraction',
  ]
})
export default class CallingSettingsUI extends RcUIModule {
  constructor({
    callingSettings,
    brand,
    locale,
    webphone,
    routerInteraction,
    options
  }) {
    super({ ...options });
    this._callingSettings = callingSettings;
    this._brand = brand;
    this._locale = locale;
    this._webphone = webphone;
    this._routerInteraction = routerInteraction;
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

  getUIProps() {
    return {
      brand: this._brand.fullName,
      currentLocale: this._locale.currentLocale,
      callWithOptions: this._callingSettings.callWithOptions,
      callWith: this._callingSettings.callWith,
      myLocation: this._callingSettings.myLocation,
      ringoutPrompt: this._callingSettings.ringoutPrompt,
      availableNumbers: this._callingSettings.availableNumbers,
      disabled: !!(this._webphone && this._webphone.sessions.length > 0),
      showSpinner: this.showSpinner,
    };
  }

  getUIFunctions() {
    return {
      onBackButtonClick: () => this._routerInteraction.goBack(),
      onSave: ({ callWith, myLocation, ringoutPrompt }) => this._callingSettings.setData({
        callWith,
        myLocation,
        ringoutPrompt,
      }, true),
    };
  }
}
