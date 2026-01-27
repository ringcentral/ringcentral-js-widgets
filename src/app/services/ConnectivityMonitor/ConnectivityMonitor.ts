import {
  action,
  injectable,
  optional,
  delegate,
  RcModule,
  state,
  PortManager,
  Root,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import { fromEvent, tap } from 'rxjs';

import { errorMessages as availabilityMonitorErrorMessages } from '../AvailabilityMonitor/errorMessages';
import { Client } from '../Client';
import { Environment } from '../Environment';
import { errorMessages as rateLimiterErrorMessage } from '../RateLimiter/errorMessages';

import type { ConnectivityMonitorOptions } from './ConnectivityMonitor.interface';

export const DEFAULT_TIME_TO_RETRY = 5 * 1000;
export const DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;

const errorMessageTypes = [
  rateLimiterErrorMessage.rateLimitReached,
  availabilityMonitorErrorMessages.serviceLimited,
];

async function defaultCheckConnectionFn() {
  const response = await fetch(
    'https://apps.ringcentral.com/integration/ping',
    {
      method: 'HEAD',
      mode: 'no-cors',
    },
  );
  if (response.type !== 'opaque' && response.status !== 200) {
    throw new Error('Network check failed');
  }
}

/**
 * Monitors network connectivity and handles connection state
 *
 * @class
 */
@injectable({
  name: 'ConnectivityMonitor',
})
export class ConnectivityMonitor extends RcModule {
  protected _timeToRetry =
    this._connectivityMonitorOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;

  protected _heartBeatInterval =
    this._connectivityMonitorOptions?.heartBeatInterval ??
    DEFAULT_HEART_BEAT_INTERVAL;

  get enable() {
    return this._connectivityMonitorOptions?.enable ?? true;
  }

  _checkConnectionFunc = async () => {
    try {
      const checkConnectionFunc =
        this._connectivityMonitorOptions?.checkConnectionFunc ??
        defaultCheckConnectionFn;
      await checkConnectionFunc();
      this._requestSuccessHandler();
    } catch (error) {
      this._requestErrorHandler(error as any);
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

    if (!error.response) {
      if (this.connectivity) {
        this.setConnectFail();
      }
    }
    this._retry();
  };

  protected _networkErrorHandler = () => {
    this.handlerNetworkError();
  };

  protected _networkOnlineHandler = () => {
    this._checkConnection();
  };

  @delegate('server')
  async handlerNetworkError() {
    if (!this.networkLoss) {
      this.setNetworkLoss();
    }
    this._retry();
  }

  constructor(
    private _root: Root,
    private _portManager: PortManager,
    protected _client: Client,
    @optional() protected _environment?: Environment,
    @optional('ConnectivityMonitorOptions')
    protected _connectivityMonitorOptions?: ConnectivityMonitorOptions,
  ) {
    super();

    if (!this.enable) return;

    if (this._portManager.shared) {
      this._portManager.onMainTab(() => {
        this._bindNetworkHandler();
      });
    } else {
      this._bindNetworkHandler();
    }
  }

  /**
   * Current connectivity status
   * @type {boolean}
   */
  @state
  connectivity = true;

  /**
   * Flag indicating if network connection is lost
   * @type {boolean}
   */
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

  /**
   * Indicates if the ConnectivityMonitor is ready to be used
   * @type {boolean}
   */
  override _shouldInit() {
    return !!(this.pending && (!this._environment || this._environment.ready));
  }

  _shouldRebindHandlers() {
    return !!(
      this.ready &&
      this._environment?.ready &&
      this._environment.changeCounter !== this._lastEnvironmentCounter
    );
  }

  override onInit() {
    if (this.enable) {
      this._bindHandlers();
    }
  }

  override onInitSuccess() {
    if (this.enable) {
      this._retry();
    }
  }

  override onStateChange() {
    if (!this._shouldInit() && this._shouldRebindHandlers()) {
      if (this._environment) {
        this._lastEnvironmentCounter = this._environment.changeCounter;
      }

      this._bindHandlers();
    }
  }

  _bindHandlers() {
    this._unbindHandlers?.();
    const client = this._client.service.client();
    client.on(client.events.requestSuccess, this._requestSuccessHandler);
    client.on(client.events.requestError, this._requestErrorHandler);
    this._unbindHandlers = () => {
      client.removeListener(
        client.events.requestSuccess,
        this._requestSuccessHandler,
      );
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      this._unbindHandlers = null;
    };
  }

  networkLoss$ = fromEvent(global, 'offline');

  networkOnline$ = fromEvent(global, 'online');

  private _bindNetworkHandler() {
    this.networkLoss$
      .pipe(
        tap(() => this.handlerNetworkError()),
        this._root.takeUntilAppDestroy,
      )
      .subscribe();
    this.networkOnline$
      .pipe(
        tap(() => this._networkOnlineHandler()),
        this._root.takeUntilAppDestroy,
      )
      .subscribe();
  }

  @delegate('server')
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
}
