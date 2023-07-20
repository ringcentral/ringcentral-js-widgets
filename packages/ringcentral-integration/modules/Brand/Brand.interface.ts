import type { Locale } from '../Locale';
import type { BrandConfig } from './BrandConfig.interface';

export interface BrandConfigOptions {
  /**
   * Custom brand config options
   * if not specified, will use default window.location.origin
   */
  assetOrigin?: string;
}

export interface Deps<T extends BrandConfig = BrandConfig> {
  brandConfig: T;
  locale?: Locale;
  prefix?: string;
  brandConfigOptions?: BrandConfigOptions;
}
