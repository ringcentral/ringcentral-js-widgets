import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { identity, sortBy } from 'ramda';
import { v4 } from 'uuid';

import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type {
  ContactSearchState,
  Deps,
  Entities,
  SearchFromCacheOptions,
  Searching,
  SearchSource,
  SearchSourceOptions,
  SearchStringOptions,
  SetContactSearchOptions,
  SetSearchSuccessOptions,
} from './ContactSearch.interface';
import { contactSearchStatus } from './contactSearchStatus';

export const DefaultMinimalSearchLength = 3;

export const DefaultSearchingState: Searching = {
  searchOnSources: [],
  searchString: '',
  result: [],
};

@Module({
  name: 'ContactSearch',
  deps: [
    'Auth',
    { dep: 'Storage', optional: true },
    { dep: 'ContactSearchOptions', optional: true },
  ],
})
export class ContactSearch extends RcModuleV2<Deps> {
  protected _searchSources = new Map<
    SearchSource['sourceName'],
    SearchSource['searchFn']
  >();

  protected _searchSourcesFormat = new Map<
    SearchSource['sourceName'],
    SearchSource['formatFn']
  >();

  protected _searchSourcesCheck = new Map<
    SearchSource['sourceName'],
    SearchSource['readyCheckFn']
  >();

  protected _searchIds: Record<string, string> = {};

  protected _ttl = this._deps.contactSearchOptions?.ttl ?? 5 * 60 * 1000;

  protected _minimalSearchLength =
    this._deps.contactSearchOptions?.minimalSearchLength ??
    DefaultMinimalSearchLength;

