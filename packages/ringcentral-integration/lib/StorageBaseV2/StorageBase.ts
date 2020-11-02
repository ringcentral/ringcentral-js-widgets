import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { Reducer, ReducersMapObject } from 'redux';
import { RcModuleV2, state } from '@ringcentral-integration/core';
import { SynchronizedStorage } from '../SynchronizedStorage';
import { actionTypesBase, ActionTypesBase } from './actionTypesBase';
import { getDataReducer } from './getStorageReducer';
import { Module } from '../di';
import {
  Deps,
  IStorage,
  StorageBaseOptions,
  IStorageBaseOptions,
} from './StorageBase.interface';
import getModuleStatusReducer from '../getModuleStatusReducer';

@Module({
  name: 'StorageBase',
  deps: [{ dep: 'Prefix', optional: true }],
})
export abstract class StorageBase<T> extends RcModuleV2<Deps & T> {
  protected abstract _storage: IStorage;
  protected _storageReducers: ReducersMapObject = {};
  protected _storageReducer: Reducer;
  protected _StorageProvider: IStorageBaseOptions['StorageProvider'];
  protected _storageActionTypes: ActionTypesBase;

  constructor(deps: Deps, storageBaseOptions: StorageBaseOptions) {
    super({
      deps,
    });
    if (!storageBaseOptions.name) {
      throw new Error('name must be defined');
    }
    this._StorageProvider =
      storageBaseOptions.StorageProvider ?? SynchronizedStorage;
    this._storageActionTypes = ObjectMap.prefixKeys(
      [...ObjectMap.keys(actionTypesBase)],
      storageBaseOptions.name,
    );
    this._storageReducer = getDataReducer({
      types: this._storageActionTypes,
      reducers: this._storageReducers,
    });
  }

  public getReducers(actionTypes: Record<string, string>) {
    return {
      ...super.getReducers(actionTypes),
      data: this._storageReducer,
      __status__: getModuleStatusReducer(this._storageActionTypes),
    };
  }

  get data(): Record<string, unknown> {
    return this._store.getState()[this.__key__].data;
  }

  /**
   * register storage reducer
   */
  registerReducer({ key, reducer }: { key: string; reducer: Reducer }) {
    if (this._storageReducers[key]) {
      throw new Error(`Reducer of key: '${key}' already exists`);
    }
    this._storageReducers[key] = reducer;
  }

  getItem(key: string) {
    return this.data[key];
  }

  get driver() {
    if (this.ready) {
      return this._storage.driver;
    }
    return null;
  }

  get prefix() {
    return this._deps.prefix;
  }
}
