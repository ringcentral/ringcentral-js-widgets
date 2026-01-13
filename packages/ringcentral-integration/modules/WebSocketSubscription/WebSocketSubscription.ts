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
import type RcModule from '../../lib/RcModule';
import background from '../../lib/background';
import { promisedDebounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { webSocketReadyStates } from '../RingCentralExtensions/webSocketReadyStates';
import type { TabEvent } from '../TabManager';

import type {
  Deps,
  SubscriberInfo,
  SubscriptionMetadata,
} from './WebSocketSubscription.interface';
import {
  isTheSameEventFilters,
  isTheSameWebSocket,
} from './normalizeEventFilter';

const DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
export const SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';
const DEFAULT_RECOVERY_BUFFER_SIZE = 100;

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
  private _subscriberMap = new Map<RcModuleV2 | RcModule, SubscriberInfo>();
  private _subscribersAreReady = false;

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
        this._debouncedUpdateSubscription.cancel();
        if (wsState === webSocketReadyStates.ready) {
          await this._updateSubscription();
        } else if (wsState === webSocketReadyStates.closing) {
          // when websocket is going to close, revoke subscription beforehand
          await this._revokeSubscription();
        } else {
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
      this._notifyMessage(event.args![0], false);
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

  private async _obtainSubscription(eventFilters: SubscriptionFilter[]) {
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
        eventFilters,
        (message) => {
          this._notifyMessage(message);
          this._dispatchMessage(message);
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

  private async _refreshSubscription(eventFilters: SubscriptionFilter[]) {
    if (this._wsSubscription) {
      this._wsSubscription.eventFilters = eventFilters;
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

    const eventFilters = this.getFilters();
    if (!eventFilters.length) {
      await this._revokeSubscription();
      return;
    }

    if (!this._wsSubscription) {
      await this._obtainSubscription(eventFilters);
      return;
    }

    if (
      !isTheSameEventFilters(
        eventFilters,
        this._wsSubscription.subscriptionInfo?.eventFilters ?? [],
      )
    ) {
      await this._refreshSubscription(eventFilters);
      return;
    }
  }

  private _debouncedUpdateSubscription = promisedDebounce({
    fn: this._updateSubscription,
    threshold: DEFAULT_REFRESH_DELAY,
  });

  private async _debouncedUpdateSubscriptionCatchCancel() {
    try {
      await this._debouncedUpdateSubscription();
    } catch (error: any /** TODO: confirm with instanceof */) {
      if (error.message !== 'cancelled') {
        throw error;
      }
    }
  }

  register(module: any, metadata: SubscriptionMetadata) {
    // Register subscriber
    const subscriber: SubscriberInfo = { metadata };
    this._subscriberMap.set(module, subscriber);
    // Monitor subscriber ready state
    this._updateSubscriberReady(module);
    subscriber.unwatch = watch(
      module,
      () => module.ready,
      () => {
        this._updateSubscriberReady(module);
      },
    );
  }

  unregister(module: any) {
    const subscriber = this._subscriberMap.get(module);
    if (subscriber?.unwatch) {
      subscriber.unwatch();
      subscriber.unwatch = undefined;
      this._subscriberMap.delete(module);
    }
  }

  getFilters() {
    // Registered filters
    const filters = Array.from(this._subscriberMap.values()).reduce<
      SubscriptionFilter[]
    >((acc, { metadata }) => acc.concat(metadata.filters), []);

    // Merge with subscribed filters
    const filterSet = new Set([...filters, ...this.filters]);

    return [...filterSet];
  }

  _updateSubscriberReady(module: RcModuleV2 | RcModule) {
    // Send buffered messages to the current ready subscriber
    if (module.ready) {
      this.messageBuffer.forEach((message) => {
        this._dispatchModuleMessage(module, message);
      });
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          `[WebSocketSubscription] > ${module.constructor.name} ready with ${this.messageBuffer.length} buffered messages`,
        );
      }
    }

    // Check if all subscribers are ready
    this._subscribersAreReady = Array.from(this._subscriberMap.keys()).every(
      (x) => x.ready,
    );

    // Clear message buffer when all subscribers are ready
    if (this._subscribersAreReady) {
      this._clearMessageBuffer();
    }
  }

  _dispatchMessage(message: unknown) {
    if (!this._subscribersAreReady) {
      this._pushMessageBuffer(message);
    }
    this._subscriberMap.forEach((_, module) => {
      if (!module.ready) return;
      this._dispatchModuleMessage(module, message);
    });
  }

  _dispatchModuleMessage(module: RcModuleV2 | RcModule, message: unknown) {
    const subscriber = this._subscriberMap.get(module);
    if (!subscriber?.metadata.handler) return;
    try {
      subscriber.metadata.handler.apply(module, [message]);
    } catch (ex) {
      console.error('[WebSocketSubscription] > _dispatchMessage error', ex);
    }
  }

  @action
  _pushMessageBuffer(message: unknown) {
    const bufferSize =
      this._deps.ringCentralExtensions.webSocketExtension?.connectionDetails
        ?.recoveryBufferSize ?? DEFAULT_RECOVERY_BUFFER_SIZE;

    if (this.messageBuffer.length > bufferSize) {
      this.messageBuffer.shift();
    }

    this.messageBuffer.push(message);
  }

  @action
  _clearMessageBuffer() {
    this.messageBuffer = [];
  }

  @state
  messageBuffer: unknown[] = [];

  /**
   * @deprecated
   * Use "register" instead
   */
  @proxify
  async subscribe(eventFilters: SubscriptionFilter[] = []) {
    if (!this.ready) {
      return;
    }
    const oldLength = this.filters.length;
    this._addFilters(eventFilters);
    if (oldLength !== this.filters.length) {
      await this._debouncedUpdateSubscriptionCatchCancel();
    }
  }

  @proxify
  async unsubscribe(eventFilters: SubscriptionFilter[] = []) {
    if (!this.ready) {
      return;
    }
    const oldLength = this.filters.length;
    this._removeFilters(eventFilters);
    if (oldLength !== this.filters.length) {
      await this._debouncedUpdateSubscriptionCatchCancel();
    }
  }

  @action
  private _addFilters(eventFilters: SubscriptionFilter[]) {
    this.filters = this.filters
      .concat(eventFilters)
      .filter((x, index, array) => array.indexOf(x) === index); // remove duplicates
  }

  @action
  private _removeFilters(eventFilters: SubscriptionFilter[]) {
    this.filters = this.filters.filter((x) => !eventFilters.includes(x));
  }

  @action
  private _notifyMessage(message: unknown, allowSync = true) {
    this.message = message ?? null;
    if (allowSync && this.onlyOneTabConnected) {
      this._syncMessageToOtherTabs(message);
    }
  }

  @state
  filters: SubscriptionFilter[] = [];

  @state
  message?: unknown = null;
}
