import type { Context } from '../../../interfaces';

export const setDynamicConfig = (config: any, context: Context) => {
  const { phone } = context;
  phone.brand.setDynamicConfig({
    ...phone.brand.brandConfig,
    ...config,
  });
};
