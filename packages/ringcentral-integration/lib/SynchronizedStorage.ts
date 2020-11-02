import EventEmitter from 'events';
import * as uuid from 'uuid';
import { MemoryStorage } from './MemoryStorage';
import {
  GenericStorage,
  StorageItem,
} from '../interfaces/GenericStorage.interface';

// TODO: experiment with a managed list of keys to watch rather than matching every event with
// storageKey might provide better performance

export class SynchronizedStorage
  extends EventEmitter
  implements GenericStorage {
  private _storageKey: string;
  private _id: string;
  private _localStorage: Storage | MemoryStorage<string | null>;
  private _storageHandler: (this: Window, ev: StorageEvent) => any;

  constructor({ storageKey }: { storageKey: string }) {
    super();
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
            const { setter, value } = JSON.parse(event.newValue);
            if (setter && setter !== this.id) {
              const key = event.key.substring(this._storageKey.length + 1);
              // fire storage event directly from the native event
              // may reduce the chance of failing to get updated data
              // if there is heavy localStorage load
              this.emit('storage', {
                key,
                value,
              });
              // It seems that IE11 does not update the actual localStorage object
              // in the same event cycle...
              // setTimeout(() => {
              //   this.emit('storage', {
              //     key,
              //     value: this.getItem(key),
              //   });
              // }, 0);
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
    const output: Record<string, StorageItem['value']> = {};
    this.getLocalStorageKeys().forEach((key) => {
      if (key.substring(0, this._storageKey.length) === this._storageKey) {
        const dataKey = key.substring(this._storageKey.length + 1);
        output[dataKey] = this.getItem(dataKey);
      }
    });
    return output;
  }

  getItem(key: string) {
    try {
      const { value }: StorageItem = JSON.parse(
        this._localStorage.getItem(`${this._storageKey}-${key}`),
      );
      return value;
    } catch (error) {
      return undefined;
    }
  }

  setItem(key: string, value: StorageItem['value']) {
    this._localStorage.setItem(
      `${this._storageKey}-${key}`,
      JSON.stringify({
        value,
        setter: this.id,
      }),
    );
  }

  removeItem(key: string) {
    this._localStorage.removeItem(`${this._storageKey}-${key}`);
  }

  destroy() {
    if (this._storageHandler) {
      window.removeEventListener('storage', this._storageHandler);
    }
  }

  get id() {
    return this._id;
  }

  get driver() {
    if (this._localStorage === localStorage) {
      return 'LOCALSTORAGE';
    }
    return 'MEMORYSTORAGE';
  }
}
