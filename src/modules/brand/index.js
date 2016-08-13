import RcModule from '../../lib/rc-module';
import brandActions from './brand-actions';
import getReducer from './brand-reducer';
import SymbolMap from 'data-types/symbol-map';

const symbols = new SymbolMap([
  'initialState',
]);

export default class Brand extends RcModule {
  constructor(options) {
    super({
      ...options,
      actions: brandActions,
    });
    const {
      id,
      name,
    } = options;
    this[symbols.initialState] = {
      id,
      name,
    };
  }
  get reducer() {
    return getReducer(this[symbols.initialState], this.prefix);
  }
  get id() {
    return this.state.id;
  }
  get name() {
    return this.state.name;
  }
}

