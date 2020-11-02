/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { Reducer, ReducersMapObject, Action, AnyAction, Store } from 'redux';
import { Storage as StorageV2 } from 'ringcentral-integration/modules/StorageV2';
import { GlobalStorage as GlobalStorageV2 } from 'ringcentral-integration/modules/GlobalStorageV2';
import Storage from 'ringcentral-integration/modules/Storage';
import GlobalStorage from 'ringcentral-integration/modules/GlobalStorage';
import { Analytics } from 'ringcentral-integration/modules/Analytics';
import BaseModule, { state, action } from '../usm-redux';
import { moduleStatuses } from '../../enums/moduleStatuses';
import { Params } from '../usm/core/module';
import { Properties } from '../usm/utils/flatten';

export interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer?(): T;
}

/**
 * decorate global storage state with `GlobalStorage` Module
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
 */
function storage(
  target: RcModuleV2,
  name: string,
  descriptor?: Descriptor<any>,
): any {
  target._storageSubKeys = [...(target._storageSubKeys || []), name];
  return descriptor;
}

type TrackEvent = string | ((...args: any) => [string, object?]);

/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 */
function track(trackEvent: TrackEvent) {
  return (target: RcModuleV2, name: string, descriptor?: Descriptor<any>) => {
    if (
      typeof descriptor.value !== 'function' &&
      typeof descriptor.initializer !== 'function'
    ) {
      throw new Error(`@track decorated '${name}' is not a method`);
    }
    let fn: (...args: any) => any = descriptor.value;
    const initializer = descriptor.initializer;
    const trackedFn = function (this: RcModuleV2, ...args: any) {
      const { analytics } = this.parentModule as RcModuleV2<Properties<any>> & {
        analytics: Analytics;
      };
      if (
        typeof analytics !== 'undefined' &&
        typeof analytics.track === 'function'
      ) {
        if (typeof trackEvent === 'string') {
          analytics.track(trackEvent);
        } else {
          const [event, trackProps] = trackEvent(this, ...args);
          analytics.track(event, trackProps);
        }
      }
      if (typeof initializer === 'function') {
        fn = initializer.call(this);
      }
      return fn.apply(this, args);
    };
    // the any type is just to be compatible with babel and tsc.
    return {
      enumerable: true,
      configurable: true,
      value: trackedFn,
    } as any;
  };
}

const getStorageSubKey = (storageKey: string, key: string) =>
  `${storageKey}-${key}`;

interface RcModuleV2 {
  _storageSubKeys: string[];
  _globalStorageSubKeys: string[];
}

type ReducersMap = ReducersMapObject<
  any,
  Action & { states: Record<string, any> }
>;

type Options = {
  deps?: Record<string, any>;
  enableCache?: boolean;
  enableGlobalCache?: boolean;
  storageKey?: string;
};

class RcModuleV2<
  T extends {
    storage?: Storage | StorageV2;
    globalStorage?: GlobalStorage | GlobalStorageV2;
  } & Record<string, any> = {},
  S extends Record<string, any> = {}
