import { subscribe } from './subscribe';
import { isEqual } from '../utils';
import { RcModuleV2 } from '../RcModule';

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
