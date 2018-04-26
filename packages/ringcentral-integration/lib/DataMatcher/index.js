import 'core-js/fn/array/every';
import RcModule from '../RcModule';
import { Library } from '../di';
import { prefixEnum } from '../Enum';
import moduleStatuses from '../../enums/moduleStatuses';
import baseActionTypes from './baseActionTypes';
import getDefaultReducer from './getDefaultReducer';
import getDefaultDataReducer from './getDefaultDataReducer';
import proxify from '../../lib/proxy/proxify';

export function checkName(name) {
  if (!name) {
    throw new Error('DataMatcher: "name" is required.');
  }
  if (typeof name !== 'string') {
    throw new Error('DataMatcher: "name" must be a string.');
  }
}

const DEFAULT_TTL = 30 * 1000;
const DEFAULT_NO_MATCH_TTL = 30 * 1000;

@Library({
  deps: [
    { dep: 'Storage', optional: true },
    { dep: 'DataMatcherOptions', optional: true }
  ]
})
export default class DataMatcher extends RcModule {
  constructor({
    name,
    storage,
    ttl = DEFAULT_TTL,
    noMatchTtl = DEFAULT_NO_MATCH_TTL,
    disableCache = false,
    actionTypes = prefixEnum({ base: baseActionTypes, prefix: name }),
    storageKey = `${name}Data`,
    getReducer = getDefaultReducer,
    getDataReducer = getDefaultDataReducer,
    ...options,
  } = {}) {
    checkName(name);
    super({
      ...options,
      actionTypes,
    });

    this._querySources = new Map();
    this._searchProviders = new Map();
    this._matchPromises = new Map();
    this._matchQueues = new Map();
    if (!disableCache) {
      this._storage = storage;
    }
    this._storage = storage;
    this._ttl = ttl;
    this._noMatchTtl = noMatchTtl;

    this._storageKey = storageKey;

    if (this._storage) {
      this._reducer = getReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getDataReducer(this.actionTypes)
      });
    } else {
      this._reducer = getReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
      });
    }

    this.addSelector('data',
      () => (
        this._storage ?
          this._storage.getItem(this._storageKey) :
          this.state.data
      ),
      data => (data || {}),
    );

    this.addSelector('dataMapping',
      this._selectors.data,
      (data) => {
        const dataMap = {};
        Object.keys(data).forEach((query) => {
          const queryResult = data[query];
          if (!queryResult) {
            return;
          }
          let matchesList = [];
          this._searchProviders.forEach((_providerValue, providerName) => {
            if (queryResult[providerName] && queryResult[providerName].data.length > 0) {
              matchesList = matchesList.concat(queryResult[providerName].data);
            }
          });
          if (matchesList.length > 0) {
            dataMap[query] = matchesList;
          }
        });
        return dataMap;
      }
    );
    this._lastCleanUp = 0;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }
  _getQueries() {
    const output = new Set();
    this._querySources.forEach((readyCheckFn, getQueriesFn) => {
      if (readyCheckFn()) {
        getQueriesFn().forEach((query) => {
          output.add(query);
        });
      }
    });
    return [...output];
  }
  _cleanUp() {
    // throttle clean up to only run once every 100ms
    const now = Date.now();
    if (now - this._lastCleanUp > 100) {
      this._lastCleanUp = now;
      this.store.dispatch({
        type: this.actionTypes.cleanUp,
        queries: this._getQueries(),
        timestamp: Date.now(),
        ttl: this._ttl,
      });
    }
  }
  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._cleanUp();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this._lastCleanUp = 0;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return !!(
      this.pending &&
      (!this._storage || this._storage.ready) &&
      this.searchProvidersReady
    );
  }

  _shouldReset() {
    return !!(
      this.ready &&
      (
        (!!this._storage && !this._storage.ready) ||
        !this.searchProvidersReady
      )
    );
  }

  get searchProvidersReady() {
    return [...this._searchProviders.values()]
      .every(({ readyCheckFn }) => readyCheckFn());
  }

  addSearchProvider({ name, searchFn, readyCheckFn }) {
    if (!name) {
      throw new Error(
        `${this.constructor.name}: "name" is required.`
      );
    }
    if (this._searchProviders.has(name)) {
      throw new Error(
        `${this.constructor.name}: A provider named "${name}" already exists.`
      );
    }
    if (typeof searchFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "searchFn" must be a function.`
      );
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "readyCheckFn" must be a function.`
      );
    }
    this._searchProviders.set(name, {
      searchFn,
      readyCheckFn,
    });
  }

  addQuerySource({ getQueriesFn, readyCheckFn }) {
    if (typeof getQueriesFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "getQueriesFn" must be a function.`
      );
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "readyCheckFn" must be a function.`
      );
    }
    if (this._querySources.has(getQueriesFn)) {
      throw new Error(
        `${this.constructor.name}: this getQueryFn has already been added.`
      );
    }
    this._querySources.set(getQueriesFn, readyCheckFn);
  }

  @proxify
  async triggerMatch() {
    if (this.ready) {
      this._cleanUp();
      await this.match({
        queries: this._getQueries(),
      });
    }
  }

  @proxify
  async match({
    queries,
    ignoreCache = false
  }) {
    await Promise.all([...this._searchProviders.keys()]
      .map(name => (
        this._matchSource({
          name,
          queries,
          ignoreCache,
        })
      )));
  }

  async _fetchMatchResult({
    name,
    queries,
  }) {
    try {
      this.store.dispatch({
        type: this.actionTypes.match,
        queries,
        name,
      });
      const provider = this._searchProviders.get(name);
      if (!provider) {
        throw new Error(
          `${this.constructor.name}: provider named "${name} does not exist`
        );
      }
      const promise = provider
        .searchFn({
          queries,
        });
      this._matchPromises.set(name, {
        promise,
        queries,
      });
      const data = await promise;
      this._matchPromises.delete(name);

      this.store.dispatch({
        type: this.actionTypes.matchSuccess,
        name,
        queries,
        data,
        timestamp: Date.now(),
      });
    } catch (error) {
      this._matchPromises.delete(name);
      this.store.dispatch({
        type: this.actionTypes.matchError,
        name,
        queries,
        error,
        timestamp: Date.now(),
      });
      throw error;
    }
  }

  @proxify
  async _matchSource({
    name,
    queries,
    ignoreCache
  }) {
    const now = Date.now();
    const queuedItems = {};
    const promises = [];
    let queue;
    let matching;
    if (this._matchPromises.has(name)) {
      matching = this._matchPromises.get(name);
      promises.push(matching.promise);
      matching.queries.forEach((item) => {
        queuedItems[item] = true;
      });
    }

    if (this._matchQueues.has(name)) {
      queue = this._matchQueues.get(name);
      promises.push(queue.promise);
      queue.queries.forEach((item) => {
        queuedItems[item] = true;
      });
    }
    const data = this.data;
    const filteredQueries = ignoreCache ?
      queries :
      queries.filter(query => (
        !queuedItems[query] &&
        (
          !data[query] ||
          !data[query][name] ||
          now - data[query][name]._t > this._noMatchTtl
        )
      ));

    if (filteredQueries.length) {
      if (!matching) {
        matching = this._fetchMatchResult({
          name,
          queries: filteredQueries,
        });
        promises.push(matching);
      } else if (!queue) {
        queue = {
          queries: filteredQueries,
        };
        queue.promise = (async () => {
          await matching.promise;
          const promise = this._fetchMatchResult({
            name,
            queries: queue.queries,
          });
          this._matchQueues.delete(name);
          await promise;
        })();
        this._matchQueues.set(name, queue);
        promises.push(queue.promise);
      } else {
        queue.queries = queue.queries.concat(filteredQueries);
      }
    }
    await Promise.all(promises);
  }

  get status() {
    return this.state.status;
  }
  get ready() {
    return this.state.status === moduleStatuses.ready;
  }
  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get data() {
    return this._selectors.data();
  }

  get dataMapping() {
    return this._selectors.dataMapping();
  }
}
