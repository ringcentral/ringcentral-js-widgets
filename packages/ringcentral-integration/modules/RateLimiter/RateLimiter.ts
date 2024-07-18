import {
  action,
  globalStorage,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import type { ApiError } from '@ringcentral/sdk';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps } from './RateLimiter.interface';
import { errorMessages } from './errorMessages';

const DEFAULT_THROTTLE_DURATION = 61 * 1000;

@Module({
  name: 'RateLimiter',
  deps: [
    'Alert',
    'Client',
    'GlobalStorage',
    { dep: 'Environment', optional: true },
    { dep: 'RateLimiterOptions', optional: true },
  ],
})
export class RateLimiter extends RcModuleV2<Deps> {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
  protected _timeoutId: NodeJS.Timeout = null;
  protected _unbindHandlers?: () => void;
  protected _throttleDuration: number = DEFAULT_THROTTLE_DURATION;

  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: true,
      storageKey: 'RateLimiter',
    });
    this._throttleDuration =
      this._deps.rateLimiterOptions?.throttleDuration ??
      DEFAULT_THROTTLE_DURATION;
  }

  get _suppressAlerts() {
    return this._deps.rateLimiterOptions?.suppressAlerts ?? false;
  }

  @globalStorage
  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
  timestamp: number = null;

  @globalStorage
  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
  rateLimitAlertId: string = null;

  @action
  startThrottle(timestamp: number) {
    this.timestamp = timestamp;
  }

  @action
  stopThrottle() {
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
    this.timestamp = null;
  }

  override onInitOnce() {
    if (this._deps.environment) {
      watch(
        this,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        () => this._deps.environment.changeCounter,
        () => {
          if (this.ready) {
            this._bindHandlers();
          }
        },
      );
    }
  }

  override onInit() {
    this._bindHandlers();
  }

  /**
   * If the app is throttling, an incoming request will lead to an exception
   */
  _beforeRequestHandler = () => {
    if (this.throttling) {
      throw new Error(errorMessages.rateLimitReached);
    }
  };

  _checkTimestamp = () => {
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    this._timeoutId = null;
    if (!this.throttling) {
      this.stopThrottle();
    }
  };

  @proxify
  async showAlert() {
    if (!this.throttling || !this._deps.alert || this._suppressAlerts) {
      return;
    }

    this.rateLimitAlertId = await this._deps.alert.warning({
      message: errorMessages.rateLimitReached,
      ttl: this.ttl,
      allowDuplicates: false,
    });
  }

  _requestErrorHandler = (error: ApiError) => {
    if (
      !(error instanceof Error) ||
      error.message !== 'Request rate exceeded'
    ) {
      return;
    }

    // Get `retry-after` from response headers first
    this._throttleDuration = DEFAULT_THROTTLE_DURATION;
    if (error.response) {
      const retryAfter = error.response.headers.get('retry-after');
      if (retryAfter) {
        this._throttleDuration = 1000 * Number.parseInt(retryAfter, 10);
      }
    }

    const wasThrottling = this.throttling;
    this.startThrottle(Date.now());
    if (!wasThrottling) {
      this.showAlert();
    }
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(this._checkTimestamp, this._throttleDuration);
  };

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }
    const client = this._deps.client.service.client();
    // TODO: Bind the `rateLimitError` event instead
    client.on(client.events.requestError, this._requestErrorHandler);
    client.on(client.events.beforeRequest, this._beforeRequestHandler);
    this._unbindHandlers = () => {
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      client.removeListener(
        client.events.beforeRequest,
        this._beforeRequestHandler,
      );
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type '(() => void... Remove this comment to see the full error message
      this._unbindHandlers = null;
    };
  }

  get ttl() {
    return this.throttling
      ? this._throttleDuration - (Date.now() - this.timestamp)
      : 0;
  }

  get throttleDuration() {
    return this._throttleDuration;
  }

  /**
   * Is in throttling status
   */
  get throttling() {
    return Date.now() - this.timestamp <= this._throttleDuration;
  }
}
