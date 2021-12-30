import { combineReducers } from 'redux';

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';
import moduleStatuses from '../../enums/moduleStatuses';
import { Library } from '../di';
import ensureExist from '../ensureExist';
import Pollable from '../Pollable';
import proxify from '../proxy/proxify';
import {
  createGetDataReducer,
  createGetTimestampReducer,
  getDataFetcherReducer,
} from './getDataFetcherReducer';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_RETRY = 62 * 1000;

const RETRY_INTERVALS = [2 * 1000, 5 * 1000, 10 * 1000, 30 * 1000];

@Library({
  deps: [
    'Auth',
    'Client',
    { dep: 'Subscription', optional: true },
    { dep: 'SleepDetector', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'DataFetcherOptions', optional: true },
  ],
})
export default class DataFetcher extends Pollable {
  constructor({
    auth,
    client,
    storage,
    subscription,
    sleepDetector,
    tabManager,
    timeToRetry = DEFAULT_RETRY,
    ttl = DEFAULT_TTL,
    pollingInterval = ttl,
    polling = false,
    disableCache = false,
    cleanOnReset = false,
    getReducer = getDataFetcherReducer,
    getDataReducer = createGetDataReducer(cleanOnReset),
    getTimestampReducer = createGetTimestampReducer(cleanOnReset),
    fetchFunction,
    forbiddenHandler,
    subscriptionFilters,
    subscriptionHandler,
    readyCheckFn,
    ...options
  }) {
    if (typeof fetchFunction !== 'function') {
      throw new Error('fetchFunction must be a asynchronous function');
    }
    super({
      ...options,
    });
    this._auth = ensureExist.call(this, auth, 'auth');
    this._client = ensureExist.call(this, client, 'client');
    this._sleepDetector = sleepDetector;
    this._disableCache = disableCache;
    this._storage = storage;
    this._subscription = subscription;
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._polling = polling;
    this._pollingInterval = pollingInterval;
    this._fetchFunction = fetchFunction;
    this._forbiddenHandler = forbiddenHandler;
    this._subscriptionFilters = subscriptionFilters;
    this._subscriptionHandler = subscriptionHandler;
    this._readyCheckFn = readyCheckFn;

    this._storageKey = `${this._name}-data`; // differentiate from old key

    if (!this._disableCache && this._storage) {
      this._reducer = getReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: combineReducers({
          data: getDataReducer(this.actionTypes),
          timestamp: getTimestampReducer(this.actionTypes),
        }),
      });
    } else {
      this._reducer = getReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
        timestamp: getTimestampReducer(this.actionTypes),
      });
    }

    this._promise = null;
    this._lastMessage = null;
  }

  get _name() {
    throw new Error(`${this.constructor.name}::_name must be defined`);
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [
        ...ObjectMap.keys(moduleActionTypes),
        'fetch',
        'fetchSuccess',
        'fetchError',
        'retry',
      ],
      this._name,
    );
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
    if (this._sleepDetector) {
      this._sleepDetector.on(
        this._sleepDetector.events.detected,
        () => this._handleSleepDetected,
      );
    }
  }

  _handleSleepDetected() {
    if (this._shouldFetch()) {
      this.fetchData();
    }
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this._hasPermission) {
        await this._init();
      } else {
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
          hasPermission: false,
        });
      }
    } else if (this._isDataReady()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
        hasPermission: this._hasPermission,
      });
    } else if (this._shouldReset()) {
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (this._shouldHandleSubscriptionMessage()) {
      this._processSubscription();
    }
  }

  _shouldInit() {
    return !!(
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      (!this._readyCheckFn || this._readyCheckFn()) &&
      (!this._subscription || this._subscription.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return !!(
      (!this._auth.loggedIn ||
        (this._storage && !this._storage.ready) ||
        (this._readyCheckFn && !this._readyCheckFn()) ||
        (this._subscription && !this._subscription.ready) ||
        (this._tabManager && !this._tabManager.ready)) &&
      !this.pending
    );
  }

  _shouldHandleSubscriptionMessage() {
    return !!(
      this.ready &&
      this._subscription &&
      this._subscription.ready &&
      this._subscriptionHandler &&
      this._subscription.message &&
      this._subscription.message !== this._lastMessage
    );
  }

  _shouldFetch() {
    return (
      (!this._tabManager || this._tabManager.active) &&
      (this._auth.isFreshLogin ||
        !this.timestamp ||
        Date.now() - this.timestamp > this.ttl)
    );
  }

  _isDataReady() {
    // only turns ready when data has been fetched
    // (could be from other tabs)
    return (
      this.status === moduleStatuses.initializing &&
      this.data !== null &&
      this.timestamp !== null
    );
  }

  async _init() {
    if (this._subscription && this._subscriptionFilters) {
      this._subscription.subscribe(this._subscriptionFilters);
    }
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        console.error('fetchData error:', e);
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
  }

  _processSubscription() {
    this._lastMessage = this._subscription.message;
    this._subscriptionHandler(this._lastMessage);
  }

  get data() {
    if (!this._disableCache && this._storage) {
      return (
        (this._storage.getItem(this._storageKey) &&
          this._storage.getItem(this._storageKey).data) ||
        null
      );
    }
    return this.state.data;
  }

  get timestamp() {
    if (!this._disableCache && this._storage) {
      return (
        (this._storage.getItem(this._storageKey) &&
          this._storage.getItem(this._storageKey).timestamp) ||
        null
      );
    }
    return this.state.timestamp;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get ttl() {
    return this._ttl;
  }

  get pollingInterval() {
    return this._pollingInterval;
  }

  get retryCount() {
    return this.state.retryCount;
  }

  get timeToRetry() {
    if (this.status === moduleStatuses.initializing) {
      return RETRY_INTERVALS[this.retryCount] || this._timeToRetry;
    }
    return this._timeToRetry;
  }

  get _hasPermission() {
    return true;
  }

  // handle 403 Forbidden error
  async _fetchWithForbiddenCheck() {
    try {
      const data = await this._fetchFunction();
      return data;
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.status === 403 &&
        typeof this._forbiddenHandler === 'function'
      ) {
        const result = await this._forbiddenHandler(error);
        return result;
      }
      throw error;
    }
  }

  @proxify
  async _fetchData() {
    this.store.dispatch({
      type: this.actionTypes.fetch,
    });
    const { ownerId } = this._auth;
    try {
      const data = await this._fetchWithForbiddenCheck();
      if (this._auth.ownerId === ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fetchSuccess,
          data,
          timestamp: Date.now(),
        });
        if (this._polling) {
          this._startPolling();
        }
        this._promise = null;
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        this._promise = null;
        this.store.dispatch({
          type: this.actionTypes.fetchError,
          error,
        });
        if (this._polling) {
          this._startPolling(this.timeToRetry);
        } else {
          this._retry();
        }
        throw error;
      }
    }
  }

  @proxify
  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    return this._promise;
  }

  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      if (this.status === moduleStatuses.initializing) {
        this.store.dispatch({
          type: this.actionTypes.retry,
        });
      }
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        if (!this._tabManager || this._tabManager.active) {
          this.fetchData();
        } else {
          // continue retry checks in case tab becomes main tab
          this._retry();
        }
      }
    }, t);
  }
}
