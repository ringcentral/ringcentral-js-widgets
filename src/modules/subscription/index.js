import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import subscriptionActions from './subscription-actions';
import getSubscriptionReducer from './subscription-reducer';
import { subscriptionEvents, subscriptionEventTypes } from './subscription-events';
import subscriptionStatus from './subscription-status';
import Enum from '../../lib/enum';
import { emit } from '../../lib/utils';

const symbols = new SymbolMap([
  'auth',
  'sdk',
  'platform',
  'subscription',
  'filterCache',
]);


const filterRegex = {
  message: /message-store$/,
  presence: /presence(\?detailedTelephonyState=true)?$/,
  telephony: /presence\?detailedTelephonyState=true$/,
  line: /presence\/line$/,
  linePresence: /presence\/line\/presence(\?detailedTelephonyState=true)?$/,
  lineTelephony: /presence\/line\/presence\?detailedTelephonyState=true$/,
};

/**
 * @function
 * @param {Object} message
 * @description Handles messages delivered by the subscripton
 */
function messageHandler(message) {
  // determine which events the message falls under
  const events = [];
  if (filterRegex.message.test(message.event)) {
    events.push('message');
  } else if (filterRegex.line.test(message.event)) {
    events.push('line');
  } else if (filterRegex.linePresence.test(message.event)) {
    events.push('linePresence');
    if (filterRegex.lineTelephony.test(message.event)) events.push('lineTelephony');
  } else if (filterRegex.presence.test(message.event)) {
    events.push('presence');
    if (filterRegex.telephony.test(message.event)) events.push('telephony');
  }
  // dispatch the message in redux manner
  this.store.dispatch({
    type: this.actions.notification,
    eventTypes: events,
    payload: message,
  });
  // emit the messages as events
  events.forEach(event => {
    this::emit(subscriptionEventTypes.notification, subscriptionEvents[event], message);
  });
}
function init() {
  const platform = this[symbols.platform];
  this[symbols.subscription] = this[symbols.sdk].createSubscription();
  const ownerId = platform.auth().data().owner_id;
  let cacheKey = null;
  if (typeof localStorage !== 'undefined') {
    cacheKey = `${this.prefix}-sub-${ownerId}`;
    const cachedSubscription = localStorage.getItem(cacheKey);
    if (cachedSubscription) {
      try {
        this.base.setSubscription(JSON.parse(cachedSubscription));
      } catch (e) {
        /* do nothing */
      }
    }
  }


  this.base.setEventFilters(this.filters);

  this.base.on(this.base.events.notification, message => {
    this::messageHandler(message);
  });
  this.base.on(this.base.events.removeSuccess, () => {
    this.store.dispatch({
      type: this.actions.updateStatus,
      status: subscriptionStatus.notSubscribed,
      subscription: null,
    });
    this::emit(subscriptionEventTypes.statusChanged, this.status);
  });
  this.base.on(this.base.events.removeError, () => {
    // TODO
  });
  this.base.on(this.base.events.renewSuccess, () => {
    if (cacheKey) {
      localStorage.setItem(cacheKey, JSON.stringify(this.base.subscription()));
    }
    const oldStatus = this.status;
    this.store.dispatch({
      type: this.actions.updateStatus,
      status: subscriptionStatus.subscribed,
      subscription: this.base.subscription(),
    });
    if (oldStatus !== this.status) {
      this::emit(subscriptionEventTypes.statusChanged, this.status);
    }
  });
  this.base.on(this.base.events.renewError, error => {
    // TODO handle 429
    this.store.dispatch({
      type: this.actions.updateStatus,
      status: subscriptionStatus.notSubscribed,
      subscription: null,
    });
    this::emit(subscriptionEventTypes.statusChanged, this.status);
    this.base.reset().setEventFilters(this.filters).register().catch(e => { });
  });
  this.base.on(this.base.events.subscribeSuccess, () => {
    if (cacheKey) {
      localStorage.setItem(cacheKey, JSON.stringify(this.base.subscription()));
    }
    this.store.dispatch({
      type: this.actions.updateStatus,
      status: subscriptionStatus.subscribed,
      subscription: this.base.subscription(),
    });
    this::emit(subscriptionEventTypes.statusChanged, this.status);
  });
  this.base.on(this.base.events.subscribeError, error => {
    // TODO
    // handle 429
    // handle subscription limit
  });

  if (this.filters.length) {
    this.base.register().catch(() => { /* do nothing */ });
  }
}

export default class Subscription extends RcModule {
  constructor(options) {
    super({
      ...options,
      actions: subscriptionActions,
    });

    const {
      auth,
      platform,
      sdk,
      promiseForStore,
    } = options;
    this[symbols.auth] = auth;
    this[symbols.platform] = platform;
    this[symbols.sdk] = sdk;
    this[symbols.subscription] = null;

    // caches filters before redux store is created
    this[symbols.filterCache] = [];

    promiseForStore.then(() => {
      // update store with cachedFitlers
      this.store.dispatch({
        type: this.actions.updateFilters,
        filters: this.filters,
      });
      this[symbols.filterCache] = null;
    });

    auth.on(auth.events.loggedIn, () => {
      this::init();
    });

    auth.on(auth.events.loggedOut, () => {
      if (this.base) {
        this.reset();
      }
    });

    auth.addBeforeLogoutHandler(async () => {
      await this.reset();
    });
  }

  get reducer() {
    return getSubscriptionReducer(this.prefix);
  }

  get status() {
    return this.state.status;
  }

  get filters() {
    return this[symbols.filterCache] || this.state.filters;
  }

  get base() {
    return this[symbols.subscription];
  }

  get events() {
    return subscriptionEvents;
  }

  get eventTypes() {
    return subscriptionEventTypes;
  }

  subscribe(event) {
    // TODO normalized error
    if (!subscriptionEvents::Enum.hasValue(event)) {
      throw new Error('event is not recognized');
    }

    if (this.filters.indexOf(event) === -1) {
      const newFilters = this.filters.slice();
      newFilters.push(event);
      if (this.base) {
        this.base.setEventFilters(newFilters);
        this.store.dispatch({
          type: this.actions.updateFilters,
          filters: newFilters,
        });
        this.base.register().catch(() => { /* do nothing */ });
      } else {
        this[symbols.filterCache] = newFilters;
      }
    }
  }

  unsubscribe(event) {
    // TODO normalized error
    if (!subscriptionEvents::Enum.hasValue(event)) {
      throw new Error('event is not recognized');
    }
    const idx = this.filters.indexOf(event);
    if (this.filters.indexOf(event) > -1) {
      const newFilters = this.filters.slice();
      newFilters.splice(idx, 1);
      if (this.base) {
        this.base.setEventFilters(newFilters);
        this.store.dispatch({
          type: this.actions.updateFilters,
          filters: newFilters,
        });
        if (newFilters.length) {
          this.base.register().catch(() => { /* do nothing */ });
        } else {
          this.base.remove();
        }
      } else {
        this[symbols.filterCache] = newFilters;
      }
    }
  }

  async reset() {
    try {
      if (this.base) {
        if (this.status === subscriptionStatus.subscribed) {
          await this.base.remove();
        } else {
          await this.base.reset();
        }
      }
    } catch (e) {
      // TODO
    }
    this[symbols.subscription] = null;
    const oldStatus = this.status;
    this.store.dispatch({
      type: this.actions.updateStatus,
      status: subscriptionStatus.notSubscribed,
      subscription: null,
    });
    if (oldStatus !== this.status) {
      this::emit(subscriptionEventTypes.statusChanged, this.status);
    }
  }


}
