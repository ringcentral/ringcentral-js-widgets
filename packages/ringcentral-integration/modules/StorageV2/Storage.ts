import { Module } from '../../lib/di';
import { IStorage, StorageBase } from '../../lib/StorageBaseV2';
import loginStatus from '../Auth/loginStatus';
import { Deps } from './Storage.interface';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class Storage<T = {}> extends StorageBase<Deps & T> {
  /* migration storage v1 to v2 */
  public migrationMapping: Record<string, string | Record<string, string>> = {};
  /* migration storage v1 to v2 */
  protected _disableInactiveTabsWrite: boolean;
  protected _storage: IStorage;
  protected _storageHandler: ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => void = null;

  constructor(deps: Deps & T) {
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

  onStateChange() {
    if (this.ready && this.storageWritable) {
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

  get storageKey() {
    return `${this.prefix ? `${this.prefix}-` : ''}storage-${
      this._deps.auth.ownerId
    }`;
  }

  async onInit() {
    this._storage = new this._StorageProvider({
      storageKey: this.storageKey,
    });
    this.storedData = await this._storage.getData();
    /* migration storage v1 to v2 */
    /* eslint-disable */
    for (const newKey in this.migrationMapping) {
      const oldKey = this.migrationMapping[newKey];
      if (typeof oldKey === 'string') {
        if (this.storedData[oldKey]) {
          this.storedData[newKey] = this.storedData[oldKey];
        }
      } else if (typeof oldKey === 'object') {
        for (const index in oldKey) {
          if (this.storedData[oldKey[index]]) {
            this.storedData[newKey] = this.storedData[newKey] ?? {};
            (this.storedData[newKey] as Record<string, any>)[index] =
              this.storedData[oldKey[index]];
          }
        }
      }
      if (
        typeof this.storedData[newKey] !== 'undefined' &&
        this.storageWritable
      ) {
        this._storage.setItem(newKey, this.storedData[newKey]);
      }
    }
    /* eslint-enable */
    /* migration storage v1 to v2 */
    for (const key in this.storedData) {
      if (!this._storageReducers[key]) {
        delete this.storedData[key];
        await this._storage.removeItem(key);
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

  onInitSuccess() {
    this._storageHandler = ({ key, value }) => {
      if (this.ready) {
        this.storedData[key] = value;
        this.syncData(key, value);
      }
    };
    this._storage.on('storage', this._storageHandler);
  }

  _shouldInit() {
    return (
      this._deps.auth.loginStatus === loginStatus.loggedIn &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      ((!!this._deps.tabManager && !this._deps.tabManager.ready) ||
        this._deps.auth.notLoggedIn) &&
      this.ready
    );
  }

  onReset() {
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
