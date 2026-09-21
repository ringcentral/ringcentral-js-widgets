import { processI18n } from '@ringcentral-integration/i18n/lib/processI18n';

import type { BrandConfig } from '../../config';
import rc from '../../config/rc';

export const configMap = {
  rc,
};

export type BrandCode = keyof typeof configMap;

export const getAppConfig = (brandCode: BrandCode) => {
  return configMap[brandCode];
};
