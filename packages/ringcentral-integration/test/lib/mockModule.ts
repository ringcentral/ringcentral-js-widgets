import { createStore } from 'redux';

import { storeKey } from '@ringcentral-integration/core';

import { ModuleFactory } from '../../lib/di';
import RcModule from '../../lib/RcModule';

export const mockModuleWithDeps = <T extends new (...args: any) => any>(
  module: { provide: string; useClass: T },
  // TODO: deps type from di
  deps: any[],
): InstanceType<T> => {
  @ModuleFactory({
    providers: [module, ...deps],
  })
  class Root extends RcModule {
    get status() {
      return this.state.status;
    }
  }
  const root = Root.create();
  const store = createStore(root.reducer);
  root.setStore(store);
  const key = module.provide.replace(/^./g, (match) => match.toLowerCase());
  return root[key];
};

export const mockModuleGenerator = <T, P>(options: T, props?: P) =>
  Object.assign(
    options,
    {
      [storeKey]: {
        dispatch() {},
        getState() {},
        subscribe() {},
      },
      parentModule: {},
      _getStateV2: () => {},
    },
    props,
  );
