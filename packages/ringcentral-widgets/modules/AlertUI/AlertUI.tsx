import { Module } from 'ringcentral-integration/lib/di';

import { AlertRenderer } from '../../components/AlertRenderer';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'AlertUI',
  deps: ['Brand', 'Alert', 'Locale', 'RouterInteraction', 'RateLimiter'],
})
export default class AlertUI extends RcUIModule {
  getUIProps({ phone: { locale, brand, alert } }) {
    return {
      currentLocale: locale.currentLocale,
      messages: alert.messages,
      brand: brand.fullName,
    };
  }

  getUIFunctions({
    phone: { alert, brand, routerInteraction, rateLimiter },
    regionSettingsUrl,
    callingSettingsUrl,
    getAdditionalRenderer,
  }) {
    return {
      getRenderer: (message: string) => {
        if (getAdditionalRenderer) {
          const renderer = getAdditionalRenderer()(message);

          if (renderer) return renderer;
        }

        return AlertRenderer(
          alert,
          brand,
          rateLimiter,
          routerInteraction,
          regionSettingsUrl,
          callingSettingsUrl,
        )(message);
      },
      dismiss: (id: string) => alert.dismiss(id),
    };
  }
}
