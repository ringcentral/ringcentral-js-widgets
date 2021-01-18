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
import validateIsOffline from '../../lib/validateIsOffline';

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
    'Auth',
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'AvailabilityMonitorOptions', optional: true },
  ],
})
export default class AvailabilityMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   */
  constructor({ auth, client, environment, enabled = false, ...options }) {
    super({
      actionTypes,
      enabled,
      ...options,
    });

    this._enabled = enabled;
    this._auth = auth;
    this._client = ensureExist.call(this, client, 'client');
    this._environment = environment;
    this._lastEnvironmentCounter = 0;
    this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    this._reducer = getAvailabilityModeReducer(this.actionTypes);

    // auto bind this
    this._beforeRequestHandler = this._beforeRequestHandler.bind(this);
    this._requestErrorHandler = this._requestErrorHandler.bind(this);
    this._refreshErrorHandler = this._refreshErrorHandler.bind(this);
    this._refreshSuccessHandler = this._refreshSuccessHandler.bind(this);
    this._switchToNormalMode = this._switchToNormalMode.bind(this);
    this._switchToVoIPOnlyMode = this._switchToVoIPOnlyMode.bind(this);
    this._randomTime = DEFAULT_TIME;
    this._limitedTimeout = null;
    this._normalTimeout = null;
    this._promise = null;
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

    const client = this._client.service.client();
    const platform = this._client.service.platform();

    // TODO: in other modules, when they catch error first check if app is in HA mode.
    client.on(client.events.beforeRequest, this._beforeRequestHandler);
    client.on(client.events.requestError, this._requestErrorHandler);
    platform.addListener(
      platform.events.loginSuccess,
      this._switchToNormalMode,
    );
    platform.addListener(
      platform.events.logoutSuccess,
      this._switchToNormalMode,
    );
    platform.addListener(platform.events.logoutError, this._switchToNormalMode);
    platform.addListener(
      platform.events.refreshError,
      this._refreshErrorHandler,
    );
    platform.addListener(
      platform.events.refreshSuccess,
      this._refreshSuccessHandler,
    );

    this._unbindHandlers = () => {
      client.removeListener(
        client.events.beforeRequest,
        this._beforeRequestHandler,
      );
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      platform.removeListener(
        platform.events.loginSuccess,
        this._switchToNormalMode,
      );
      platform.removeListener(
        platform.events.logoutSuccess,
        this._switchToNormalMode,
      );
      platform.removeListener(
        platform.events.logoutError,
        this._switchToNormalMode,
      );
      platform.removeListener(
        platform.events.refreshError,
        this._refreshErrorHandler,
      );
      platform.removeListener(
        platform.events.refreshSuccess,
        this._refreshSuccessHandler,
      );
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
   * Retrieve retry after value from response headers
   * @param {*} headers
   */
  _retrieveRetryAfter(headers) {
    try {
      const retryAfter = parseFloat(headers.get('Retry-After') || -1);
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
  async _requestErrorHandler(error) {
    if (error.response && !error.response._json) {
      error.response._json = await error.response.clone().json();
    }
    const requestUrl = pathOr('', ['request', 'url'], error);
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

    const headers = pathOr({}, ['response', 'headers'], error);
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

  async _refreshErrorHandler(error) {
    const isOffline = validateIsOffline(error.message);

    const platform = this._client.service.platform();
    const RES_STATUS = (error.response && error.response.status) || null;
    const refreshTokenValid =
      (isOffline || RES_STATUS >= 500) &&
      (await platform.auth().refreshTokenValid());
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
    this._clearLimitedTimeout();
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
    // !!This API must be always called with OAuth token in Authorization  header (same as in case of regular API calls) in order to ensure the request is routed to proper POD/partition.
    // Client app can even continue use expired access token with this API - backend will pass such requests through.
    // The result of the API call is unpredictable when it is called without access token!
    //
    // Reference: https://wiki.ringcentral.com/display/PLAT/High+Availability+Guidelines+for+API+Clients

    const res = await this._client.service
      .platform()
      .get('/restapi/v1.0/status', null, {
        skipAuthCheck: true,
        headers: {
          Authorization: `Bearer ${this._auth.accessToken}`,
        },
      });
    return res;
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
  async _healthCheck({ manual = false } = {}) {
    if (this._promise) return;
    try {
      this._promise = this._getStatus();
      const response = await this._promise;
      if (!response || response.status !== 200) {
        return;
      }
    } catch (err) {
      console.error('error from request of /restapi/v1.0/status.');
      return;
    } finally {
      this._promise = null;
    }
    if (manual) {
      this._clearNormalTimeout();
      this._switchToNormalMode();
      return;
    }
    // In the described situation Client Application should follow an "Exponential Backoff" approach:
    // The retries exponentially increase the waiting time up to a certain threshold.
    // The idea is that if the server is down temporarily,
    // it is not overwhelmed with requests hitting at the same time when it comes back up.
    //
    // Reference: https://wiki.ringcentral.com/display/PLAT/Error+Handling+Guidelines+for+API+Clients

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
        await this._healthCheck({ manual: true });
      });
    }

    this._throttledHealthCheck();
  }

  /**
   * Check if the error is Survival Mode error,
   * Or if app is already in Survival Mode and current request is blocked with an error.
   */
  async checkIfHAError(error) {
    const errMessage = pathOr(null, ['message'], error);
    if (error.response) {
      error.response._json = await error.response.clone().json();
    }
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
