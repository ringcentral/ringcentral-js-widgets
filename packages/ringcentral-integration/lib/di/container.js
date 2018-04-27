import { DIError } from './utils/error';

export default class Container {
  constructor() {
    this.parent = null;
    this._map = new Map();
  }

  has(token) {
    if (this._map.has(token)) return true;
    if (this.parent !== null) return this.parent.has(token);
    return false;
  }

  get(token) {
    if (this._map.has(token)) return this._map.get(token);
    if (this.parent !== null) return this.parent.get(token);
    throw DIError(`Cannot find provider [${token}] in Container`);
  }

  set(token, metadata) {
    if (this._map.has(token)) {
      throw DIError(`Cannot store duplicated provider instance [${token}] to Container`);
    }
    return this._map.set(token, metadata);
  }

  localHas(token) {
    return this._map.has(token);
  }

  localGet(token) {
    return this._map.get(token);
  }

  setParent(parent) {
    this.parent = parent;
  }

  entries() {
    return this._map.entries();
  }

  values() {
    return this._map.values();
  }

  reset() {
    this._map.clear();
  }
}
