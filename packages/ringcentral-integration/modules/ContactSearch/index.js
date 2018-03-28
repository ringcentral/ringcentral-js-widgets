import uuid from 'uuid';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import loginStatus from '../../modules/Auth/loginStatus';
import proxify from '../../lib/proxy/proxify';
import debounce from '../../lib/debounce';
import actionTypes from './actionTypes';
import getContactSearchReducer from './getContactSearchReducer';
import getCacheReducer from './getCacheReducer';

export const AllContactSourceName = 'all';
export const DefaultMinimalSearchLength = 3;

/**
 * @class
 * @description Contact search module
 */
@Module({
  deps: [
    'Auth',
    'Storage',
    { dep: 'ContactSearchOptions', optional: true }
  ]
})
export default class ContactSearch extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {String} params.storageKey - storage key for storage module default "contactSearchCache"
   * @param {Number} params.minimalSearchLength - minimal search text length, default 3 characters
   * @param {Number} params.ttl - timestamp of local cache, default 5 mins
   */
  constructor({
    auth,
    storage,
    storageKey = 'contactSearchCache',
    minimalSearchLength = DefaultMinimalSearchLength,
    ttl = 5 * 60 * 1000, // 5 minutes
    ...options,
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = auth;
    this._storage = storage;
    this._storageKey = storageKey;
    this._minimalSearchLength = minimalSearchLength;
    this._ttl = ttl;
    this._searchSources = new Map();
    this._searchSourcesFormat = new Map();
    this._searchSourcesCheck = new Map();
    this._searchIds = {};
    if (this._storage) {
      this._reducer = getContactSearchReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getCacheReducer(this.actionTypes)
      });
    } else {
      this._reducer = getContactSearchReducer(this.actionTypes, {
        cache: getCacheReducer(this.actionTypes),
      });
    }
  }
  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._initModuleStatus();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
      this._clearStateCache();
    }
  }

  _shouldInit() {
    return (
      this._auth.loginStatus === loginStatus.loggedIn &&
      (!this._storage || this._storage.ready) &&
      this._readyCheck() &&
      !this.ready
    );
  }

  _shouldReset() {
    return (
      (
        this._auth.loginStatus !== loginStatus.loggedIn ||
        (this._storage && !this._storage.ready)
      ) &&
      this.ready
    );
  }

  _initModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _clearStateCache() {
    this.store.dispatch({
      type: this.actionTypes.cleanUp,
    });
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  resetSearchStatus() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
  }

  addSearchSource({
    sourceName, searchFn, readyCheckFn, formatFn
  }) {
    if (!sourceName) {
      throw new Error('ContactSearch: "sourceName" is required.');
    }
    if (this._searchSources.has(sourceName)) {
      throw new Error(`ContactSearch: A search source named "${sourceName}" already exists`);
    }
    if (this._searchSourcesCheck.has(sourceName)) {
      throw new Error(`ContactSearch: A search source check named "${sourceName}" already exists`);
    }
    if (this._searchSourcesFormat.has(sourceName)) {
      throw new Error(`ContactSearch: A search source format named "${sourceName}" already exists`);
    }
    if (typeof searchFn !== 'function') {
      throw new Error('ContactSearch: searchFn must be a function');
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error('ContactSearch: readyCheckFn must be a function');
    }
    if (typeof formatFn !== 'function') {
      throw new Error('ContactSearch: formatFn must be a function');
    }
    this._searchSources.set(sourceName, searchFn);
    this._searchSourcesFormat.set(sourceName, formatFn);
    this._searchSourcesCheck.set(sourceName, readyCheckFn);
  }

  debouncedSearch = debounce(this.search, 800, true)

  @proxify
  async search({ searchString }) {
    if (!this.ready || !searchString || (searchString.length < this._minimalSearchLength)) {
      this.store.dispatch({
        type: this.actionTypes.prepareSearch,
      });
      return;
    }
    this._clearTimeout();
    this._timeoutId = setTimeout(async () => {
      const searching = { ...this.state.searching };
      await this.search({ searchString: undefined });
      await this.search(searching);
    }, this._ttl);
    const searchOnSources = Array.from(this._searchSources.keys());
    for (const sourceName of searchOnSources) {
      await this._searchSource({
        searchOnSources,
        sourceName,
        searchString,
      });
    }
  }

  _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  // TODO Need to refactor, remove cache, and update data in real time.
  @proxify
  async _searchSource({ searchOnSources, sourceName, searchString }) {
    const searchId = uuid.v4();
    this._searchIds[sourceName] = searchId;
    this.store.dispatch({
      type: this.actionTypes.search,
    });
    try {
      let entities = null;
      entities = this._searchFromCache({ sourceName, searchString });
      if (entities) {
        this._loadSearching({ searchOnSources, searchString, entities });
        return;
      }
      entities = await this._searchSources.get(sourceName)({
        searchString,
      });
      entities = this._searchSourcesFormat.get(sourceName)(entities);
      this._saveSearching({ sourceName, searchString, entities });
      if (this._searchIds[sourceName] === searchId) {
        this._loadSearching({ searchOnSources, searchString, entities });
      }
    } catch (error) {
      this._onSearchError();
    }
  }

  _quickSort({ result = [], searchString = '' }) {
    const list = [...result];
    if (searchString === '') {
      return list;
    }
    return list.sort((current, next) => {
      const currentName = current.name || '';
      const currentPhoneNumber = current.phoneNumber || '';
      const nextName = next.name || '';
      const nextPhoneNumber = next.phoneNumber || '';
      const isSort = (
        currentName.indexOf(searchString) < nextName.indexOf(searchString) ||
        currentPhoneNumber.indexOf(searchString) < nextPhoneNumber.indexOf(searchString)
      );
      return isSort;
    });
  }

  _searchFromCache({ sourceName, searchString }) {
    const key = `${sourceName}-${searchString}`;
    const searching = this.cache && this.cache.contactSearch && this.cache.contactSearch[key];
    const now = Date.now();
    if (searching && (now - searching.timestamp) < this._ttl) {
      return searching.entities;
    }
    return null;
  }

  _readyCheck() {
    for (const sourceName of this._searchSourcesCheck.keys()) {
      if (!this._searchSourcesCheck.get(sourceName)()) {
        return false;
      }
    }
    return true;
  }

  _onSearchError() {
    this.store.dispatch({
      type: this.actionTypes.searchError,
    });
  }

  _loadSearching({ searchOnSources, searchString, entities }) {
    this.store.dispatch({
      type: this.actionTypes.searchSuccess,
      searchOnSources,
      searchString,
      entities,
    });
  }

  _saveSearching({ sourceName, searchString, entities }) {
    this.store.dispatch({
      type: this.actionTypes.save,
      sourceName,
      searchString,
      entities,
      ttl: this._ttl,
    });
  }

  get cache() {
    return this._storage ?
      this._storage.getItem(this._storageKey) :
      this.state.cache;
  }

  get status() {
    return this.state.status;
  }

  get searchStatus() {
    return this.state.searchStatus;
  }

  get searching() {
    return this.state.searching;
  }

  get searchResult() {
    return this.searching ? this.searching.result : [];
  }

  get sortedResult() {
    return this._quickSort(this.searching);
  }
}
