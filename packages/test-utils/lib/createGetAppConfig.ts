import set from 'lodash/set';
import { create } from 'mutative';

/**
 * Create app instance with different brand config
 */ export const createGetAppConfig = <T extends Record<string, any>>(
  getAppConfig: (brandCode: any) => T,
) => {
  return (brand: string, example: any) => {
    if (brand === '[brand]') {
      const appConfig = getAppConfig('rc');
      const finalAppConfig = create(appConfig, (draftState) => {
        Object.entries(example).forEach(([key, value]) => {
          if (typeof value === 'string') {
            const actualKey = value.replace(/[[\]']/g, '');
            set(draftState, actualKey, value);
          } else if (Array.isArray(value)) {
            const firstItem = value[0];
            if (
              typeof firstItem === 'string' &&
              firstItem.includes('[') &&
              firstItem.includes(']')
            ) {
              const actualKey = firstItem.replace(/[[\]']/g, '');
              set(draftState, actualKey, value);
            }
          }
        });
      });
      return finalAppConfig;
    }

    return getAppConfig(brand as never);
  };
};
