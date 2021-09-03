import { SDK } from '@ringcentral/sdk';
import CoreExtension from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';
import { Wsc } from '@rc-ex/ws/lib/types';

import {
  RcModuleV2,
  state,
  action,
  storage,
} from '@ringcentral-integration/core';
import WebSocket from 'isomorphic-ws';
import { proxify } from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import {
  WebSocketReadyState,
  webSocketReadyStates,
} from './webSocketReadyStates';
import { Deps } from './RingCentralExtensions.interface';

@Module({
  name: 'RingCentralExtensions',
  deps: [
    'Auth',
    'Client',
    'Storage',
    { dep: 'SleepDetector', optional: true },
    { dep: 'RingCentralExtensionsOptions', optional: true },
  ],
})
export class RingCentralExtensions extends RcModuleV2<Deps> {
  // infra
  private _core: CoreExtension;
  private _webSocketExtension: WebSocketExtension;
  // refs
  private _currentWs: WebSocket;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'RingCentralExtensions',
    });
  }

  private async _setupInfra() {
    this._core = new CoreExtension();

    // install DebugExtension
    if (this.debugMode) {
      const debugExtension = new DebugExtension(
        this._deps.ringCentralExtensionsOptions?.debugOptions,
      );
      await this._core.installExtension(debugExtension);
    }

    // install RcSdkExtension
    const rcSdkExtension = new RcSdkExtension({ rcSdk: this.sdk });
    await this._core.installExtension(rcSdkExtension);

    // install WebSocketExtension
    const wsOptions = this._deps.ringCentralExtensionsOptions?.webSocketOptions;
    this._webSocketExtension = new WebSocketExtension({
      ...wsOptions,
      wscToken: wsOptions?.wscToken ?? this.cachedWsc?.token,
    });
    try {
      await this._core.installExtension(this._webSocketExtension);
    } catch (ex) {
      // It tries to establish connection on install.
      // Catch the connection issue and ignore.
      console.error('[RingCentralExtensions] Establish websocket failed', ex);
    }
  }

  async onInitOnce() {
    await this._setupInfra();

    // expose WebSocket events
    this._exposeConnectionEvents();
    this._webSocketExtension.eventEmitter.addListener(
      Events.newWebSocketObject,
      async (ws) => {
        // for mock WebSocket used
        if (ws._onCreated) {
          await ws._onCreated();
        }
        // expose events
        this._exposeConnectionEvents();
      },
    );
    this._webSocketExtension.eventEmitter.addListener(
      Events.newWsc,
      (wsc: Wsc) => {
        this._cacheWsc(wsc);
      },
    );
    if (this._webSocketExtension.options.autoRecover) {
      this._webSocketExtension.eventEmitter.addListener(
        Events.autoRecoverSuccess,
        () => {
          this._exposeConnectionEvents();
        },
      );
      this._webSocketExtension.eventEmitter.addListener(
        Events.autoRecoverFailed,
        () => {
          this._exposeConnectionEvents();
        },
      );
    }

    // register SleepDetector
    this._deps.sleepDetector?.on(
      this._deps.sleepDetector.events.detected,
      async () => {
        if (this.ready) {
          await this.recoverWebSocketConnection();
        }
      },
    );

    // hook auth events
    this._deps.auth.addAfterLoggedInHandler(() => {
      this.recoverWebSocketConnection();
    });
    this._deps.auth.addBeforeLogoutHandler(() => {
      this.revokeWebSocketConnection();
    });
  }

  @action
  private _cacheWsc(wsc: Wsc) {
    this.cachedWsc = wsc;
  }

  @storage
  @state
  cachedWsc: Wsc = null;

  @proxify
  async recoverWebSocketConnection() {
    if (this.webSocketReadyState === webSocketReadyStates.connecting) {
      console.log(
        '[RingCentralExtensions] > recoverWebSocketConnection > already connecting',
      );
      return;
    }
    await this._webSocketExtension.recover();
    this._exposeConnectionEvents();
  }

  @proxify
  async revokeWebSocketConnection() {
    await this._webSocketExtension.revoke();
    this._exposeConnectionEvents();
  }

  private _exposeConnectionEvents() {
    if (this._currentWs) {
      this._currentWs.removeEventListener('close', this._syncWsStatusHandler);
      this._currentWs.removeEventListener('open', this._syncWsStatusHandler);
      this._currentWs.removeEventListener('error', this._syncWsStatusHandler);
      this._currentWs = null;
    }
    this._currentWs = this._webSocketExtension.ws;
    if (this._currentWs) {
      this._currentWs.addEventListener('close', this._syncWsStatusHandler);
      this._currentWs.addEventListener('open', this._syncWsStatusHandler);
      this._currentWs.addEventListener('error', this._syncWsStatusHandler);
    }
    this._syncWebSocketReadyState();
  }

  private _syncWsStatusHandler = () => {
    this._syncWebSocketReadyState();
  };

  private _syncWebSocketReadyState() {
    const readyState = this._webSocketExtension.ws?.readyState;
    this._setWebSocketReadyState(readyState);
  }

  @action
  _setWebSocketReadyState(readyState: WebSocketExtension['ws']['readyState']) {
    switch (readyState) {
      case WebSocket.CONNECTING:
        this.webSocketReadyState = webSocketReadyStates.connecting;
        break;
      case WebSocket.OPEN:
        this.webSocketReadyState = webSocketReadyStates.open;
        break;
      case WebSocket.CLOSING:
        this.webSocketReadyState = webSocketReadyStates.closing;
        break;
      case WebSocket.CLOSED:
        this.webSocketReadyState = webSocketReadyStates.closed;
        break;
      default:
        this.webSocketReadyState = null;
        break;
    }
    console.log(
      `[RingCentralExtensions] > webSocketReadyState > ${this.webSocketReadyState}`,
    );
  }

  @state
  webSocketReadyState?: WebSocketReadyState = null;

  get debugMode(): boolean {
    return this._deps.ringCentralExtensionsOptions?.debugMode ?? false;
  }

  get sdk(): SDK {
    return this._deps.client.service;
  }

  get core(): CoreExtension {
    return this._core;
  }

  get webSocketExtension(): WebSocketExtension {
    return this._webSocketExtension;
  }
}
