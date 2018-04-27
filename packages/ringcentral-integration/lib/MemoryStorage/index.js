/**
 * @class
 * @description Simple polyfill of localStorage object for using storageModules in node
 */

export default class MemoryStorage {
  constructor() {
    this._data = new Map();
  }
  getItem(key) {
    return this._data.get(key);
  }
  setItem(key, value) {
    this._data.set(key, value);
  }
  removeItem(key) {
    this._data.delete(key);
  }
  get length() {
    return this._data.size;
  }
  key(idx) {
    return [...this._data.keys()][idx];
  }
}