  protected _debouncedSearchFn = debounce({ fn: this.search, threshold: 800 });

  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
  protected _timeoutId: NodeJS.Timeout = null;

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'ContactSearch',
      enableCache: deps.contactSearchOptions?.enableCache ?? true,
    });
  }

  @storage
  @state
  contactSearch: Record<string, ContactSearchState> = {};

  @state
  searchStatus = contactSearchStatus.idle;

  @state
  searching: Searching = DefaultSearchingState;

  @action
  setSearchStatus(searchStatus: string) {
    this.searchStatus = searchStatus;
  }

  @action
  clearAndReset() {
    this.cleanUp();
    this.searchStatus = contactSearchStatus.idle;
    if (this._debouncedSearchFn) {
      this._debouncedSearchFn.cancel();
    }
  }

  @action
  setPrepareSearch() {
    this.searchStatus = contactSearchStatus.prepareSearching;
    this.searching = DefaultSearchingState;
  }

  @action
  setSearchSuccess({
    searchOnSources,
    searchString,
    entities,
  }: SetSearchSuccessOptions) {
    if (
      this.searching.searchString === searchString &&
      sortBy(identity)(this.searching.searchOnSources).join(',') ===
        sortBy(identity)(searchOnSources).join(',')
    ) {
      const resultMap: Record<string, boolean> = {};
      this.searching.result.forEach((item) => {
        resultMap[item.id] = true;
      });
      entities.forEach((item) => {
        if (!resultMap[item.id]) {
          this.searching.result.push(item);
          resultMap[item.id] = true;
        }
      });
      return;
    }
    this.searching = {
      searchOnSources,
      searchString,
      result: entities,
    };
  }

  @action
  setContactSearch({
    sourceName,
    searchString,
    entities,
    ttl,
  }: SetContactSearchOptions) {
    const data: Record<string, ContactSearchState> = {};
    Object.keys(this.contactSearch).forEach((key) => {
      if (Date.now() - this.contactSearch[key].timestamp < ttl) {
        data[key] = this.contactSearch[key];
      }
    });
    const key = `${sourceName}-${searchString}`;
    data[key] = {
      entities,
      timestamp: Date.now(),
    };
    this.contactSearch = data;
  }

  @action
  cleanUp() {
    this.contactSearch = {};
    this.searching = DefaultSearchingState;
  }

  @action
  resetContactSearch() {
    this.contactSearch = {};
  }

  override onInitSuccess() {
    this.resetContactSearch();
  }

  override onReset() {
    this.cleanUp();
    if (this._debouncedSearchFn) {
      this._debouncedSearchFn.cancel();
    }
  }

  override _shouldInit() {
    return !!(
      super._shouldInit() &&
      this._deps.auth.loggedIn &&
      this._readyCheck()
    );
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  addSearchSource({
    sourceName,
    searchFn,
    readyCheckFn,
    formatFn,
  }: SearchSource) {
    if (!sourceName) {
      throw new Error(
        '[ContactSearch > SearchSource > sourceName] is required',
      );
    }
    if (this._searchSources.has(sourceName)) {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > searchFn] already exists`,
      );
    }
    if (this._searchSourcesCheck.has(sourceName)) {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > readyCheckFn] already exists`,
      );
    }
    if (this._searchSourcesFormat.has(sourceName)) {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > formatFn] already exists`,
      );
    }
    if (typeof searchFn !== 'function') {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > searchFn] must be a function`,
      );
    }
    if (typeof readyCheckFn !== 'function') {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > readyCheckFn] must be a function`,
      );
    }
    if (typeof formatFn !== 'function') {
      throw new Error(
        `[ContactSearch > SearchSource(${sourceName}) > formatFn] must be a function`,
      );
    }
    this._searchSources.set(sourceName, searchFn);
    this._searchSourcesFormat.set(sourceName, formatFn);
    this._searchSourcesCheck.set(sourceName, readyCheckFn);
  }

  @proxify
  async debouncedSearch({ searchString }: SearchStringOptions) {
    this._debouncedSearchFn({ searchString });
  }

  @proxify
  async search({ searchString }: SearchStringOptions) {
    if (
      !this.ready ||
      !searchString ||
      searchString.length < this._minimalSearchLength
    ) {
      this.setPrepareSearch();
      return;
    }
    this._clearTimeout();
    this._timeoutId = setTimeout(async () => {
      const searching = { ...this.searching };
      // @ts-expect-error TS(2322): Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
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
    this.setSearchStatus(contactSearchStatus.idle);
  }

  _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  // TODO: Need to refactor, remove cache, and update data in real time.
  @proxify
  async _searchSource({
    searchOnSources,
    sourceName,
    searchString,
  }: SearchSourceOptions) {
    const searchId = v4();
    this._searchIds[sourceName] = searchId;
    this.setSearchStatus(contactSearchStatus.searching);
    try {
      // search cache
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Entities'.
      let entities: Entities = null;
      // @ts-expect-error TS(2322): Type 'Entities | null' is not assignable to type '... Remove this comment to see the full error message
      entities = this._searchFromCache({ sourceName, searchString });
      if (entities) {
        this._loadSearching({ searchOnSources, searchString, entities });
        return;
      }
      // search source
      const searchFn = this._searchSources.get(sourceName);
      // @ts-expect-error TS(2322): Type 'Entities | null' is not assignable to type '... Remove this comment to see the full error message
      entities = await searchFn({ searchString });
      // format result
      const formatFn = this._searchSourcesFormat.get(sourceName);
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      entities = formatFn(entities);
      // save result
      this._saveSearching({ sourceName, searchString, entities });
      if (this._searchIds[sourceName] === searchId) {
        this._loadSearching({ searchOnSources, searchString, entities });
      }
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._onSearchError();
    }
  }

  _searchFromCache({ sourceName, searchString }: SearchFromCacheOptions) {
    const key = `${sourceName}-${searchString}`;
    const searching = this.contactSearch[key];
    const now = Date.now();
    if (searching && now - searching.timestamp < this._ttl) {
      return searching.entities;
    }
    return null;
  }

  _readyCheck() {
    for (const sourceName of this._searchSourcesCheck.keys()) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      if (!this._searchSourcesCheck.get(sourceName)()) {
        return false;
      }
    }
    return true;
  }

  _onSearchError() {
    this.setPrepareSearch();
  }

  _loadSearching({
    searchOnSources,
    searchString,
    entities,
  }: SetSearchSuccessOptions) {
    this.setSearchSuccess({
      searchOnSources,
      searchString,
      entities,
    });
  }

  _saveSearching({
    sourceName,
    searchString,
    entities,
  }: Pick<
    SetContactSearchOptions,
    Exclude<keyof SetContactSearchOptions, 'ttl'>
  >) {
    this.setContactSearch({
      sourceName,
      searchString,
      entities,
      ttl: this._ttl,
    });
  }

  @computed(({ searching }: ContactSearch) => [searching])
  get searchResult() {
    return this.searching.result ?? [];
  }

  @computed(({ searching }: ContactSearch) => [searching])
  get sortedResult() {
    const { result = [], searchString = '' } = this.searching;
    const list = [...result];
    if (searchString === '') {
      return list;
    }
    return list.sort((current, next) => {
      const currentName = current.name || '';
      const currentPhoneNumber = current.phoneNumber || '';
      const nextName = next.name || '';
      const nextPhoneNumber = next.phoneNumber || '';
      return (
        nextName.indexOf(searchString) -
        currentName.indexOf(searchString) +
        (nextPhoneNumber.indexOf(searchString) -
          currentPhoneNumber.indexOf(searchString))
      );
    });
  }

  get minimalSearchLength() {
    return this._minimalSearchLength;
  }

  get isIdle() {
    return this.searchStatus === contactSearchStatus.idle;
  }

  get isSearching() {
    return this.searchStatus === contactSearchStatus.searching;
  }
}
