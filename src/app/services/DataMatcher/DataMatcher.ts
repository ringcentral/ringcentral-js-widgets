import {
  action,
  computed,
  delegate,
  RcModule,
  state,
  StoragePlugin,
  userStorage,
} from '@ringcentral-integration/next-core';
import { all, filter } from 'ramda';

import type {
  DataMatcherOptions,
  FetchMatchResultOptions,
  InsertMatchEntriesOptions,
  MatchData,
  MatchOptions,
  MatchPromises,
  MatchQueue,
  MatchSourceOptions,
  QuerySourceOptions,
  SearchProvider,
  SearchProviderOptions,
  TriggerMatchOptions,
} from './DataMatcher.interface';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_NO_MATCH_TTL = 30 * 1000;

abstract class DataMatcher<T> extends RcModule {
  protected _querySources = new Map<
    QuerySourceOptions['getQueriesFn'],
    QuerySourceOptions['readyCheckFn']
  >();

  protected _searchProviders = new Map<
    SearchProviderOptions<T>['name'],
    SearchProvider<T>
  >();

  protected _matchPromises = new Map<string, MatchPromises<T>>();

  protected _matchQueues = new Map<string, MatchQueue>();

  protected _lastCleanUp = 0;

  constructor(protected _storage?: StoragePlugin) {
    super();
    this._storage?.enable(this);
  }

  @userStorage
  @state
  data: MatchData<T> = {};

  @state
  searchProviderNames: string[] = [];

  @action
  protected _updateSearchProviderNames(names: string[]) {
    this.searchProviderNames = names;
  }

  @action
  protected _addSearchProviderName(name: string) {
    this.searchProviderNames.push(name);
  }

  abstract get dataMatcherOptions(): DataMatcherOptions;

  protected get _ttl() {
    return this.dataMatcherOptions?.ttl ?? DEFAULT_TTL;
  }

  protected get _noMatchTtl() {
    return this.dataMatcherOptions?.noMatchTtl ?? DEFAULT_NO_MATCH_TTL;
  }

  override onReset() {
    this._lastCleanUp = 0;
  }

  override onInit() {
    this._updateSearchProviderNames([...this._searchProviders.keys()]);
  }

  _getQueries() {
    const output = new Set<string>();
    this._querySources.forEach((readyCheckFn, getQueriesFn) => {
      if (readyCheckFn()) {
        getQueriesFn().forEach((query) => {
          output.add(query);
        });
      }
    });
    return [...output];
  }

  @action
  insertMatchEntries({ name, queries, data }: InsertMatchEntriesOptions<T>) {
    const timestamp = Date.now();
    queries.forEach((query) => {
      this.data[query] = this.data[query] ?? {};
      this.data[query][name] = {
        _t: timestamp, // for noMatchTtl check
        data: data[query] ?? [],
      };
    });
  }

