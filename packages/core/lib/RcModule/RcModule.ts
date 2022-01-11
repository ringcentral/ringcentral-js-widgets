import { combineReducers, ReducersMapObject } from 'redux';
import {
  action,
  Action,
  applyPatches,
  computed,
  createStore,
  enableES5,
  enablePatches,
  getStagedState,
  identifierKey,
  Service,
  setAutoFreeze,
  setPatchesToggle,
  state,
  stateKey,
  Store,
  storeKey,
  subscribe,
  Subscription,
  subscriptionsKey,
  usm as usmAction,
  watch,
} from '../usm-redux';

setAutoFreeze(false);
setPatchesToggle(!process.env.DISABLE_PATCHES);
if (!process.env.DISABLE_PATCHES) {
  enablePatches();
}

export const enum ModuleStatus {
  Pending = 'PENDING',
  Initializing = 'INITIALIZING',
  Ready = 'READY',
  Resetting = 'RESETTING',
}

export const onceKey: unique symbol = Symbol('once');
export const onInitOnceKey: unique symbol = Symbol('onInitOnce');
export const notReadyModulesKey: unique symbol = Symbol('notReadyModules');
export const checkStatusChangeKey: unique symbol = Symbol('checkStatusChange');
export const enableCacheKey: unique symbol = Symbol('enableCache');
export const enableGlobalCacheKey: unique symbol = Symbol('enableGlobalCache');
export const storageKey: unique symbol = Symbol('storage');
export const storageStateKey: unique symbol = Symbol('storageState');
export const globalStorageStateKey: unique symbol =
  Symbol('globalStorageState');
export const spawnReducersKey: unique symbol = Symbol('spawnReducers');
export const spawnStorageReducersKey: unique symbol = Symbol(
  'spawnStorageReducers',
);
export const ignoreReadyModulesKey: unique symbol =
  Symbol('ignoreReadyModules');

export interface RcModuleOptions<T> {
  deps?: T & {
    storage?: any;
    globalStorage?: any;
  };
  enableCache?: boolean;
  enableGlobalCache?: boolean;
  storageKey?: string;
}

interface RcModuleV2 {
  parentModule: RcModuleV2;
  [storageStateKey]?: string[];
  [globalStorageStateKey]?: string[];
  [stateKey]: Record<string, any>;
  [identifierKey]: string;
  [subscriptionsKey]: Subscription[];
  [storeKey]: Store;
}

// eslint-disable-next-line no-redeclare
abstract class RcModuleV2<T = {}> {
  private [onceKey] = false;

  private [storageKey]: string;

  private [enableCacheKey]: boolean;

  private [enableGlobalCacheKey]: boolean;

  /**
   * background/client transport for browser extension
   */
  protected _transport?: any; // TODO: add transport type
  private [ignoreReadyModulesKey] = new Set<RcModuleV2>();

  protected initializeProxy?(): Promise<void> | void;
  /**
   * `onInit` life cycle for current initialization before all deps modules are all ready.
   */
  protected onInit?(): Promise<void> | void;
  /**
   * `onInitOnce` once life cycle for current initialization before all deps modules are all ready.
   */
  protected onInitOnce?(): Promise<void> | void;
  /**
   * `onInitSuccess` life cycle for current initialization after this module is ready.
   */
  protected onInitSuccess?(): Promise<void> | void;
  /**
   * `onReset` life cycle for current reset before one of deps modules is not ready.
   */
  protected onReset?(): Promise<void> | void;
  /**
   * Each Redux dispatch action will trigger `onStateChange` once.
   */
  protected onStateChange?(): Promise<void> | void;

  protected _deps: T & { storage?: any; globalStorage?: any };

  constructor({
    deps,
    enableCache = false,
    enableGlobalCache = false,
    ...options
  }: RcModuleOptions<T> = {}) {
    this._deps = deps;
    this[storageKey] = options.storageKey;
    this[enableCacheKey] = enableCache;
    this[enableGlobalCacheKey] = enableGlobalCache;
    subscribe(this, () => {
      if (typeof this.onStateChange === 'function') {
        this.onStateChange();
      }
      this[checkStatusChangeKey]();
    });
    if (
      !this[storageStateKey] ||
      !this[enableCacheKey] ||
      !this._deps.storage
    ) {
      this[storageStateKey] = [];
    }
    this[storageStateKey].forEach((key) => delete this[stateKey][key]);
    if (
      !this[globalStorageStateKey] ||
      !this[enableGlobalCacheKey] ||
      !this._deps.globalStorage
    ) {
      this[globalStorageStateKey] = [];
    }
    this[globalStorageStateKey].forEach((key) => delete this[stateKey][key]);
  }

