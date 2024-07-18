import type SubscriptionInfo from '@rc-ex/core/lib/definitions/SubscriptionInfo';
import type Subscription from '@rc-ex/ws/lib/subscription';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import type { SubscriptionFilter } from '../../enums/subscriptionFilters';
import background from '../../lib/background';
import { promisedDebounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { webSocketReadyStates } from '../RingCentralExtensions/webSocketReadyStates';
import type { TabEvent } from '../TabManager';

import type { Deps } from './WebSocketSubscription.interface';
import {
  isTheSameWebSocket,
  normalizeEventFilter,
} from './normalizeEventFilter';

const DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
export const SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';

@Module({
  name: 'WebSocketSubscription',
  deps: [
    'Client',
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
    await this._debouncedUpdateSubscriptionCatchCancel();
  }

  override async onReset() {
    this._debouncedUpdateSubscription.cancel();
    await this._removeSubscription();
  }

  private async _debouncedUpdateSubscriptionCatchCancel() {
    try {
      await this._debouncedUpdateSubscription();
    } catch (error: any /** TODO: confirm with instanceof */) {
      if (error.message !== 'cancelled') {
        throw error;
      }
    }
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
        if (!this.ready || !wsState) {
          return;
        }
        if (wsState === webSocketReadyStates.ready) {
          await this._updateSubscription();
        } else if (wsState === webSocketReadyStates.closing) {
          // when websocket is going to close, revoke subscription beforehand
          await this._revokeSubscription();
        } else {
          this._debouncedUpdateSubscription.cancel();
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
    if (event.name === SyncMessageTabEventName) {
      this._notifyMessage(event.args![0]);
    }
  }

  private async _syncMessageToOtherTabs(message: unknown) {
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
    this.subscriptionInfo = subscriptionInfo ?? null;
    this.subscriptionChannel = subscriptionChannel ?? null;
  }

  private _saveTokens() {
    this._setTokens(
      this._wsSubscription?.subscriptionInfo,
      this._deps.ringCentralExtensions.webSocketExtension.ws.url,
    );
  }

  private _clearTokens() {
    this._setTokens(null, null);
  }

  private async _obtainSubscription() {
    const isNewChannel =
      !this.subscriptionChannel ||
      !isTheSameWebSocket(
        this.subscriptionChannel,
        this._deps.ringCentralExtensions.webSocketExtension.ws.url,
      );
    if (process.env.NODE_ENV !== 'test') {
      console.log(
        `[WebSocketSubscription] > _obtainSubscription > isNewChannel: ${isNewChannel}`,
      );
    }

    // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
    // Revoke existing subscription before creating new.
    if (isNewChannel) {
      await this._revokeSubscription();
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          '[WebSocketSubscription] > _obtainSubscription > existing subscription revoked',
        );
      }
    }

    // Create or recover subscription
    const subscription =
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

    const isNewSubscription =
      !this.subscriptionInfo ||
      this.subscriptionInfo.id !== subscription.subscriptionInfo?.id;
    if (isNewSubscription) {
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          '[WebSocketSubscription] > _obtainSubscription > subscription created',
        );
      }
    } else {
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          '[WebSocketSubscription] > _obtainSubscription > subscription recovered',
        );
      }
    }

    this._wsSubscription = subscription;
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
    try {
      // Prior using ws channel for revoking, it is faster
      if (this._wsSubscription) {
        await this._wsSubscription.revoke();
      }
      // Else try to revoke over RESTful API
      // When page reload we do have cached subscriptionInfo but not _wsSubscription object
      else if (this.subscriptionInfo) {
        await this._deps.client.service
          .platform()
          .delete(this.subscriptionInfo.uri);
      }
    } catch (ex) {
      // ignore error of revoke request
      if (process.env.NODE_ENV !== 'test') {
        console.warn(`[WebSocketSubscription] > _revokeSubscription > ${ex}`);
      }
    }
    this._wsSubscription = undefined;
    this._clearTokens(); // once subscription is revoked, all tokens are expired
  }

  // Remove client side subscription object only
  private async _removeSubscription() {
    if (this._wsSubscription) {
      try {
        this._wsSubscription.remove();
      } catch (ex) {
        // ignore error of remove request
        if (process.env.NODE_ENV !== 'test') {
          console.warn(`[WebSocketSubscription] > _removeSubscription > ${ex}`);
        }
      }
      this._wsSubscription = undefined;
    }
  }

  @proxify
  private async _updateSubscription() {
    // only when websocket is ready for create/refresh/revoke subscription
    if (!this._deps.ringCentralExtensions.isWebSocketReady) {
      return;
    }
    if (this.filters.length === 0) {
      await this._revokeSubscription();
      return;
    }
    if (!this._wsSubscription) {
      await this._obtainSubscription();
    } else if (
      this.filters
        .map((x) => normalizeEventFilter(x))
        .sort()
        .join(',') !==
      (this._wsSubscription.subscriptionInfo?.eventFilters ?? [])
        .map((x: string) => normalizeEventFilter(x))
        .sort()
        .join(',')
    ) {
      await this._refreshSubscription();
    }
  }

  private _debouncedUpdateSubscription = promisedDebounce({
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
      await this._debouncedUpdateSubscriptionCatchCancel();
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
      await this._debouncedUpdateSubscriptionCatchCancel();
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
  private _notifyMessage(message: unknown) {
    this.message = message ?? null;
  }

  @state
  filters: SubscriptionFilter[] = [];

  @state
  message?: unknown = null;
}
