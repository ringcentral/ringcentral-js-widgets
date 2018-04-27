import RcModule from '../RcModule';
import { Library } from '../di';
import { prefixEnum } from '../Enum';
import SynchronizedStorage from '../../lib/SynchronizedStorage';

import actionTypesBase from './actionTypesBase';
import moduleStatuses from '../../enums/moduleStatuses';

import getStorageReducer from './getStorageReducer';


/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
@Library({
  deps: [{ dep: 'StorageBaseOptions', optional: true }]
})
export default class StorageBase extends RcModule {
  constructor({
    name,
    actionTypes = prefixEnum({ enumMap: actionTypesBase, prefix: name }),
    StorageProvider = SynchronizedStorage,
    ...options,
  }) {
    if (!name) {
      throw new Error('name must be defined');
    }
    super({
      ...options,
      actionTypes,
    });
    this._StorageProvider = StorageProvider;
    this._reducers = {};
    this._reducer = getStorageReducer({ types: this.actionTypes, reducers: this._reducers });
  }

  registerReducer({ key, reducer }) {
    if (this._initialized) {
      throw new Error('Reducers must be registered before initialize');
    }
    if (this._reducers[key]) {
      throw new Error(`Reducer of key: '${key}' already exists`);
    }
    this._reducers[key] = reducer;
  }

  getItem(key) {
    return this.state.data[key];
  }

  get data() {
    return this.state.data;
  }

  get status() {
    return this.state.status;
  }

  get storageKey() {
    return this.state.storageKey;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }
}
