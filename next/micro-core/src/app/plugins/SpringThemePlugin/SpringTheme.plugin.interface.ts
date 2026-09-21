import { Theme } from '@ringcentral/spring-theme';

export interface SpringThemePluginOptions {
  /**
   * process theme before set to spring
   */
  processTheme?: (type: string) => Theme | undefined;
  /**
   * SpringUI ThemeProvider mode prop
   */
  mode?: 'compact';
  /**
   * SpringUI ThemeProvider scope prop
   */
  scope?: string;
  /**
   * SpringUI ThemeProvider className prop
   */
  className?: string;
}

export type SpringThemePluginProps = {};
