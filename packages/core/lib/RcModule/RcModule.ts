import BaseModule, { state, action, computed } from 'usm-redux';
import { combineReducers, Reducer } from 'redux';
import { moduleStatuses } from '../../enums/moduleStatuses';

// TODO: `_getProxyState`.

interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer(): T;
}

/**
 * decorate global storage state with `GlobalStorage` Module
 * @param target rc module
 * @param name sate key
 * @param descriptor descriptor
 */
function globalStorage(
  target: RcModuleV2,
  name: string,
  descriptor?: Descriptor<any>,
): any {
  target._globalStorageSubKeys = [
    ...(target._globalStorageSubKeys || []),
    name,
  ];
  return descriptor;
}

/**
 * decorate storage state with `Storage` Module
 * @param target RcModule
 * @param name state key
 * @param descriptor descriptor
 */
function storage(
  target: RcModuleV2,
  name: string,
  descriptor?: Descriptor<any>,
): any {
  target._storageSubKeys = [...(target._storageSubKeys || []), name];
  return descriptor;
}

interface RcModuleV2 {
  _storageSubKeys: string[];
  _globalStorageSubKeys: string[];
}

class RcModuleV2<T = {}, K = {}> extends BaseModule<T> {
  __$$state$$__: any;
  /**
   * `onInit` life cycle for current initialization before all deps modules are all ready.
   */
  protected onInit?(): Promise<void> | void;
  /**
   * `onInitSuccess` life cycle for current initialization after this module is ready.
   */
  protected onInitSuccess?(): Promise<void> | void;
  /**
   * `onReset` life cycle for current reset before one of deps modules is not ready.
   */
  protected onReset?(): Promise<void> | void;
  /**
   * `onInitOnce` once life cycle for current initialization before all deps modules are all ready.
   */
  protected onInitOnce?(): Promise<void> | void;
  protected _once = false;
  public __key__?: string;
  public storageKey: string;
  public _modulePath?: string;

  constructor(...args: any[]) {
    super(...args);
    this._modulePath = 'root';
    if (this.enableStorage) {
      // TODO replace new way for `storageKey` definition
      this.storageKey = args[0].storageKey;
      const reducer = combineReducers(
        this._storageSubKeys.reduce((reducerMap, key) => {
          reducerMap[key] = (
            state = this._initialValue[key],
            { type, states },
          ) => {
            if (type && type.indexOf(this.actionTypes[key]) > -1) {
              return states[key];
            }
            return state;
          };
          return reducerMap;
        }, {}),
      );
      (this._modules as any).storage.registerReducer({
        key: this.storageKey,
        reducer,
      });
      const properties = this._storageSubKeys.reduce((propertiesMap, key) => {
        propertiesMap[key] = {
          enumerable: true,
          configurable: true,
          get() {
            return this.enableStorage &&
              this._modules.storage.getItem(this.storageKey)
              ? this._modules.storage.getItem(this.storageKey)[key]
              : this.state[key];
          },
        };
        return propertiesMap;
      }, {});
      Object.defineProperties(this, properties);
    }
    if (this.enableGlobalStorage) {
      this.storageKey = args[0].storageKey;
      const reducer = combineReducers(
        this._globalStorageSubKeys.reduce((reducerMap, key) => {
          reducerMap[key] = (
            state = this._initialValue[key],
            { type, states },
          ) => {
            if (type && type.indexOf(this.actionTypes[key]) > -1) {
              return states[key];
            }
            return state;
          };
          return reducerMap;
        }, {}),
      );
      (this._modules as any).globalStorage.registerReducer({
        key: this.storageKey,
        reducer,
      });
      const properties = this._globalStorageSubKeys.reduce(
        (propertiesMap, key) => {
          propertiesMap[key] = {
            enumerable: true,
            configurable: true,
            get() {
              return this.enableGlobalStorage &&
                this._modules.globalStorage.getItem(this.storageKey)
                ? this._modules.globalStorage.getItem(this.storageKey)[key]
                : this.state[key];
            },
          };
          return propertiesMap;
        },
        {},
      );
      Object.defineProperties(this, properties);
    }
  }

  get modulePath() {
    return this._modulePath;
  }

