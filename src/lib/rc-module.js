import SymbolMap from './symbol-map';
import { prefixActions } from './redux-helper';

const symbols = new SymbolMap([
  'store',
  'mapper',
  'prefix',
  'actions',
]);

function defaultReducer(state) {
  if (typeof state === 'undefined') return {};
  return state;
}
function defaultMapper(state) {
  return state;
}

export default class RcModule {
  constructor({
    registerStoreHandler,
    stateMapper = defaultMapper,
    prefix,
    actions,
  }) {
    this[symbols.mapper] = stateMapper;
    this[symbols.prefix] = prefix;
    this[symbols.actions] = actions && prefixActions(actions, prefix);
    registerStoreHandler((store) => {
      this[symbols.store] = store;
    });
  }
  get state() {
    return this[symbols.mapper](this[symbols.store].getState());
  }
  get reducer() {
    return defaultReducer;
  }
  get store() {
    return this[symbols.store];
  }
  get prefix() {
    return this[symbols.prefix];
  }

  get actions() {
    return this[symbols.actions];
  }

}


/*

  //need away to return reducer for store creation
  //and accept created store to dispatch events

  class TestModule extends RcModule {

  }


  class RcPhone extends RcModule {
    constructor({
      settings,
      getStore,
    }) {

    }


  }


*/
