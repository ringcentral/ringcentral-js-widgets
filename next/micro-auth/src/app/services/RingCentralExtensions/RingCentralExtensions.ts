import CoreExtension from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension, { Events } from '@rc-ex/ws';
import type { Wsc, WsToken } from '@rc-ex/ws/lib/types';
import { SleepDetector } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  logger,
  optional,
  PortManager,
  RcModule,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import type { SDK } from '@ringcentral/sdk';
import WebSocket from 'isomorphic-ws';
import { tap } from 'rxjs';

import { Auth } from '../Auth';
import { Client } from '../Client';

import type { RingCentralExtensionsOptions } from './RingCentralExtensions.interface';
import type { WebSocketReadyState } from './webSocketReadyStates';
import { webSocketReadyStates } from './webSocketReadyStates';

/**
 * Service for managing RingCentral extensions and WebSocket connections
 *
 * @class
 */
@injectable({
  name: 'RingCentralExtensions',
})
export class RingCentralExtensions extends RcModule {
  // infra
  private _core!: CoreExtension;
  private _webSocketExtension!: WebSocketExtension;
  // refs
  private _removeWsListener?: () => void;
  private _wsConnectionReady?: boolean;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    protected _storage: StoragePlugin,
    protected _portManager: PortManager,
    @optional() protected _sleepDetector?: SleepDetector,
    @optional('RingCentralExtensionsOptions')
    protected _ringCentralExtensionsOptions?: RingCentralExtensionsOptions,
  ) {
    super();
    this._storage.enable(this);
    this._portManager.onClient(() => {
      // Return dispose function
      return () => {
        this.enableAutoRecover();
        this.recoverWebSocketConnection();
      };
    });
    this._portManager.onServer(() => {
      // Return dispose function
      return () => {
        this.disableAutoRecover();
        this.revokeWebSocketConnection();
      };
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
    } catch (e) {
      if (process.env.NODE_ENV !== 'test') {
        logger.log(`onInitSuccess error: ${e}`);
      }
    }
  }

  private async _setupInfra() {
    this._core = new CoreExtension();

    // install DebugExtension
    if (process.env.NODE_ENV !== 'production' && this.debugMode) {
      const debugExtension = new DebugExtension(
        this._ringCentralExtensionsOptions?.debugOptions,
      );
      await this._core.installExtension(debugExtension);
    }

    // install RcSdkExtension
    const rcSdkExtension = new RcSdkExtension({ rcSdk: this.sdk });
    await this._core.installExtension(rcSdkExtension);

    // install WebSocketExtension
    const wsOptions = this._ringCentralExtensionsOptions?.webSocketOptions;
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
    if (this._auth.loggedIn) {
      await this._installWebSocketExtension();
    }
  }

  private async _installWebSocketExtension() {
    try {
      if (process.env.NODE_ENV !== 'test') {
        logger.log('[RingCentralExtensions] > WebSocketExtension > install');
      }
      await this._core.installExtension(this._webSocketExtension);
    } catch (ex) {
      // It tries to establish connection on install.
      // Catch the connection issue and ignore.
      if (process.env.NODE_ENV !== 'test') {
        logger.error(
          '[RingCentralExtensions] > WebSocketExtension > install failed',
          ex,
        );
      }
    }
  }

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

    this._sleepDetector?.detect$
      .pipe(
        tap(() => {
          this.recoverWebSocketConnection();
        }),
      )
      .subscribe();

    // hook auth events
    this._auth.addAfterLoggedInHandler(() => {
      this.recoverWebSocketConnection();
    });
    this._auth.addBeforeLogoutHandler(() => {
      this.revokeWebSocketConnection();
    });
  }

  enableAutoRecover() {
    if (
      this._webSocketExtension &&
      // when auto recover of active tab is NOT configured as disabled
      this._ringCentralExtensionsOptions?.webSocketOptions?.autoRecover
        ?.enabled !== false
    ) {
      // enable auto recover
      this._webSocketExtension.options.autoRecover!.enabled = true;
    }
  }

  disableAutoRecover() {
    if (this._webSocketExtension) {
      // disable auto recover
      this._webSocketExtension.options.autoRecover!.enabled = false;
    }
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
  }

  private _clearTokens() {
    this._setTokens(null, 0, null);
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

  @delegate('server')
  async recoverWebSocketConnection() {
    if (!this.ready) {
      return;
    }
    if (!this._auth.loggedIn) {
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

  @delegate('server')
  async revokeWebSocketConnection() {
    if (!this.ready || !this.isWebSocketReady) {
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
      logger.log(
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
    return this._ringCentralExtensionsOptions?.debugMode ?? false;
  }

  get sdk(): SDK {
    return this._client.service;
  }

  get core(): CoreExtension {
    return this._core;
  }

  get webSocketExtension(): WebSocketExtension {
    return this._webSocketExtension;
  }
}
