import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RouterInteraction } from '../RouterInteraction';

export interface AlertUIOptions {}
export interface Deps {
  alert: Alert;
  brand: Brand;
  locale: Locale;
  rateLimiter: RateLimiter;
  routerInteraction: RouterInteraction;
}
