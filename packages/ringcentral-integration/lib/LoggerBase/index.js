import RcModule from '../RcModule';
import { Library } from '../di';
import { prefixEnum } from '../Enum';
import ensureExist from '../ensureExist';

import moduleStatuses from '../../enums/moduleStatuses';
import baseActionTypes from './baseActionTypes';
import getDefaultReducer from './getDefaultReducer';
import proxify from '../proxy/proxify';

/**
 * @function defaultIdentityFunction
 * @description Identity function returns a deterministic id value for each item.
 * @param {Object} item
 * @return {String}
 */
export function defaultIdentityFunction(item) {
  return item.id;
}

/**
 * @function
 * @description Convert array of { name, id } objects into a map.
 * @param {[{ name: String, id: String }]} loggingList
 * @return {{ [ids]: { [names]: true } }}
 */
export function convertListToMap(loggingList) {
  const mapping = {};
  loggingList.forEach((id) => {
    mapping[id] = true;
  });
  return mapping;
}

/**
 * @class
 * @description Base class implementation for loggers.
 */
@Library({
  deps: [{ dep: 'LoggerBaseOptions', optional: true }]
})
export default class LoggerBase extends RcModule {
  /**
   * @constructor
   * @param {String} params.name - name of the class
   * @param {Object} params.actionTypes
   * @param {Function} params.getReducer
   * @param {Function} params.identityFunction - function that can derive an unique
   *    id from items.
   */
  constructor({
    name,
    actionTypes = prefixEnum({ base: baseActionTypes, prefix: name }),
    getReducer = getDefaultReducer,
    identityFunction = defaultIdentityFunction,
    logFunction,
    readyCheckFunction,
    ...options,
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._name = this::ensureExist(name, 'name');
    this._identityFunction = this::ensureExist(identityFunction, 'identityFunction');
    this._logFunction = this::ensureExist(logFunction, 'logFunction');
    this._readyCheckFunction = this::ensureExist(readyCheckFunction, 'readyCheckFunction');

    this._reducer = getReducer(this.actionTypes);

    this._logPromises = new Map();

    this.addSelector('loggingMap',
      () => this.loggingList,
      convertListToMap,
    );
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _shouldInit() {
    return this.pending &&
      this._readyCheckFunction();
  }
  _shouldReset() {
    return this.ready &&
      !this._readyCheckFunction();
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (typeof this._onInit === 'function') {
        await this._onInit();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      if (typeof this._onReset === 'function') {
        await this._onReset();
      }
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  @proxify
  async _log({ item, ...options } = {}) {
    if (!this.ready) {
      throw new Error(`${this.constructor.name}._log: module is not ready.`);
    }
    if (!item) {
      throw new Error(`${this.constructor.name}._log: options.item is undefined.`);
    }

    const id = this._identityFunction(item);
    // wait for the previous log action to finish
    if (this._logPromises.has(id)) {
      await this._logPromises.get(id);
    }
    try {
      this.store.dispatch({
        type: this.actionTypes.log,
        id,
      });
      const promise = this._logFunction({ item, ...options });
      this._logPromises.set(id, promise);
      await promise;
      this._logPromises.delete(id);
      this.store.dispatch({
        type: this.actionTypes.logSuccess,
        id,
      });
    } catch (error) {
      this._logPromises.delete(id);
      this.store.dispatch({
        type: this.actionTypes.logError,
        error,
        id,
      });
      throw error;
    }
  }

  @proxify
  async log({ item, ...options }) {
    if (!this.ready) {
      throw new Error(`${this.constructor.name}.log: module is not ready.`);
    }
    if (!item) {
      throw new Error(`${this.constructor.name}.log: options.item is undefined.`);
    }
    await this._log({ item, ...options });
  }

  get status() {
    return this.state.status;
  }

  get loggingList() {
    return this.state.loggingList;
  }

  get loggingMap() {
    return this._selectors.loggingMap();
  }
}
