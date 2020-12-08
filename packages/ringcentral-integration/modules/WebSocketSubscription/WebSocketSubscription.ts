import RingCentral from '@rc-ex/core';
import RingCentralExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';
import Subscription from '@rc-ex/ws/lib/subscription';
import WebSocket from 'isomorphic-ws';

import { equals } from 'ramda';
import { RcModuleV2, state, action } from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import {
  promisedDebounce,
  PromisedDebounceFunction,
} from '../../lib/debounce-throttle';

import { normalizeEventFilter } from './normalizeEventFilter';
import { webSocketReadyState } from './webSocketReadyState';
import { Deps } from './WebSocketSubscription.interface';

const DEFAULT_REFRESH_DELAY = 2 * 1000;

@Module({
  deps: [
    'Client',
    'Auth',
    'SleepDetector',
    { dep: 'WebSocketSubscriptionOptions', optional: true },
  ],
})
export class WebSocketSubscription extends RcModuleV2<Deps> {
  private _wsExtension: WebSocketExtension;
  private _wsSubscription: Subscription;

  private _currentWs: WebSocket;
  private _syncWsStatusHandler: () => void;

  private _debouncedRefreshSubscription: PromisedDebounceFunction<
    WebSocketSubscription['_refreshSubscription']
  >;

  constructor(deps: Deps) {
    super({
      deps,
    });

    this._syncWsStatusHandler = () => {
      this._syncWebSocketReadyState();
    };

    this._debouncedRefreshSubscription = promisedDebounce({
      fn: this._refreshSubscription,
      threshold: this._refreshDelay,
    });
  }

  private get _refreshDelay() {
    return Math.max(
      0,
      this._deps.webSocketSubscriptionOptions?.refreshDelay ??
        DEFAULT_REFRESH_DELAY,
    );
  }

  _shouldInit() {
    return super._shouldInit() && this._deps.auth.loggedIn;
  }

  _shouldReset() {
    return super._shouldReset() || (this.ready && this._deps.auth.notLoggedIn);
  }

  async onInitOnce() {
    const rc = new RingCentral();

    const sdk = this._deps.client.service;
    const ringCentralExtension = new RingCentralExtension(sdk);
    await rc.installExtension(ringCentralExtension);

    this._wsExtension = new WebSocketExtension({
      restOverWebSocket: this._deps.webSocketSubscriptionOptions
        ?.restOverWebSocket,
      debugMode: this._deps.webSocketSubscriptionOptions?.debugMode,
      autoRecover: this._deps.webSocketSubscriptionOptions?.autoRecover,
    });
    await rc.installExtension(this._wsExtension);
    this._exposeConnectionEvents();
    if (this._wsExtension.autoRecover) {
      this._wsExtension.eventEmitter.on(Events.autoRecoverSuccess, () => {
        this._exposeConnectionEvents();
      });
      this._wsExtension.eventEmitter.on(Events.autoRecoverFailed, () => {
        this._exposeConnectionEvents();
      });
    }

    this._deps.sleepDetector.on(
      this._deps.sleepDetector.events.detected,
      async () => {
        if (this.ready) {
          await this._recoverConnection();
        }
      },
    );
  }

  async onInit() {
    if (this.filters.length) {
      await this._recoverConnection();
      await this._debouncedRefreshSubscription();
    }
  }

  async onReset() {
    this._debouncedRefreshSubscription.cancel();
    await this._revokeConnection();
  }

  private async _recoverConnection() {
    await this._wsExtension.recover();
    this._exposeConnectionEvents();
  }

  private async _revokeConnection() {
    await this._wsExtension.revoke();
    this._exposeConnectionEvents();
  }

  private _exposeConnectionEvents() {
    if (this._currentWs) {
      this._currentWs.removeEventListener('close', this._syncWsStatusHandler);
      this._currentWs.removeEventListener('open', this._syncWsStatusHandler);
      this._currentWs.removeEventListener('error', this._syncWsStatusHandler);
    }
    this._currentWs = this._wsExtension.ws;
    if (this._currentWs) {
      this._currentWs.addEventListener('close', this._syncWsStatusHandler);
      this._currentWs.addEventListener('open', this._syncWsStatusHandler);
      this._currentWs.addEventListener('error', this._syncWsStatusHandler);
    }
    this._syncWebSocketReadyState();
  }

  private async _createSubscription() {
    this._wsSubscription = await this._wsExtension.subscribe(
      this.filters,
      (message) => {
        this._notifyMessage(message);
      },
    );
  }

  private async _revokeSubscription() {
    if (this._wsSubscription) {
      await this._wsSubscription.revoke();
      this._wsSubscription = null;
    }
  }

  private async _refreshSubscription() {
    if (!this._wsSubscription) {
      await this._createSubscription();
    } else if (
      !equals(
        this.filters.map((x) => normalizeEventFilter(x)).sort(),
        this._wsSubscription.subscriptionInfo?.eventFilters
          .map((x) => normalizeEventFilter(x))
          .sort(),
      )
    ) {
      this._wsSubscription.eventFilters = this.filters;
      await this._wsSubscription.refresh();
    }
  }

  @proxify
  async subscribe(eventsFilters: string[] = []) {
    if (this.ready) {
      const oldFilters = this.filters;
      this._addFilters(eventsFilters);
      if (oldFilters.length !== this.filters.length) {
        await this._debouncedRefreshSubscription();
      }
    }
  }

  @proxify
  async unsubscribe(eventsFilters: string[] = []) {
    const oldFilters = this.filters;
    this._removeFilters(eventsFilters);
    if (this.filters.length === 0) {
      await this._revokeSubscription();
    } else if (oldFilters.length !== this.filters.length) {
      await this._debouncedRefreshSubscription();
    }
  }

  @action
  private _addFilters(eventsFilters: string[]) {
    const filterMap: { [key: string]: boolean } = {};
    this.filters = this.filters.concat(eventsFilters).filter((f) => {
      if (!filterMap[f]) {
        filterMap[f] = true;
        return true;
      }
      return false;
    });
  }

  @action
  private _removeFilters(eventsFilters: string[]) {
    const filterMap: { [key: string]: boolean } = {};
    eventsFilters.forEach((f) => {
      filterMap[f] = true;
    });
    this.filters = this.filters.filter((f) => !filterMap[f]);
  }

  @action
  private _notifyMessage(message: any) {
    this.message = message;
  }

  @action
  private _syncWebSocketReadyState() {
    const wsReadyState = this._wsExtension.ws?.readyState;
    switch (wsReadyState) {
      case WebSocket.CONNECTING:
        this.wsReadyState = webSocketReadyState.connecting;
        break;
      case WebSocket.OPEN:
        this.wsReadyState = webSocketReadyState.open;
        break;
      case WebSocket.CLOSING:
        this.wsReadyState = webSocketReadyState.closing;
        break;
      case WebSocket.CLOSED:
        this.wsReadyState = webSocketReadyState.closed;
        break;
      default:
        this.wsReadyState = null;
        break;
    }
    console.log(this.wsReadyState);
  }

  @state
  filters: string[] = [];

  @state
  message: any = null;

  @state
  wsReadyState: string = null;
}
