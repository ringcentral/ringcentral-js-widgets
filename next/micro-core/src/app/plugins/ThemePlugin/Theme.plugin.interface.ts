export interface ThemePluginOptions {
  /**
   * custom get host style element
   *
   * @default
   *
   * ```html
   * <body>
   *   <div id="theme-plugin-host">
   *     <-- style host -->
   *   </div>
   * </body>
   * ```
   */
  getHostElement?: () => HTMLElement;
}

export type ThemePluginProps = {};