> extends BaseModule<T> {
  __$$state$$__: any;
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
   * `onStateChange` each Redux dispatch action will trigger it once.
   */
  protected onStateChange?(): Promise<void> | void;
  protected _once = false;
  public __key__?: string;
  public __subscriptions__?: (() => void)[];
  public storageKey: string;
  public _modulePath?: string;
  public _initialized = false;
  public _suppressInit?: boolean;
  protected _deps: T;

  constructor(options: Options, ...args: any[]) {
    super(options as any, ...args);
    this._modulePath = 'root';
    this._deps = this._modules;
    if (this.enableStorage) {
      // TODO replace new way for `storageKey` definition
      this.storageKey = options.storageKey;
      this._storageSubKeys.forEach((key) => {
        const reducer: Reducer<any, AnyAction> = (
          state = this._initialValue[key],
          { type, states },
        ) => {
          if (
            type &&
            type.indexOf((this.actionTypes as Record<string, string>)[key]) > -1
          ) {
            return states[key];
          }
          return state;
        };
        this._modules.storage.registerReducer({
          key: getStorageSubKey(this.storageKey, key),
          reducer,
        });
      });
      const properties = this._storageSubKeys.reduce(
        (propertiesMap: Record<string, PropertyDescriptor>, key) => {
          propertiesMap[key] = {
            enumerable: true,
            configurable: true,
            get(this: BaseModule) {
              return this.state[key];
            },
            set(this: BaseModule, value: unknown) {
              if (this._store) {
                this.state[key] = value;
              } else {
                // Support for synchronous updating of initialized state values while in the constructor.
                this._initialValue[key] = value;
              }
            },
          };
          return propertiesMap;
        },
        {},
      );
      Object.defineProperties(this, properties);
    }
    if (this.enableGlobalStorage) {
      this.storageKey = options.storageKey;
      this._globalStorageSubKeys.forEach((key) => {
        const reducer: Reducer<any, AnyAction> = (
          state = this._initialValue[key],
          { type, states },
        ) => {
          if (
            type &&
            type.indexOf((this.actionTypes as Record<string, string>)[key]) > -1
          ) {
            return states[key];
          }
          return state;
        };
        this._modules.globalStorage.registerReducer({
          key: getStorageSubKey(this.storageKey, key),
          reducer,
        });
      });
      const properties = this._globalStorageSubKeys.reduce(
        (propertiesMap: Record<string, PropertyDescriptor>, key) => {
          propertiesMap[key] = {
            enumerable: true,
            configurable: true,
            get(this: BaseModule) {
              return this.state[key];
            },
            set(this: BaseModule, value: unknown) {
              if (this._store) {
                this.state[key] = value;
              } else {
                // Support for synchronous updating of initialized state values while in the constructor.
                this._initialValue[key] = value;
              }
            },
          };
          return propertiesMap;
        },
        {},
      );
      Object.defineProperties(this, properties);
    }
  }

  public _handleArgs(params?: any): Params<T> {
    if (typeof params === 'undefined') {
      return {
        modules: {} as T,
      };
    }
    const { deps, ...rest } = params;
    return {
      modules: deps,
      ...rest,
    };
  }

  get modulePath() {
    return this._modulePath;
  }

  /**
   * harmony with RcModule V1 for modules initialization
   * @param name module key
   * @param module RcModule
   */
  addModule(name: string, module: unknown) {
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

  get enableStorage() {
    if (
      this.enableCache &&
      (typeof this._modules.storage === 'undefined' ||
        this._modules.storage === null)
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Dependent 'Storage' module was not imported in the ${this.__key__} module.`,
        );
      }
    }
    return (
      this.enableCache &&
      !!this._modules.storage &&
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
      (typeof this._modules.globalStorage === 'undefined' ||
        this._modules.globalStorage === null)
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Dependent 'GlobalStorage' module was not imported in the module.`,
        );
      }
    }
    return (
      this.enableGlobalCache &&
      !!this._modules.globalStorage &&
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
    return Object.entries(reducers).reduce(
      (reducers: Properties<Reducer<any, AnyAction>>, [key, reducer]) => {
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
      },
      {},
    );
  }

  public get state(): S & { __status__: string } {
    if (this.__$$state$$__) {
      return this.__$$state$$__;
    }
    if (!this.enableStorage && !this.enableGlobalStorage) {
      return {
        ...this._getState(),
      };
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
        value =
          this._modules.storage.getItem(
            getStorageSubKey(this.storageKey, key),
          ) ?? this._initialValue[key];
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
        value =
          this._modules.globalStorage.getItem(
            getStorageSubKey(this.storageKey, key),
          ) ?? this._initialValue[key];
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

  protected async _checkStatusChange() {
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
  }

  async initModule() {
    this.parentModule.store.subscribe(async () => {
      if (typeof this.onStateChange === 'function') {
        this.onStateChange();
      }
      await this._checkStatusChange();
    });
    if (Array.isArray(this.__subscriptions__)) {
      this.__subscriptions__.forEach((subscribe) => subscribe());
    }
    await this._checkStatusChange();
    if (typeof this.__key__ !== 'undefined') return;
    for (const subModule in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, subModule) &&
        this[subModule] instanceof RcModuleV2 &&
        !((this[subModule] as any) as RcModuleV2)._initialized &&
        !((this[subModule] as any) as RcModuleV2)._suppressInit
      ) {
        const subRcModule: RcModuleV2 = this[subModule] as any;
        subRcModule._initialized = true;
        subRcModule.initModule();
      }
    }
  }

  protected _onStateChange(): void {}

  get noReadyModules() {
    const modules = Object.values(this._modules || {}).filter(
      // In order to be compatible with RcModuleV1
      (module: any) => module && typeof module.ready !== 'undefined',
    );
    return modules.filter((module: any) => !module.ready);
  }

  get noReadyModulesLength() {
    return this.noReadyModules.length;
  }

  _shouldInit() {
    const areAllReady = this.noReadyModulesLength === 0;
    return areAllReady && this.pending;
  }

  _shouldReset() {
    const areNotReady = this.noReadyModulesLength > 0;
    return areNotReady && this.ready;
  }

  get _store() {
    return this.parentModule?.store;
  }

  protected _setStore(store: Store) {
    // Compatibility about Factory ModuleV1 and ModuleV2
    if (typeof this.parentModule === 'undefined') {
      this.parentModule = {
        store,
      } as RcModuleV2;
    }
  }

  get reducer() {
    return this.reducers as Reducer;
  }

  get _reducer() {
    return this.reducer;
  }

  _getState(): S & { __status__: string } {
    return (this.parentModule as RcModuleV2)._getState
      ? ((this.parentModule as RcModuleV2)._getState() as Record<string, any>)[
          this.__key__
        ]
      : this.parentModule.store.getState();
  }

  get __name__() {
    return this.__key__;
  }

  @state __status__: string = moduleStatuses.pending;

  @action
  __initModule__() {
    this.state.__status__ = moduleStatuses.initializing;
  }

  @action
  __initSuccessModule__() {
    this.state.__status__ = moduleStatuses.ready;
  }

  @action
  __resetModule__() {
    this.state.__status__ = moduleStatuses.resetting;
  }

  @action
  __resetSuccessModule__() {
    this.state.__status__ = moduleStatuses.pending;
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

  /**
   * @deprecated make it compatible with proxy state in RcModuleV1
   */
  get proxyReady() {
    return this.ready;
  }
}

export { RcModuleV2, globalStorage, storage, state, action, track };
