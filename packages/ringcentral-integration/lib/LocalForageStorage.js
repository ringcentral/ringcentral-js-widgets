import uuid from 'uuid';
import emitter from 'event-emitter';
import localforage from 'localforage';

import MemoryStorage from './MemoryStorage';

export default class LocalforageStorage {
  constructor({
    storageKey,
  }) {
    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._storageSyncKey = `${storageKey}-sync`;
    this._ready = false;
    this._id = uuid.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      localforage.config({ name: this._storageKey });
      this._localforage = localforage.createInstance({
        name: this._storageKey,
      });
      this._tabSyncHandler = async (event) => {
        if (
          event.key !== null &&
          typeof event.key !== 'undefined' &&
          event.key.substring(0, this._storageSyncKey.length) === this._storageSyncKey
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
          } catch (e) {
            /* ignore error */
          }
        }
      };
      window.addEventListener('storage', this._tabSyncHandler);
    } else {
      this._localforage = new MemoryStorage();
    }
  }

  _updateStorageSyncData(key) {
    if (typeof localStorage !== 'undefined') {
      const syncKey = `${this._storageSyncKey}-${key}`;
      localStorage.setItem(
        syncKey,
        JSON.stringify({
          timestamp: Date.now(),
          setter: this.id,
        })
      );
    }
  }

  async getLocalStorageKeys() {
    const keys = await this._localforage.keys();
    return keys;
  }

  async getData() {
    await this.ready();
    const output = {};
    const keys = await this.getLocalStorageKeys();
    const promises = keys.map(key =>
      this.getItem(key).then((data) => { output[key] = data; })
    );
    await Promise.all(promises);
    return output;
  }

  async getItem(key) {
    const originalData = await this._localforage.getItem(key);
    try {
      const { value } = originalData;
      return value;
    } catch (error) {
      return undefined;
    }
  }

  async setItem(key, value) {
    await this._localforage.setItem(
      key,
      { value, setter: this.id },
    );
    this.emit('storage', {
      key,
      value,
    });
    this._updateStorageSyncData(key);
  }

  async removeItem(key) {
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

  async ready() {
    if (this._ready) {
      return;
    }
    if (typeof this._localforage.ready === 'function') {
      await this._localforage.ready();
    }
    this._ready = true;
  }
}

emitter(LocalforageStorage.prototype);
