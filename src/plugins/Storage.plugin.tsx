import localForage from 'localforage';
import {
  IStorageOptions as BaseIStorageOptions,
  SetStorageOptions,
  getRef,
  action,
  defaultStateKey,
  getStagedState,
  initStateKey,
  injectable,
  optional,
  PortDetector,
  stateKey,
  Storage as BaseStorage,
  StorageOptions,
  watch,
  state,
  isEqual,
  signalMapKey,
} from 'reactant-share';
import type { Reducer } from 'redux';

import {
  ModuleStatus,
  ignoreReadyModulesKey,
  userIdReadyKey,
} from '../constant';
import type { Service } from '../interface';
import { IRcModule } from '../lib/RcModule';
import { checkIndexDB } from '../lib/checkIndexDB';
import { globalStorageKey } from '../lib/decorators/globalStorage';
import { localStorageOnlyKey } from '../lib/decorators/localStorage';
import { storageKey } from '../lib/decorators/storage';
import { userStorageKey } from '../lib/decorators/userStorage';

export { StorageOptions } from 'reactant-share';

export enum DriverType {
  IndexedDB = 'INDEXEDDB',
  LocalStorage = 'LOCALSTORAGE',
  Unknown = 'UNKNOWN',
}

const defaultUserId = '__default__';

export type IStorageOptions = Partial<BaseIStorageOptions>;

@injectable()
export class StoragePlugin extends BaseStorage implements IRcModule {
  public getUserId?: () => string | undefined;

  private [ignoreReadyModulesKey] = new Set();

  constructor(
    protected override portDetector: PortDetector,
    @optional(StorageOptions) options?: IStorageOptions,
    @optional('Prefix') protected prefix?: string,
  ) {
    super(portDetector, {
      ...options,
      whitelist: [],
      storage:
        options?.storage ??
        (prefix ? localForage.createInstance({ name: prefix }) : localForage),
      disableClientRehydrated:
        options?.disableClientRehydrated ??
        !!(portDetector.isWorkerMode && globalThis.SharedWorker),
    });
    if (this.portDetector.shared) {
      this.portDetector.onServer(() => this.initialize());
    } else {
      this.initialize();
    }
    this.onRehydrated(() => {
      this.portDetector.onClient(() => {
        if (!this.portDetector.isWorkerMode && this.paused) {
          this.persist();
        }
      });
    });
  }

  //#region migration storage
  private _migrationMap = new Map<object, [string, string][]>();

  private _migratedStorage?: LocalForage | null;

  private get _migrationStorageKey() {
    return `${this.prefix ? `${this.prefix}-` : ''}storage-${this._userId}`;
  }

  private operationCallbacks: (() => void)[] = [];

  private async _migration() {
    for (const [target, keys] of this._migrationMap) {
      for (const [key, oldKey] of keys) {
        const data = (await this._migratedStorage?.getItem(oldKey)) as {
          value?: any;
        };
        if (data?.value) {
          this.operationCallbacks.push(() => {
            (target as Record<string, any>)[key] = data.value;
            this._migratedStorage?.removeItem(oldKey);
          });
        }
      }
    }
    if (this.operationCallbacks.length) {
      this._migrate();
    }
  }

  @action
  private _migrate() {
    this.operationCallbacks.forEach((fn) => fn());
    this.operationCallbacks = [];
  }
  //#endregion

  protected initialize() {
    watch(
      this,
      () => this._userId,
      async (newValue, oldValue) => {
        if (!newValue && oldValue) {
          this.clear();
        }
        //#region migration storage
        if (!newValue && oldValue) {
          this._migratedStorage = null;
        }
        if (newValue && !oldValue && !this._migratedStorage) {
          const dbExists = await checkIndexDB(this._migrationStorageKey);
          if (!dbExists) {
            return;
          }
          this._migratedStorage = localForage.createInstance({
            name: this._migrationStorageKey,
          });
          this._migration();
        }
        //#endregion
      },
    );
  }

  private get _userId() {
    return this.getUserId?.();
  }

