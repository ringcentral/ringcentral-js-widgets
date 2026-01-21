export interface LocaleOptions {
  defaultLocale?: string;
  supportedLocales?: string[];
  /**
   * Whether to detect browser locale change and set locale automatically.
   * @default true
   */
  detectBrowser?: boolean | 'once';
}
