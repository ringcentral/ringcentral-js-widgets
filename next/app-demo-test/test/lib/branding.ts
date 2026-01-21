import type { BrandConfig } from '@ringcentral-integration/app-demo-old/config';
import att from '@ringcentral-integration/app-demo-old/config/att';
import bt from '@ringcentral-integration/app-demo-old/config/bt';
import rc from '@ringcentral-integration/app-demo-old/config/rc';
import telus from '@ringcentral-integration/app-demo-old/config/telus';
import { processI18n } from '@ringcentral-integration/i18n/lib/processI18n';

export const configMap = {
  rc,
  bt,
  att,
  telus,
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
