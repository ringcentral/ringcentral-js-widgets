// @ts-nocheck
import { Module } from '../../lib/di';
import type { IStorage } from '../../lib/StorageBase';
import { StorageBase } from '../../lib/StorageBase';
import type { Deps } from './GlobalStorage.interface';

@Module({
  name: 'GlobalStorage',
  deps: [{ dep: 'GlobalStorageOptions', optional: true }],
})
export class GlobalStorage extends StorageBase<Deps> {
  protected _storage: IStorage;
  protected _storageHandler: ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => void = null;

  constructor(deps: Deps) {
    super(deps, {
      name: 'globalStorage',
      StorageProvider: deps.globalStorageOptions?.StorageProvider,
    });
  }

  storedData: Record<string, any> = {};

  override onStateChange() {
    if (this.ready) {
      const currentData = this.data;
      // save new data to storage when changed
      for (const key in currentData) {
        if (this.storedData[key] !== currentData[key]) {
          this._storage.setItem(key, currentData[key]);
          this.storedData[key] = currentData[key];
        }
      }
    }
  }

  override async onInit() {
    const storageKey = `${this.prefix ? `${this.prefix}-` : ''}GlobalStorage`;
    this._storage = new this._StorageProvider({
      storageKey,
    });
    this.storedData = await this._storage.getData();
    if (!this._deps.globalStorageOptions?.disableClearUnused) {
      for (const key in this.storedData) {
        if (!this._storageReducers[key]) {
          delete this.storedData[key];
          await this._storage.removeItem(key);
        }
      }
    }
    this.setData({
      ...this.data,
      ...this.storedData,
    });
    const currentData = this.data;
    for (const key in currentData) {
      if (!Object.prototype.hasOwnProperty.call(this.storedData, key)) {
        this._storage.setItem(key, currentData[key]);
      }
    }
  }

  override onInitSuccess() {
    this._storageHandler = ({ key, value }) => {
      if (this.ready) {
        this.storedData[key] = value;
        this.syncData(key, value);
      }
    };
    this._storage.on('storage', this._storageHandler);
  }
}
