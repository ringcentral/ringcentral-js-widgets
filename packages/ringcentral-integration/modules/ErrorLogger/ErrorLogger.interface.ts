import { Auth } from '../Auth';
import { BrandConfig } from '../Brand';

export interface SentryConfig {
  endpoint: string;
  sampleRate?: number;
}

export interface User {
  id?: string;
  email?: string;
  username?: string;
}

export enum Severity {
  Error = 'error',
  Warning = 'warning',
  Log = 'log',
  Info = 'info',
  Debug = 'debug',
}

export interface ErrorLoggerOptions {
  environment?: string;
  appVersion?: string;
  sentryConfig?: SentryConfig;
}

export interface Deps {
  brandConfig: BrandConfig;
  auth?: Auth;
  errorLoggerOptions?: ErrorLoggerOptions;
}
