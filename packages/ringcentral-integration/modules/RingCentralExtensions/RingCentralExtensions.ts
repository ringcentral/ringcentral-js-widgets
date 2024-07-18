import CoreExtension from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';
import type { Wsc, WsToken } from '@rc-ex/ws/lib/types';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import type { SDK } from '@ringcentral/sdk';
import WebSocket from 'isomorphic-ws';

import background from '../../lib/background';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import type { TabEvent } from '../TabManager';

import type { Deps } from './RingCentralExtensions.interface';
import type { WebSocketReadyState } from './webSocketReadyStates';
import { webSocketReadyStates } from './webSocketReadyStates';

const RECOVER_DEBOUNCE_THRESHOLD = process.env.NODE_ENV === 'test' ? 0 : 1000;
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
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'RingCentralExtensionsOptions', optional: true },
  ],
})
export class RingCentralExtensions extends RcModuleV2<Deps> {
  // infra
  private _core!: CoreExtension;
  private _webSocketExtension!: WebSocketExtension;
  // refs
  private _removeWsListener?: () => void;
  private _wsConnectionReady?: boolean;

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
      if (process.env.NODE_ENV !== 'test') {
        console.log(`onInitSuccess error: ${e}`);
      }
    }
  }

  @background
  private async _setupInfra() {
    this._core = new CoreExtension();

    // install DebugExtension
    if (process.env.NODE_ENV !== 'production' && this.debugMode) {
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
    this._useTokens();
    this._webSocketExtension.eventEmitter.addListener(Events.newWsc, () => {
      this._saveTokens();
    });
    // expose WebSocket events
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
    this._webSocketExtension.eventEmitter.addListener(
      Events.connectionReady,
      () => {
        this._wsConnectionReady = true;
        this._syncWsReadyState();
      },
    );
    if (
      this._deps.auth.loggedIn &&
      (!this.disconnectOnInactive || this.isTabActive)
    ) {
      await this._installWebSocketExtension();
    }
  }

  private async _installWebSocketExtension() {
    if (!this.allowSwitchConnection) {
      return;
    }
    try {
      if (process.env.NODE_ENV !== 'test') {
        console.log('[RingCentralExtensions] > WebSocketExtension > install');
      }
      await this._core.installExtension(this._webSocketExtension);
    } catch (ex) {
      // It tries to establish connection on install.
      // Catch the connection issue and ignore.
      if (process.env.NODE_ENV !== 'test') {
        console.error(
          '[RingCentralExtensions] > WebSocketExtension > install failed',
          ex,
        );
      }
    }
  }

  @background
  private async _bindEvents() {
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
    this._deps.sleepDetector?.on('detected', async () => {
      await this.recoverWebSocketConnection();
    });

    // hook auth events
    this._deps.auth.addAfterLoggedInHandler(async () => {
      await this.recoverWebSocketConnection();
    });
    this._deps.auth.addBeforeLogoutHandler(async () => {
      await this.revokeWebSocketConnection();
    });
    this._deps.auth.addRefreshErrorHandler(async (refreshTokenValid) => {
      if (!refreshTokenValid) {
        await this.revokeWebSocketConnection();
      }
    });

    // multiple tabs support
    if (this.disconnectOnInactive) {
      this._setSharedState();
      watch(
        this,
        () => this.isWebSocketReady,
        () => {
          this._setSharedState();
        },
      );
      watch(
        this,
        () => this.isTabActive,
        async (tabActive) => {
          if (tabActive) {
            if (process.env.NODE_ENV !== 'test') {
              console.log('[RingCentralExtensions] > tab > active');
            }
            await this._debouncedOnTabActive();
          } else {
            if (process.env.NODE_ENV !== 'test') {
              console.log('[RingCentralExtensions] > tab > inactive');
            }
            this._debouncedOnTabActive.cancel();
          }
        },
      );
      watch(
        this,
        () => this.allowSwitchConnection,
        (allow) => {
          if (allow && this.isTabActive) {
            this._onTabActive();
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

  private _setSharedState() {
    if (this._deps.availabilityMonitor && this._deps.tabManager) {
      const key = `ws-${this._deps.tabManager.id}`;
      this._deps.availabilityMonitor.setSharedState(key, {
        webSocketReady: this.isWebSocketReady,
      });
    }
  }

  private _setWsAutoRecover(enabled: boolean) {
    // when auto recover is NOT configured as disabled (it is enabled by default)
    if (
      this._webSocketExtension &&
      this._deps.ringCentralExtensionsOptions?.webSocketOptions?.autoRecover
        ?.enabled !== false
    ) {
      // enable/disable ws auto recover
      this._webSocketExtension.options.autoRecover!.enabled = enabled;
    }
  }

  private _debouncedOnTabActive = debounce({
    threshold: RECOVER_DEBOUNCE_THRESHOLD,
    fn: this._onTabActive,
  });

  private async _onTabActive() {
    // check if still active after sleep
    if (!this.ready || !this.isTabActive) {
      return;
    }
    // as an active tab, inactive other tabs
    await this._inactiveOtherTabs();
    // recover WebSocket for current tab and other tabs will being disconnected automatically
    await this.recoverWebSocketConnection();
  }

  private _tabMessageHandler(event: TabEvent) {
    if (!this.ready || !event) {
      return;
    }
    if (event.name === InactiveTabEventName) {
      // as an inactive tab, disable auto recover
      this._setWsAutoRecover(false);
    } else if (event.name === SyncTokensTabEventName) {
      // as an inactive tab, sync and use with tokens that are received from active tab
      this._setTokens(event.args![0], event.args![1], event.args![2]);
      this._useTokens();
    }
  }

  private async _inactiveOtherTabs() {
    if (!this.allowSwitchConnection) {
      return;
    }
    // inactive other tabs, for stopping WebSocket auto recover
    await this._deps.tabManager?.send(InactiveTabEventName);
    // when auto recover of active tab is NOT configured as disabled
    this._setWsAutoRecover(true);
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

  private _useTokens() {
    this._webSocketExtension.wsToken = this.wsToken as WsToken;
    this._webSocketExtension.wsTokenExpiresAt = this.wsTokenExpiresAt;
    this._webSocketExtension.wsc = this.wscToken as Wsc;
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
    this.wsToken = wsToken ?? null;
    this.wsTokenExpiresAt = wsTokenExpiresAt ?? 0;
    this.wscToken = wscToken ?? null;
  }

  @storage
  @state
  wsToken?: WsToken | null = null;

  @storage
  @state
  wsTokenExpiresAt = 0;

  @storage
  @state
  wscToken?: Wsc | null = null;

  @proxify
  async recoverWebSocketConnection() {
    if (!this.ready) {
      return;
    }
    if (!this._deps.auth.loggedIn) {
      return;
    }
    if (this.disconnectOnInactive && !this.isTabActive) {
      return;
    }
    if (!this.allowSwitchConnection) {
      return;
    }
    // detect if not yet installed
    if (!this._webSocketExtension.rc) {
      // install and establish connection
      await this._installWebSocketExtension();
    } else {
      // recover directly
      await this._webSocketExtension.recover();
      this._webSocketExtension.enable();
    }
    this._exposeConnectionEvents();
  }

  @proxify
  async revokeWebSocketConnection() {
    if (!this.ready) {
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

    const { ws } = this._webSocketExtension;

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
    let state: WebSocketReadyState | null;
    switch (readyState) {
      case WebSocket.CONNECTING: {
        state = webSocketReadyStates.connecting;
        break;
      }
      case WebSocket.OPEN: {
        if (this._wsConnectionReady) {
          state = webSocketReadyStates.ready;
        } else {
          state = webSocketReadyStates.open;
        }
        break;
      }
      case WebSocket.CLOSING: {
        state = webSocketReadyStates.closing;
        break;
      }
      case WebSocket.CLOSED: {
        state = webSocketReadyStates.closed;
        this._wsConnectionReady = false;
        break;
      }
      default: {
        state = null;
        this._wsConnectionReady = undefined;
        break;
      }
    }
    if (process.env.NODE_ENV !== 'test' && this.webSocketReadyState !== state) {
      console.log(
        `[RingCentralExtensions] > webSocketReadyState > ${this.webSocketReadyState} -> ${state}`,
      );
    }
    this.webSocketReadyState = state;
  }

  @state
  webSocketReadyState?: WebSocketReadyState | null = null;

  get isWebSocketReady() {
    return this.webSocketReadyState === webSocketReadyStates.ready;
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

  get allowSwitchConnection() {
    if (
      this._deps.availabilityMonitor?.hasCallSession &&
      this._deps.availabilityMonitor?.hasWebSocketReady
    ) {
      return false;
    }
    return true;
  }
}
