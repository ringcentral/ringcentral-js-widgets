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

export const allSupportedBrands = () => {
  return Object.keys(configMap).map((brand) => {
    const rawBrandConfig = getAppConfig(brand as BrandCode).brandConfig;
    if (!rawBrandConfig || !Object.keys(rawBrandConfig).length) {
      throw new Error(`no brand config founded for brand code: ${brand}`);
    }
    const brandConfig = processI18n(rawBrandConfig);
    return brandConfig as BrandConfig;
  });
};
