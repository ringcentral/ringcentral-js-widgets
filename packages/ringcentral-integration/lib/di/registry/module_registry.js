import { DIError } from '../utils/error';

/**
 * Module registry is used to store module metadata.
 */
export default class ModuleRegistry {
  constructor() {
    // class reference -> metadata
    this._map = new Map();
  }

  get(moduleRef) {
    if (!this._map.has(moduleRef)) {
      throw DIError(`Cannot find module [${moduleRef.name}] in ModuleRegistry`);
    }
    return this._map.get(moduleRef).metadata;
  }

  resolved(moduleRef) {
    return this._map.get(moduleRef).resolved;
  }

  set(moduleRef, metadata) {
    if (this._map.has(moduleRef)) {
      throw DIError(`Can only register module [${moduleRef.name}] once`);
    }
    return this._map.set(moduleRef, { metadata, resolved: false });
  }

  resolve(moduleRef, metadata) {
    if (!this._map.has(moduleRef)) {
      throw DIError(`Cannot resolve module metadata [${moduleRef}]: module is not found`);
    }
    this._map.set(moduleRef, {
      metadata,
      resolved: true
    });
  }

  has(moduleRef) {
    return this._map.has(moduleRef);
  }

  entries() {
    return this._map.entries();
  }

  keys() {
    return this._map.keys();
  }

  reset() {
    this._map.clear();
  }
}
