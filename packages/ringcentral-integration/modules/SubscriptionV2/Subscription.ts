import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ApiError } from '@ringcentral/sdk';
import Subscriptions from '@ringcentral/subscriptions';
import { SubscriptionData } from '@ringcentral/subscriptions/src/subscription/Subscription';
import { concat, equals, map, uniq } from 'ramda';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import {
  debounce,
  promisedDebounce,
  PromisedDebounceFunction,
  DebouncedFunction,
} from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { normalizeEventFilter } from '../Subscription/normalizeEventFilter';
import { subscriptionStatus } from '../Subscription/subscriptionStatus';
import { Deps, MessageBase } from './Subscription.interface';

const DEFAULT_TIME_TO_RETRY = 60 * 1000;
const DEFAULT_REGISTER_DELAY = 2 * 1000;

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
  protected _subscription: ReturnType<
    Subscriptions['createSubscription']
  > = null;

  protected _retryTimeoutId: NodeJS.Timeout = null;

  protected _debouncedRegister: PromisedDebounceFunction<
    Subscription['_register']
  >;

  protected _retry: DebouncedFunction<Subscription['_createSubscription']>;

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
      fn: this._createSubscription,
      threshold: this._timeToRetry,
      maxThreshold: this._timeToRetry,
    });
  }

  @state
  message: MessageBase = null;

  @state
  filters: ObjectMapValue<typeof subscriptionFilters>[] = [];

  protected _addFilters(filters: Subscription['filters']) {
    this._setStates({ filters: uniq(concat(filters, this.filters)) });
  }

  @storage
  @state
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

  _shouldInit() {
    return super._shouldInit() && this._deps.auth.loggedIn;
  }

  _shouldReset() {
    return super._shouldReset() || (this.ready && !this._deps.auth.loggedIn);
  }

  _handleSleep = async () => {
    if (this.ready && this._subscription) {
      // forcibly recreate subscription to ensure pubnub is alive
      await this._removeSubscription();
      this._createSubscription();
    }
  };

  protected _onBeforeLogout = async () => {
    if (this._subscription) {
      await this._removeSubscription();
    }
  };

  onInit() {
    this._deps.sleepDetector.on(
      this._deps.sleepDetector.events.detected,
      this._handleSleep,
    );
    this._deps.auth.addBeforeLogoutHandler(this._onBeforeLogout);
  }

  async onReset() {
    this._setStates({
      filters: [],
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
      this._subscription = null;
    }
  }

  protected _onRemoveSuccess() {
    this._setStates({
      status: subscriptionStatus.notSubscribed,
      cachedSubscription: null,
    });
  }

  protected _onRemoveError(error: ApiError | Error) {
    this._setStates({
      status: subscriptionStatus.notSubscribed,
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
      this._subscription = null;
    }
    this._setStates({
      status: subscriptionStatus.notSubscribed,
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
      cachedSubscription: null,
    });
    if (this.ready) {
      this._retry();
    }
  }

  protected _onNotification(message: MessageBase) {
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
        } catch (error) {
          this._subscription = new Subscriptions({ sdk }).createSubscription();
        }
      }
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
    } catch (error) {
      if (error.message !== 'cancelled') {
        throw error;
      }
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
      } catch (error) {
        /* removeError is handled elsewhere */
      }
      if (this._subscription) {
        this._subscription.reset();
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
      this._addFilters([].concat(events));
      if (oldFiltersCount !== this.filters.length) {
        await this._createSubscription();
      }
    }
  }
}
