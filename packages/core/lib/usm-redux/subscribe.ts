import { storeKey, subscriptionsKey } from './constant';
import type {
  Subscribe,
  Watch,
  Unsubscribe,
  Subscription,
  Service,
} from './interface';
import { isEqual as defaultIsEqual } from './utils/index';

const subscribe: Subscribe = (module, listener) => {
  if (typeof module !== 'object') {
    throw new Error(`The subscription target '${module}' is not an object.`);
  }
  const service: Service = module;
  const className = Object.getPrototypeOf(service).constructor.name;
  if (typeof listener !== 'function') {
    throw new Error(
      `The 'listener' should be a function in the class '${className}'.`,
    );
  }
  let unsubscribe: Unsubscribe;
  if (service[storeKey]) {
    unsubscribe = service[storeKey].subscribe(listener);
  } else {
    // When constructing
    const subscriptions: Subscription[] = service[subscriptionsKey] || [];
    let _unsubscribe: Unsubscribe;
    subscriptions.push(() => {
      if (typeof service[storeKey] !== 'object') {
        throw new Error(
          `The subscription target class '${className}' should be created via 'createStore()'.`,
        );
      }
      _unsubscribe = service[storeKey].subscribe(listener);
    });
    unsubscribe = () => _unsubscribe();
    Object.assign(service, {
      [subscriptionsKey]: subscriptions,
    });
  }
  return unsubscribe;
};

/**
 * watch value change in the store
 *
 * @param module binding module instance
 * @param selector that selector you want to watch
 * @param watcher callback function
 * @param options options for that watcher
 * @returns unsubscribe method
 *
 * @example
 * ```ts
 *
    // watch one variable
    watch(
      this,
      () => this._deps.auth.loggedIn,
      (newValue, oldValue) => {
        // do something
      },
    );

    // watch many variables
    watch(
      this,
      () => [
        this._deps.auth.loggedIn,
        this._deps.routerInteraction.currentPath,
      ],
      (newValue, oldValue) => {
        // do something
      },
      { multiple: true },
    );
 * ```
 * custom equality function
 * ```ts
    export const customEqual = (newValue: unknown, oldValue: unknown) => {
      return x !== y;
    };

    watch(
      this,
      () => this._deps.auth.loggedIn,
      (newValue, oldValue) => {
        // do something
      },
      { isEqual: customEqual },
    );
    ```
 */
const watch: Watch = (
  module,
  selector,
  watcher,
  { multiple = false, isEqual = defaultIsEqual } = {},
) => {
  if (typeof watcher !== 'function') {
    const className = Object.getPrototypeOf(module).constructor.name;
    throw new Error(
      `The 'watcher' should be a function in the class '${className}'.`,
    );
  }
  let oldValue = selector();
  if (multiple) {
    if (!Array.isArray(oldValue)) {
      const className = Object.getPrototypeOf(module).constructor.name;
      throw new Error(
        `The 'selector' should be a function that returns an array in the class '${className}'.`,
      );
    }
    return subscribe(module, () => {
      const newValue = selector();
      const length = oldValue.length;
      for (let i = 0; i < length; i++) {
        if (!isEqual(newValue[i], oldValue[i])) {
          const lastValues = oldValue;
          oldValue = newValue;
          watcher(newValue, lastValues);
          break;
        }
      }
    });
  }
  return subscribe(module, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      const lastValue = oldValue;
      oldValue = newValue;
      watcher(newValue, lastValue);
    }
  });
};

export { subscribe, watch };
