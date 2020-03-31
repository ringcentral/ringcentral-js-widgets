import * as Sentry from '@sentry/browser';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';

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

/**
 * Error Logger based on Sentry
 */
@Module({
  deps: [
    { dep: 'Auth', optional: true },
    { dep: 'ErrorLoggerOptions', optional: true },
  ],
})
export class ErrorLogger extends RcModule {
  private _auth: any;
  private _loggedIn?: boolean;
  private _sentryInitialized: boolean = false;

  constructor({
    auth,
    appName,
    appBrand,
    appVersion,
    environment,
    sentryConfig,
    ...options
  }) {
    super({
      ...options,
    });

    this._auth = auth;

    if (sentryConfig?.endpoint) {
      this._bootstrap({
        sentryConfig,
        environment,
      });
      this.setTags({
        'app.name': appName,
        'app.brand': appBrand,
        'app.version': appVersion,
      });
    }
  }

  private _bootstrap({
    sentryConfig,
    environment,
    release,
  }: {
    sentryConfig: SentryConfig;
    environment: string;
    release?: string;
  }): void {
    Sentry.init({
      dsn: sentryConfig.endpoint,
      sampleRate: sentryConfig.sampleRate,
      environment,
      release,
      enabled: true,
      ignoreErrors: [
        '200 OK',
        'Failed to fetch',
        'Request Timeout',
        'Service is overloaded',
        'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource',
        'INVALID_STATE_ERROR: Invalid status: 11',
        'INVALID_STATE_ERROR: Invalid status: 1',
        'rateLimiterErrorMessages-rateLimitReached',
      ],
    });
    this._sentryInitialized = true;
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }

  _onStateChange() {
    if (this._sentryInitialized && this._auth) {
      const loggedInChanged = this._loggedIn !== this._auth.loggedIn;
      if (loggedInChanged) {
        this._loggedIn = this._auth.loggedIn;
        // set user
        const user: User = {
          id: this._auth.ownerId,
        };
        this.setUser(user);
      }
    }
  }

  setUser(user: User): void {
    Sentry.configureScope((scope) => {
      scope.setUser(user);
    });
  }

  setTags(tags: { [key: string]: string }): void {
    Sentry.configureScope((scope) => {
      scope.setTags(tags);
    });
  }

  log(message: string, level?: Severity): string {
    const eventId = Sentry.captureMessage(message, level);
    return eventId;
  }

  logError(error: any): string {
    const eventId = Sentry.captureException(error);
    return eventId;
  }

  test(message: string = '[test] error logger'): string {
    const eventId = this.log(message, Severity.Debug);
    return eventId;
  }
}
