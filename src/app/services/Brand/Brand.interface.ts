import type { RcThemeInput } from '@ringcentral/juno';
import { Theme as SuiTheme } from '@ringcentral/spring-theme';

export interface BrandConfigOptions {
  /**
   * Custom brand config options
   * if not specified, will use default location.origin
   */
  assetOrigin?: string;
}

export type ThemeInfo = {
  id: string;
  theme: RcThemeInput;
};

export interface BrandThemeMap {
  default: ThemeInfo[];
  light: ThemeInfo[];
  dark: ThemeInfo[];
  contrast: ThemeInfo[];
}

export type SuiThemeInfo = {
  id: string;
  theme: SuiTheme;
};

export interface SuiBrandThemeMap {
  default: SuiThemeInfo[];
  light: SuiThemeInfo[];
  dark: SuiThemeInfo[];
  contrast: SuiThemeInfo[];
}
