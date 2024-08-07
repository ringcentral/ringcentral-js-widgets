import {
  action,
  RcModuleV2,
  spawnReducersKey,
  spawnStorageReducersKey,
  stateKey,
} from '@ringcentral-integration/core';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import type { Action, Reducer, ReducersMapObject } from 'redux';
import { combineReducers } from 'redux';

import { SynchronizedStorage } from '../SynchronizedStorage';
import { Module } from '../di';

import type {
  Deps,
  IStorage,
  IStorageBaseOptions,
  StorageBaseOptions,
} from './StorageBase.interface';
import type { ActionTypesBase } from './actionTypesBase';
import { actionTypesBase } from './actionTypesBase';
import { getDataReducer } from './getStorageReducer';

@Module({
  name: 'StorageBase',
  deps: [{ dep: 'Prefix', optional: true }],
})
export abstract class StorageBase<T extends Deps = Deps> extends RcModuleV2<T> {
  protected abstract _storage: IStorage;
  protected _storageReducers: ReducersMapObject = {};
  protected _storageReducer: Reducer;
  protected _StorageProvider: IStorageBaseOptions['StorageProvider'];
  protected _storageActionTypes: ActionTypesBase;

  constructor(deps: T, storageBaseOptions: StorageBaseOptions) {
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

  @action
  syncData(key: string, value: any) {
    this.data[key] = value;
  }

  @action
  setData(data: Record<string, any>) {
    this.data = data;
  }

  @action
  resetData() {
    Object.entries(this._storageReducers).forEach(([key, reducer]) => {
      this.data[key] = reducer(undefined, {} as Action<any>);
    });
  }

  override get reducer() {
    if (this._reducers)
      return combineReducers({
        ...this._reducers,
        data: this._storageReducer,
      });
    this[spawnStorageReducersKey]();
    this[spawnReducersKey]();
    return combineReducers({
      ...this._reducers!,
      data: this._storageReducer,
    }) as Reducer<any, Action>;
  }

  get data() {
    return this[stateKey].data;
  }

  set data(value: Record<string, any>) {
    this[stateKey].data = value;
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
