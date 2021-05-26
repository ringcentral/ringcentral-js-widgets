import {
  RcModuleV2,
  createApp as createAppWithRcModuleV2,
} from '@ringcentral-integration/core';
import { StoreEnhancer } from 'redux';
import { Injector } from './di';

/**
 * Create app with FactoryModule based on RcModuleV2.
 * !! Please ensure that all dependency injection modules are based on the RcModuleV2 module.
 */
export const createApp = <T extends new (...args: any) => any>(
  Main: T,
  reduxEnhancer?: StoreEnhancer,
) => {
  const main = Injector.bootstrap(Main);
  const modules: Record<string, RcModuleV2> = main._deps;
  createAppWithRcModuleV2({
    main,
    modules,
    reduxEnhancer,
  });
  return main as InstanceType<T>;
};
