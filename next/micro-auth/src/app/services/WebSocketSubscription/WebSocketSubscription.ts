import type SubscriptionInfo from '@rc-ex/core/lib/definitions/SubscriptionInfo';
import type Subscription from '@rc-ex/ws/lib/subscription';
import type { SubscriptionFilter } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { promisedDebounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { type BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  dynamic,
  fromWatch,
  getRef,
  injectable,
  logger,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { filter, map, share } from 'rxjs';

import { Client } from '../Client';
import { RingCentralExtensions } from '../RingCentralExtensions';
import { webSocketReadyStates } from '../RingCentralExtensions/webSocketReadyStates';

import type {
  SubscriberInfo,
  SubscriptionMetadata,
  WebSocketSubscriptionOptions,
} from './WebSocketSubscription.interface';
import {
  isTheSameEventFilters,
  isTheSameWebSocket,
} from './normalizeEventFilter';

const DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
const DEFAULT_RECOVERY_BUFFER_SIZE = 100;

/**
 * Service for managing WebSocket subscriptions
 * Handles subscription registration, messaging and cleanup
 *
 * @class
 */
@injectable({
  name: 'WebSocketSubscription',
})
export class WebSocketSubscription extends RcModule {
  private _wsSubscription?: Subscription;
  private _subscriberMap = new Map<RcModule, SubscriberInfo>();
  private _subscribersAreReady = false;

  constructor(
    protected _client: Client,
    protected _storage: StoragePlugin,
    protected _ringCentralExtensions: RingCentralExtensions,
    @optional('WebSocketSubscriptionOptions')
    protected _webSocketSubscriptionOptions?: WebSocketSubscriptionOptions,
  ) {
    super();
    this._storage.enable(this);
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

  private async _bindEvents() {
    watch(
      this,
      () => this._ringCentralExtensions.webSocketReadyState,
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
  }

  @dynamic('BrowserLogger')
  protected _browserLogger?: BrowserLogger;

  @storage
  @state
  subscriptionInfo?: SubscriptionInfo | null = null;

  @storage
  @state
  subscriptionChannel?: string | null = null;

  @state
  subscriptionReady = false;

  @action
  private _setSubscriptionReady(ready: boolean) {
    this.subscriptionReady = ready;
  }

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
      this._ringCentralExtensions.webSocketExtension.ws.url,
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
        this._ringCentralExtensions.webSocketExtension.ws.url,
      );
    if (process.env.NODE_ENV !== 'test') {
      logger.log(
        `[${this.identifier}] > _obtainSubscription > isNewChannel: ${isNewChannel}`,
      );
    }

    // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
    // Revoke existing subscription before creating new.
    if (isNewChannel) {
      await this._revokeSubscription();
      if (process.env.NODE_ENV !== 'test') {
        logger.log(
          `[${this.identifier}] > _obtainSubscription > existing subscription revoked`,
        );
      }
    }

    // Create or recover subscription
    const subscription =
      await this._ringCentralExtensions.webSocketExtension.subscribe(
        eventFilters,
        (message) => {
          // only log message in production to avoid log flooding
          if (process.env.NODE_ENV === 'production') {
            this._browserLogger?.log('WebSocketSubscription', message);
          }
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
        logger.log(
          `[${this.identifier}] > _obtainSubscription > subscription created`,
        );
      }
    } else {
      if (process.env.NODE_ENV !== 'test') {
        logger.log(
          `[${this.identifier}] > _obtainSubscription > subscription recovered`,
        );
      }
    }

    this._wsSubscription = subscription;
    this._saveTokens();
    this._setSubscriptionReady(true);
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
      // Try to revoke over RESTful API
      // When page reload we do have cached subscriptionInfo but not _wsSubscription object
      else if (this.subscriptionInfo) {
        await this._client.service.platform().delete(this.subscriptionInfo.uri);
      }
    } catch (ex) {
      // ignore error of revoke request
      if (process.env.NODE_ENV !== 'test') {
        logger.warn(`[${this.identifier}] > _revokeSubscription > ${ex}`);
      }
    }
    this._wsSubscription = undefined;
    this._clearTokens(); // once subscription is revoked, all tokens are expired
    this._setSubscriptionReady(false);
  }

  // Remove client side subscription object only
  private async _removeSubscription() {
    if (this._wsSubscription) {
      try {
        this._wsSubscription.remove();
      } catch (ex) {
        // ignore error of remove request
        if (process.env.NODE_ENV !== 'test') {
          logger.warn(`[${this.identifier}] > _removeSubscription > ${ex}`);
        }
      }
      this._wsSubscription = undefined;
    }
    this._setSubscriptionReady(false);
  }

  @delegate('server')
  private async _updateSubscription() {
    // only when websocket is ready for create/refresh/revoke subscription
    if (!this._ringCentralExtensions.isWebSocketReady) {
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

  /**
   * Registers a module to receive WebSocket subscription events
   * @param {RcModule} module - The module to register
   * @param {SubscriptionMetadata} metadata - Metadata containing filters and handlers
   */
  register(module: RcModule, metadata: SubscriptionMetadata) {
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

  unregister(module: RcModule) {
    const subscriber = this._subscriberMap.get(module);
    if (subscriber?.unwatch) {
      subscriber.unwatch();
      subscriber.unwatch = undefined;
      this._subscriberMap.delete(module);
    }
  }

  private getFilters() {
    // Registered filters
    const filters = Array.from(this._subscriberMap.values()).reduce<
      SubscriptionFilter[]
    >((acc, { metadata }) => acc.concat(metadata.filters), []);

    // Merge with subscribed filters
    const filterSet = new Set([...filters, ...this.filters]);

    return [...filterSet];
  }

  _updateSubscriberReady(module: RcModule) {
    // Send buffered messages to the current ready subscriber
    if (module.ready) {
      this.messageBuffer.forEach((message) => {
        this._dispatchModuleMessage(module, message);
      });
      if (process.env.NODE_ENV !== 'test') {
        logger.log(
          `[${this.identifier}] > ${getRef(module).identifier} ready with ${
            this.messageBuffer.length
          } buffered messages`,
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

  _dispatchModuleMessage(module: RcModule, message: unknown) {
    const subscriber = this._subscriberMap.get(module);
    if (!subscriber?.metadata.handler) return;
    try {
      subscriber.metadata.handler.apply(module, [message]);
    } catch (ex) {
      logger.error(`[${this.identifier}] > _dispatchMessage error`, ex);
    }
  }

  @action
  _pushMessageBuffer(message: unknown) {
    const bufferSize =
      this._ringCentralExtensions.webSocketExtension?.connectionDetails
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
  @delegate('server')
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

  @delegate('server')
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

  /**
   * Notifies subscribers about a received message
   * @param {any} message - The message received from WebSocket
   * @returns {void}
   */
  @action
  private _notifyMessage(message: any) {
    this.message = message ?? null;
  }

  @state
  filters: SubscriptionFilter[] = [];

  @state
  message?: unknown = null;

  message$ = fromWatch(this, () => this.message).pipe(share());

  /**
   * filter message by event type
   *
   * @param eventType event type end of the event name, or a regex to match the event name
   */
  fromMessage$<T>(eventType: string | RegExp) {
    const matchRegex =
      eventType instanceof RegExp ? eventType : new RegExp(`${eventType}$`);

    return this.message$.pipe(
      filter((message: any) => matchRegex.test(message['event'])),
      map((message: any) => message['body'] as T),
      filter(Boolean),
      share(),
    );
  }
}
