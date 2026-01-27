import {
  AppFeatures,
  Auth,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Locale,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import RegionSettingsPanel from '@ringcentral-integration/widgets/components/RegionSettingsPanel';
import { includes } from 'ramda';
import React, { useRef } from 'react';

import type {
  RegionSettingsViewOptions,
  RegionSettingsViewPanelProps,
  RegionSettingsViewProps,
} from './RegionSettings.view.interface';
import { RegionSettingsPanel as SpringRegionSettingsPanel } from './RegionSettingsPanel';

@injectable({
  name: 'RegionSettingsView',
})
export class RegionSettingsView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    protected _auth: Auth,
    protected _locale: Locale,
    protected _regionSettings: RegionSettings,
    protected _router: RouterPlugin,
    protected _appFeatures: AppFeatures,
    @optional('RegionSettingsViewOptions')
    protected _regionSettingsViewOptions?: RegionSettingsViewOptions,
  ) {
    super();
  }
  getUIProps(): UIProps<RegionSettingsViewPanelProps> {
    return {
      availableCountries: this._regionSettings.availableCountries,
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
      currentLocale: this._locale.currentLocale,
    };
  }

  getUIFunctions(): UIFunctions<RegionSettingsViewPanelProps> {
    return {
      onBackButtonClick: () =>
        slideOutViewTransition(
          () => this._router.goBack(),
          this._theme?.reducedMotion,
        ),
      onSave: (...args) => this._regionSettings.setData(...args),
      canAreaCodeShow: (currentCountryCode) => {
        const isEDPEnabled = this._appFeatures.isEDPEnabled;
        if (isEDPEnabled) {
          return !includes(currentCountryCode, ['US', 'PR', 'CA']);
        }
        return includes(currentCountryCode, ['CA', 'US']);
      },
    };
  }

  component(props: RegionSettingsViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component =
        this._regionSettingsViewOptions?.component || SpringRegionSettingsPanel;
      return <Component {..._props} {...uiFunctions} />;
    }

    const Component =
      this._regionSettingsViewOptions?.component || RegionSettingsPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
