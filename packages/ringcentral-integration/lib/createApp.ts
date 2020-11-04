import { RcModuleV2 } from '@ringcentral-integration/core';
import { ReducersMapObject, combineReducers, Store } from 'redux';
import { Injector } from './di';

/**
 * Create app with FactoryModule based on RcModuleV2.
 * Please ensure that all dependency injection modules are based on the RcModuleV2 module.
 */
export const createApp = <T extends new (...args: any) => any>(Root: T) => {
  const root: RcModuleV2 = Injector.bootstrap(Root);
  const reducers: ReducersMapObject = root._getReducers(root.actionTypes);
  for (const [key, value] of Object.entries(root._modules)) {
    if (value instanceof RcModuleV2 && !reducers[key]) {
      value.parentModule = root;
      value.__key__ = key;
      reducers[key] = value.reducer;
    }
  }
  Object.defineProperties(root, {
    reducer: {
      get: () => combineReducers(reducers),
    },
    _setStore: {
      value(store: Store) {
        if (typeof this.parentModule === 'undefined') {
          this.parentModule = {
            store,
          } as RcModuleV2;
        }
        root._initialized = true;
        root.initModule();
      },
    },
  });
  return root as InstanceType<T>;
};
