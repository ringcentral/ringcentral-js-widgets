import type { ReducersMapObject, StoreEnhancer } from 'redux';
import { combineReducers } from 'redux';

import { createStore, RcModuleV2, spawnStorageReducersKey } from './RcModule';

/**
 * Create app with FactoryModule based on RcModuleV2.
 * !! Please ensure that all dependency injection modules are based on the RcModuleV2 module.
 */
export const createApp = ({
  main,
  modules = {},
  reduxEnhancer,
}: {
  main: RcModuleV2;
  modules?: Record<string, RcModuleV2>;
  reduxEnhancer?: StoreEnhancer;
}) => {
  createStore(
    {
      modules: [...Object.values(modules), main],
      // disable AutoFreeze
      strict: false,
    },
    undefined,
    {
      reduxEnhancer,
      handleReducers: (reducers: ReducersMapObject) => {
        Object.entries(modules).forEach(([key, module]) => {
          if (
            key !== 'storage' &&
            key !== 'globalStorage' &&
            module instanceof RcModuleV2
          ) {
            module[spawnStorageReducersKey]();
          }
        });
        if (modules.storage) {
          Object.assign(reducers, {
            storage: modules.storage.reducer,
          });
        }
        if (modules.globalStorage) {
          Object.assign(reducers, {
            globalStorage: modules.globalStorage.reducer,
          });
        }
        return combineReducers(reducers);
      },
    },
  );
  main._initModule().then(() => {
    // For scenarios without dependency injection
    Object.values(modules).forEach((module) => module?._initModule?.());
  });
  return main;
};
