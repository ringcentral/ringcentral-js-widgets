import type { BaseAppConfig } from '@ringcentral-integration/next-integration/interfaces';
import rcBlue from '@ringcentral-integration/next-core/themes/juno/rcBlue';

/**
 * get default theme primary color value from brandConfig
 */

export const getPrimaryColor = (brandConfig: BaseAppConfig['brandConfig']) => {
  const palette = brandConfig.theme?.themeMap?.['light'].palette;
  return {
    foreground: palette?.content?.brand ?? rcBlue.palette.content.brand,
    background: palette?.neutral?.b01 ?? rcBlue.palette.neutral.b01,
  };
};
