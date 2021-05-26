import { Alert } from 'ringcentral-integration/modules/AlertV2';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { RouterInteraction } from '../RouterInteraction';

export interface AlertUIOptions {}
export interface Deps {
  alert: Alert;
  brand: Brand;
  locale: Locale;
  rateLimiter: RateLimiter;
  routerInteraction: RouterInteraction;
}
