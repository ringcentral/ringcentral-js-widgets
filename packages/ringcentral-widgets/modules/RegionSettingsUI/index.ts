import { Module } from '@ringcentral-integration/commons/lib/di';

import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'RegionSettingsUI',
  deps: ['Auth', 'Locale', 'RegionSettings', 'RouterInteraction'],
})
export default class RegionSettingsUI extends RcUIModule {
  getUIProps({ phone: { locale, regionSettings } }) {
    return {
      availableCountries: regionSettings.availableCountries,
      countryCode: regionSettings.countryCode,
      areaCode: regionSettings.areaCode,
      currentLocale: locale.currentLocale,
    };
  }

  getUIFunctions({ phone: { auth, regionSettings, routerInteraction } }) {
    return {
      onBackButtonClick: () => routerInteraction.goBack(),
      onSave: ({ areaCode, countryCode }) =>
        regionSettings.setData({
          areaCode,
          countryCode,
        }),
      async onLogoutButtonClick() {
        await auth.logout();
      },
    };
  }
}
