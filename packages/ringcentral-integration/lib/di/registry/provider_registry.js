import { DIError } from '../utils/error';

/**
 * ProviderRegistry is a centralized structure for storing provider metadata.
 * It's a map data structure mapping Token to Provider.
 */
export default class ProviderRegistry {
  constructor() {
    this._map = new Map();
  }

  get(token) {
    if (!this._map.has(token)) {
      throw DIError(`Can not find token [${token}] in ProviderRegistry`);
    }
    return this._map.get(token).providers;
  }

  set(token, providers) {
    if (this._map.has(token)) {
      throw DIError(`Can only register [${token}] once`);
    }
    return this._map.set(token, { providers, resolved: false });
  }

  resolved(token) {
    return !!this._map.get(token).resolved;
  }

  resolve(token, providers) {
    if (!this._map.has(token)) {
      throw DIError(`Cannot resolve provider metadata [${token}]: providers is not found`);
    }
    this._map.set(token, { providers, resolved: true });
  }

  has(token) {
    return this._map.has(token);
  }

  reset() {
    this._map.clear();
  }
}
