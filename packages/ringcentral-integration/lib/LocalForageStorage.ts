// @ts-nocheck
import { EventEmitter } from 'events';
import localforage from 'localforage';
import { v4 } from 'uuid';

import type {
  AsyncStorage,
  StorageItem,
} from '../interfaces/GenericStorage.interface';

import { MemoryStorage } from './MemoryStorage';

export class LocalForageStorage extends EventEmitter implements AsyncStorage {
  private _storageKey: string;
  private _storageSyncKey: string;
  private _ready: boolean;
  private _id: string;
  private _localforage: LocalForage | MemoryStorage<any>;
  private _tabSyncHandler: (this: Window, ev: StorageEvent) => any;

  constructor({ storageKey }: { storageKey: string }) {
    super();
    if (!storageKey) {
      throw Error('LocalforageStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._storageSyncKey = `${storageKey}-sync`;
    this._ready = false;
    this._id = v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      localforage.config({ name: this._storageKey });
      this._localforage = localforage.createInstance({
        name: this._storageKey,
      });
      this._tabSyncHandler = async (event) => {
        if (
          event.key !== null &&
          typeof event.key !== 'undefined' &&
          event.key.substring(0, this._storageSyncKey.length) ===
            this._storageSyncKey
        ) {
          try {
            const { setter } = JSON.parse(event.newValue);
            if (!setter || setter === this.id) {
              return;
            }
            const key = event.key.substring(this._storageSyncKey.length + 1);
            const value = await this.getItem(key);
            this.emit('storage', {
              key,
              value,
            });
          } catch (e: any /** TODO: confirm with instanceof */) {
            /* ignore error */
          }
        }
      };
      window.addEventListener('storage', this._tabSyncHandler);
    } else {
      this._localforage = new MemoryStorage();
    }
  }

  _updateStorageSyncData(key: string) {
    if (typeof localStorage !== 'undefined') {
      const syncKey = `${this._storageSyncKey}-${key}`;
      localStorage.setItem(
        syncKey,
        JSON.stringify({
          timestamp: Date.now(),
          setter: this.id,
        }),
      );
    }
  }

  async getLocalStorageKeys() {
    const keys = await this._localforage.keys();
    return keys;
  }

  async getData() {
    await this.ready();
    const output: Record<string, StorageItem['value']> = {};
    const keys = await this.getLocalStorageKeys();
    const promises = keys.map((key) =>
      this.getItem(key).then((data) => {
        output[key] = data;
      }),
    );
    await Promise.all(promises);
    return output;
  }

  async getItem(key: string) {
    // TODO: fix MemoryStorage set value with `string`;
    const originalData: StorageItem = await this._localforage.getItem(key);
    try {
      const { value } = originalData;
      return value;
    } catch (error: any /** TODO: confirm with instanceof */) {
      return undefined;
    }
  }

  async setItem(key: string, value: StorageItem['value']) {
    // TODO: fix MemoryStorage get value with `string`;
    await this._localforage.setItem<StorageItem>(key, {
      value,
      setter: this.id,
    });
    try {
      this._updateStorageSyncData(key);
    } catch (error: any /** TODO: confirm with instanceof */) {
      console.error(error);
    }
  }

  async removeItem(key: string) {
    await this._localforage.removeItem(key);
  }

  destroy() {
    if (this._tabSyncHandler) {
      window.removeEventListener('storage', this._tabSyncHandler);
    }
  }

  get id() {
    return this._id;
  }

  async ready(): Promise<void | boolean> {
    if (this._ready) {
      return;
    }
    if (typeof this._localforage.ready === 'function') {
      await this._localforage.ready();
    }
    this._ready = true;
  }

  get driver() {
    if (this._localforage instanceof MemoryStorage) {
      return 'MEMORYSTORAGE';
    }
    switch (this._localforage.driver()) {
      case localforage.WEBSQL:
        return 'WEBSQL';
      case localforage.INDEXEDDB:
        return 'INDEXEDDB';
      case localforage.LOCALSTORAGE:
        return 'LOCALSTORAGE';
      default:
        return null;
    }
  }
}