  @state
  status = ModuleStatus.Pending;

  @action
  private _setStatus(status: ModuleStatus) {
    this.status = status;
  }

  private async [onInitOnceKey]() {
    if (!this[onceKey]) {
      this[onceKey] = true;
      if (typeof this.onInitOnce === 'function') {
        await this.onInitOnce();
      }
    }
  }

  private async [checkStatusChangeKey]() {
    if (this._shouldInit()) {
      this._setStatus(ModuleStatus.Initializing);
      await this[onInitOnceKey]();
      if (typeof this.onInit === 'function') {
        await this.onInit();
      }
      this._setStatus(ModuleStatus.Ready);
      if (typeof this.onInitSuccess === 'function') {
        await this.onInitSuccess();
      }
    } else if (this._shouldReset()) {
      this._setStatus(ModuleStatus.Resetting);
      if (typeof this.onReset === 'function') {
        await this.onReset();
      }
      this._setStatus(ModuleStatus.Pending);
    }
  }

  protected _ignoreModuleReadiness(dep: RcModuleV2) {
    this[ignoreReadyModulesKey].add(dep);
  }

  private get [notReadyModulesKey]() {
    const modules = Object.values(this._deps || {}).filter(
      // In order to be compatible with RcModuleV1
      (module: RcModuleV2) => module && typeof module.ready !== 'undefined',
    );
    return modules.filter(
      (module: RcModuleV2) =>
        !module.ready && !this[ignoreReadyModulesKey].has(module),
    );
  }

  _shouldInit() {
    const areAllReady = this[notReadyModulesKey].length === 0;
    return areAllReady && this.pending;
  }

  _shouldReset() {
    const areNotReady = this[notReadyModulesKey].length > 0;
    return areNotReady && this.ready;
  }

  _depsCheck(
    checkedModules: RcModuleV2[] = [this],
    pickedModules: RcModuleV2[] = [],
  ) {
    Object.values(this._deps ?? {}).forEach((module) => {
      if (module instanceof RcModuleV2 && !module.ready) {
        const notReadyModules = Object.values(module._deps ?? {}).filter(
          (item) => item instanceof RcModuleV2 && !item.ready,
        );
        if (notReadyModules.length > 0 && !checkedModules.includes(module)) {
          checkedModules.push(module);
          module._depsCheck(checkedModules, pickedModules);
        } else if (
          !pickedModules.includes(module) &&
          notReadyModules.length === 0
        ) {
          pickedModules.push(module);
        }
      }
    });
    // please check `_shouldInit()` or `onInit()`.
    return pickedModules;
  }

  @action
  _changeState(callback: () => void) {
    callback();
  }

  get pending() {
    return this.status === ModuleStatus.Pending;
  }

  get ready() {
    return this.status === ModuleStatus.Ready;
  }

  get resetting() {
    return this.status === ModuleStatus.Resetting;
  }

  get initializing() {
    return this.status === ModuleStatus.Initializing;
  }

  get store() {
    return this[storeKey];
  }

