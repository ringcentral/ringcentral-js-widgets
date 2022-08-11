// @ts-nocheck
/**
 * Simple polyfill of localStorage object for using storageModules in node
 */
export class MemoryStorage<T extends string | null> implements Storage {
  private _data: Map<string, T> = new Map();

  getItem(key: string) {
    return this._data.get(key);
  }

  setItem(key: string, value: T) {
    this._data.set(key, value);
  }

  removeItem(key: string) {
    this._data.delete(key);
  }

  get length() {
    return this._data.size;
  }

  key(idx: number) {
    return [...this._data.keys()][idx];
  }

  keys() {
    return [...this._data.keys()];
  }

  ready() {
    return true;
  }

  clear() {
    this._data.clear();
  }
}
