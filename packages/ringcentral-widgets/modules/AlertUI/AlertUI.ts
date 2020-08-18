import { Module } from 'ringcentral-integration/lib/di';
import Locale from 'ringcentral-integration/modules/Locale';
import Brand from 'ringcentral-integration/modules/Brand';
import Alert from 'ringcentral-integration/modules/Alert';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';

import RouterInteraction from '../RouterInteraction';
import { AlertRenderer } from '../../components/AlertRenderer';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'AlertUI',
  deps: ['Brand', 'Alert', 'Locale', 'RouterInteraction', 'RateLimiter'],
})
export default class AlertUI extends RcUIModule {
  private _locale: Locale;
  private _brand: Brand;
  private _alert: Alert;
  private _routerInteraction: RouterInteraction;
  private _rateLimiter: RateLimiter;

  constructor({
    locale,
    brand,
    alert,
    routerInteraction,
    rateLimiter,
    ...options
  }) {
    super({ locale, brand, alert, routerInteraction, rateLimiter, ...options });
    this._locale = locale;
    this._brand = brand;
    this._alert = alert;
    this._routerInteraction = routerInteraction;
    this._rateLimiter = rateLimiter;
  }

  getUIProps() {
    return {
      currentLocale: this._locale.currentLocale,
      messages: this._alert.messages,
      brand: this._brand.fullName,
    };
  }

  getUIFunctions({
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
          this._alert,
          this._brand,
          this._rateLimiter,
          this._routerInteraction,
          regionSettingsUrl,
          callingSettingsUrl,
        )(messageObject);
      },
      dismiss: (id: string) => this._alert.dismiss(id),
      ...rest,
    };
  }
}