  @action
  _cleanUp() {
    // throttle clean up to only run once every 100ms
    const now = Date.now();
    if (now - this._lastCleanUp > 100) {
      this._lastCleanUp = now;
      Object.keys(this.data).forEach((query) => {
        Object.keys(this.data[query]).forEach((name) => {
          if (!this.data[query][name]._t) {
            // mark for deletion
            this.data[query][name]._t = now;
          } else if (now - this.data[query][name]._t > this._ttl) {
            // expired yet
            // entry is removed
            delete this.data[query][name];
          }
        });
      });
    }
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this.searchProvidersReady);
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this.searchProvidersReady)
    );
  }

  get searchProvidersReady() {
    return all(
      ({ readyCheckFn }) => readyCheckFn(),
      [...this._searchProviders.values()],
    );
  }

  addSearchProvider({
    name,
    searchFn,
    readyCheckFn,
  }: SearchProviderOptions<T>) {
    if (!name) {
      throw new Error(`${this.constructor.name}: "name" is required.`);
    }
    if (this._searchProviders.has(name)) {
      throw new Error(
        `${this.constructor.name}: A provider named "${name}" already exists.`,
      );
    }
    if (typeof searchFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "searchFn" must be a function.`,
      );
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "readyCheckFn" must be a function.`,
      );
    }
    this._searchProviders.set(name, {
      searchFn,
      readyCheckFn,
    });
    if (this.ready) {
      this._addSearchProviderName(name);
    }
  }

  addQuerySource({ getQueriesFn, readyCheckFn }: QuerySourceOptions) {
    if (typeof getQueriesFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "getQueriesFn" must be a function.`,
      );
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error(
        `${this.constructor.name}: "readyCheckFn" must be a function.`,
      );
    }
    if (this._querySources.has(getQueriesFn)) {
      throw new Error(
        `${this.constructor.name}: this getQueryFn has already been added.`,
      );
    }
    this._querySources.set(getQueriesFn, readyCheckFn);
  }

  @delegate('server')
  async triggerMatch({
    ignoreCache = false,
    ignoreQueue = false,
  }: TriggerMatchOptions = {}) {
    if (this.ready) {
      this._cleanUp();
      await this.match({
        queries: this._getQueries(),
        ignoreCache,
        ignoreQueue,
      });
    }
  }

  @delegate('server')
  async match({
    queries,
    ignoreCache = false,
    ignoreQueue = false,
  }: MatchOptions) {
    await Promise.all(
      [...this._searchProviders.keys()].map((name) =>
        this._matchSource({
          name,
          queries,
          ignoreCache,
          ignoreQueue,
        }),
      ),
    );
  }

  async _fetchMatchResult({ name, queries }: FetchMatchResultOptions) {
    try {
      const provider = this._searchProviders.get(name);
      if (!provider) {
        throw new Error(
          `${this.constructor.name}: provider named "${name} does not exist`,
        );
      }
      const promise = Promise.resolve(
        provider.searchFn({
          queries,
        }),
      );
      this._matchPromises.set(name, {
        promise,
        queries,
      });
      const data = await promise;
      this._matchPromises.delete(name);
      this.insertMatchEntries({
        name,
        queries,
        data,
      });
    } catch (error) {
      this._matchPromises.delete(name);
      throw error;
    }
  }

  @delegate('server')
  async _matchSource({
    name,
    queries,
    ignoreCache,
    ignoreQueue,
  }: MatchSourceOptions) {
    const now = Date.now();
    const data = this.data;
    const queuedItems: Record<string, boolean> = {};
    const promises: Promise<void | Record<string, T[]>>[] = [];

    let matching: MatchPromises<T> | MatchQueue;
    if (!ignoreQueue && this._matchPromises.has(name)) {
      matching = this._matchPromises.get(name)!;
      promises.push(matching.promise);
      matching.queries.forEach((item) => {
        queuedItems[item] = true;
      });
    }

    let queue: MatchQueue | undefined;
    if (!ignoreQueue && this._matchQueues.has(name)) {
      queue = this._matchQueues.get(name)!;
      promises.push(queue.promise);
      queue.queries.forEach((item) => {
        queuedItems[item] = true;
      });
    }

    const newQueries = ignoreCache
      ? queries
      : filter(
          (query) =>
            !queuedItems[query] &&
            (!data[query] ||
              !data[query][name] ||
              now - data[query][name]._t > this._noMatchTtl),
          queries,
        );

    if (newQueries.length) {
      if (ignoreQueue) {
        promises.push(
          this._fetchMatchResult({
            name,
            queries: newQueries,
          }),
        );
      } else if (!matching!) {
        matching = {
          promise: this._fetchMatchResult({
            name,
            queries: newQueries,
          }),
          queries: newQueries,
        };
        promises.push(matching.promise);
      } else if (!queue) {
        const promise = (async () => {
          await matching.promise;
          const promise = this._fetchMatchResult({
            name,
            queries: queue!.queries,
          });
          this._matchQueues.delete(name);
          await promise;
        })();
        queue = {
          queries: newQueries,
          promise,
        };
        this._matchQueues.set(name, queue);
        promises.push(queue.promise);
      } else {
        queue.queries = queue.queries.concat(newQueries);
      }
    }
    await Promise.all(promises);
  }

  /**
   * insert matching result directly
   */
  @delegate('server')
  async insertMatching({ name, data, queries }: InsertMatchEntriesOptions<T>) {
    this.insertMatchEntries({
      data,
      queries,
      name,
    });
  }

  @computed(({ data, ready, searchProviderNames }: DataMatcher<T>) => [
    data,
    ready,
    searchProviderNames,
  ])
  get dataMapping() {
    if (!this.ready || !this.searchProviderNames.length) return {};
    const dataMap: Record<string, T[]> = {};

    for (const query in this.data) {
      const queryResult = this.data[query];
      if (!queryResult) {
        continue;
      }
      let matchesList: T[] = [];
      for (const providerName of this.searchProviderNames) {
        if (
          queryResult[providerName] &&
          queryResult[providerName].data.length > 0
        ) {
          matchesList = matchesList.concat(queryResult[providerName].data);
        }
      }
      if (matchesList.length > 0) {
        dataMap[query] = matchesList;
      }
    }
    return dataMap;
  }
}

export { DataMatcher };
