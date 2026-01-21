import type { useSentry } from '@ringcentral/mfe-sentry';
import type { BrowserOptions } from '@sentry/browser';

export interface SentryServer {
  server: string;
  project: string;
}

export interface SentryConfig {
  endpoint: string;
  sampleRate?: number;
  urls?: string[];
}

export interface ErrorLoggerOptions {
  appVersion?: string;
  appRelease?: string;
  environment?: string;
  sentryConfig?: SentryConfig;
  initMfeSentry?: (options: BrowserOptions) => ReturnType<typeof useSentry>;
  tags?: Record<string, number | string | boolean>;
  /**
   * The brands by brandId that should be intercepted by the error logger.
   */
  interceptedBrands?: string[];
}
