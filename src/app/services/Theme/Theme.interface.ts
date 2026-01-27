import type { RcTheme } from '@ringcentral/juno';

export type ThemeType = 'followSystem' | 'light' | 'dark' | 'contrast';

export interface ThemeOptions {
  /**
   * Enable cache or not to save theme in storage
   */
  enableCache?: boolean;
  /**
   * the possible supported theme types, only use in new spring-ui project
   */
  supportedThemeTypes?: ThemeType[];
  /**
   * follow system theme or not
   *
   * @default true
   */
  followSystem?: boolean;
  /**
   * is send theme init event to document, that will change default theme
   *
   * if open that config, when theme module constructor will send a custom event to document, let you can get theme type out of module system,
   *
   * make sure you this addEventListener before module system init.
   *
   * ```ts
   * document.addEventListener(
   *  'theme-init',
   *  (cb) => {
   *    cb.detail(themeType);
   *  },
   *  {
   *    once: true,
   *  },
   * )
   * ```
   *
   * also that provide you a event change can listen when theme change,
   * you can use that in html to change some theme style you need
   * ```ts
   * document.addEventListener('theme-change', (e) => {
   *   updateThemeStyle(e.detail);
   * });
   * ```
   *
   * # in spring-ui project, that always be true
   *
   * @deprecated
   */
  initThemeDetect?: boolean;
  /**
   * ignore brand config default theme
   *
   * @deprecated only use in old project, new project should base on BSS to get the brand theme
   */
  ignoreInitDefaultTheme?: boolean;
  /**
   * when new themMap come in, if current theme type is not include in new themeMap, ignore that event
   *
   * and that will not change to new theme default theme
   *
   * @deprecated only use in old project, new project should base on BSS to get the brand theme
   */
  ignoreThemeTypeInMapCheck?: boolean;

  /**
   * process theme before set to juno
   *
   *
   * @deprecated only use in old project, new project should base on BSS to get the brand theme
   */
  processTheme?: (type: string, theme?: RcTheme) => RcTheme | undefined;
}
