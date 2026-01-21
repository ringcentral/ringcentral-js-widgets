import {
  Brand,
  Locale,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type {
  CallingSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { CallingSettingsPanel } from '@ringcentral-integration/widgets/components/CallingSettingsPanel';
import React, { useRef } from 'react';

import type {
  CallingSettingsViewOptions,
  CallingSettingsViewProps,
  CallingSettingsPanelProps,
} from './CallingSettings.view.interface';
import { CallingSettingsPanel as SpringCallingSettingsPanel } from './CallingSettingsPanel';

@injectable({
  name: 'CallingSettingsView',
})
export class CallingSettingsView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    protected _brand: Brand,
    protected _locale: Locale,
    protected _router: RouterPlugin,
    @optional('CallingSettingsViewOptions')
    protected _callingSettingsViewOptions?: CallingSettingsViewOptions,
  ) {
    super();
  }

  @dynamic('CallingSettings')
  protected readonly _callingSettings!: CallingSettings;

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  get showSetting() {
    return !!this._callingSettings;
  }

  get showSpinner() {
    return !(
      this._callingSettings?.ready &&
      this._brand.ready &&
      this._locale.ready &&
      (!this._webphone || this._webphone.ready)
    );
  }

  get locationSearchable() {
    return !!(this._callingSettingsViewOptions?.locationSearchable ?? true);
  }

  get ringtoneSettings() {
    return !!(this._callingSettingsViewOptions?.ringtoneSettings ?? false);
  }

  getUIProps(
    props: CallingSettingsViewProps,
  ): UIProps<CallingSettingsPanelProps> {
    return {
      currentLocale: this._locale.currentLocale,
      callWithOptions: this._callingSettings.callWithOptions,
      callWith: this._callingSettings.callWith!,
      myLocation: this._callingSettings.myLocation,
      ringoutPrompt: this._callingSettings.ringoutPrompt,
      defaultRingoutPrompt: this._callingSettings.defaultRingoutPrompt,
      availableNumbersWithLabel:
        this._callingSettings.availableNumbersWithLabel,
      disabled:
        this._callingSettingsViewOptions?.disabled ??
        !!(this._webphone && this._webphone.sessions.length > 0),
      showSpinner:
        // in spring-ui, we don't show spinner in calling settings panel
        process.env.THEME_SYSTEM !== 'spring-ui' && this.showSpinner,
      locationSearchable: this.locationSearchable,
      showRingToneSettings:
        this.ringtoneSettings && this._callingSettings.isChangeRingToneAllowed!,
      incomingAudioFile: this._webphone?.incomingAudioFile!,
      incomingAudio: this._webphone?.incomingAudio,
      outgoingAudioFile: this._webphone?.outgoingAudioFile!,
      outgoingAudio: this._webphone?.outgoingAudio,
      defaultIncomingAudioFile: this._webphone?.defaultIncomingAudioFile,
      defaultIncomingAudio: this._webphone?.defaultIncomingAudio,
      defaultOutgoingAudioFile: this._webphone?.outgoingAudioFile!,
      defaultOutgoingAudio: this._webphone?.outgoingAudio,
      jupiterAppName: this._callingSettings.jupiterAppName as string,
      softphoneAppName: this._brand.brandConfig.callWithSoftphone
        ?.name as string,
    };
  }

  getUIFunctions(
    props: CallingSettingsViewProps,
  ): UIFunctions<CallingSettingsPanelProps> {
    return {
      onBackButtonClick: () =>
        slideOutViewTransition(
          () => this._router.goBack(),
          this._theme?.reducedMotion,
        ),
      onSave: ({
        callWith,
        myLocation,
        ringoutPrompt,
        // TODO: below is not need in spring-ui, can be remove once all project move to spring-ui
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
          },
          true,
        );
        if (
          this._webphone &&
          callWith === this._callingSettings.callingOptions.browser
        ) {
          this._webphone.setRingtone({
            incomingAudio: incomingAudio!,
            incomingAudioFile: incomingAudioFile!,
            outgoingAudio: outgoingAudio!,
            outgoingAudioFile: outgoingAudioFile!,
          });
        }
      },
    };
  }

  component(props: CallingSettingsViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component =
        this._callingSettingsViewOptions?.component ||
        SpringCallingSettingsPanel;
      return <Component {..._props} {...uiFunctions} />;
    }

    const Component =
      this._callingSettingsViewOptions?.component || CallingSettingsPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
