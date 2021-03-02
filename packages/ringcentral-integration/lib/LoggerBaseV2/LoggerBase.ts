import {
  state,
  action,
  computed,
  RcModuleV2,
} from '@ringcentral-integration/core';
import proxify from '../proxy/proxify';
import { defaultIdentityFunction, convertListToMap } from './loggerBaseHelper';
import { Deps, LogOptions, Options } from './LoggerBase.interface';

export abstract class LoggerBase<T = any> extends RcModuleV2<Deps & T> {
  protected _identityFunction: (
    ...args: any
  ) => string = defaultIdentityFunction;

  abstract _logFunction: <P, S>(options: LogOptions<P, S>) => Promise<void>;

  abstract _readyCheckFunction: () => boolean;

  protected _logPromises = new Map<string, Promise<void>>();

  constructor(deps: Deps, options: Options) {
    super({
      deps,
      ...options,
    });
  }

  @state
  loggingList: string[] = [];

  @action
  setLoggingList(id: string) {
    if (this.loggingList.indexOf(id) === -1) {
      this.loggingList.push(id);
    }
  }

  @action
  filterLoggingListById(id: string) {
    this.loggingList = this.loggingList.filter((item) => item !== id);
  }

  @action
  resetLoggingList() {
    this.loggingList = [];
  }

  _shouldInit() {
    return !!(super._shouldInit() && this._readyCheckFunction());
  }

  _shouldReset() {
    return !!(super._shouldReset() || !this._readyCheckFunction());
  }

  onReset() {
    this.resetLoggingList();
  }

  @proxify
  async _log<P, S>({ item, ...options }: LogOptions<P, S>) {
    if (!this.ready) {
      throw new Error(`${this.constructor.name}._log: module is not ready.`);
    }
    if (!item) {
      throw new Error(
        `${this.constructor.name}._log: options.item is undefined.`,
      );
    }

    const id = this._identityFunction(item);
    // wait for the previous log action to finish
    if (this._logPromises.has(id)) {
      await this._logPromises.get(id);
    }
    try {
      this.setLoggingList(id);
      const promise = this._logFunction({ item, ...options });
      this._logPromises.set(id, promise);
      await promise;
      this._logPromises.delete(id);
      this.filterLoggingListById(id);
    } catch (error) {
      this._logPromises.delete(id);
      this.filterLoggingListById(id);
      throw error;
    }
  }

  @proxify
  async log<P, S>({ item, ...options }: LogOptions<P, S>) {
    if (!this.ready) {
      throw new Error(`${this.constructor.name}.log: module is not ready.`);
    }
    if (!item) {
      throw new Error(
        `${this.constructor.name}.log: options.item is undefined.`,
      );
    }
    await this._log({ item, ...options });
  }

  @computed<LoggerBase>((that) => [that.loggingList])
  get loggingMap() {
    return convertListToMap(this.loggingList);
  }
}