  protected get userId() {
    return this._userId ?? defaultUserId;
  }

  protected handleStorage = new Set<() => void>();
  protected clearStorage = new Set<() => void>();

  enable<T extends object>(
    _target: T,
    options?: Pick<
      SetStorageOptions<T>,
      Exclude<keyof SetStorageOptions<T>, 'whitelist'>
    > & {
      /**
       * define persistent data whitelist,
       * list of keys to be stored in local storage always
       */
      whitelist?: (keyof T)[];
      /**
       * define migrations mapping between new storage keys and old storage keys
       */
      migrations?: [
        /**
         * new storage key
         */
        keyof T,
        /**
         * old storage key
         */
        string,
      ][];
    },
  ) {
    // TODO: fix type
    const target = _target as Service;
    const descriptors: Record<string, PropertyDescriptor> = {};

    const localStorageKeys = this.bindStorageOnly(target);

    const storageKeys: Set<string> = target[storageKey];
    if (!storageKeys) {
      if (localStorageKeys) return;
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
          `No storage state defined in ${target.constructor.name}.`,
        );
      }

      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      //#region migration storage
      options?.migrations?.forEach(([key]) => {
        if (!storageKeys.has(key as string)) {
          throw new Error(
            `Invalid migrations setting, ${
              target.constructor.name
            } has no storage state for ${key as string}.`,
          );
        }
      });
      //#endregion
      options?.whitelist?.forEach((key) => {
        if (!storageKeys.has(key as string)) {
          throw new Error(
            `Invalid whitelist, ${
              target.constructor.name
            } has no storage state for ${key as string}.`,
          );
        }
      });
      options?.blacklist?.forEach((key) => {
        if (!storageKeys.has(key as string)) {
          throw new Error(
            `Invalid blacklist, ${
              target.constructor.name
            } has no storage state for ${key as string}.`,
          );
        }
      });
    }
    //#region migration storage
    if (options?.migrations) {
      this._migrationMap.set(target, options.migrations as [string, string][]);
    }
    //#endregion
    const userStorageKeys: Set<string> | undefined = target[userStorageKey];
    const globalStorageKeys: Set<string> | undefined = target[globalStorageKey];
    this.setStorage(target as T, {
      ...options,
      // timeout issue: https://github.com/rt2zz/redux-persist/issues/1308
      timeout: options?.timeout ?? (null as any),
      whitelist: Array.from(storageKeys.values()) as (keyof T)[],
    });

    this.clearStorage.add(() => {
      storageKeys.forEach((key) => {
        if (globalStorageKeys?.has(key)) return;
        if (
          ((userStorageKeys && !userStorageKeys.has(key)) ||
            !userStorageKeys) &&
          (!options?.whitelist || !options.whitelist.includes(key as keyof T))
        ) {
          (target as Record<string, any>)[key] = (target as any)[initStateKey][
            key
          ];
        }
      });
    });
    const that = this as StoragePlugin;
    userStorageKeys?.forEach((key) => {
      if (options?.blacklist?.includes(key as keyof T)) return;
      // for map user storage by userId
      target[defaultStateKey] = target[defaultStateKey] ?? {};
      target[userIdReadyKey] = () => !!this._userId;
      target[defaultStateKey][key] = {
        get [defaultUserId]() {
          return (target as any)[initStateKey][key];
        },
      };
      descriptors[key] = {
        configurable: true,
        enumerable: true,
        get(this: Service) {
          const id = that.userId;
          const stagedState = getStagedState();
          const current = this[stateKey]![key];
          const signalMap = (this as any)[signalMapKey];
          if (
            !stagedState &&
            signalMap[key] &&
            !isEqual(signalMap[key].value, current)
          ) {
            try {
              // Manual update signal value when the state is changed outside the common reducer.
              signalMap[key].value = current;
            } catch (e) {
              if (
                JSON.stringify(signalMap[key].value) !== JSON.stringify(current)
              ) {
                const className = target.constructor.name;
                console.error(
                  `The '${key}' state value of the module '${className}' has been changed outside the common reducer, which may cause the state to be out of sync. Please check middleware to update the state value without signal updating.`,
                );
              }
            }
          }
          if (typeof this[stateKey]![key][id] === 'undefined') {
            if (stagedState) {
              this[stateKey]![key][id!] = JSON.parse(
                JSON.stringify((target as any)[initStateKey][key]),
              );
              return this[stateKey]![key][id!];
            }
            return (target as any)[initStateKey][key];
          }
          return current[id];
        },
        set(this: Service, value: unknown) {
          const id = that.userId;
          this[stateKey]![key][id] = value;
        },
      };
    });
    // post create reducer for target
    this.handleStorage.add(() => {
      Object.defineProperties(target, descriptors);
    });
  }

  //#region base RcModule for control all RcModule status
  @state
  status: ModuleStatus = ModuleStatus.Ready;

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
  //#region

  @action
  private _setReady() {
    this.status = ModuleStatus.Ready;
  }

  @action
  private _setResetting() {
    this.status = ModuleStatus.Resetting;
  }

  /**
   * if change getUserId() value, you can use it for resetting the storage state.
   * for example,in hubspot,the user id is ownerid-hubid, when the user switch hub, the getUserId() value will be changed
   * then need to initialize modules base on the new user id,
   * so, you can use this method to reset the storage state and init all modules
   */
  async resetStorageState(callback?: () => void | Promise<void>) {
    this._setResetting();
    await callback?.();
    this._setReady();
  }

  @action
  protected clear() {
    this.clearStorage.forEach((fn) => fn());
  }

  override afterCombineRootReducers(rootReducer: Reducer) {
    this.handleStorage.forEach((handler) => handler());
    return super.afterCombineRootReducers(rootReducer);
  }

  get driver() {
    if (this.options.storage === localForage) {
      const storage = this.options.storage as typeof localForage;
      switch (storage.driver()) {
        case storage.INDEXEDDB:
          return DriverType.IndexedDB;
        case storage.LOCALSTORAGE:
          return DriverType.LocalStorage;
        default:
          return DriverType.Unknown;
      }
    }
    if (this.options.storage === globalThis.localStorage) {
      return DriverType.LocalStorage;
    }
    return DriverType.Unknown;
  }

  bindStorageOnly(target: Service) {
    const descriptors: Record<string, PropertyDescriptor> = {};
    const localStorageOnlyKeys = target[localStorageOnlyKey];
    const prefix = this.prefix;
    localStorageOnlyKeys?.forEach((key) => {
      let value = (target as any)[key];
      let storageKey: string;

      const getStorageKey = (identifier: string) =>
        `${prefix}-${identifier}.${key}`;

      descriptors[key] = {
        configurable: true,
        enumerable: true,
        get(this: Service) {
          const { identifier } = getRef(this);

          if (process.env.NODE_ENV !== 'production' && !identifier) {
            throw new Error(
              `[StoragePlugin] not found identifierKey '${identifier}': get '${key}' value error in ${this.constructor.name} module, make sure to use it after the module is constructed`,
            );
          }

          if (!storageKey) {
            storageKey = getStorageKey(identifier!);
            const storageValue = globalThis.localStorage.getItem(storageKey);
            try {
              value = storageValue === null ? value : JSON.parse(storageValue!);
            } catch (e) {
              // It can support the all types, including `undefined`.
              value = undefined;
            }
          }

          return value;
        },
        set(this: Service, newVal: unknown) {
          const { identifier } = getRef(this);

          if (process.env.NODE_ENV !== 'production' && !identifier) {
            throw new Error(
              `[StoragePlugin] not found identifierKey '${identifier}': set '${key}' value error in ${this.constructor.name} module, make sure to use it after the module is constructed`,
            );
          }

          if (!storageKey) {
            storageKey = getStorageKey(identifier!);
          }

          globalThis.localStorage.setItem(storageKey, JSON.stringify(newVal));
          value = newVal;
        },
      };
    });
    Object.defineProperties(target, descriptors);
    return localStorageOnlyKeys;
  }
}
