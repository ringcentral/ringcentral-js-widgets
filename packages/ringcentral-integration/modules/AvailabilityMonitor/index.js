/**
 * Created by Sophie, updated by Bruce
 */
import { pathOr } from 'ramda';
import { Module } from '../../lib/di';
import moduleStatuses from '../../enums/moduleStatuses';
import ensureExist from '../../lib/ensureExist';
import RcModule from '../../lib/RcModule';
import getAvailabilityModeReducer from './availabilityMonitorReducer';
import actionTypes from './actionTypes';
import {
  extractUrl,
  isHAError,
  generateRandomNumber,
  isHAEnabledAPI,
} from './availabilityMonitorHelper';
import errorMessages from './errorMessages';
import throttle from '../../lib/throttle';

// Constants
export const HEALTH_CHECK_INTERVAL = 60 * 1000;
export const STATUS_END_POINT = '/restapi/v1.0/status';
const DEFAULT_TIME = 0;

/**
 * @class AvailabilityMonitor
 * @description Connectivity monitor module
 */
@Module({
  deps: [
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'AvailabilityMonitorOptions', optional: true },
  ],
})
export default class AvailabilityMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   */
  constructor({
    alert, client, environment, enabled = false, ...options
  }) {
    super({
      actionTypes,
      enabled,
      ...options,
    });

    this._enabled = enabled;
    this._client = this::ensureExist(client, 'client');
    this._environment = environment;
    this._lastEnvironmentCounter = 0;
    this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    this._reducer = getAvailabilityModeReducer(this.actionTypes);

    // auto bind this
    this._beforeRequestHandler = this::this._beforeRequestHandler;
    this._requestErrorHandler = this::this._requestErrorHandler;
    this._refreshErrorHandler = this::this._refreshErrorHandler;
    this._refreshSuccessHandler = this::this._refreshSuccessHandler;
    this._switchToNormalMode = this::this._switchToNormalMode;
    this._switchToVoIPOnlyMode = this::this._switchToVoIPOnlyMode;
    this._randomTime = DEFAULT_TIME;
    this._limitedTimeout = null;
    this._normalTimeout = null;
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
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._bindHandlers();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldRebindHandlers()) {
      this._lastEnvironmentCounter = this._environment.changeCounter;
      this._bindHandlers();
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }

    const client = this._client.service.platform().client();
    const platform = this._client.service.platform();

    // TODO: in other modules, when they catch error first check if app is in HA mode.
    client.on(client.events.beforeRequest, this._beforeRequestHandler);
    client.on(client.events.requestError, this._requestErrorHandler);
    platform.addListener(platform.events.loginSuccess, this._switchToNormalMode);
    platform.addListener(platform.events.logoutSuccess, this._switchToNormalMode);
    platform.addListener(platform.events.logoutError, this._switchToNormalMode);
    platform.addListener(platform.events.refreshError, this._refreshErrorHandler);
    platform.addListener(platform.events.refreshSuccess, this._refreshSuccessHandler);

    this._unbindHandlers = () => {
      client.removeListener(client.events.beforeRequest, this._beforeRequestHandler);
      client.removeListener(client.events.requestError, this._requestErrorHandler);
      platform.removeListener(platform.events.loginSuccess, this._switchToNormalMode);
      platform.removeListener(platform.events.logoutSuccess, this._switchToNormalMode);
      platform.removeListener(platform.events.logoutError, this._switchToNormalMode);
      platform.removeListener(platform.events.refreshError, this._refreshErrorHandler);
      platform.removeListener(platform.events.refreshSuccess, this._refreshSuccessHandler);
      this._unbindHandlers = null;
    };
  }

  _beforeRequestHandler(params) {
    if (!this.isLimitedAvailabilityMode || !this._enabled) {
      return;
    }

    const requestUrl = pathOr(null, ['_request', 'url'], params);
    const requestMethod = pathOr(null, ['_request', 'method'], params);

    if (!requestUrl || !requestMethod) {
      return;
    }

    // In the limited availability mode, should not block status check api
    // or highly availability api.
    if (
      extractUrl({ url: requestUrl }) === STATUS_END_POINT ||
      isHAEnabledAPI({ url: requestUrl, method: requestMethod })
    ) {
      return;
    }

    throw new Error(errorMessages.serviceLimited);
  }

  /**
   * Retrieve retry after value from repsonse headers
   * @param {*} headers
   */
  _retrieveRetryAfter(headers) {
    try {
      let retryAfter = parseFloat(headers.get('Retry-After') || -1);
      if (retryAfter < 0) {
        const h = pathOr({}, ['_headers', 'retry-after'], headers) || -1;
        retryAfter = Array.isArray(h) ? parseFloat(h[0]) : -1;
        // retryAfter = h['retry-after'] || -1;
      }

      return Number.isNaN(retryAfter) ? -1 : retryAfter;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Check if app can enter LA mode.
   * If this module is not enabled, just return.
   *
   * @param {*} error Http response
   * @memberof AvailabilityMonitor
   */
  _requestErrorHandler(error) {
    const requestUrl = pathOr('', ['apiResponse', '_request', 'url'], error);
    const extractedUrl = extractUrl({
      url: requestUrl,
    });

    // If app is in Limited Mode and staus API met a status which is not 200 nor 503
    if (
      this.isLimitedAvailabilityMode &&
      extractedUrl === STATUS_END_POINT &&
      !isHAError(error)
    ) {
      if (!this.hasLimitedStatusError) {
        this.store.dispatch({
          type: this.actionTypes.limitedModeStatusError,
        });
      }
      return;
    }

    if (!isHAError(error) || !this._enabled) {
      return;
    }

    const headers = pathOr({}, ['apiResponse', '_response', 'headers'], error);
    const retryAfter = this._retrieveRetryAfter(headers);

    if (retryAfter > 0) {
      // Retry-After unit is secons, make it mili-secons
      this._healthRetryTime = retryAfter * 1000;
    } else {
      this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    }

    this._switchToLimitedMode();
    this._retry();
  }

  _refreshErrorHandler(error) {
    const isOffline = (error.message === 'Failed to fetch' ||
      error.message === 'The Internet connection appears to be offline.' ||
      error.message === 'NetworkError when attempting to fetch resource.' ||
      error.message === 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.');

    const platform = this._client.service.platform();
    const RES_STATUS = error.apiResponse && error.apiResponse._response &&
      error.apiResponse._response.status || null;
    const refreshTokenValid = (isOffline || RES_STATUS >= 500) &&
      platform.auth().refreshTokenValid();
    if (refreshTokenValid) {
      this._switchToVoIPOnlyMode();
    }
  }

  _refreshSuccessHandler() {
    if (this.isVoIPOnlyMode) {
      this.store.dispatch({
        type: this.actionTypes.VoIPOnlyReset,
      });
    }
  }

  _switchToVoIPOnlyMode() {
    if (this.isVoIPOnlyMode) {
      return;
    }

    this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    this.store.dispatch({
      type: this.actionTypes.VoIPOnlyMode,
    });
    this._retry();
  }

  _switchToLimitedMode() {
    if (this.isLimitedMode) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.limitedMode,
    });
  }

  _switchToNormalMode() {
    if (!this.isLimitedAvailabilityMode) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.normalMode,
    });

    this._clearLimitedTimeout();
    this._clearNormalTimeout();
  }

  _clearLimitedTimeout() {
    if (this._limitedTimeout) {
      clearTimeout(this._limitedTimeout);
      this._limitedTimeout = null;
    }
  }

  _clearNormalTimeout() {
    if (this._normalTimeout) {
      clearTimeout(this._normalTimeout);
      this._normalTimeout = null;
    }
  }

  async _getStatus() {
    const res = await this._client.service.platform().get('/status', null, { skipAuthCheck: true });
    return res && res.response();
  }

  _retry() {
    if (!this._limitedTimeout) {
      this._limitedTimeout = setTimeout(() => {
        this._clearLimitedTimeout();
        this._healthCheck();
      }, this._healthRetryTime);
    }
  }

  /**
   * Inner method of health checking
   * @returns
   * @memberof AvailabilityMonitor
   */
  async _healthCheck() {
    try {
      const response = await this._getStatus();
      if (!response || response.status !== 200) {
        return;
      }
    } catch (err) {
      console.error('error from request of /restapi/v1.0/status.');
      return;
    }
    this._randomTime = this._randomTime || generateRandomNumber(); // Generate random seconds (1 ~ 121)
    this._normalTimeout = setTimeout(() => {
      this._clearNormalTimeout();
      this._switchToNormalMode();
    }, this._randomTime * 1000);
  }

  /**
   * Health check with status API
   */
  async healthCheck() {
    if (!this._throttledHealthCheck) {
      this._throttledHealthCheck = throttle(async () => {
        await this._healthCheck();
      });
    }

    this._throttledHealthCheck();
  }

  /**
   * Check if the error is Survival Mode error,
   * Or if app is already in Survival Mode and current request is blocked with an error.
   */
  checkIfHAError(error) {
    const errMessage = pathOr(null, ['message'], error);

    return isHAError(error) || errMessage === errorMessages.serviceLimited;
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

  get isVoIPOnlyMode() {
    return this.state.isVoIPOnlyMode;
  }

  get isLimitedMode() {
    return this.state.isLimitedMode;
  }

  /**
   * Is App in limited mode
   *
   * @readonly
   * @memberof AvailabilityMonitor
   */
  get isLimitedAvailabilityMode() {
    return this.isLimitedMode || this.isVoIPOnlyMode;
  }

  /**
   * When App is in Limited Mode and Status check met a non-503 error
   */
  get hasLimitedStatusError() {
    return this.state.hasLimitedStatusError;
  }
}
