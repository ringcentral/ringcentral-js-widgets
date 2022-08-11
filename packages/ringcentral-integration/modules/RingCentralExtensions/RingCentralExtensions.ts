import WebSocket from 'isomorphic-ws';

import CoreExtension from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';
import { Wsc, WsToken } from '@rc-ex/ws/lib/types';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import { SDK } from '@ringcentral/sdk';

import background from '../../lib/background';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { TabEvent } from '../TabManager';
import { Deps } from './RingCentralExtensions.interface';
import {
  WebSocketReadyState,
  webSocketReadyStates,
} from './webSocketReadyStates';

const DEFAULT_ACTIVE_DELAY = 1000;
export const InactiveTabEventName = 'RingCentralExtensions-inactive';
export const SyncTokensTabEventName = 'RingCentralExtensions-syncTokens';

@Module({
  name: 'RingCentralExtensions',
  deps: [
    'Auth',
    'Client',
    'Storage',
    { dep: 'TabManager', optional: true },
    { dep: 'SleepDetector', optional: true },
    { dep: 'RingCentralExtensionsOptions', optional: true },
  ],
})
export class RingCentralExtensions extends RcModuleV2<Deps> {
  // infra
  private _core!: CoreExtension;
  private _webSocketExtension!: WebSocketExtension;
  // refs
  private _removeWsListener?: () => void;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'RingCentralExtensions',
    });
  }

  override async onInitOnce() {
    await this._setupInfra();
    await this._bindEvents();
  }

  override async onInitSuccess() {
    // to do: force recoverWebSocketConnection after user re-logins the CTI
    try {
      await this.recoverWebSocketConnection();
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.log(`onInitSuccess error: ${e}`);
    }
  }

  @background
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
      wscToken: wsOptions?.wscToken ?? this.wscToken?.token,
    });
    this._webSocketExtension.wsToken = this.wsToken as WsToken;
    this._webSocketExtension.wsTokenExpiresAt = this.wsTokenExpiresAt;
    this._webSocketExtension.eventEmitter.addListener(Events.newWsc, () => {
      this._saveTokens();
    });
    if (!this.disconnectOnInactive || this.isTabActive) {
      await this._installWebSocketExtension();
    }
  }

  private async _installWebSocketExtension() {
    try {
      await this._core.installExtension(this._webSocketExtension);
    } catch (ex) {
      // It tries to establish connection on install.
      // Catch the connection issue and ignore.
      console.error('[RingCentralExtensions] Establish websocket failed', ex);
    }
  }

  @background
  private async _bindEvents() {
    // expose WebSocket events
    this._exposeConnectionEvents();
    this._webSocketExtension.eventEmitter.addListener(
      Events.newWebSocketObject,
      async (ws) => {
        // TODO: should mock correct from @rc-ex/ws
        // for mock WebSocket used
        await ws._onCreated?.();
        // expose events
        this._exposeConnectionEvents();
      },
    );
    if (this._webSocketExtension.options.autoRecover?.enabled) {
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
      () => {
        this.recoverWebSocketConnection();
      },
    );

    // hook auth events
    this._deps.auth.addAfterLoggedInHandler(() => {
      this.recoverWebSocketConnection();
    });
    this._deps.auth.addBeforeLogoutHandler(() => {
      this.revokeWebSocketConnection();
    });

    // multiple tabs support
    if (this.disconnectOnInactive) {
      watch(
        this,
        () => this.isTabActive,
        async (tabActive) => {
          if (tabActive) {
            await this._debouncedOnTabActive();
          } else {
            await this._debouncedOnTabActive.cancel();
          }
        },
      );
      watch(
        this,
        () => this._deps.tabManager!.event,
        (event) => {
          this._tabMessageHandler(event);
        },
      );
      if (this.isTabActive) {
        // as an active tab, inactive other tabs
        await this._inactiveOtherTabs();
      }
    }
  }

  private _debouncedOnTabActive = debounce({
    threshold: DEFAULT_ACTIVE_DELAY,
    fn: this._onTabActive,
  });

  private async _onTabActive() {
    // check if still active after sleep
    if (!this.ready || !this.isTabActive) {
      return;
    }
    // as an active tab, inactive other tabs
    await this._inactiveOtherTabs();
    // when auto recover of active tab is NOT configured as disabled
    if (
      this._deps.ringCentralExtensionsOptions?.webSocketOptions?.autoRecover
        ?.enabled !== false
    ) {
      // enable auto recover
      this._webSocketExtension.options.autoRecover!.enabled = true;
    }
    // recover WebSocket for current tab and other tabs will being disconnected automatically
    this.recoverWebSocketConnection();
  }

  private _tabMessageHandler(event: TabEvent) {
    if (!this.ready || !event) {
      return;
    }
    if (event.name === InactiveTabEventName) {
      // as an inactive tab, disable auto recover
      this._webSocketExtension.options.autoRecover!.enabled = false;
    } else if (event.name === SyncTokensTabEventName) {
      // as an inactive tab, sync with tokens that are received from active tab
      this._setTokens(event.args![0], event.args![1], event.args![2]);
      this._webSocketExtension.wsToken = this.wsToken as WsToken;
      this._webSocketExtension.wsTokenExpiresAt = this.wsTokenExpiresAt;
      this._webSocketExtension.wsc = this.wscToken as Wsc;
    }
  }

  private async _inactiveOtherTabs() {
    // inactive other tabs, for stopping WebSocket auto recover
    await this._deps.tabManager?.send(InactiveTabEventName);
  }

  private async _syncTokensToOtherTabs() {
    // sync required tokens to other tabs， so that other tabs can recover connection with latest tokens as needed
    // although tokens that are in storage are already synced, still we pass tokens manually for sync in time
    await this._deps.tabManager?.send(
      SyncTokensTabEventName,
      this.wsToken,
      this.wsTokenExpiresAt,
      this.wscToken,
    );
  }

  private _saveTokens() {
    this._setTokens(
      this._webSocketExtension.wsToken,
      this._webSocketExtension.wsTokenExpiresAt,
      this._webSocketExtension.wsc,
    );
    if (this.disconnectOnInactive) {
      this._syncTokensToOtherTabs();
    }
  }

  private _clearTokens() {
    this._setTokens(null, 0, null);
    if (this.disconnectOnInactive) {
      this._syncTokensToOtherTabs();
    }
  }

  @action
  private _setTokens(
    wsToken?: WsToken | null,
    wsTokenExpiresAt?: number,
    wscToken?: Wsc | null,
  ) {
    this.wsToken = wsToken;
    this.wsTokenExpiresAt = wsTokenExpiresAt ?? 0;
    this.wscToken = wscToken;
  }

  @storage
  @state
  wsToken?: WsToken | null = null;

  @storage
  @state
  wsTokenExpiresAt: number = 0;

  @storage
  @state
  wscToken?: Wsc | null = null;

  @proxify
  async recoverWebSocketConnection() {
    if (!this.ready) {
      return;
    }
    if (this.disconnectOnInactive && !this.isTabActive) {
      return;
    }
    // detect if not yet installed
    if (!this._webSocketExtension.rc) {
      // install and establish connection
      await this._installWebSocketExtension();
    } else {
      // recover directly
      await this._webSocketExtension.recover();
    }
    this._exposeConnectionEvents();
  }

  @proxify
  async revokeWebSocketConnection() {
    if (!this.ready || !this.isWebSocketOpen) {
      return;
    }
    if (this.disconnectOnInactive && !this.isTabActive) {
      return;
    }
    await this._webSocketExtension.revoke(true);
    this._exposeConnectionEvents();
    this._clearTokens();
  }

  private _exposeConnectionEvents() {
    this._removeWsListener?.();
    ((ws: WebSocket) => {
      if (ws) {
        ws.addEventListener('close', this._syncWsReadyState);
        ws.addEventListener('open', this._syncWsReadyState);
        ws.addEventListener('error', this._syncWsReadyState);
        this._removeWsListener = () => {
          ws.removeEventListener('close', this._syncWsReadyState);
          ws.removeEventListener('open', this._syncWsReadyState);
          ws.removeEventListener('error', this._syncWsReadyState);
        };
      }
    })(this._webSocketExtension.ws);
    this._syncWsReadyState();
  }

  private _syncWsReadyState = () => {
    const readyState = this._webSocketExtension.ws?.readyState;
    this._setWebSocketReadyState(readyState);
  };

  @action
  private _setWebSocketReadyState(
    readyState: WebSocketExtension['ws']['readyState'],
  ) {
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
  webSocketReadyState?: WebSocketReadyState | null = null;

  get isWebSocketOpen() {
    return this.webSocketReadyState === webSocketReadyStates.open;
  }

  get debugMode(): boolean {
    return this._deps.ringCentralExtensionsOptions?.debugMode ?? false;
  }

  get isTabActive(): boolean {
    return !!(
      this._deps.tabManager &&
      this._deps.tabManager.ready &&
      this._deps.tabManager.active
    );
  }

  get disconnectOnInactive(): boolean {
    return (
      this._deps.ringCentralExtensionsOptions?.disconnectOnInactive ?? false
    );
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
