import { Brand } from '../BrandV2';

export interface LocaleOptions {
  defaultLocale?: string;
  detectBrowser?: boolean;
  polling?: boolean;
  pollingInterval?: number;
}

export interface Deps {
  brand?: Brand;
  localeOptions?: LocaleOptions;
}
