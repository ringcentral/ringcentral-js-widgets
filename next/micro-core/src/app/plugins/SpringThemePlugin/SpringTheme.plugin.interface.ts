import { Theme } from '@ringcentral/spring-theme';

export interface SpringThemePluginOptions {
  /**
   * process theme before set to spring
   */
  processTheme?: (type: string) => Theme | undefined;
}

export type SpringThemePluginProps = {};
