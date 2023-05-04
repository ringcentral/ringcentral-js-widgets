// @ts-nocheck
import { Module } from '../../lib/di';
import { IStorage, StorageBase } from '../../lib/StorageBase';
import { loginStatus } from '../Auth';
import { Deps } from './Storage.interface';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class Storage<T extends Deps = Deps> extends StorageBase<T> {
  protected _disableInactiveTabsWrite: boolean;
  protected _storage: IStorage;
  protected _storageHandler: ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => void = null;

  constructor(deps: T) {
    super(deps, {
      name: 'storage',
      StorageProvider: deps.storageOptions?.StorageProvider,
    });
    this._disableInactiveTabsWrite =
      this._deps.storageOptions?.disableInactiveTabsWrite ?? true;
  }

  storedData: Record<string, any> = {};

  get storageWritable() {
    return (
      !this._disableInactiveTabsWrite ||
      !this._deps.tabManager ||
      this._deps.tabManager.active
    );
  }

  override onStateChange() {
    if (this.ready && this.storageWritable) {
      const currentData = this.data;
      // save new data to storage when changed
      for (const key in currentData) {
        if (this.storedData[key] !== currentData[key]) {
          /*
           * This workaround is used to fix their respective dataFetcherV2
           * instance storage data sync issue caused by different modules in
           * two different instances in browser windows with the same origin.
           */
          const deep = key.includes('dataFetcherV2') ? 2 : 0;
          const newValue = this.updateMinimumSet(
            this.storedData[key],
            currentData[key],
            deep,
          );
          this.storedData[key] = newValue;
          this._storage.setItem(key, newValue);
        }
      }
    }
  }

  updateMinimumSet(oldData: any, newData: any, deep = 0) {
    if (deep === 0) {
      return newData;
    }

    if (!newData || !oldData || typeof newData !== 'object') {
      return newData;
    }

    for (const key in newData) {
      if (oldData[key] !== newData[key]) {
        oldData[key] = this.updateMinimumSet(
          oldData[key],
          newData[key],
          deep - 1,
        );
      }
    }
    return oldData;
  }

  get storageKey() {
    return `${this.prefix ? `${this.prefix}-` : ''}storage-${
      this._deps.auth.ownerId
    }`;
  }

  override async onInit() {
    this._storage = new this._StorageProvider({
      storageKey: this.storageKey,
    });
    this.storedData = await this._storage.getData();
    if (!this._deps.storageOptions?.disableClearUnused) {
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
      if (
        !Object.prototype.hasOwnProperty.call(this.storedData, key) &&
        this.storageWritable
      ) {
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

  override _shouldInit() {
    return (
      this._deps.auth.loginStatus === loginStatus.loggedIn &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      this.pending
    );
  }

  override _shouldReset() {
    return (
      ((!!this._deps.tabManager && !this._deps.tabManager.ready) ||
        this._deps.auth.notLoggedIn) &&
      this.ready
    );
  }

  override onReset() {
    if (this._storageHandler) {
      if (this._storage.off) {
        this._storage.off('storage', this._storageHandler);
      } else if (this._storage.removeListener) {
        this._storage.removeListener('storage', this._storageHandler);
      }
      this._storageHandler = null;
    }
    if (this._storage) {
      this._storage.destroy();
      this._storage = null;
    }
    this.resetData();
  }
}
