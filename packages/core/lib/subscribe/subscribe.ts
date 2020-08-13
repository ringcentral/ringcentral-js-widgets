import { Unsubscribe } from 'redux';
import { RcModuleV2 } from '../RcModule';

const subscribe = (service: RcModuleV2, listener: () => void) => {
  if (typeof listener !== 'function') {
    throw new Error(`The 'listener' should be a function.`);
  }
  if (!(service instanceof RcModuleV2)) {
    throw new Error(`The instance should be a RcModuleV2 instance.`);
  }
  let unsubscribe: Unsubscribe;
  if (service._store) {
    unsubscribe = service._store?.subscribe(listener)!;
  } else {
    // When constructing
    const subscriptions = service.__subscriptions__ || [];
    let _unsubscribe: Unsubscribe;
    subscriptions.push(() => {
      _unsubscribe = service._store?.subscribe(listener)!;
    });
    unsubscribe = () => _unsubscribe();
    Object.assign(service, {
      __subscriptions__: subscriptions,
    });
  }
  return unsubscribe!;
};

export { subscribe };
