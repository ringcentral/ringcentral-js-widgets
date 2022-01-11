import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { Deps, RegionSettingsUIPanelProps } from './RegionSettingsUI.interface';

@Module({
  name: 'RegionSettingsUI',
  deps: [
    'Auth',
    'Locale',
    'RegionSettings',
    'RouterInteraction',
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
    };
  }
}
