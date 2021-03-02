/* eslint-disable no-nested-ternary */
import { createStore, combineReducers, ReducersMapObject, Store } from 'redux';
import BaseModule from '../../usm';
import { Action, Reducer, Params } from '../../usm/core/module';
import { Properties } from '../../usm/utils/flatten';

export type Attribute<T = unknown> = {
  [P in string]: T;
};

type ActionTypes = Attribute<string>;

interface Module {
  _initialValue: Properties;
  __selectors__: Properties;
  _reducersMaps: Attribute<Callback<ActionTypes, Reducer>>;
  __$$state$$__: Record<string, unknown> | undefined;
}
interface Callback<T = undefined, S = void> {
  (params: T): S;
}

export interface Dispatch {
  (action: Action): void;
}

class Module<T extends Record<string, any> = {}> extends BaseModule<T> {
  public _makeInstance(params: Params<T>) {
    if (Array.isArray(this._actionTypes)) {
      this._actionTypes.forEach((name) => {
        this._reducersMaps[name] = (types) => (
          _state = this._initialValue[name],
          { type, states },
        ) => (type.indexOf(types[name]) > -1 && states ? states[name] : _state);
      });
    }
    super._makeInstance(params);
  }

  protected get _proto(): typeof Module {
    const prototype = Object.getPrototypeOf(this);
    return prototype.constructor;
  }

  protected get _reducers() {
    const reducers = this._getReducers(this.actionTypes);
    return this._proto.combineReducers(reducers);
  }

  protected static combineReducers(reducers: ReducersMapObject<{}, any>) {
    return combineReducers(reducers) as Reducer;
  }

  protected static createStore(reducer: Reducer): Store {
    return createStore(reducer);
  }

  protected _setStore(store: Store) {
    if (this._store) return;
    this._store = store;
    if (
      typeof this._store.subscribe !== 'function' ||
      typeof this._store.getState !== 'function' ||
      typeof this._store.dispatch !== 'function'
    ) {
      console.warn(
        `${this.constructor.name} Module did't correctly set custom 'Store'.`,
      );
    }
  }

  public _dispatch(action: Action) {
    if (typeof this._store.dispatch === 'function') {
      return this._store.dispatch(action);
    }
  }

  public _subscribe(callback: () => void) {
    return this._store.subscribe(callback);
  }

  public _getState() {
    const key = this._proto._getModuleKey(this);
    return this.isFactoryModule || !this.getState
      ? this.isFactoryModule
        ? this._store.getState()
        : key
        ? this._store.getState()[key]
        : {}
      : this.getState();
  }

  public _getReducers(actionTypes: ActionTypes) {
    const reducers = this.getReducers(actionTypes);
    const subReducers: Properties<Reducer> = !this.isFactoryModule
      ? {}
      : Object.entries(this._modules)
          .filter(([, module]) => module instanceof Module)
          .reduce(
            (reducers, [key, module]) =>
              Object.assign(reducers, { [key]: module.reducers }),
            {},
          );
    return {
      __$$default$$__: (): null => null,
      ...reducers,
      ...subReducers,
    };
  }

  public get state() {
    return this.__$$state$$__ || this._getState() || {};
  }

  public setStore(store: Store) {
    this._setStore(store);
  }

  public get reducers() {
    return this._reducers;
  }

  public get store() {
    if (!this._store) {
      throw new Error(
        `${this.constructor.name} Module has not been initialized...`,
      );
    }
    return this._store;
  }

  public getReducers(actionTypes: ActionTypes) {
    return (this._actionTypes || []).reduce(
      (map: Properties<Reducer>, name: string) => {
        map[name] = this._reducersMaps[name](actionTypes);
        return map;
      },
      {},
    );
  }
}

export { Module as default };
