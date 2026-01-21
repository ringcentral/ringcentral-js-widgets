import { loggerV2 } from '@ringcentral-integration/core/lib/logger/loggerV2';
import {
  action,
  getRef,
  getRehydrated,
  state,
  subscribe,
} from 'reactant-share';
import { BehaviorSubject, filter, map, shareReplay } from 'rxjs';

import {
  depsModulesKey,
  ignoreReadyModulesKey,
  initializedKey,
  initModuleKey,
  moduleInitTimeKey,
  ModuleStatus,
  notReadyModulesKey,
  rehydratedKey,
  subscribeModuleKey,
  userIdReadyKey,
} from '../constant';
import { Service } from '../interface';
import { Initiator } from '../modules/Initiator';

import type { RcViewModule } from './RcViewModule';
import { userStorageKey } from './decorators';
import { fromWatchValue } from './rxjs';

export interface IRcModule {
  status: ModuleStatus;
  pending: boolean;
  ready: boolean;
  resetting: boolean;
  initializing: boolean;
}

export class RcModule implements IRcModule {
  protected logger = loggerV2.create(this);

  status$ = fromWatchValue(this, () => this.status);

  /**
   * emit when module is ready
   *
   * 1. Only emit once when module is ready, if you want handle different status, you can use `status$`
   *      normally should work with retry(this.resetting$) to re-start the flow when user logout
   *
   * 2. if you want to handle base on ready state, you can use `readyState$`
   */
  ready$ = this.status$.pipe(filter(() => this.ready));

  readyState$ = this.status$.pipe(map(() => this.ready));

  resetting$ = this.status$.pipe(filter(() => this.resetting));

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
   * @deprecated
   */
  protected onStateChange?(): Promise<void> | void;

  private [initializedKey] = false;

  private [ignoreReadyModulesKey] = new Set<RcModule | RcViewModule>();

  /**
   * after onInitSuccess, initSuccess$ will emit true
   *
   * ### Only can use in test environment
   */
  initSuccess$?: BehaviorSubject<boolean>;

  constructor() {
    this[initModuleKey]();

    if (process.env.NODE_ENV === 'test') {
      this.initSuccess$ = new BehaviorSubject(false);
    }
  }

  private [initModuleKey]() {
    let initiator: Initiator | undefined;
    subscribe(this, () => {
      if (!initiator) {
        const container = getRef(this).container!;
        if (container.isBound(Initiator)) {
          initiator = container.got(Initiator);
          if (!initiator) {
            throw new Error('Initiator is not created');
          }
          initiator.beforeInitialize(this);
        } else {
          throw new Error('Initiator is not bound');
        }
      }
      if (initiator.shouldActivate) {
        this[subscribeModuleKey]();
        if (typeof this.onStateChange === 'function') {
          this.onStateChange();
        }
      }
    });
  }

  private async [subscribeModuleKey]() {
    if (this._shouldInit()) {
      let time: number;
      if (process.env.NODE_ENV !== 'production') {
        time = Date.now();
      }
      this._setStatus(ModuleStatus.Initializing);
      if (typeof this.onInitOnce === 'function' && !this[initializedKey]) {
        this[initializedKey] = true;
        await this.onInitOnce();
      }
      await this.onInit?.();
      this._setStatus(ModuleStatus.Ready);
      if (process.env.NODE_ENV !== 'production') {
        (this as any)[moduleInitTimeKey] = Date.now() - time!;
      }
      await this.onInitSuccess?.();
      if (process.env.NODE_ENV === 'test') {
        this.initSuccess$?.next(true);
      }
    } else if (this._shouldReset()) {
      this._setStatus(ModuleStatus.Resetting);
      await this.onReset?.();
      this._setStatus(ModuleStatus.Pending);

      if (process.env.NODE_ENV === 'test') {
        this.initSuccess$?.next(false);
      }
    }
  }

  private [depsModulesKey]: any[] | null = null;

  // TODO: remove this method, _shouldInit and _shouldReset
  // just workaround for migration phase
  private get [notReadyModulesKey]() {
    if (!this[depsModulesKey]) {
      const depsTokens: any[] = Reflect.getMetadata(
        'inversify:paramtypes',
        this.constructor,
      );
      const taggedTokens = Reflect.getMetadata(
        'inversify:tagged',
        this.constructor,
      );
      this[depsModulesKey] = [];

      const container = getRef(this).container!;

      depsTokens.forEach((item, index) => {
        const token = taggedTokens?.[index]
          ? /**
             * from `inversify` lib Meta interface
             * get the actual token
             */
            taggedTokens[index][0].value._cb()
          : item;
        const isBound = container.isBound(token);
        // TODO: should check here when do lazyLoad, find way to get all again.
        const depsModules = isBound ? container.getAll(token) : [];
        Array.prototype.push.apply(this[depsModulesKey], depsModules);
      });
    }
    return this[depsModulesKey].filter(
      (module: RcModule) =>
        module?.status &&
        !module.ready &&
        !this[ignoreReadyModulesKey].has(module),
    );
  }

  private get [rehydratedKey]() {
    const target: Service = this as any;
    const rehydrated = getRehydrated(target);
    if (target[userStorageKey]?.size) {
      return rehydrated && target[userIdReadyKey]?.();
    }
    return rehydrated !== false;
  }

  rehydrated$ = fromWatchValue(this, () => !!this[rehydratedKey]).pipe(
    filter(Boolean),
    // once rehydrated, shareReplay(1) to avoid re execute check again, that only rehydrated once in whole life cycle
    shareReplay(1),
  );

  protected _ignoreModuleReadiness(dep: RcModule | RcViewModule) {
    this[ignoreReadyModulesKey].add(dep);
  }

  /**
   * @deprecated
   */
  protected _shouldInit() {
    const areAllReady = this[notReadyModulesKey].length === 0;
    return areAllReady && this.pending;
  }

  /**
   * @deprecated
   */
  protected _shouldReset() {
    const areNotReady = this[notReadyModulesKey].length > 0;
    return areNotReady && this.ready;
  }

  @state
  status: ModuleStatus = ModuleStatus.Pending;

  @action
  private _setStatus(status: ModuleStatus) {
    this.status = status;
  }

  get pending() {
    return this.status === ModuleStatus.Pending && !!this[rehydratedKey];
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

  get identifier() {
    const identifier = getRef(this).identifier;

    return identifier!;
  }
}
