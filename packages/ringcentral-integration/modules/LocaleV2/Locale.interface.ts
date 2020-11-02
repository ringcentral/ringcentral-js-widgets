export interface LocaleOptions {
  defaultLocale?: string;
  detectBrowser?: boolean;
  polling?: boolean;
  pollingInterval?: number;
}

export interface Deps {
  localeOptions?: LocaleOptions;
}
