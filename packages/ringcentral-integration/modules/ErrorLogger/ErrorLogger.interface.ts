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
}

export interface Deps {
  brandConfig: BrandConfig;
  auth?: Auth;
  errorLoggerOptions?: ErrorLoggerOptions;
}
