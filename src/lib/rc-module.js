import SymbolMap from './symbol-map';
import { prefixActions } from './redux-helper';
import EventEmitter from 'event-emitter';

const symbols = new SymbolMap([
  'store',
  'getState',
  'prefix',
  'actions',
  'emitter',
]);

/**
 * @function
 * @param {Object} state
 * @return {Object}
 * @description Default reducer if module does not has its own reducer.
 */
function defaultReducer(state) {
  if (typeof state === 'undefined') return {};
  return state;
}
/**
 * @function
 * @param {Object} state
 * @return {Object}
 * @description Default parent state to module state mapper.
 */
function defaultMapper(state) {
  return state;
}

function defaultGetState() {
  return this.store.getState();
}

/**
 * @class
 * @default
 * @description Base module class.
 */
export default class RcModule {
  /**
   * @constructor
   */
  constructor({
    promiseForStore,
    getState = defaultGetState,
    prefix,
    actions,
  }) {
    // Extending EventEmitter breaks some mechanic, so we wire emitter up like this instead.
    this[symbols.emitter] = new EventEmitter();
    this[symbols.getState] = getState;
    this[symbols.prefix] = prefix;
    this[symbols.actions] = actions && prefixActions(actions, prefix);
    promiseForStore.then((store) => {
      this[symbols.store] = store;
    });
  }

  /**
   * @function
   * @param {String} event
   * @param {Function} handler
   * @return {Function} Unregister function.
   */
  on(event, handler) {
    this[symbols.emitter].on(event, handler);
    return () => {
      this[symbols.emitter].off(event, handler);
    };
  }
  /**
   * @function
   * @param {String} event
   * @param {Function)} handler
   * @return {Function} Unregister function.
   */
  once(event, handler) {
    this[symbols.emitter].once(event, handler);
    return () => {
      this[symbols.emitter].off(event, handler);
    };
  }
  /**
   * @function
   * @param {String} event
   * @param {...args} args
   */
  emit(event, ...args) {
    this[symbols.emitter].emit(event, ...args);
  }
  /**
   * @function
   * @param {String} event
   * @param {Function} handler
   */
  off(event, handler) {
    this[symbols.emitter].off(event, handler);
  }

  get state() {
    return this[symbols.getState]();
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
