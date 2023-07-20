import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { includes } from 'ramda';

import type {
  Deps,
  RegionSettingsUIPanelProps,
} from './RegionSettingsUI.interface';

@Module({
  name: 'RegionSettingsUI',
  deps: [
    'Auth',
    'Locale',
    'RegionSettings',
    'RouterInteraction',
    'AppFeatures',
    { dep: 'RegionSettingsUIOptions', optional: true },
  ],
})
export class RegionSettingsUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }
  getUIProps(): UIProps<RegionSettingsUIPanelProps> {
    return {
      availableCountries: this._deps.regionSettings.availableCountries,
      countryCode: this._deps.regionSettings.countryCode,
      areaCode: this._deps.regionSettings.areaCode,
      currentLocale: this._deps.locale.currentLocale,
    };
  }

  getUIFunctions(): UIFunctions<RegionSettingsUIPanelProps> {
    return {
      onBackButtonClick: () => this._deps.routerInteraction.goBack(),
      onSave: (...args) => this._deps.regionSettings.setData(...args),
      onLogoutButtonClick: () => this._deps.auth.logout(),
      canAreaCodeShow: (currentCountryCode) => {
        const isEDPEnabled = this._deps.appFeatures.isEDPEnabled;
        if (isEDPEnabled) {
          return !includes(currentCountryCode, ['US', 'PR', 'CA']);
        }
        return includes(currentCountryCode, ['CA', 'US']);
      },
    };
  }
}
