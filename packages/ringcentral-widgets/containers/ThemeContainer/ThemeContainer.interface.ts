import type { CssModuleVariable } from '@ringcentral-integration/commons/modules/Brand/BrandConfig.interface';
import type { RcThemeInput, RcThemeProviderProps } from '@ringcentral/juno';

export type ThemeContainerProps = {
  theme: RcThemeInput;
  variable: CssModuleVariable;
} & Pick<RcThemeProviderProps, 'prefixGlobalClass'>;
