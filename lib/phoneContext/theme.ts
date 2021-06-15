import { RcThemeInput } from '@ringcentral/juno';

import attRich from './brands/attRich/theme.json';
import btRich from './brands/btRich/theme.json';
import rcBlue from './brands/rcBlue/theme.json';
import rcJupiterBlue from './brands/rcJupiterBlue/theme.json';
import telusRich from './brands/telusRich/theme.json';

// TODO: temporary import all, wait dynamic load way implement
export const brandThemeMapping = {
  jupiterBlue: rcJupiterBlue as RcThemeInput,
  rcBlue: rcBlue as RcThemeInput,
  att: attRich as RcThemeInput,
  telus: telusRich as RcThemeInput,
  bt: btRich as RcThemeInput,
} as const;

export type BrandTheme = keyof typeof brandThemeMapping | 'rc';

const innerGetBrandTheme = (
  brand: BrandTheme = 'rc',
  defaultTheme: RcThemeInput,
): RcThemeInput => {
  if (brand === 'rc') {
    return defaultTheme;
  }

  return brandThemeMapping[brand] || defaultTheme;
};

export const getBrandTheme = (brand: BrandTheme = 'rc'): RcThemeInput => {
  return innerGetBrandTheme(brand, brandThemeMapping.rcBlue);
};

export const getBrandThemeWithJupiterBlue = (
  brand: BrandTheme = 'rc',
): RcThemeInput => {
  return innerGetBrandTheme(brand, brandThemeMapping.jupiterBlue);
};
