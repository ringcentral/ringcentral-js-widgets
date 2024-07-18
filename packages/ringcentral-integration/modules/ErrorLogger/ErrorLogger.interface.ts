import type { AccountInfo } from '../AccountInfo';
import type { Auth } from '../Auth';
import type { BrandConfig } from '../Brand';

export interface SentryConfig {
  endpoint: string;
  sampleRate?: number;
}

export interface ErrorLoggerOptions {
  appVersion?: string;
  appRelease?: string;
  environment?: string;
  sentryConfig?: SentryConfig;
  /**
   * The brands by brandId that should be intercepted by the error logger.
   */
  interceptedBrands?: string[];
}

export interface Deps {
  brandConfig: BrandConfig;
  auth?: Auth;
  accountInfo?: AccountInfo;
  errorLoggerOptions?: ErrorLoggerOptions;
}
