import { pathOr } from 'ramda';

import {
  action,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import { ApiError } from '@ringcentral/sdk';

import { promisedThrottle } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import validateIsOffline from '../../lib/validateIsOffline';
import { Deps, ErrorMessages } from './AvailabilityMonitor.interface';
import {
  extractUrl,
  generateRandomNumber,
  isHAEnabledAPI,
  isHAError,
} from './availabilityMonitorHelper';
import { errorMessages } from './errorMessages';

export const HEALTH_CHECK_INTERVAL = 60 * 1000;
export const STATUS_END_POINT = '/restapi/v1.0/status';
const DEFAULT_TIME = 0;

@Module({
  name: 'AvailabilityMonitor',
  deps: [
    'Auth',
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'AvailabilityMonitorOptions', optional: true },
  ],
})
export class AvailabilityMonitor extends RcModuleV2<Deps> {
  protected _enabled = this._deps.availabilityMonitorOptions?.enabled ?? false;

  protected _randomTime = DEFAULT_TIME;

  protected _limitedTimeout: NodeJS.Timeout = null;

  protected _normalTimeout: NodeJS.Timeout = null;

  protected _promise: Promise<Response> = null;

  protected _healthRetryTime = HEALTH_CHECK_INTERVAL;

  protected _unbindHandlers: () => void = null;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  /**
   * When App is in Limited Mode and Status check met a non-503 error
   */
  @state
  hasLimitedStatusError = false;

  @state
  isLimitedMode = false;

  @state
  isVoIPOnlyMode = false;

  @action
  setLimitedModeStatusError() {
    this.hasLimitedStatusError = true;
  }

  @action
  setNormalMode() {
    this.hasLimitedStatusError = false;
    this.isLimitedMode = false;
    this.isVoIPOnlyMode = false;
  }

  @action
  setLimitedMode() {
    this.isLimitedMode = true;
  }

  @action
  setVoIPOnlyMode() {
    this.isVoIPOnlyMode = true;
  }

  @action
  setVoIPOnlyReset() {
    this.isVoIPOnlyMode = false;
  }

  onInit() {
    this._bindHandlers();
  }

  onInitOnce() {
    watch(
      this,
      () => this._deps.environment.changeCounter,
      () => {
        if (this.ready && this._deps.environment?.ready) {
          this._bindHandlers();
        }
      },
    );
  }

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }

    const client = this._deps.client.service.client();
    const platform = this._deps.client.service.platform();

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

  _beforeRequestHandler = (params: Request) => {
    if (!this.isLimitedAvailabilityMode || !this._enabled) {
      return;
    }

    const requestUrl = pathOr<string>(null, ['_request', 'url'], params);
    const requestMethod = pathOr<string>(null, ['_request', 'method'], params);

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
  };

  /**
   * Retrieve retry after value from response headers
   */
  _retrieveRetryAfter(headers: ApiError['response']['headers']) {
    try {
      const retryAfter = parseFloat(`${headers.get('Retry-After') || -1}`);
      return Number.isNaN(retryAfter) ? -1 : retryAfter;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Check if app can enter LA mode.
   * If this module is not enabled, just return.
   *
   */
  _requestErrorHandler = async (error: ApiError) => {
    if (
      error.response &&
      !(error.response as ApiError['response'] & ErrorMessages)._json
    ) {
      (error.response as ApiError['response'] & ErrorMessages)._json =
        await error.response.clone().json();
    }
    const requestUrl = pathOr<ApiError['request']['url']>(
      '',
      ['request', 'url'],
      error,
    );
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
        this.setLimitedModeStatusError();
      }
      return;
    }

    if (!isHAError(error) || !this._enabled) {
      return;
    }

    const headers = pathOr(
      {},
      ['response', 'headers'],
      error,
    ) as ApiError['response']['headers'];
    const retryAfter = this._retrieveRetryAfter(headers);

    if (retryAfter > 0) {
      // Retry-After unit is secons, make it mili-secons
      this._healthRetryTime = retryAfter * 1000;
    } else {
      this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    }

    this._switchToLimitedMode();
    this._retry();
  };

  _refreshErrorHandler = async (error: ApiError) => {
    const isOffline = validateIsOffline(error.message);

    const platform = this._deps.client.service.platform();
    const RES_STATUS = (error.response && error.response.status) || null;
    const refreshTokenValid =
      (isOffline || RES_STATUS >= 500) &&
      (await platform.auth().refreshTokenValid());
    if (refreshTokenValid) {
      this._switchToVoIPOnlyMode();
    }
  };

  _refreshSuccessHandler = () => {
    if (this.isVoIPOnlyMode) {
      this.setVoIPOnlyReset();
    }
    this._clearLimitedTimeout();
  };

  _switchToVoIPOnlyMode = () => {
    if (this.isVoIPOnlyMode) {
      return;
    }

    this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    this.setVoIPOnlyMode();
    this._retry();
  };

  _switchToLimitedMode() {
    if (this.isLimitedMode) {
      return;
    }

    this.setLimitedMode();
  }

  _switchToNormalMode = () => {
    if (!this.isLimitedAvailabilityMode) {
      return;
    }

    this.setNormalMode();

    this._clearLimitedTimeout();
    this._clearNormalTimeout();
  };

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
    // !!This API must be always called with OAuth token in Authorization header
    // !! (same as in case of regular API calls) in order to ensure the request is routed to proper POD/partition.
    // Client app can even continue use expired access token with this API - backend will pass such requests through.
    // The result of the API call is unpredictable when it is called without access token!
    //
    // Reference: https://wiki.ringcentral.com/display/PLAT/High+Availability+Guidelines+for+API+Clients

    const res: Response = await this._deps.client.service
      .platform()
      .get('/restapi/v1.0/status', null, {
        skipAuthCheck: true,
        headers: {
          Authorization: `Bearer ${this._deps.auth.accessToken}`,
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
  healthCheck = promisedThrottle({
    async fn(this: AvailabilityMonitor) {
      return this._healthCheck({ manual: true });
    },
  });

  /**
   * Check if the error is Survival Mode error,
   * Or if app is already in Survival Mode and current request is blocked with an error.
   */
  async checkIfHAError(error: ApiError) {
    const errMessage = pathOr<string>(null, ['message'], error);
    if (error.response) {
      (error.response as ApiError['response'] & ErrorMessages)._json =
        await error.response.clone().json();
    }
    return isHAError(error) || errMessage === errorMessages.serviceLimited;
  }

  /**
   * Is App in limited mode
   */
  get isLimitedAvailabilityMode() {
    return this.isLimitedMode || this.isVoIPOnlyMode;
  }
}
