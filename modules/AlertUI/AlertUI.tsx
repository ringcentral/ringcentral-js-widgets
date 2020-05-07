import { FunctionComponent } from 'react';
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
    getAdditionalRenderer,
    regionSettingsUrl,
    callingSettingsUrl,
    ...rest
  }) {
    return {
      getRenderer: (messageObject: object) => {
        if (getAdditionalRenderer) {
          const renderer = getAdditionalRenderer()(messageObject);

          if (renderer) return renderer;
        }

        return AlertRenderer(
          alert,
          brand,
          rateLimiter,
          routerInteraction,
          regionSettingsUrl,
          callingSettingsUrl,
        )(messageObject);
      },
      dismiss: (id: string) => alert.dismiss(id),
      ...rest,
    };
  }
}
