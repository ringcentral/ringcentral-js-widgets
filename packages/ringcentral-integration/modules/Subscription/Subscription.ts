import { concat, equals, map, uniq } from 'ramda';

import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import type { ApiError } from '@ringcentral/sdk';
import Subscriptions from '@ringcentral/subscriptions';
import type { SubscriptionData } from '@ringcentral/subscriptions/src/subscription/Subscription';

import type { subscriptionFilters } from '../../enums/subscriptionFilters';
import type {
  DebouncedFunction,
  PromisedDebounceFunction,
} from '../../lib/debounce-throttle';
import { debounce, promisedDebounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { normalizeEventFilter } from './normalizeEventFilter';
import type { Deps, MessageBase } from './Subscription.interface';
import { subscriptionStatus } from './subscriptionStatus';

const DEFAULT_TIME_TO_RETRY = 20 * 1000;
const DEFAULT_REGISTER_DELAY = 2 * 1000;
const SUBSCRIPTION_LOCK_KEY = 'subscription-creating-lock';

@Module({
  name: 'Subscription',
  deps: [
    'Auth',
    'Client',
    'Storage',
    'SleepDetector',
    { dep: 'SubscriptionOptions', optional: true },
  ],
})
export class Subscription extends RcModuleV2<Deps> {
  // @ts-expect-error
  protected _subscription: ReturnType<Subscriptions['createSubscription']> =
    null;

  // @ts-expect-error
  protected _retryTimeoutId: NodeJS.Timeout = null;

  protected _debouncedRegister: PromisedDebounceFunction<
    Subscription['_register']
  >;

  protected _retry: DebouncedFunction<
    Subscription['_createSubscriptionWithLock']
  >;

  __debugNotification__ = false;

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'subscription',
      enableCache: true,
    });
    this._debouncedRegister = promisedDebounce({
      fn: this._register,
      threshold: this._registerDelay,
    });

    this._retry = debounce({
      fn: this._createSubscriptionWithLock,
      threshold: this._timeToRetry,
      maxThreshold: this._timeToRetry,
    });
  }

  @state
  // @ts-expect-error
  message: MessageBase = null;

  @state
  filters: ObjectMapValue<typeof subscriptionFilters>[] = [];

  protected _addFilters(filters: Subscription['filters']) {
    this._setStates({ filters: uniq(concat(filters, this.filters)) });
  }

  @storage
  @state
  // @ts-expect-error
  cachedSubscription: SubscriptionData = null;

  @state
  subscriptionStatus: ObjectMapValue<typeof subscriptionStatus> =
    subscriptionStatus.notSubscribed;

  @action
  protected _setStates({
    message = this.message,
    filters = this.filters,
    status = this.subscriptionStatus,
    cachedSubscription = this.cachedSubscription,
  }) {
    this.message = message;
    this.filters = filters;
    this.subscriptionStatus = status;
    this.cachedSubscription = cachedSubscription;
  }

  get _timeToRetry() {
    return Math.max(
      0,
      this._deps.subscriptionOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY,
    );
  }

  get _registerDelay() {
    return Math.max(
      0,
      this._deps.subscriptionOptions?.registerDelay ?? DEFAULT_REGISTER_DELAY,
    );
  }

  override _shouldInit() {
    return super._shouldInit() && this._deps.auth.loggedIn;
  }

  override _shouldReset() {
    return super._shouldReset() || (this.ready && !this._deps.auth.loggedIn);
  }

  _handleSleep = async () => {
    if (this.ready && this._subscription) {
      // to wait automatic renew finish
      const renewPromise = this._subscription.automaticRenewing();
      if (renewPromise) {
        await renewPromise;
      }
      // this._subscription may be removed at renewError event
      // forcibly reconnect pubnub to ensure pubnub is alive
      await this._subscription?.resubscribeAtPubNub();
    }
  };

  protected _onBeforeLogout = async () => {
    if (this._subscription) {
      await this._removeSubscription();
    }
  };

  override onInit() {
    this._deps.sleepDetector.on(
      this._deps.sleepDetector.events.detected,
      this._handleSleep,
    );
    this._deps.auth.addBeforeLogoutHandler(this._onBeforeLogout);
  }

  override async onReset() {
    this._setStates({
      filters: [],
      // @ts-expect-error
      message: null,
      status: subscriptionStatus.notSubscribed,
    });
    this._deps.sleepDetector.off(
      this._deps.sleepDetector.events.detected,
      this._handleSleep,
    );
    this._retry.cancel();
    this._deps.auth.removeBeforeLogoutHandler(this._onBeforeLogout);
    this._debouncedRegister.cancel();
    if (this._subscription) {
      this._subscription.reset();
      this._subscription.removeAllListeners();
      // @ts-expect-error
      this._subscription = null;
    }
  }

  protected _onRemoveSuccess() {
    this._setStates({
      status: subscriptionStatus.notSubscribed,
      // @ts-expect-error
      cachedSubscription: null,
    });
  }

  protected _onRemoveError(error: ApiError | Error) {
    this._setStates({
      status: subscriptionStatus.notSubscribed,
      // @ts-expect-error
      cachedSubscription: null,
    });
  }

  protected _onRenewSuccess() {
    if (this._subscription) {
      this._setStates({
        status: subscriptionStatus.subscribed,
        cachedSubscription: this._subscription.subscription(),
      });
    }
  }

  protected _onRenewError(error: ApiError | Error) {
    if (this._subscription) {
      this._subscription.reset();
      this._subscription.removeAllListeners();
      // @ts-expect-error
      this._subscription = null;
    }
    this._setStates({
      status: subscriptionStatus.notSubscribed,
      // @ts-expect-error
      cachedSubscription: null,
    });
    if (this.ready) {
      // immediately start the retry process after the first renewError
      this._retry();
      this._retry.flush();
    }
  }

  protected _onSubscribeSuccess() {
    if (this._subscription) {
      this._setStates({
        status: subscriptionStatus.subscribed,
        cachedSubscription: this._subscription.subscription(),
      });
    }
  }

  protected _onSubscribeError(error: ApiError | Error) {
    this._setStates({
      status: subscriptionStatus.notSubscribed,
      // @ts-expect-error
      cachedSubscription: null,
    });
    if (this.ready) {
      this._retry();
    }
  }

  protected _onNotification(message: MessageBase) {
    // for our support collect pubnub message;
    if (this.__debugNotification__) {
      console.log('Received Notification:', JSON.stringify(message));
    }
    this._setStates({
      message,
    });
  }

  protected async _createSubscription() {
    if (this.ready && !this._subscription) {
      const sdk = this._deps.client.service;
      this._subscription = new Subscriptions({ sdk }).createSubscription();
      if (this.cachedSubscription) {
        try {
          this._subscription.setSubscription(this.cachedSubscription);
        } catch (error: any /** TODO: confirm with instanceof */) {
          this._subscription = new Subscriptions({ sdk }).createSubscription();
        }
      }
      // TODO: fix Subscription limit issue about multiple create Subscription issue when multi-tab login.
      this._subscription.on(
        this._subscription.events.notification,
        (message: MessageBase) => this._onNotification(message),
      );
      this._subscription.on(this._subscription.events.removeSuccess, () =>
        this._onRemoveSuccess(),
      );
      this._subscription.on(this._subscription.events.removeError, (error) =>
        this._onRemoveError(error),
      );
      this._subscription.on(this._subscription.events.renewSuccess, () =>
        this._onRenewSuccess(),
      );
      this._subscription.on(this._subscription.events.renewError, (error) =>
        this._onRenewError(error),
      );
      this._subscription.on(this._subscription.events.subscribeSuccess, () =>
        this._onSubscribeSuccess(),
      );
      this._subscription.on(this._subscription.events.subscribeError, (error) =>
        this._onSubscribeError(error),
      );
    }
    try {
      await this._debouncedRegister();
    } catch (error: any /** TODO: confirm with instanceof */) {
      if (error.message !== 'cancelled') {
        throw error;
      }
    }
  }

  protected async _createSubscriptionWithLock() {
    if (!navigator?.locks?.request) {
      await this._createSubscription();
    } else {
      await navigator.locks.request(SUBSCRIPTION_LOCK_KEY, () =>
        this._createSubscription(),
      );
    }
  }

  protected _shouldUpdateSubscription() {
    return !!(
      this._subscription &&
      !equals(
        map(normalizeEventFilter, this._subscription.eventFilters()).sort(),
        map(normalizeEventFilter, this.filters).sort(),
      )
    );
  }

  protected async _register() {
    if (this._shouldUpdateSubscription()) {
      this._setStates({
        status: subscriptionStatus.subscribing,
      });
      this._subscription.setEventFilters([...this.filters]);
      await this._subscription.register();
    }
  }

  protected async _removeSubscription() {
    if (this._subscription) {
      this._setStates({
        status: subscriptionStatus.unsubscribing,
      });
      try {
        await this._subscription.remove();
      } catch (error: any /** TODO: confirm with instanceof */) {
        /* removeError is handled elsewhere */
      }
      if (this._subscription) {
        this._subscription.reset();
        this._subscription.removeAllListeners();
        // @ts-expect-error
        this._subscription = null;
      }
      this._setStates({
        status: subscriptionStatus.notSubscribed,
      });
    }
  }

  @proxify
  async subscribe(events: Subscription['filters'] = []) {
    if (this.ready) {
      const oldFiltersCount = this._subscription?.eventFilters().length ?? 0;
      // use [].concat for potential compatibility issue
      // @ts-expect-error
      this._addFilters([].concat(events));
      if (oldFiltersCount !== this.filters.length) {
        await this._createSubscriptionWithLock();
      }
    }
  }
}
