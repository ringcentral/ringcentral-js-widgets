import uuid from 'uuid';
import emitter from 'event-emitter';
import MemoryStorage from './MemoryStorage';

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance

export default class SynchronizedStorage {
  constructor({
    storageKey,
  }) {
    if (!storageKey) {
      throw Error('SynchronizedStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._id = uuid.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      this._storageHandler = (event) => {
        if (
          event.key !== null &&
          typeof event.key !== 'undefined' &&
          event.key.substring(0, this._storageKey.length) === this._storageKey
        ) {
          try {
            const {
              setter,
            } = JSON.parse(event.newValue);
            if (setter && setter !== this.id) {
              const key = event.key.substring(this._storageKey.length + 1);
              // It seems that IE11 does not update the actual localStorage object
              // in the same event cycle...
              setTimeout(() => {
                this.emit('storage', {
                  key,
                  value: this.getItem(key),
                });
              }, 0);
            }
          } catch (error) {
            /* ignore error */
          }
        }
      };
      this._localStorage = localStorage;
      window.addEventListener('storage', this._storageHandler);
    } else {
      this._localStorage = new MemoryStorage();
    }
  }
  getLocalStorageKeys() {
    const len = this._localStorage.length;
    const keys = [];
    for (let i = 0; i < len; i += 1) {
      const key = this._localStorage.key(i);
      if (key && key !== '') {
        keys.push(key);
      }
    }
    return keys;
  }
  getData() {
    const output = {};
    this.getLocalStorageKeys().forEach((key) => {
      if (key.substring(0, this._storageKey.length) === this._storageKey) {
        const dataKey = key.substring(this._storageKey.length + 1);
        output[dataKey] = this.getItem(dataKey);
      }
    });
    return output;
  }
  getItem(key) {
    try {
      const {
        value,
      } = JSON.parse(this._localStorage.getItem(`${this._storageKey}-${key}`));
      return value;
    } catch (error) {
      return undefined;
    }
  }
  setItem(key, value) {
    this._localStorage.setItem(
      `${this._storageKey}-${key}`,
      JSON.stringify({
        value,
        setter: this.id,
      }),
    );
  }
  removeItem(key) {
    this._localStorage.removeItem(
      `${this._storageKey}-${key}`,
    );
  }
  destroy() {
    if (this._storageHandler) {
      window.removeEventListener('storage', this._storageHandler);
    }
  }
  get id() {
    return this._id;
  }
}

emitter(SynchronizedStorage.prototype);
