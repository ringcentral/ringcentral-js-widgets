import { promisedThrottle } from '@ringcentral-integration/commons/lib/debounce-throttle';
import validateIsOffline from '@ringcentral-integration/commons/lib/validateIsOffline';
import {
  action,
  computed,
  injectable,
  optional,
  RcModule,
  state,
  watch,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import { pathOr } from 'ramda';

import { Auth } from '../Auth';
import { Client } from '../Client';
import { Environment } from '../Environment';

import type {
  AvailabilityMonitorOptions,
  ErrorMessages,
  SharedState,
} from './AvailabilityMonitor.interface';
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
const SHARED_STATE_EXPIRATION = 12 * 60 * 60 * 1000;

@injectable({
  name: 'AvailabilityMonitor',
})
export class AvailabilityMonitor extends RcModule {
  protected _enabled = this._availabilityMonitorOptions?.enabled ?? false;

  protected _randomTime = DEFAULT_TIME;

  protected _limitedTimeout: NodeJS.Timeout | null = null;

  protected _normalTimeout: NodeJS.Timeout | null = null;

  protected _promise: Promise<Response> | null = null;

  _healthRetryTime = HEALTH_CHECK_INTERVAL;

  _unbindHandlers: (() => void) | null = null;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    @optional('Prefix') protected _prefix?: string,
    @optional('TabManager') protected _tabManager?: any,
    @optional() protected _environment?: Environment,
    @optional('AvailabilityMonitorOptions')
    protected _availabilityMonitorOptions?: AvailabilityMonitorOptions,
  ) {
    super();
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

  override onInit() {
    this._bindHandlers();
  }

  override onInitOnce() {
    this._initLocalStorage();
    watch(
      this,
      () => this._environment?.changeCounter,
      () => {
        if (this.ready && this._environment?.ready) {
          this._bindHandlers();
        }
      },
    );
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

  _beforeRequestHandler = (params: Request) => {
    if (!this.isLimitedAvailabilityMode || !this._enabled) {
      return;
    }

    const requestUrl = pathOr<string | null>(null, ['_request', 'url'], params);
    const requestMethod = pathOr<string | null>(
      null,
      ['_request', 'method'],
      params,
    );

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
  _retrieveRetryAfter(headers: Response['headers']) {
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
    await this.attachErrorResponse(error);

    const requestUrl = pathOr<Request['url']>('', ['request', 'url'], error);
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
    ) as Response['headers'];
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

    const platform = this._client.service.platform();
    const RES_STATUS = (error.response && error.response.status) || null;
    const refreshTokenValid =
      (isOffline || Number(RES_STATUS) >= 500) &&
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
    // Reference: https://wiki_domain/display/PLAT/High+Availability+Guidelines+for+API+Clients

    const res: Response = await this._client.service
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
    // Reference: https://wiki_domain/display/PLAT/Error+Handling+Guidelines+for+API+Clients

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
    const errMessage = pathOr<string | null>(null, ['message'], error);
    await this.attachErrorResponse(error);

    return isHAError(error) || errMessage === errorMessages.serviceLimited;
  }

  private async attachErrorResponse(error: ApiError) {
    const response = error.response as ApiError['response'] & ErrorMessages;
    if (response && !response._json) {
      try {
        response._json = await response.clone().json();
      } catch (err) {
        // ignore response json error
        console.error('error from response.json()', { error, err });
      }
    }
  }

  /**
   * Is App in limited mode
   */
  get isLimitedAvailabilityMode() {
    return this.isLimitedMode || this.isVoIPOnlyMode;
  }

  /**
   * Custom storage with localStorage in synchronous way
   * ! Be aware that these states are shared across multiple tabs !
   */
  @state
  sharedStates: Record<string, SharedState> = {};

  @computed((that: AvailabilityMonitor) => [that.sharedStates])
  get hasCallSession() {
    return Object.keys(this.sharedStates).some(
      (key) => this.sharedStates[key].hasCallSession,
    );
  }

  @computed((that: AvailabilityMonitor) => [that.sharedStates])
  get hasWebSocketReady() {
    return Object.keys(this.sharedStates).some(
      (key) => this.sharedStates[key].webSocketReady,
    );
  }

  _sharedStatesKey!: string;
  _currentTabKeys: string[] = [];

  _writeSharedStates() {
    const json = JSON.stringify(this.sharedStates);
    global.localStorage?.setItem(this._sharedStatesKey, json);
  }

  @action
  _retrieveSharedStates() {
    const json = global.localStorage?.getItem(this._sharedStatesKey);
    this.sharedStates = JSON.parse(json ?? '{}');
  }

  // TODO: ensure that still working in worker context
  _initLocalStorage() {
    this._sharedStatesKey = `${this._prefix}-AvailabilityMonitor-sharedStates`;
    if (global.localStorage) {
      let isUnloading: boolean | undefined;
      this._retrieveSharedStates();

      global.addEventListener('storage', (ev: StorageEvent) => {
        if (!isUnloading && ev.key === this._sharedStatesKey) {
          this._retrieveSharedStates();
        }
      });
      global.addEventListener('pagehide', () => {
        isUnloading = true;
        this._unloadSharedStates();
      });
    }
  }

  @action
  _unloadSharedStates() {
    let states: Record<string, SharedState> = {
      ...this.sharedStates,
    };

    // unload base on cached keys
    this._currentTabKeys.forEach((key) => {
      delete states[key];
    });
    this._currentTabKeys = [];

    // unload base on tabId
    if (this._tabManager) {
      Object.keys(states).forEach((key) => {
        if (states[key].tabId === this._tabManager!.id) {
          delete states[key];
        }
      });
    }

    // clean
    states = this._cleanSharedStates(states);

    // write
    this.sharedStates = states;
    this._writeSharedStates();
  }

  _cleanSharedStates(states: Record<string, SharedState>) {
    Object.keys(states).forEach((key) => {
      const state = states[key];
      if (
        // timestamp expired
        Date.now() - state.timestamp > SHARED_STATE_EXPIRATION ||
        // tabs expired/closed
        (state.tabId &&
          this._tabManager &&
          !this._tabManager.actualTabIds.includes(state.tabId))
      ) {
        delete states[key];
      }
    });
    return states;
  }

  @action
  setSharedState(
    key: string,
    state?: Omit<SharedState, 'tabId' | 'timestamp'>,
  ) {
    let states: Record<string, SharedState> = {
      ...this.sharedStates,
    };

    // update
    if (state) {
      const current = states[key];
      states[key] = {
        ...current,
        ...state,
        timestamp: Date.now(),
        tabId: this._tabManager?.id,
      };
    } else {
      delete states[key];
    }

    // clean
    states = this._cleanSharedStates(states);

    // write storage
    this.sharedStates = states;
    this._writeSharedStates();

    // cache keys
    if (!this._currentTabKeys.includes(key)) {
      this._currentTabKeys.push(key);
    }
  }
}
