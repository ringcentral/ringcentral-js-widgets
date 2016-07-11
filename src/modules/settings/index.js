import RcModule from '../../lib/rc-module';
import { ActionMap, prefixActions } from '../../lib/redux-helper';
import { combineReducers } from 'redux';

import SymbolMap from '../../lib/symbol-map';

const symbols = new SymbolMap([
  'reducer',
]);

function getSettingsReducer(prefix) {
  return (state, action) => {
    if (typeof state === 'undefined') return {};

    return state;
  };
}

export default class Settings extends RcModule {
  constructor(options) {
    super({
      ...options,
    });
    this[symbols.reducer] = {
      base: getSettingsReducer(this.prefix),
    };
  }
  registerReducer(name, reducer) {
    this[symbols.reducer][name] = reducer;
  }
  get reducer() {
    return combineReducers(this[symbols.reducer]);
  }
}
