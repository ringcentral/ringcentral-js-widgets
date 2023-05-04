import type SubscriptionInfo from '@rc-ex/core/lib/definitions/SubscriptionInfo';
import Subscription from '@rc-ex/ws/lib/subscription';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import { SubscriptionFilter } from '../../enums/subscriptionFilters';
import background from '../../lib/background';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { webSocketReadyStates } from '../RingCentralExtensions/webSocketReadyStates';
import { normalizeEventFilter } from './normalizeEventFilter';
import { TabEvent } from '../TabManager';
import { Deps } from './WebSocketSubscription.interface';

const DEFAULT_REFRESH_DELAY = 1000;
export const SyncTokensTabEventName = 'WebSocketSubscription-syncTokens';
export const SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';

@Module({
  name: 'WebSocketSubscription',
  deps: [
    'Storage',
    'RingCentralExtensions',
    { dep: 'TabManager', optional: true },
    { dep: 'WebSocketSubscriptionOptions', optional: true },
  ],
})
export class WebSocketSubscription extends RcModuleV2<Deps> {
  private _wsSubscription?: Subscription;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'WebSocketSubscription',
    });
  }

  override async onInitOnce() {
    await this._bindEvents();
  }

  override async onInitSuccess() {
    await this._debouncedUpdateSubscription();
  }

  override async onReset() {
    await this._debouncedUpdateSubscription.cancel();
    await this._removeSubscription();
  }

  get onlyOneTabConnected(): boolean {
    return this._deps.ringCentralExtensions.disconnectOnInactive;
  }

  @background
  private async _bindEvents() {
    watch(
      this,
      () => this._deps.ringCentralExtensions.webSocketReadyState,
      async (wsState) => {
        if (!this.ready) {
          return;
        }
        if (wsState === webSocketReadyStates.open) {
          await this._debouncedUpdateSubscription();
        } else if (wsState === webSocketReadyStates.closing) {
          // when websocket is going to close, revoke subscription beforehand
          await this._revokeSubscription();
        } else {
          await this._debouncedUpdateSubscription.cancel();
          await this._removeSubscription();
        }
      },
    );
    if (this.onlyOneTabConnected) {
      watch(
        this,
        () => this._deps.tabManager!.event,
        (event) => {
          this._tabEventHandler(event);
        },
      );
    }
  }

  private _tabEventHandler(event: TabEvent) {
    if (!this.ready || !event) {
      return;
    }
    if (event.name === SyncTokensTabEventName) {
      this._setTokens(event.args![0], event.args![1]);
    } else if (event.name === SyncMessageTabEventName) {
      this._notifyMessage(event.args![0]);
    }
  }

  private async _syncTokensToOtherTabs() {
    // sync required tokens to other tabs, so that other tabs can recover connection with latest tokens as needed
    // although tokens that are in storage are already synced, still we pass tokens manually for sync in time
    await this._deps.tabManager?.send(
      SyncTokensTabEventName,
      this.subscriptionInfo,
      this.subscriptionChannel,
    );
  }

  private async _syncMessageToOtherTabs(message: any) {
    // sync notification message to other tabs, so that other tabs got the latest message state
    await this._deps.tabManager?.send(SyncMessageTabEventName, message);
  }

  @storage
  @state
  subscriptionInfo?: SubscriptionInfo | null = null;

  @storage
  @state
  subscriptionChannel?: string | null = null;

  @action
  private _setTokens(
    subscriptionInfo?: SubscriptionInfo | null,
    subscriptionChannel?: string | null,
  ) {
    this.subscriptionInfo = subscriptionInfo;
    this.subscriptionChannel = subscriptionChannel;
  }

  private _saveTokens() {
    this._setTokens(
      this._wsSubscription?.subscriptionInfo,
      this._deps.ringCentralExtensions.webSocketExtension.ws.url,
    );
    if (this.onlyOneTabConnected) {
      this._syncTokensToOtherTabs();
    }
  }

  private _clearTokens() {
    this._setTokens(null, null);
    if (this.onlyOneTabConnected) {
      this._syncTokensToOtherTabs();
    }
  }

  private async _createSubscription() {
    const isNewChannel =
      this.subscriptionChannel !==
      this._deps.ringCentralExtensions.webSocketExtension.ws.url;
    console.log(
      `[WebSocketSubscription] > _createSubscription > isNewChannel: ${isNewChannel}`,
    );
    this._wsSubscription =
      await this._deps.ringCentralExtensions.webSocketExtension.subscribe(
        this.filters,
        (message) => {
          this._notifyMessage(message);
          if (this.onlyOneTabConnected) {
            this._syncMessageToOtherTabs(message);
          }
        },
        isNewChannel ? null : this.subscriptionInfo,
      );
    this._saveTokens();
  }

  private async _refreshSubscription() {
    if (this._wsSubscription) {
      this._wsSubscription.eventFilters = this.filters;
      await this._wsSubscription.refresh();
      this._saveTokens();
    }
  }

  private async _revokeSubscription() {
    if (this._wsSubscription) {
      try {
        await this._wsSubscription.revoke();
        this._wsSubscription = undefined;
        this._clearTokens(); // once subscription is revoked, all tokens are expired
      } catch (ex) {
        // ignore error of revoke request
        console.warn(`[WebSocketSubscription] > _revokeSubscription > ${ex}`);
      }
    }
  }

  private async _removeSubscription() {
    if (this._wsSubscription) {
      if (typeof this._wsSubscription.remove === 'function') {
        this._wsSubscription.remove();
      }
      this._wsSubscription = undefined;
    }
  }

  @proxify
  private async _updateSubscription() {
    // only when websocket is open for create/refresh/revoke subscription
    if (!this._deps.ringCentralExtensions.isWebSocketOpen) {
      return;
    }
    if (this.filters.length === 0) {
      await this._revokeSubscription();
      return;
    }
    if (!this._wsSubscription) {
      await this._createSubscription();
    } else if (
      this.filters
        .map((x) => normalizeEventFilter(x))
        .sort()
        .join(',') !==
      (this._wsSubscription.subscriptionInfo?.eventFilters ?? [])
        .map((x) => normalizeEventFilter(x))
        .sort()
        .join(',')
    ) {
      await this._refreshSubscription();
    }
  }

  private _debouncedUpdateSubscription = debounce({
    fn: this._updateSubscription,
    threshold: DEFAULT_REFRESH_DELAY,
  });

  @proxify
  async subscribe(eventsFilters: SubscriptionFilter[] = []) {
    if (!this.ready) {
      return;
    }
    const oldLength = this.filters.length;
    this._addFilters(eventsFilters);
    if (oldLength !== this.filters.length) {
      await this._debouncedUpdateSubscription();
    }
  }

  @proxify
  async unsubscribe(eventsFilters: SubscriptionFilter[] = []) {
    if (!this.ready) {
      return;
    }
    const oldLength = this.filters.length;
    this._removeFilters(eventsFilters);
    if (oldLength !== this.filters.length) {
      await this._debouncedUpdateSubscription();
    }
  }

  @action
  private _addFilters(eventsFilters: SubscriptionFilter[]) {
    this.filters = this.filters
      .concat(eventsFilters)
      .filter((x, index, array) => array.indexOf(x) === index); // remove duplicates
  }

  @action
  private _removeFilters(eventsFilters: SubscriptionFilter[]) {
    this.filters = this.filters.filter((x) => !eventsFilters.includes(x));
  }

  @action
  private _notifyMessage(message: any) {
    this.message = message;
  }

  @state
  filters: SubscriptionFilter[] = [];

  @state
  message?: any = null;
}
