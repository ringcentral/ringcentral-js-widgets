import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  inject,
  optional,
  RcModule,
  watch,
} from '@ringcentral-integration/next-core';
import { getMfeMeta } from '@ringcentral-integration/next-micro';
import type { useSentry } from '@ringcentral/mfe-sentry';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import type { SeverityLevel, User } from '@sentry/types';

import { AccountInfo } from '../AccountInfo';
import { Auth } from '../Auth';

import type { ErrorLoggerOptions } from './ErrorLogger.interface';

const ignoreErrors = [
  '200 OK',
  'Failed to fetch',
  'Request Timeout',
  'Service is overloaded',
  'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource',
  'INVALID_STATE_ERROR: Invalid status: 11',
  'INVALID_STATE_ERROR: Invalid status: 1',
  'rateLimiterErrorMessages-rateLimitReached',
  // TODO: fix in JUNO repo with virtuoso
  'ResizeObserver loop',
  'Failed to sync full state from server port.',
  'AbortError: The play() request was interrupted by a new load request',
  `Document's Permissions Policy does not allow setSinkId()`,
  // chrome error
  '[executeScript] Cannot access contents of the page. Extension manifest must request permission to access the respective host.',
  '[executeScript] The extensions gallery cannot be scripted.',
  '[executeScript] Cannot access contents of url',
  '[executeScript] This page cannot be scripted due to an ExtensionsSettings policy.',
  '[executeScript] Cannot access a chrome',
];

const DEFAULT_INTERCEPTED_BRANDS = ['3000.Brightspeed'];

@injectable({
  name: 'ErrorLogger',
})
export class ErrorLogger extends RcModule {
  private _sentryInitialized = false;

  constructor(
    @inject('ErrorLoggerOptions')
    protected _errorLoggerOptions: ErrorLoggerOptions,
    @optional('BrandConfig') protected _brandConfig?: BrandConfig,
    @optional() protected _auth?: Auth,
    @optional() protected _accountInfo?: AccountInfo,
  ) {
    super();

    if (_errorLoggerOptions) {
      this._bootstrap(_errorLoggerOptions);
      if (_errorLoggerOptions.tags) {
        this.setTags(_errorLoggerOptions.tags);
      }
      this.initialize();
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
        integrations: global.document ? [new BrowserTracing()] : [],
      });
      // set tags
      const appName = this._brandConfig?.appName;
      const appBrand = this._brandConfig?.code;
      this.setTags({
        ...getMfeMeta({
          onlyVersion: true,
          prefix: 'mfe.',
        }),
        'app.name': appName as string,
        'app.brand': appBrand!,
        'app.version': appVersion!,
      });
    }
  }

  private _mfeSentry?: ReturnType<typeof useSentry>;

  private _init(options: Sentry.BrowserOptions) {
    this._sentryInitialized = true;
    const initOptions = {
      ...options,
      ignoreErrors,
    };
    if (this._errorLoggerOptions?.initMfeSentry) {
      this._mfeSentry = this._errorLoggerOptions.initMfeSentry(initOptions);
    }
    const hub =
      (this._mfeSentry?.hub as Sentry.Hub | void) ??
      Sentry.init({
        ...initOptions,
        beforeSend: (event) => {
          if (this.intercepted) {
            return null;
          }
          return event;
        },
      });
    this._hub = hub ?? Sentry.getCurrentHub();
  }

  private _hub?: Sentry.Hub;

  get hub() {
    return this._hub;
  }

  initialize() {
    if (this._sentryInitialized && this._auth) {
      watch(
        this,
        () => this._auth!.loggedIn,
        (loggedIn) => {
          if (loggedIn) {
            // set user
            this.setUser({
              id: this._auth?.ownerId,
            });
          }
        },
      );
    }

    if (this._sentryInitialized && this._accountInfo) {
      watch(
        this,
        () => this._accountInfo!.id,
        (accountInfoId) => {
          if (accountInfoId) {
            this.setTags({
              accountId: `${accountInfoId}`,
            });
          }
        },
      );
      watch(
        this,
        () => this._accountInfo!.userBrandId,
        (userBrandId) => {
          if (userBrandId && this.interceptedBrands.includes(userBrandId)) {
            this.toggle({ intercepted: true });
          } else {
            this.toggle({ intercepted: false });
          }
        },
      );
    }
  }

  get interceptedBrands() {
    return (
      this._errorLoggerOptions?.interceptedBrands ?? DEFAULT_INTERCEPTED_BRANDS
    );
  }

  setUser(user: User | null) {
    if (this._mfeSentry) {
      this._mfeSentry.setUser(user);
      return;
    }
    this.hub?.configureScope((scope) => {
      scope.setUser(user);
    });
  }

  setTags(tags: NonNullable<ErrorLoggerOptions['tags']>) {
    if (this._mfeSentry) {
      this._mfeSentry.setTags(tags);
      return;
    }
    this.hub?.configureScope((scope) => {
      scope.setTags(tags);
    });
  }

  private intercepted?: boolean;

  toggle({ intercepted }: { intercepted: boolean }) {
    if (this._mfeSentry) {
      this._mfeSentry.setTags({ intercepted });
    } else {
      this.intercepted = intercepted;
    }
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
