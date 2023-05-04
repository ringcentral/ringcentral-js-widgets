import { RcModuleV2, watch } from '@ringcentral-integration/core';
import * as Sentry from '@sentry/browser';

import { Module } from '../../lib/di';
import { Deps, SentryConfig, Severity, User } from './ErrorLogger.interface';

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
    const appName = this._deps.brandConfig.appName;
    const appBrand = this._deps.brandConfig.code;
    const { appVersion, environment, sentryConfig } =
      this._deps.errorLoggerOptions ?? {};
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

  override onInitOnce() {
    if (this._sentryInitialized && this._deps.auth) {
      watch(
        this,
        () => this._deps.auth.loggedIn,
        (loggedIn) => {
          if (loggedIn) {
            // set user
            const user: User = {
              id: this._deps.auth.ownerId,
            };
            this.setUser(user);
          }
        },
      );
    }
  }

  setUser(user: User) {
    Sentry.configureScope((scope) => {
      scope.setUser(user);
    });
  }

  setTags(tags: Record<string, string>) {
    Sentry.configureScope((scope) => {
      scope.setTags(tags);
    });
  }

  log(message: string, level?: Severity) {
    const eventId = Sentry.captureMessage(message, level);
    return eventId;
  }

  logError(error: any) {
    const eventId = Sentry.captureException(error);
    return eventId;
  }

  test(message: string = '[test] error logger') {
    const eventId = this.log(message, Severity.Debug);
    return eventId;
  }
}
