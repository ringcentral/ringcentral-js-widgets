import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { all, filter, forEach } from 'ramda';

import { Library } from '../di';
import proxify from '../proxy/proxify';

import type {
  DataMatcherOptions,
  Deps,
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

@Library({
  name: 'DataMatcher',
  deps: [{ dep: 'Storage', optional: true }],
})
abstract class DataMatcher<T, D extends Deps = Deps> extends RcModuleV2<D> {
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

  constructor(deps: Deps & D, storageKey: string, disableCache?: boolean) {
    super({
      deps,
      enableCache: !(disableCache ?? false),
      storageKey,
    });
  }

  @storage
  @state
  data: MatchData<T> = {};

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

  @proxify
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

  @proxify
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
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._matchPromises.delete(name);
      throw error;
    }
  }

  @proxify
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
      // @ts-expect-error TS(2322): Type 'MatchPromises<T> | undefined' is not assigna... Remove this comment to see the full error message
      matching = this._matchPromises.get(name);
      promises.push(matching.promise);
      matching.queries.forEach((item) => {
        queuedItems[item] = true;
      });
    }

    let queue: MatchQueue;
    if (!ignoreQueue && this._matchQueues.has(name)) {
      // @ts-expect-error TS(2322): Type 'MatchQueue | undefined' is not assignable to... Remove this comment to see the full error message
      queue = this._matchQueues.get(name);
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
        // @ts-expect-error TS(2454): Variable 'matching' is used before being assigned.
      } else if (!matching) {
        matching = {
          promise: this._fetchMatchResult({
            name,
            queries: newQueries,
          }),
          queries: newQueries,
        };
        promises.push(matching.promise);
        // @ts-expect-error TS(2454): Variable 'queue' is used before being assigned.
      } else if (!queue) {
        const promise = (async () => {
          await matching.promise;
          const promise = this._fetchMatchResult({
            name,
            // @ts-expect-error TS(2454): Variable 'queue' is used before being assigned.
            queries: queue.queries,
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
  @proxify
  async insertMatching({ name, data, queries }: InsertMatchEntriesOptions<T>) {
    this.insertMatchEntries({
      data,
      queries,
      name,
    });
  }

  @computed(({ data, ready, _searchProviders }: DataMatcher<T>) => [
    data,
    ready,
    _searchProviders.size,
  ])
  get dataMapping() {
    if (!this.ready || !this._searchProviders.size) return {};
    const dataMap: Record<string, T[]> = {};
    forEach((query) => {
      const queryResult = this.data[query];
      if (!queryResult) {
        return;
      }
      let matchesList: T[] = [];
      for (const [providerName] of this._searchProviders) {
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
    }, Object.keys(this.data));
    return dataMap;
  }
}

export { DataMatcher };
