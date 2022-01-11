import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { actionTypes } from './actionTypes';
import { errorMessages } from './errorMessages';
import getRateLimiterReducer, {
  getTimestampReducer,
} from './getRateLimiterReducer';

const DEFAULT_THROTTLE_DURATION = 61 * 1000;

/**
 * @class
 * @description Rate limiter managing module
 */
@Module({
  deps: [
    'Alert',
    'Client',
    { dep: 'Environment', optional: true },
    'GlobalStorage',
    { dep: 'RateLimiterOptions', optional: true },
  ],
})
export default class RateLimiter extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {Number} params.throttleDuration - throttle duration, default 61 seconds
   */
  constructor({
    alert,
    client,
    environment,
    globalStorage,
    throttleDuration = DEFAULT_THROTTLE_DURATION,
    suppressAlerts = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._alert = alert;
    this._client = client;
    this._environment = environment;
    this._storage = globalStorage;
    this._throttleDuration = throttleDuration;
    this._suppressAlerts = suppressAlerts;
    this._storageKey = 'rateLimiterTimestamp';
    this._reducer = getRateLimiterReducer(this.actionTypes);
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getTimestampReducer(this.actionTypes),
    });
    this._timeoutId = null;
    this._lastEnvironmentCounter = 0;
  }

  initialize() {
    this.store.subscribe(async () => {
      if (
        !this.ready &&
        this._storage.ready &&
        (!this._environment || this._environment.ready)
      ) {
        this._bindHandlers();
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
        });
      } else if (
        this.ready &&
        this._environment &&
        this._environment.changeCounter !== this._lastEnvironmentCounter
      ) {
        this._lastEnvironmentCounter = this._environment.changeCounter;
        this._bindHandlers();
      }
    });
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
    if (!this.throttling) {
      this.store.dispatch({
        type: this.actionTypes.stopThrottle,
      });
    }
  };

  @proxify
  async showAlert() {
    if (!this.throttling || !this._alert || this._suppressAlerts) {
      return;
    }

    this._alert.warning({
      message: errorMessages.rateLimitReached,
      ttl: this.ttl,
      allowDuplicates: false,
    });
  }

  _requestErrorHandler = (error) => {
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
    this.store.dispatch({
      type: this.actionTypes.startThrottle,
      timestamp: Date.now(),
    });
    if (!wasThrottling) {
      this.showAlert();
    }
    setTimeout(this._checkTimestamp, this._throttleDuration);
  };

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }
    const client = this._client.service.client();
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

  get status() {
    return this.state.status;
  }

  get timestamp() {
    return this._storage.getItem(this._storageKey);
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

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }
}
