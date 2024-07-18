import type { RcTheme } from '@ringcentral/juno';

import type { Brand } from '../Brand';

export interface ThemeOptions {
  /**
   * process theme before set to juno
   */
  processTheme?: (type: string, theme?: RcTheme) => RcTheme | undefined;
}
export interface Deps {
  brand: Brand;
  themeOptions?: ThemeOptions;
}
