import { SDK } from '@ringcentral/sdk';
import CoreExtension from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';

import {
  RcModuleV2,
  state,
  action,
  watch,
} from '@ringcentral-integration/core';
import WebSocket from 'isomorphic-ws';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import {
  WebSocketReadyState,
  webSocketReadyStates,
} from './webSocketReadyStates';
import { Deps } from './RingCentralExtensions.interface';

@Module({
  name: 'RingCentralExtensions',
  deps: [
    'Client',
    { dep: 'SleepDetector', optional: true },
    { dep: 'RingCentralExtensionsOptions', optional: true },
  ],
})
export class RingCentralExtensions extends RcModuleV2<Deps> {
  // infra
  private _sdk: SDK;
  private _core: CoreExtension;
  private _webSocketExtension: WebSocketExtension;
  // refs
  private _currentWs: WebSocket;

  constructor(deps: Deps) {
    super({
      deps,
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
    this._sdk = this._deps.client.service;
    const rcSdkExtension = new RcSdkExtension({ rcSdk: this._sdk });
    await this._core.installExtension(rcSdkExtension);

    // install WebSocketExtension
    this._webSocketExtension = new WebSocketExtension(
      this._deps.ringCentralExtensionsOptions?.webSocketOptions,
    );
    try {
      await this._core.installExtension(this._webSocketExtension);
    } catch (ex) {
      // It tries to establish connection on install.
      // Catch the connection issue and ignore.
      console.warn('[RingCentralExtensions] Establish websocket failed', ex);
    }
  }

  private _onSignedIn = () => {
    this._setLoggedIn(true);
  };

  private _onSignedOff = () => {
    this._setLoggedIn(false);
  };

  private _bindPlatformEvents() {
    const platform = this._sdk.platform();
    platform.addListener(platform.events.loginSuccess, this._onSignedIn);
    platform.addListener(platform.events.loginError, this._onSignedOff);
    platform.addListener(platform.events.logoutSuccess, this._onSignedOff);
    platform.addListener(platform.events.logoutError, this._onSignedOff);
    platform.addListener(platform.events.refreshSuccess, this._onSignedIn);
    platform.addListener(platform.events.refreshError, this._onSignedOff);
  }

  private _unbindPlatformEvents() {
    const platform = this._sdk.platform();
    platform.removeListener(platform.events.loginSuccess, this._onSignedIn);
    platform.removeListener(platform.events.loginError, this._onSignedOff);
    platform.removeListener(platform.events.logoutSuccess, this._onSignedOff);
    platform.removeListener(platform.events.logoutError, this._onSignedOff);
    platform.removeListener(platform.events.refreshSuccess, this._onSignedIn);
    platform.removeListener(platform.events.refreshError, this._onSignedOff);
  }

  async onInitOnce() {
    await this._setupInfra();

    // expose WebSocket events
    this._exposeConnectionEvents();
    if (this._webSocketExtension.options.autoRecover) {
      this._webSocketExtension.eventEmitter.on(
        Events.autoRecoverSuccess,
        () => {
          this._exposeConnectionEvents();
        },
      );
      this._webSocketExtension.eventEmitter.on(Events.autoRecoverFailed, () => {
        this._exposeConnectionEvents();
      });
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

    watch(
      this,
      () => this.isLoggedIn,
      () => {
        if (!this.ready) {
          return;
        }
        if (this.isLoggedIn) {
          this.recoverWebSocketConnection();
        } else {
          // this.revokeWebSocketConnection();
        }
      },
    );
  }

  async onInit() {
    this._bindPlatformEvents();
    const platform = this._sdk.platform();
    const loggedIn = await platform.loggedIn();
    this._setLoggedIn(loggedIn);
  }

  async onReset() {
    this._unbindPlatformEvents();
  }

  @action
  private _setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  @state
  isLoggedIn: boolean = false;

  @proxify
  async recoverWebSocketConnection() {
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

  @action
  private _syncWebSocketReadyState() {
    const readyState = this._webSocketExtension.ws?.readyState;
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
    return this._sdk;
  }

  get core(): CoreExtension {
    return this._core;
  }

  get webSocketExtension(): WebSocketExtension {
    return this._webSocketExtension;
  }
}
