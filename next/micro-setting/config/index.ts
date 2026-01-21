import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { BaseAppConfig } from '@ringcentral-integration/next-integration/interfaces';

import rc from '../../micro-core/config/rc';

export interface AppConfig extends BaseAppConfig {
  brandConfig: BrandConfig;
  enableMixpanel?: boolean;
}

export const appConfig = rc;
export { BrandConfig };
