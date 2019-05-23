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
import availabilityStatus from './availabilityStatus';
import {
  extractUrl,
  isHAError,
  generateRandomNumber,
  isHAEnabledAPI,
} from './availabilityMonitorHelper';
import errorMessages from './errorMessages';

// Constants
export const HEALTH_CHECK_INTERVAL = 60 * 1000;
export const STATUS_END_POINT = '/restapi/v1.0/status';

/**
 * @class AvailabilityMonitor
 * @description Connectivity monitor module
 */
@Module({
  deps: [
    'Alert',
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'AvailabilityMonitorOptions', optional: true },
  ],
})
export default class AvailabilityMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   */
  constructor({ alert, client, environment, enabled = false, ...options }) {
    super({
      actionTypes,
      enabled,
      ...options,
    });

    this._enabled = enabled;
    this._alert = this::ensureExist(alert, 'alert');
    this._client = this::ensureExist(client, 'client');
    this._environment = environment;
    this._lastEnvironmentCounter = 0;
    this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    this._reducer = getAvailabilityModeReducer(this.actionTypes);

    // auto bind this
    this._beforeRequestHandler = this::this._beforeRequestHandler;
    this._requestErrorHandler = this::this._requestErrorHandler;
  }

  _shouldInit() {
    return !!(this.pending &&
      (!this._environment || this._environment.ready));
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
    client.on(client.events.beforeRequest, this._beforeRequestHandler);

    // TODO: in other modules, when they catch error first check if app is in HA mode.
    client.on(client.events.requestError, this._requestErrorHandler);

    this._unbindHandlers = () => {
      client.removeListener(client.events.beforeRequest, this._beforeRequestHandler);
      client.removeListener(client.events.requestError, this._requestErrorHandler);
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
   * Check if app can enter LA mode.
   * If this module is not enabled, just return.
   *
   * @param {*} error Http response
   * @memberof AvailabilityMonitor
   */
  _requestErrorHandler(error) {
    if (!isHAError(error) || !this._enabled) {
      // TODO: Request url included in initial api when app is in initial. If true enter initial error.
      return;
    }

    this.showAlert(errorMessages.serviceLimited);

    const retryAfter = pathOr(
      -1,
      ['apiResponse', '_response', 'headers', 'retryAfter'],
      error,
    );

    if (retryAfter > 0) {
      this._healthRetryTime = retryAfter;
    }

    this._switchToLimitedAvailabilityMode();
  }

  async _switchToLimitedAvailabilityMode() {
    if (this.isLimitedAvailabilityMode) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.limitedMode,
    });

    this._limitedTimeout = setTimeout(async () => {
      await this._intervalHealthCheck();
    }, this._healthRetryTime);
  }

  _switchToNormalMode() {
    if (!this.isLimitedAvailabilityMode) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.normalMode,
    });

    this._clearTimeout(this._normalTimeout);
    this._clearTimeout(this._limitedTimeout);

    if (!this._alert) {
      return;
    }
    // dismiss disconnected alerts if found
    const alertIds = this._alert.messages
      .filter((m) => m.message === errorMessages.serviceLimited) // eslint-disable-line arrow-parens
      .map((m) => m.id); // eslint-disable-line arrow-parens
    if (alertIds.length) {
      this._alert.dismiss(alertIds);
    }
  }

  /**
   * Clear timeout handler when it's not needed
   */
  _clearTimeout(timeoutHandler) {
    if (!timeoutHandler) {
      return;
    }

    clearTimeout(timeoutHandler);
    timeoutHandler = null;
  }

  async _getStatus() {
    const res = await this._client.service.platform().get('/status');
    return res && res.response();
  }

  /**
   * Keep retrying with different intervals
   * @returns
   * @memberof AvailabilityMonitor
   */
  async _intervalHealthCheck() {
    this._clearTimeout(this._limitedTimeout);

    const response = await this._getStatus();
    const retryAfter = pathOr(0, ['headers', 'retryAfter'], response);

    if (response && response.status === 200) {
      const waitingTime = generateRandomNumber(); // Generate random seconds (0 ~ 3000)
      this._normalTimeout = setTimeout(() => {
        this._switchToNormalMode();
      }, waitingTime);

      return;
    }

    if (retryAfter > 0) {
      this._healthRetryTime = retryAfter;
    } else {
      this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    }

    this._limitedTimeout = setTimeout(async () => {
      await this._intervalHealthCheck();
    }, this._healthRetryTime);
  }

  showAlert(message) {
    if (!this._alert) {
      return;
    }

    this._alert.warning({
      message,
      allowDuplicates: false,
    });
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

  /**
   * Is App in limited mode
   *
   * @readonly
   * @memberof AvailabilityMonitor
   */
  get isLimitedAvailabilityMode() {
    return (
      this.state.isLimitedAvailabilityMode.mode === availabilityStatus.LIMITED
    );
  }

  get isAppInitialErrorMode() {
    return this.state.isAppInitialError;
  }
}
