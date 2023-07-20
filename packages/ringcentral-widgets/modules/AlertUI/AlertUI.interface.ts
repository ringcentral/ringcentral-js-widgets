import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { Softphone } from '@ringcentral-integration/commons/modules/Softphone';

import type { CallLogSection } from '../CallLogSection';
import type { RouterInteraction } from '../RouterInteraction';

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