  private [spawnStorageReducersKey]() {
    const descriptors: PropertyDescriptorMap = {};
    /**
     * make storage reducer and state
     */
    this[storageStateKey].forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, key);
      if (typeof descriptor === 'undefined') return;
      const initialState = descriptor.value;
      const storageReducerKey = `${this[storageKey]}-${key}`;
      this._deps.storage.registerReducer({
        key: storageReducerKey,
        reducer: (state = initialState, action: Action) =>
          action._usm === usmAction
            ? this._getStateV2(action._state, 'storage').data[storageReducerKey]
            : state,
      });
      Object.assign(descriptors, {
        [key]: {
          enumerable: true,
          configurable: false,
          get(this: Service) {
            const stagedState: any = getStagedState();
            return stagedState
              ? this._getStateV2(stagedState, 'storage').data![
                  storageReducerKey
                ]
              : this._deps.storage.data![storageReducerKey];
          },
          set(this: Service, value: unknown) {
            const stagedState = getStagedState();
            if (stagedState) {
              this._getStateV2(stagedState, 'storage').data![
                storageReducerKey
              ] = value;
              return;
            }
            this._deps.storage.data![storageReducerKey] = value;
          },
        },
      });
    });

    /**
     * make global storage reducer and state
     */
    this[globalStorageStateKey].forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, key);
      if (typeof descriptor === 'undefined') return;
      const initialState = descriptor.value;
      const storageReducerKey = `${this[storageKey]}-${key}`;
      this._deps.globalStorage.registerReducer({
        key: storageReducerKey,
        reducer: (state = initialState, action: Action) =>
          action._usm === usmAction
            ? this._getStateV2(action._state, 'globalStorage').data[
                storageReducerKey
              ]
            : state,
      });
      Object.assign(descriptors, {
        [key]: {
          enumerable: true,
          configurable: false,
          get(this: Service) {
            const stagedState = getStagedState();
            return stagedState
              ? this._getStateV2(stagedState, 'globalStorage').data![
                  storageReducerKey
                ]
              : this._deps.globalStorage.data![storageReducerKey];
          },
          set(this: Service, value: unknown) {
            const stagedState = getStagedState();
            if (stagedState) {
              this._getStateV2(stagedState, 'globalStorage').data![
                storageReducerKey
              ] = value;
              return;
            }
            this._deps.globalStorage.data![storageReducerKey] = value;
          },
        },
      });
    });

    Object.defineProperties(this, descriptors);
  }

  // TODO: Refactor without RcModuleV1
  // harmony with RcModule V1 for modules initialization

  private _modulePath = 'root';

  private _initialized = false;

  private _suppressInit?: boolean;

  protected _reducers: ReducersMapObject;

  protected _getStateV2 = (state: Record<string, any>, key: string) =>
    state[key];

  private _setStore() {
    return this._initModule();
  }

  get _store() {
    return this.store;
  }

  private [spawnReducersKey]() {
    const descriptors: PropertyDescriptorMap = {
      [stateKey]: {
        enumerable: false,
        configurable: false,
        get(this: Service) {
          const stagedState = getStagedState();
          return this._getStateV2(
            stagedState ?? this[storeKey]?.getState(),
            this[identifierKey],
          );
        },
      },
    };
    this._reducers = Object.keys(this[stateKey] ?? {}).reduce(
      (serviceReducersMapObject: ReducersMapObject, key) => {
        const descriptor = Object.getOwnPropertyDescriptor(this, key);
        if (typeof descriptor === 'undefined') return serviceReducersMapObject;
        const initialState = descriptor.value;
        Object.assign(descriptors, {
          [key]: {
            enumerable: true,
            configurable: false,
            get(this: Service) {
              return this[stateKey][key];
            },
            set(this: Service, value: unknown) {
              this[stateKey][key] = value;
            },
          },
        });
        return Object.assign(serviceReducersMapObject, {
          [key]: (state = initialState, action: Action) =>
            action._usm === usmAction
              ? this._getStateV2(action._state, this[identifierKey])[key]
              : state,
        });
      },
      {},
    );
    const stateDescriptor = Object.getOwnPropertyDescriptor(this, stateKey);
    if (stateDescriptor && typeof stateDescriptor.get === 'function') return;
    Object.defineProperties(this, descriptors);
  }

  get reducer() {
    if (this._reducers) return combineReducers(this._reducers);
    this[spawnStorageReducersKey]();
    this[spawnReducersKey]();
    return combineReducers(this._reducers);
  }

  async _initModule() {
    this._initialized = true;
    if (
      (this.parentModule && !(this.parentModule instanceof RcModuleV2)) ||
      (!this.parentModule && !(this instanceof RcModuleV2))
    ) {
      for (const subscribe of this[subscriptionsKey] ?? []) {
        subscribe();
      }
      this[subscriptionsKey] = [];
    }
    await this[checkStatusChangeKey]();
    // eslint-disable-next-line guard-for-in
    for (const subModule in this) {
      const subRcModule = this[subModule] as any;
      if (
        subRcModule &&
        typeof subRcModule._initModule === 'function' &&
        !subRcModule._initialized &&
        !subRcModule._suppressInit
      ) {
        subRcModule._initModule();
      }
    }
  }

  private get proxyReady() {
    return this.ready;
  }

  private get modulePath() {
    return this._modulePath;
  }

  private addModule(name: string, module: unknown) {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      throw new Error(`Property '${name}' already exists...`);
    }
    Object.defineProperty(this, name, {
      get() {
        return module;
      },
      enumerable: true,
    });
    if ((this as any)[name]._modulePath === 'root') {
      (this as any)[name]._modulePath = `${this.modulePath}.${name}`;
    }
  }

  private get state() {
    return this[stateKey];
  }

  private actionTypes() {
    return {};
  }
}

export {
  RcModuleV2,
  state,
  action,
  subscribe,
  computed,
  createStore,
  watch,
  stateKey,
  storeKey,
  identifierKey,
  applyPatches,
  usmAction,
  enableES5,
  setAutoFreeze,
};
