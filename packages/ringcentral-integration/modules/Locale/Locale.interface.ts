import { BrandConfig } from '../Brand/Brand.interface';

export interface LocaleOptions {
  defaultLocale?: string;
  supportedLocales?: string[];
  detectBrowser?: boolean;
  polling?: boolean;
  pollingInterval?: number;
}

export interface Deps {
  brandConfig?: BrandConfig;
  localeOptions?: LocaleOptions;
}
