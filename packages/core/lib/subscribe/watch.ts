import { subscribe } from './subscribe';
import { isEqual } from '../utils';
import { RcModuleV2 } from '../RcModule';

/**
 * It is used to subscribe to some state or `@computed` to get the derived computed state,
 * which returns a callback function that can be used to cancel the subscription.
 *
 * @param service a module instance
 * @param selector get a state or a derived data
 * @param watcher watching for changes in the selector value
 *
 * @returns dispose watcher
 */
const watch = <T>(
  service: RcModuleV2,
  selector: () => T,
  watcher: (newValue: T, oldValue: T) => void,
) => {
  if (typeof watcher !== 'function') {
    throw new Error(`The 'watcher' should be a function.`);
  }
  let oldValue: T = selector();
  return subscribe(service, () => {
    const newValue = selector();
    if (!isEqual(newValue, oldValue)) {
      const lastOldValue = oldValue;
      oldValue = newValue;
      watcher(newValue, lastOldValue);
    }
  });
};

export { watch };
