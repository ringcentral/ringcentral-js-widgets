import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import type { ApiError } from '@ringcentral/sdk';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { errorMessages } from '../AvailabilityMonitor';
import { errorMessages as rateLimiterErrorMessage } from '../RateLimiter';

import type { Deps } from './ConnectivityMonitor.interface';

export const DEFAULT_TIME_TO_RETRY = 5 * 1000;
export const DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;

const errorMessageTypes = [
  rateLimiterErrorMessage.rateLimitReached,
  errorMessages.serviceLimited,
];

async function defaultCheckConnectionFn() {
  return fetch('https://pubsub.pubnub.com/time/0');
}

@Module({
  name: 'ConnectivityMonitor',
  deps: [
    'Client',
    { dep: 'Environment', optional: true },
    { dep: 'ConnectivityMonitorOptions', optional: true },
  ],
})
export class ConnectivityMonitor extends RcModuleV2<Deps> {
  protected _timeToRetry =
    this._deps.connectivityMonitorOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;

  protected _heartBeatInterval =
    this._deps.connectivityMonitorOptions?.heartBeatInterval ??
    DEFAULT_HEART_BEAT_INTERVAL;

  _checkConnectionFunc = async () => {
    try {
      const checkConnectionFunc =
        this._deps.connectivityMonitorOptions?.checkConnectionFunc ??
        defaultCheckConnectionFn;
      await checkConnectionFunc();
      this._requestSuccessHandler();
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._requestErrorHandler(error);
    }
  };

  protected _retryTimeoutId: NodeJS.Timeout | null = null;

  protected _lastEnvironmentCounter = 0;

  _unbindHandlers?: (() => void) | null = null;

  _requestSuccessHandler = () => {
    if (!this.connectivity) {
      this.setConnectSuccess();
    }
    this._retry();
  };

  _requestErrorHandler = (error: ApiError) => {
    if (error.message && errorMessageTypes.includes(error.message)) return;

    if (!error.response && this.connectivity) {
      this.setConnectFail();
    }

    this._retry();
  };

  protected _networkErrorHandler = () => {
    if (!this.networkLoss) {
      this.setNetworkLoss();
    }
    this._retry();
  };

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  connectivity = true;

  @state
  networkLoss = false;

  @action
  setNetworkLoss() {
    this.connectivity = false;
    this.networkLoss = true;
  }

  @action
  setConnectSuccess() {
    this.connectivity = true;
    this.networkLoss = false;
  }

  @action
  setConnectFail() {
    this.connectivity = false;
  }

  override _shouldInit() {
    return !!(
      this.pending &&
      (!this._deps.environment || this._deps.environment.ready)
    );
  }

  _shouldRebindHandlers() {
    return !!(
      this.ready &&
      this._deps.environment?.ready &&
      this._deps.environment.changeCounter !== this._lastEnvironmentCounter
    );
  }

  override onInit() {
    this._bindHandlers();
  }

  override onInitSuccess() {
    this._retry();
  }

  override onStateChange() {
    if (!this._shouldInit() && this._shouldRebindHandlers()) {
      if (this._deps.environment) {
        this._lastEnvironmentCounter = this._deps.environment.changeCounter;
      }

      this._bindHandlers();
    }
  }

  _bindHandlers() {
    this._unbindHandlers?.();
    const client = this._deps.client.service.client();
    client.on(client.events.requestSuccess, this._requestSuccessHandler);
    client.on(client.events.requestError, this._requestErrorHandler);
    window?.addEventListener('offline', this._networkErrorHandler);
    this._unbindHandlers = () => {
      client.removeListener(
        client.events.requestSuccess,
        this._requestSuccessHandler,
      );
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      window?.removeEventListener('offline', this._networkErrorHandler);
      this._unbindHandlers = null;
    };
  }

  @proxify
  async _checkConnection() {
    try {
      await this._checkConnectionFunc();
    } catch (error: any /** TODO: confirm with instanceof */) {
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
}
