import Wrapper from '../lib/wrapper';

const SDK = Symbol();
const HANDLERS = Symbol();
const FILTERS = Symbol();

class DefaultSubscriptionProvider {
  constructor({ sdk }) {
    return sdk.base.createSubscription();
  }
}

export default class Subscription extends Wrapper {
  constructor({
    sdk,
    subscription,
    SubscriptionProvider = DefaultSubscriptionProvider,
  }) {
    const tmp = subscription || new SubscriptionProvider({
      sdk,
    });
    super(tmp);
    this[SDK] = sdk;
    this[FILTERS] = new Set();
    this[HANDLERS] = new Map();
    this.base.on(this.events.notification, m => {
      if (this[HANDLERS].has(m.event)) {
        this[HANDLERS].get(m.event).forEach(handler => {
          try {
            handler(m);
          } catch (e) {
            console.error(
              `Error occurs when invoking subscription notification handler for "${m.event}":`,
              e
            );
          }
        });
      }
    });
  }
  get events() {
    return this.base.events;
  }
  subscribe(event, handler) {
    if (event && typeof handler === 'function') {
      if (!this[HANDLERS].has(event)) {
        this[HANDLERS].set(event, new Set());
      }
      if (!this[FILTERS].has(event)) {
        this[FILTERS].add(event);
        this.base.setEventFilters(Array.from(this[FILTERS]));
        this.base.register();
      }
      this[HANDLERS].get(event).add(handler);
    }
  }
}
