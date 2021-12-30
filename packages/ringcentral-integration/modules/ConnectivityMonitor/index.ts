import 'isomorphic-fetch';

import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import availabilityErrorMessages from '../AvailabilityMonitor/errorMessages';
import rateLimiterErrorMessage from '../RateLimiter/errorMessages';
import actionTypes from './actionTypes';
import getConnectivityMonitorReducer from './getConnectivityMonitorReducer';

export const DEFAULT_TIME_TO_RETRY = 5 * 1000;
export const DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;

async function defaultCheckConnectionFn() {
  return fetch('https://pubsub.pubnub.com/time/0');
}

/**
 * @class
 * @description Connectivity monitor module
 */
@Module({
  deps: [
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'ConnectivityMonitorOptions', optional: true },
  ],
})
export default class ConnectivityMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {Number} params.timeToRetry - time to Retry
   * @param {Number} params.heartBeatInterval - heart beat interval
   * @param {Function} params.checkConnectionFunc - function to check network
   */
  constructor({
    client,
    environment,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    heartBeatInterval = DEFAULT_HEART_BEAT_INTERVAL,
    checkConnectionFunc = defaultCheckConnectionFn,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = ensureExist.call(this, client, 'client');
    this._environment = environment;
    this._timeToRetry = timeToRetry;
    this._heartBeatInterval = heartBeatInterval;
    this._reducer = getConnectivityMonitorReducer(this.actionTypes);
    this._retryTimeoutId = null;
    this._lastEnvironmentCounter = 0;

    // auto bind this
    this._requestSuccessHandler = this._requestSuccessHandler.bind(this);
    this._requestErrorHandler = this._requestErrorHandler.bind(this);
    this._networkErrorHandler = this._networkErrorHandler.bind(this);

    this._checkConnectionFunc = async () => {
      try {
        await checkConnectionFunc();
        this._requestSuccessHandler();
      } catch (error) {
        this._requestErrorHandler(error);
      }
    };
  }

  _shouldInit() {
    return !!(this.pending && (!this._environment || this._environment.ready));
  }

  _shouldRebindHandlers() {
    return !!(
      this.ready &&
      this._environment &&
      this._environment.ready &&
      this._environment.changeCounter !== this._lastEnvironmentCounter
    );
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._bindHandlers();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      this._retry();
    } else if (this._shouldRebindHandlers()) {
      this._lastEnvironmentCounter = this._environment.changeCounter;
      this._bindHandlers();
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _requestSuccessHandler(res) {
    if (!this.connectivity) {
      this.store.dispatch({
        type: this.actionTypes.connectSuccess,
      });
    }
    this._retry();
  }

  _requestErrorHandler(error) {
    if (
      error.message &&
      (error.message === rateLimiterErrorMessage.rateLimitReached ||
        error.message === availabilityErrorMessages.serviceLimited)
    )
      return;

    if (!error.response) {
      if (this.connectivity) {
        this.store.dispatch({
          type: this.actionTypes.connectFail,
        });
      }
    }
    this._retry();
  }

  _networkErrorHandler() {
    if (!this.networkLoss) {
      this.store.dispatch({
        type: this.actionTypes.networkLoss,
      });
    }
    this._retry();
  }

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }
    const client = this._client.service.client();
    client.on(client.events.requestSuccess, this._requestSuccessHandler);
    client.on(client.events.requestError, this._requestErrorHandler);
    if (typeof window !== 'undefined') {
      window.addEventListener('offline', this._networkErrorHandler);
    }
    this._unbindHandlers = () => {
      client.removeListener(
        client.events.requestSuccess,
        this._requestSuccessHandler,
      );
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      if (typeof window !== 'undefined') {
        window.removeEventListener('offline', this._networkErrorHandler);
      }
      this._unbindHandlers = null;
    };
  }

  @proxify
  async _checkConnection() {
    try {
      await this._checkConnectionFunc();
    } catch (error) {
      // catch error
    }
  }

  _clearTimeout() {
    if (this._retryTimeoutId) {
      clearTimeout(this._retryTimeoutId);
      this._retryTimeoutId = null;
    }
  }

  _retry(t = this.connectivity ? this._heartBeatInterval : this._timeToRetry) {
    this._clearTimeout();
    this._retryTimeoutId = setTimeout(() => {
      this._retryTimeoutId = null;
      this._checkConnection();
    }, t);
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get connectivity() {
    return this.state.connectivity;
  }

  get networkLoss() {
    return this.state.networkLoss;
  }
}
