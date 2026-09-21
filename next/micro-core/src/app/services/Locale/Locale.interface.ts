export interface LocaleOptions {
  defaultLocale?: string;
  supportedLocales?: string[];
  /**
   * Whether a shared client should replace its locally loaded locale when the
   * server locale changes. Disable this when each client owns its locale.
   * @default true
   */
  syncServerLocaleToClients?: boolean;
  /**
   * Whether to detect browser locale change and set locale automatically.
   * @default true
   */
  detectBrowser?: boolean | 'once';
}
