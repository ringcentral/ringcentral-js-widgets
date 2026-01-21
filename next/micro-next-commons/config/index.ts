import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { BaseAppConfig } from '@ringcentral-integration/next-integration/interfaces';

import rc from '../../micro-core/config/rc';

export interface AppConfig extends BaseAppConfig {
  brandConfig: BrandConfig;
  themeFolder: string;
  logoFolder: string;
  defaultLocale: string;
  publicPath: string;
}

export const appConfig = rc;

export { BrandConfig };
