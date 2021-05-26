import Subscription from '@rc-ex/ws/lib/subscription';
import {
  RcModuleV2,
  state,
  action,
  watch,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { debounce } from '../../lib/debounce-throttle';
import { SubscriptionFilter } from '../../enums/subscriptionFilters';
import { webSocketReadyStates } from '../RingCentralExtensions/webSocketReadyStates';
import { normalizeEventFilter } from './normalizeEventFilter';
import { Deps } from './WebSocketSubscription.interface';

const DEFAULT_REFRESH_DELAY = 2 * 1000;

@Module({
  deps: [
    'RingCentralExtensions',
    { dep: 'WebSocketSubscriptionOptions', optional: true },
  ],
})
export class WebSocketSubscription extends RcModuleV2<Deps> {
  private _wsSubscription: Subscription;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  private _isWebSocketOpened() {
    const readyState = this._deps.ringCentralExtensions.webSocketReadyState;
    return (
      readyState === webSocketReadyStates.open ||
      readyState === webSocketReadyStates.closing
    );
  }

  onInitOnce() {
    watch(
      this,
      () => this._isWebSocketOpened(),
      (isOpened) => {
        if (!this.ready) {
          return;
        }
        if (isOpened) {
          this._debouncedUpdateSubscription();
        } else {
          this._debouncedUpdateSubscription.cancel();
        }
      },
    );
  }

  async onInit() {
    if (this._isWebSocketOpened()) {
      await this._debouncedUpdateSubscription();
    }
  }

  async onReset() {
    await this._debouncedUpdateSubscription.cancel();
    this._wsSubscription = null;
  }

  private async _createSubscription() {
    if (!this._deps.ringCentralExtensions.webSocketExtension.ws) {
      return;
    }
    this._wsSubscription = await this._deps.ringCentralExtensions.webSocketExtension.subscribe(
      this.filters,
      (message) => {
        this._notifyMessage(message);
      },
    );
  }

  private async _refreshSubscription() {
    if (this._wsSubscription) {
      this._wsSubscription.eventFilters = this.filters;
      await this._wsSubscription.refresh();
    }
  }

  private async _revokeSubscription() {
    if (this._wsSubscription) {
      await this._wsSubscription.revoke();
      this._wsSubscription = null;
    }
  }

  private async _updateSubscription() {
    if (this.filters.length === 0) {
      await this._revokeSubscription();
      return;
    }
    if (!this._isWebSocketOpened()) {
      return;
    }
    if (!this._wsSubscription) {
      await this._createSubscription();
    } else if (
      this.filters
        .map((x) => normalizeEventFilter(x))
        .sort()
        .join(',') !==
      this._wsSubscription.subscriptionInfo?.eventFilters
        .map((x) => normalizeEventFilter(x))
        .sort()
        .join(',')
    ) {
      await this._refreshSubscription();
    }
  }

  private get _refreshDelay() {
    const delay = this._deps.webSocketSubscriptionOptions?.refreshDelay;
    return Math.max(0, delay ?? DEFAULT_REFRESH_DELAY);
  }

  private _debouncedUpdateSubscription = debounce({
    fn: this._updateSubscription,
    threshold: this._refreshDelay,
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
  message: any = null;
}
