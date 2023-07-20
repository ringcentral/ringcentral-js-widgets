import { RcModuleV2, watch } from '@ringcentral-integration/core';

import * as Sentry from '@sentry/browser';
import type { SeverityLevel, User } from '@sentry/types';
import { BrowserTracing } from '@sentry/tracing';

import { Module } from '../../lib/di';
import type { Deps, ErrorLoggerOptions } from './ErrorLogger.interface';

@Module({
  name: 'ErrorLogger',
  deps: [
    'BrandConfig',
    { dep: 'Auth', optional: true },
    { dep: 'ErrorLoggerOptions', optional: true },
  ],
})
export class ErrorLogger extends RcModuleV2<Deps> {
  private _sentryInitialized = false;

  constructor(deps: Deps) {
    super({
      deps,
    });

    if (deps.errorLoggerOptions) {
      this._bootstrap(deps.errorLoggerOptions);
    }
  }

  private _bootstrap(options: ErrorLoggerOptions) {
    const { appVersion, appRelease, environment, sentryConfig } = options;
    if (sentryConfig?.endpoint) {
      // init client
      this._init({
        dsn: sentryConfig.endpoint,
        sampleRate: sentryConfig.sampleRate,
        environment,
        release: appRelease ?? appVersion,
        integrations: [new BrowserTracing()],
      });
      // set tags
      const appName = this._deps.brandConfig.appName;
      const appBrand = this._deps.brandConfig.code;
      this.setTags({
        'app.name': appName as string,
        'app.brand': appBrand,
        'app.version': appVersion ?? '',
      });
    }
  }

  private _init(options: Sentry.BrowserOptions) {
    Sentry.init({
      ...options,
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

  override onInitOnce() {
    if (this._sentryInitialized && this._deps.auth) {
      watch(
        this,
        () => this._deps.auth?.loggedIn,
        (loggedIn) => {
          if (loggedIn) {
            // set user
            this.setUser({
              id: this._deps.auth?.ownerId,
            });
          }
        },
      );
    }
  }

  setUser(user: User | null) {
    Sentry.configureScope((scope) => {
      scope.setUser(user);
    });
  }

  setTags(tags: Record<string, string>) {
    Sentry.configureScope((scope) => {
      scope.setTags(tags);
    });
  }

  log(message: string, level?: SeverityLevel) {
    const eventId = Sentry.captureMessage(message, level);
    return eventId;
  }

  logError(error: unknown) {
    const eventId = Sentry.captureException(error);
    return eventId;
  }

  test(message = '[ErrorLogger] test') {
    const eventId = this.log(message, 'debug');
    return eventId;
  }

  testError(message = '[ErrorLogger] test error') {
    // To support test with devtool console, throw error within a new thread by using setTimeout
    setTimeout(() => {
      throw new Error(message);
    }, 0);
  }
}
