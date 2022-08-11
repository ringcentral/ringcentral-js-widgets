import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { Softphone } from '@ringcentral-integration/commons/modules/Softphone';

import { CallLogSection } from '../CallLogSection';
import { RouterInteraction } from '../RouterInteraction';

export interface AlertUIOptions {}
export interface Deps {
  alert: Alert;
  brand: Brand;
  locale: Locale;
  rateLimiter?: RateLimiter;
  routerInteraction: RouterInteraction;
  softphone?: Softphone;
  callLogSection?: CallLogSection;
}
