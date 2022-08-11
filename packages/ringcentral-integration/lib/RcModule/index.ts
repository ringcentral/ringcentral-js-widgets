// @ts-nocheck
import { Store } from 'redux';

import {
  identifierKey,
  RcModuleV2,
  storeKey,
} from '@ringcentral-integration/core';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import moduleStatuses from '../../enums/moduleStatuses';
import proxyStatuses from '../../enums/proxyStatuses';
import { Injector, Library } from '../di';
import once from '../once';
import required from '../required';

/**
 * @function
 * @param {Object} state
 * @return {Object}
 * @description Default reducer if module does not has its own reducer.
 */
function defaultReducer(): null {
  return null;
}

/**
 * @function
 * @return any
 * @description Default getState function
 */
function defaultGetState<S extends Record<string, any>>(this: RcModule): S {
  return this.store.getState();
}

function defaultGetProxyState<S extends Record<string, any>>(): S {
  return {} as any;
}

export interface RcModuleOptions<S, T> {
  prefix?: string;
  getState?(): S;
  getProxyState?(): S;
  actionTypes?: T;
  [P: string]: any;
}

/**
 * @class
 * @default
 * @description Base module class.
 */
@Library({
  deps: [{ dep: 'Prefix', optional: true }],
})
export default abstract class RcModule<
  S extends Record<string, any> = Record<string, any>,
  T extends object = Record<string, string>,
> {
  private _getState: () => S;
  private _getProxyState: () => S;
  private _prefix: string;
  private _prefixedActionTypes: any; // TODO: refactor with usm
  public _reducer: any; // TODO: refactor with usm
  public _proxyReducer: any; // TODO: refactor with usm
  private _modulePath: string = 'root';
  private _store?: Store;
  public _suppressInit: boolean;
  public _initialized: boolean;
  /**
   * @constructor
   * @param {Function} options.getState
   * @param {String} options.prefix
   * @param {Enum} options.actionTypes
   */
  constructor(options: RcModuleOptions<S, T> = {}) {
    const {
      getState = defaultGetState,
      getProxyState = defaultGetProxyState,
      prefix,
      actionTypes,
    } = options;
    const _actionTypes =
      typeof actionTypes === 'undefined' ? this._actionTypes : actionTypes;
    if (typeof getState !== 'function') {
      throw new Error(
        'The `getState` options property must be of type function',
      );
    }
    this._getState = getState;
    this._getProxyState = getProxyState;
    if (prefix && typeof prefix !== 'string') {
      throw new Error(
        'The `prefix` options property must be null, undefined, or a string',
      );
    }
    this._prefix = prefix;
    this._prefixedActionTypes =
      _actionTypes && ObjectMap.prefixValues(_actionTypes, prefix);
    this._reducer = defaultReducer;
    this._proxyReducer = defaultReducer;
  }

  get _actionTypes(): any {
    /* should be implemented by descendant */
    return null;
  }

  /**
   * @property
   * @type any
   * @description The state of the module
   */
  get state() {
    return this._getState();
  }

  get proxyState() {
    return this._getProxyState();
  }

  /**
   * @property
   * @type Function
   * @description The reducer function of the module
   */
  get reducer() {
    return this._reducer;
  }

  get proxyReducer() {
    return this._proxyReducer;
  }

  /**
   * @property
   * @type Object
   * @description The store object of the module
   */
  get store() {
    if (!this._store) {
      throw new Error('module has not been initialized...');
    }
    return this._store;
  }

  /**
   * @property
   * @type String
   * @description The prefix string of this module
   */
  get prefix() {
    return this._prefix;
  }

  /**
   * @property
   * @type Enum
   * @description The actionTypes used by the module
   */
  get actionTypes(): { [V in keyof T]: string } {
    return this._prefixedActionTypes;
  }

  /**
   * @property
   * @type String
   * @description The canonical path of the module from the root module
   */
  get modulePath() {
    return this._modulePath;
  }

  /**
   * @function addModule
   * @param {String} name - Name of the module. Also used for the property name.
   * @param {any} module - The module to be attached, can be any type.
   * @description Add the desired module to the
   */
  addModule<T extends RcModule, K extends keyof T>(
    this: T,
    name: K,
    module: RcModule,
  ) {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      throw new Error(`Property '${name}' already exists...`);
    }
    Object.defineProperty(this, name, {
      get() {
        return module;
      },
      enumerable: true,
    });
    // tag submodule with a modulePath for proxying function calls
    // do nothing if module is already tagged
    const subRcModule: RcModule = this[name] as any;
    if (subRcModule._modulePath === 'root') {
      subRcModule._modulePath = `${this.modulePath}.${name}`;
    }
  }

  /**
   * @function
   * @param {Object} store
   * @description Set the store to the modules and initialize the modules.
   *   This should only be called once.
   */
  setStore(store: Store) {
    if (this._modulePath !== 'root') {
      throw new Error('setStore should only be called on root module');
    }
    if (!store) {
      throw new Error('setStore must accept a store object');
    }
    if (this._store) {
      throw new Error('setStore should only be called once');
    }
    this._setStore(store);
    this._initModule();
  }

  _setStore(store: Store) {
    this._store = store;
    for (const subModule in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, subModule) &&
        this[subModule] instanceof RcModule
      ) {
        const subRcModule: RcModule = this[subModule] as any;
        subRcModule._setStore(store);
      }
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  @once
  @required.warn
  _onStateChange() {}

  _initModule() {
    if (!this._suppressInit) {
      if (!this._initialized) {
        this._initialized = true;
        this.initialize();
      }
      for (const subModule in this) {
        if (
          Object.prototype.hasOwnProperty.call(this, subModule) &&
          this[subModule] instanceof RcModule
        ) {
          const subRcModule: RcModule = this[subModule] as any;
          subRcModule._initModule();
        } else if (
          Object.prototype.hasOwnProperty.call(this, subModule) &&
          this[subModule] instanceof RcModuleV2 &&
          !(this[subModule] as any as RcModuleV2)._initialized &&
          !(this[subModule] as any as RcModuleV2)._suppressInit
        ) {
          const subRcModule: RcModuleV2 = this[subModule] as any;
          subRcModule._initialized = true;
          subRcModule._initModule();
        }
      }
    }
  }

  static create() {
    const instance = Injector.bootstrap(this);
    for (const key in instance) {
      if (instance[key] instanceof RcModuleV2) {
        Object.defineProperties(instance[key], {
          [identifierKey]: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: key,
          },
          [storeKey]: {
            configurable: false,
            enumerable: false,
            get() {
              return this.parentModule._store;
            },
          },
        });
      }
    }
    return instance;
  }

  get [storeKey]() {
    return this._store;
  }

  /**
   * Represents for module status, should be implemented by child class.
   */
  abstract get status(): string;

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get proxyStatus() {
    return proxyStatuses.ready;
  }

  get proxyReady() {
    return this.proxyStatus === proxyStatuses.ready;
  }

  get proxyPending() {
    return this.proxyStatus === proxyStatuses.pending;
  }
}
