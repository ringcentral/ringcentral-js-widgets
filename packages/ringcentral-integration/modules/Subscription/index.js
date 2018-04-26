import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import loginStatus from '../Auth/loginStatus';
import moduleStatuses from '../../enums/moduleStatuses';
import getSubscriptionReducer, {
  getCachedSubscriptionReducer,
} from './getSubscriptionReducer';
import actionTypes from './actionTypes';
import proxify from '../../lib/proxy/proxify';

const DEFAULT_TIME_TO_RETRY = 60 * 1000;

/**
 * @class
 * @description Subscription module to subscibe notification
 */
@Module({
  deps: [
    'Auth', 'Client', 'Storage', { dep: 'SubscriptionOptions', optional: true }
  ]
})
export default class Subscription extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Number} params.timeToRetry - time to retry, default 60 seconds
   */
  constructor({
    auth,
    client,
    storage,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = auth;
    this._client = client;
    this._storage = storage;
    this._timeToRetry = timeToRetry;
    this._cacheStorageKey = 'cachedSubscription';
    this._reducer = getSubscriptionReducer(this.actionTypes);
    this._storage.registerReducer({
      key: this._cacheStorageKey,
      reducer: getCachedSubscriptionReducer(this.actionTypes),
    });

    this._resetPromise = null;
    this._removePromise = null;
    this._retryTimeoutId = null;
    this._registerTimeoutId = null;
  }
  initialize() {
    this.store.subscribe(async () => {
      if (
        this._auth.loginStatus === loginStatus.loggedIn &&
        this._storage.ready &&
        this.status === moduleStatuses.pending
      ) {
        this._startSleepDetection();
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
        });
      } else if (
        (
          this._auth.loginStatus === loginStatus.notLoggedIn ||
          !this._storage.ready
        ) &&
        this.ready
      ) {
        this.reset();
      }
    });
    this._auth.addBeforeLogoutHandler(async () => {
      if (this.ready) {
        await this.reset();
      }
    });
  }


  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get filters() {
    return this.state.filters;
  }

  get message() {
    return this.state.message;
  }

  get subscriptionStatus() {
    return this.state.subscriptionStatus;
  }

  get cachedSubscription() {
    return this._storage.getItem(this._cacheStorageKey);
  }
  _startSleepDetection() {
    this._stopSleepDetection();
    this._detectSleep();
  }
  _stopSleepDetection() {
    if (this._sleepTimeout) {
      clearTimeout(this._sleepTimeout);
      this._sleepTimeout = null;
    }
  }
  _detectSleep() {
    const t = Date.now();
    this._sleepTimeout = setTimeout(async () => {
      if (this.ready && this._subscription && Date.now() - t > 20 * 1000) {
        await this.remove();
        await this._subscribe();
      }
      this._detectSleep();
    }, 10 * 1000);
  }
  _createSubscription() {
    this._subscription = this._client.service.createSubscription();
    if (this.cachedSubscription) {
      try {
        this._subscription.setSubscription(this.cachedSubscription);
      } catch (error) {
        /* falls through */
      }
    }
    this._subscription.on(this._subscription.events.notification, (message) => {
      this.store.dispatch({
        type: this.actionTypes.notification,
        message,
      });
    });
    this._subscription.on(this._subscription.events.removeSuccess, () => {
      this.store.dispatch({
        type: this.actionTypes.removeSuccess,
      });
    });
    this._subscription.on(this._subscription.events.removeError, (error) => {
      this.store.dispatch({
        type: this.actionTypes.removeError,
        error,
      });
    });
    this._subscription.on(this._subscription.events.renewSuccess, () => {
      this.store.dispatch({
        type: this.actionTypes.renewSuccess,
        subscription: this._subscription.subscription(),
      });
    });
    this._subscription.on(this._subscription.events.renewError, (error) => {
      if (this._subscription) {
        this._subscription.reset();
        this._subscription = null;
      }
      this.store.dispatch({
        type: this.actionTypes.renewError,
        error,
      });
      if (
        this._auth.loginStatus === loginStatus.loggedIn &&
        this._storage.ready
      ) {
        // immediately start the retry process after the first renewError
        this._retry(0);
      }
    });
    this._subscription.on(this._subscription.events.subscribeSuccess, () => {
      this.store.dispatch({
        type: this.actionTypes.subscribeSuccess,
        subscription: this._subscription.subscription(),
      });
    });
    this._subscription.on(this._subscription.events.subscribeError, (error) => {
      this.store.dispatch({
        type: this.actionTypes.subscribeError,
        error,
      });
      if (
        this._auth.loginStatus === loginStatus.loggedIn &&
        this._storage.ready
      ) {
        this._retry();
      }
    });
  }

  _register() {
    if (this._registerTimeoutId) {
      clearTimeout(this._registerTimeoutId);
    }
    this._registerTimeoutId = setTimeout(() => {
      this._registerTimeoutId = null;
      this.store.dispatch({
        type: this.actionTypes.subscribe,
      });
      if (this._subscription) {
        this._subscription.setEventFilters(this.filters);
        this._subscription.register();
      }
    }, 2000);
  }

  _subscribe() {
    if (!this._subscription) {
      this._createSubscription();
    }
    this._subscription.setEventFilters(this.filters);
    this._register();
  }

  @proxify
  async subscribe(events = []) {
    if (this.ready) {
      const oldFilters = this.filters;
      this.store.dispatch({
        type: this.actionTypes.addFilters,
        filters: [].concat(events),
      });
      if (oldFilters.length !== this.filters.length) {
        await this._subscribe();
      }
    }
  }

  @proxify
  async unsubscribe(events = []) {
    if (this.ready) {
      const oldFilters = this.filters;
      this.store.dispatch({
        type: this.actionTypes.removeFilters,
        fiters: [].concat(events),
      });
      if (this.filters.length === 0) {
        this.remove();
      } else if (oldFilters.length !== this.filters.length) {
        this._subscribe();
      }
    }
  }

  async _stopRetry() {
    if (this._retryTimeoutId) {
      clearTimeout(this._retryTimeoutId);
      this._retryTimeoutId = null;
    }
  }

  async _retry(t = this._timeToRetry) {
    this._stopRetry();
    this._retryTimeoutId = setTimeout(() => {
      if (this.ready) {
        this._subscribe();
      }
    }, t);
  }

  async _remove() {
    if (this._subscription) {
      try {
        this.store.dispatch({
          type: this.actionTypes.remove,
        });
        await this._subscription.remove();
      } catch (error) {
        /* falls through */
      }
      if (this._subscription) { // check again in case subscription object was removed while waiting
        this._subscription.reset();
        this._subscription = null;
      }
      this._removePromise = null;
    }
  }

  @proxify
  async remove() {
    if (!this._removePromise) {
      this._removePromise = this._remove();
    }
    return this._removePromise;
  }

  async _reset() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
    this._stopSleepDetection();
    this._stopRetry();
    if (this._subscription) {
      if (this._auth.loggedIn) {
        try {
          await this.remove();
        } catch (error) {
          /* falls through */
        }
      } else {
        this._subscription.reset();
        this._subscription = null;
      }
    }
    this._resetPromise = null;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async reset() {
    if (!this._resetPromise) {
      this._resetPromise = this._reset();
    }
    return this._resetPromise;
  }

  get pubnub() {
    return this._subscription && this._subscription._pubnub;
  }
}
