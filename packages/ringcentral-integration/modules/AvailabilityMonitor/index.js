/**
 * Created by Sophie, updated by Bruce
 */

import { pathOr } from 'ramda';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import RcModule from '../../lib/RcModule';
import getAvailabilityModeReducer from './availabilityMonitorReducer';
import actionTypes from './actionTypes';
import { extractUrl, isHAError, generateRandomNumber, isHAEnabledAPI } from './availabilityMonitorHelper';
import errorMessages from './errorMessages';

// Constants
export const HEALTH_CHECK_INTERVAL = 5 * 1000;
export const STATUS_END_POINT = '/restapi/v1.0/status';


/**
 * TODO: Deal with `RateLimitor` in offline mode.
 * TODO: App initial errors.
 * TODO: When WebRTC met HA error.
 * TODO: Api match problems, the way finding *High* or *Limited* api is not working correctly.
 *
 * @class
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
  constructor({
    alert,
    client,
    environment,
    enabled = false,
    ...options
  }) {
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
    client.on(client.events.beforeRequest, (params) => {
      this._beforeRequestHandler(params);
    });

    // !TODO: in other modules, when they catch error first check if app is in HA mode.
    client.on(client.events.requestError, (params) => {
      this._requestErrorHandler(params);
    });

    this._unbindHandlers = () => {
      client.removeListener(
        client.events.beforeRequest,
        this._beforeRequestHandler,
      );
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      this._unbindHandlers = null;
    };
  }

  _beforeRequestHandler(params) {
    if (!this.isLimitedAvailabilityMode) {
      return;
    }

    const requestUrl = pathOr(null, ['_request', 'url'], params);
    const requestMethod = pathOr(null, ['_request', 'method'], params);

    if (!requestUrl || !requestMethod) {
      return;
    }

    // TODO: the `extractUrl` method might not work with some urls
    // In the limited availability mode, should not block status check api
    // or highly availability api.
    if (extractUrl({ url: requestUrl }) === STATUS_END_POINT
      || isHAEnabledAPI({ url: requestUrl, method: requestMethod })) {
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

    this.timeout = setTimeout(async () => {
      console.log('this._healthRetryTime', this._healthRetryTime);
      await this._intervalHealthCheck();
    }, this._healthRetryTime);
  }

  _switchToNormalMode() {
    console.log('swith to normal mode');

    if (!this.isLimitedAvailabilityMode) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.normalMode,
    });
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
    console.log('should randomize the health check');

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const response = await this._getStatus();
    const retryAfter = pathOr(-1, ['headers', 'retryAfter'], response);

    console.log('response', response);

    if (response && response.status === 200) {
      console.log('platform recover');

      const waitingTime = generateRandomNumber(); // Generate random seconds (0 ~ 3000)
      setTimeout(() => {
        this._switchToNormalMode();
      }, waitingTime);

      return;
    } else if (retryAfter > 0) {
      this._healthRetryTime = retryAfter;
    } else {
      this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    }
    this.timeout = setTimeout(async () => {
      await this._intervalHealthCheck();
    }, this._healthRetryTime);
  }

  _showAlert(errorLevel, message) {
    if (errorLevel === 'success') {
      this._alert.success({ message });
    } else if (errorLevel === 'warning') {
      this._alert.warning({ message });
    } else if (errorLevel === 'danger') {
      this._alert.danger({ message });
    } else if (errorLevel === 'info') {
      this._alert.info({ message });
    }
  }

  get status() {
    return this.state.status;
  }

  /**
   * Is App in limited mode
   *
   * @readonly
   * @memberof AvailabilityMonitor
   */
  get isLimitedAvailabilityMode() {
    return this.state.isLimitedAvailabilityMode;
  }

  get isAppInitialErrorMode() {
    return this.state.isAppInitialError;
  }

  /**
   * Handle app initial errors
   *
   * @param {*} error
   * @returns
   * @memberof AvailabilityMonitor
   */
  handleInitialError(error) {
    if (isHAError(error) || !this._enabled) {
      return;
    }

    this._showAlert('danger', errorMessages.appInitialError);
    // TODO: Need corresponde action to switch APP state back to normal
    // this.store.dispatch({
    //   type: this.actionTypes.appInitialError,
    // });
  }
}
