import { Module } from '@ringcentral-integration/commons/lib/di';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

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
      currentLocale: this._deps.locale.currentLocale,
      callWithOptions: this._deps.callingSettings.callWithOptions,
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      callWith: this._deps.callingSettings.callWith,
      myLocation: this._deps.callingSettings.myLocation,
      ringoutPrompt: this._deps.callingSettings.ringoutPrompt,
      defaultRingoutPrompt: this._deps.callingSettings.defaultRingoutPrompt,
      availableNumbersWithLabel:
        this._deps.callingSettings.availableNumbersWithLabel,
      disabled: !!(
        this._deps.webphone && this._deps.webphone.sessions.length > 0
      ),
      showSpinner: this.showSpinner,
      locationSearchable: this.locationSearchable,
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      showRingToneSettings:
        this.ringtoneSettings &&
        this._deps.callingSettings.isChangeRingToneAllowed,
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      incomingAudioFile: this._deps.webphone?.incomingAudioFile,
      incomingAudio: this._deps.webphone?.incomingAudio,
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      outgoingAudioFile: this._deps.webphone?.outgoingAudioFile,
      outgoingAudio: this._deps.webphone?.outgoingAudio,
      defaultIncomingAudioFile: this._deps.webphone?.defaultIncomingAudioFile,
      defaultIncomingAudio: this._deps.webphone?.defaultIncomingAudio,
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      defaultOutgoingAudioFile: this._deps.webphone?.outgoingAudioFile,
      defaultOutgoingAudio: this._deps.webphone?.outgoingAudio,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      jupiterAppName: this._deps.callingSettings.jupiterAppName,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      softphoneAppName: this._deps.brand.brandConfig.callWithSoftphone?.name,
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
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            incomingAudio,
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            incomingAudioFile,
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            outgoingAudio,
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            outgoingAudioFile,
          });
        }
      },
    };
  }
}

export { CallingSettingsUI };
