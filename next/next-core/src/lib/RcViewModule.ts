/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { loggerV2 } from '@ringcentral-integration/core/lib/logger/loggerV2';
import { ViewModule } from 'reactant-share';
import { filter, map } from 'rxjs';

import {
  ignoreReadyModulesKey,
  initModuleKey,
  ModuleStatus,
} from '../constant';

import { RcModule } from './RcModule';
import { fromWatchValue } from './rxjs';

export interface RcViewModule {
  [initModuleKey](): void;

  // that implement in RcModule with prototype
  get pending(): boolean;
  get ready(): boolean;
  get resetting(): boolean;
  get initializing(): boolean;
  get identifier(): string;
}

export abstract class RcViewModule extends ViewModule {
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

  status: ModuleStatus;

  private [ignoreReadyModulesKey] = new Set<RcModule | RcViewModule>();

  constructor() {
    super();
    this.status = ModuleStatus.Pending;
    this[initModuleKey]();
  }

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
  /**
   * @deprecated
   */
  // @ts-ignore that implement in RcModule with prototype
  protected _shouldInit(): boolean;
  /**
   * @deprecated
   */
  // @ts-ignore that implement in RcModule with prototype
  protected _shouldReset(): boolean;
}

// RcViewModule is multi-inherited , it needs to inherit implicitly from RcModule.
Object.defineProperties(
  RcViewModule.prototype,
  Object.getOwnPropertyDescriptors(RcModule.prototype),
);