  /**
   * harmony with RcModule V1 for modules initialization
   * @param name module key
   * @param module RcModule
   */
  addModule(name, module) {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      throw new Error(`Property '${name}' already exists...`);
    }
    Object.defineProperty(this, name, {
      get() {
        return module;
      },
      enumerable: true,
    });
    if (this[name]._modulePath === 'root') {
      this[name]._modulePath = `${this.modulePath}.${name}`;
    }
  }

  get enableStorage() {
    if (
      this.enableCache &&
      (typeof (this._modules as any).storage === 'undefined' ||
        (this._modules as any).storage === null)
    ) {
      console.error(
        `Dependent 'Storage' module was not imported in the ${this.__key__} module.`,
      );
    }
    return (
      this.enableCache &&
      !!(this._modules as any).storage &&
      Array.isArray(this._storageSubKeys) &&
      this._storageSubKeys.length > 0
    );
  }

  get enableCache(): boolean {
    return (this._arguments as any).enableCache;
  }

  get enableGlobalStorage() {
    if (
      this.enableGlobalCache &&
      (typeof (this._modules as any).globalStorage === 'undefined' ||
        (this._modules as any).globalStorage === null)
    ) {
      console.error(
        `Dependent 'GlobalStorage' module was not imported in the module.`,
      );
    }
    return (
      this.enableGlobalCache &&
      !!(this._modules as any).globalStorage &&
      Array.isArray(this._globalStorageSubKeys) &&
      this._globalStorageSubKeys.length > 0
    );
  }

  get enableGlobalCache(): boolean {
    return (this._arguments as any).enableGlobalCache;
  }

  public getReducers(actionTypes: any) {
    const reducers = super.getReducers(actionTypes);
    if (!this.enableStorage && !this.enableGlobalStorage) return reducers;
    return Object.entries(reducers).reduce((reducers, [key, reducer]) => {
      if (
        (!Array.isArray(this._storageSubKeys) ||
          this._storageSubKeys.indexOf(key) === -1 ||
          !this.enableStorage) &&
        (!Array.isArray(this._globalStorageSubKeys) ||
          this._globalStorageSubKeys.indexOf(key) === -1 ||
          !this.enableGlobalStorage)
      ) {
        reducers[key] = reducer;
      }
      return reducers;
    }, {});
  }

  public get state(): K {
    if (this.__$$state$$__) {
      return this.__$$state$$__;
    }
    if (!this.enableStorage && !this.enableGlobalStorage) {
      return this._getState() || {};
    }
    return {
      ...this._getState(),
      ...this._getStorageState(),
      ...this._getGlobalStorageState(),
    };
  }

  _getStorageState() {
    if (!this._storageSubKeys || !this.enableStorage) return {};
    return this._storageSubKeys.reduce((_state, key) => {
      let value;
      if (this.enableStorage) {
        value = (this._modules as any).storage.getItem(this.storageKey)
          ? (this._modules as any).storage.getItem(this.storageKey)[key]
          : this._initialValue[key];
      } else {
        value = this.state[key];
      }
      return Object.assign(_state, {
        [key]: value,
      });
    }, {});
  }

  _getGlobalStorageState() {
    if (!this._globalStorageSubKeys || !this.enableGlobalStorage) return {};
    return this._globalStorageSubKeys.reduce((_state, key) => {
      let value;
      if (this.enableGlobalStorage) {
        value = (this._modules as any).globalStorage.getItem(this.storageKey)
          ? (this._modules as any).globalStorage.getItem(this.storageKey)[key]
          : this._initialValue[key];
      } else {
        value = this.state[key];
      }
      return Object.assign(_state, {
        [key]: value,
      });
    }, {});
  }

  async _onInitOnce() {
    if (!this._once) {
      this._once = true;
      if (typeof this.onInitOnce === 'function') {
        await this.onInitOnce();
      }
    }
  }

  initModule() {
    this.parentModule.store.subscribe(async () => {
      if (typeof this.onStateChange === 'function') {
        this.onStateChange();
      }
      if (this._shouldInit()) {
        this.__initModule__();
        await this._onInitOnce();
        if (typeof this.onInit === 'function') {
          await this.onInit();
        }
        this.__initSuccessModule__();
        if (typeof this.onInitSuccess === 'function') {
          await this.onInitSuccess();
        }
      } else if (this._shouldReset()) {
        this.__resetModule__();
        if (typeof this.onReset === 'function') {
          await this.onReset();
        }
        this.__resetSuccessModule__();
      }
    });
  }

  _shouldInit() {
    const modules = this._modules || {};
    const areAllReady =
      modules &&
      Object.values(modules).filter((module: any) => !module.ready).length ===
        0;
    return areAllReady && this.pending;
  }

  _shouldReset() {
    const modules = this._modules || {};
    const areNotReady =
      modules &&
      Object.values(modules).filter((module: any) => !module.ready).length > 0;
    return areNotReady && this.ready;
  }

  get _store() {
    return this.parentModule.store;
  }

  get reducer() {
    return this.reducers as Reducer;
  }

  get _reducer() {
    return this.reducer;
  }

  _getState() {
    return (this.parentModule as any)._getState()[this.__key__];
  }

  get __name__() {
    return this.__key__;
  }

  @state __status__ = moduleStatuses.pending;

  @action
  __initModule__() {
    (this.state as any).__status__ = moduleStatuses.initializing;
  }

  @action
  __initSuccessModule__() {
    (this.state as any).__status__ = moduleStatuses.ready;
  }

  @action
  __resetModule__() {
    (this.state as any).__status__ = moduleStatuses.resetting;
  }

  @action
  __resetSuccessModule__() {
    (this.state as any).__status__ = moduleStatuses.pending;
  }

  public get status() {
    return this.__status__;
  }

  public get pending() {
    return this.__status__ === moduleStatuses.pending;
  }

  public get ready() {
    return this.__status__ === moduleStatuses.ready;
  }

  public get resetting() {
    return this.__status__ === moduleStatuses.resetting;
  }
}

export { RcModuleV2, globalStorage, storage, state, action, computed };
