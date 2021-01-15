import {
  action,
  watch,
  RcModuleV2,
  state,
  globalStorage,
} from '@ringcentral-integration/core';
import { ApiError } from '@ringcentral/sdk';
import { Module } from '../../lib/di';
import { errorMessages } from './errorMessages';
import proxify from '../../lib/proxy/proxify';
import { Deps } from './RateLimiter.interface';

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
  protected _timeoutId: NodeJS.Timeout = null;
  protected _throttleDuration: number;
  protected _unbindHandlers?: () => void;

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

  @globalStorage
  @state
  timestamp: number = null;

  @action
  startThrottle(timestamp: number) {
    this.timestamp = timestamp;
  }

  @action
  stopThrottle() {
    this.timestamp = null;
  }

  onInitOnce() {
    if (this._deps.environment) {
      watch(
        this,
        () => this._deps.environment.changeCounter,
        () => {
          if (this.ready) {
            this._bindHandlers();
          }
        },
      );
    }
  }

  onInit() {
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
    this._timeoutId = null;
    if (!this.throttling) {
      this.stopThrottle();
    }
  };

  @proxify
  async showAlert() {
    if (!this.throttling || !this._deps.alert) {
      return;
    }

    this._deps.alert.warning({
      message: errorMessages.rateLimitReached,
      ttl: DEFAULT_THROTTLE_DURATION,
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
