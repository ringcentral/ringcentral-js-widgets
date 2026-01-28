import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  injectable,
  optional,
  delegate,
  RcModule,
  state,
  PortManager,
  fromWatch,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { identity, sortBy } from 'ramda';
import { defer, merge, switchMap, timer, map, of, tap } from 'rxjs';
import { v4 } from 'uuid';

import type {
  ContactSearchEntity,
  ContactSearchOptions,
  ContactSearchState,
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
import { findFirstFIndex } from './helper';

const DefaultMinimalSearchLength = 3;
const DEFAULT_CONTACT_SEARCH_CACHE_TTL = 5 * 60 * 1000;
const SEARCH_DEBOUNCE_TIME = 800;

const DefaultSearchingState: Searching = {
  searchOnSources: [],
  searchString: '',
  result: [],
};

@injectable({
  name: 'ContactSearch',
})
export class ContactSearch extends RcModule {
  // #region spring-ui projects
  private _searchSources = new Map<
    SearchSource['sourceName'],
    SearchSource['searchFn']
  >();

  private _searchSourcesFormat = new Map<
    SearchSource['sourceName'],
    SearchSource['formatFn']
  >();

  private _searchSourcesCheck = new Map<
    SearchSource['sourceName'],
    SearchSource['readyCheckFn']
  >();

  private _ttl =
    this._contactSearchOptions?.ttl ?? DEFAULT_CONTACT_SEARCH_CACHE_TTL;

  private _minimalSearchLength =
    this._contactSearchOptions?.minimalSearchLength ??
    DefaultMinimalSearchLength;

  @state
  searchParams: { content?: string; debounceTime?: number } = {};

  @action
  private setSearchParams(val: { content?: string; debounceTime?: number }) {
    Object.assign(this.searchParams, val);
  }

  @state
  searchStatus = contactSearchStatus.idle;

  @action
  setSearchStatus(searchStatus: string) {
    this.searchStatus = searchStatus;
  }

  @state
  contactSearch: Record<string, ContactSearchState> = {};

  @action
  private _setContactSearch({
    sourceName,
    searchString,
    entities,
  }: SetContactSearchOptions) {
    const key = `${sourceName}-${searchString}`;
    this.contactSearch[key] = {
      entities,
      timestamp: Date.now(),
    };
  }

  @action
  private cleanUp() {
    this.contactSearch = {};

    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      this.searching = DefaultSearchingState;
    }
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

  constructor(
    private _auth: Auth,
    private _portManager: PortManager,
    @optional('ContactSearchOptions')
    private _contactSearchOptions?: ContactSearchOptions,
  ) {
    super();

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      if (this._portManager.shared) {
        this._portManager.onServer(() => {
          this.listenSearch();
        });
      } else {
        this.listenSearch();
      }
    }
  }

  private listenSearch() {
    merge(
      fromWatch(this, () => this.searchParams).pipe(
        switchMap((params) => {
          const { content, debounceTime } = params;
          if (!content || content.length < this._minimalSearchLength) {
            return of(false);
          }

          this.logger.log('ContactSearch: searching');
          this.setSearchStatus(contactSearchStatus.searching);

          return debounceTime
            ? timer(debounceTime).pipe(map(() => params))
            : of(params);
        }),
        switchMap((params) => {
          if (typeof params !== 'boolean') {
            const { content } = params;
            return defer(() =>
              Promise.all(
                Array.from(this._searchSources.keys()).map((sourceName) =>
                  this._execSearchSource({
                    sourceName,
                    searchString: content!,
                  }),
                ),
              ),
            );
          }

          return of(null);
        }),
        // use observable to handle async operations to cancel the search result write back
        tap((result) => {
          if (result !== null)
            this.logger.log('ContactSearch: search completed');

          if (this.searchStatus !== contactSearchStatus.idle) {
            this.logger.log('ContactSearch: idle');
            this.setSearchStatus(contactSearchStatus.idle);
          }
        }),
        takeUntilAppDestroy,
      ),
      // this._auth.beforeLogout$.pipe(tap(() => this.cleanUp())),
    ).subscribe();
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._auth.loggedIn && this._readyCheck());
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
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

  @delegate('server')
  async debouncedSearch({ searchString }: SearchStringOptions) {
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.setSearchParams({
        content: searchString || '',
        debounceTime: SEARCH_DEBOUNCE_TIME,
      });
    } else {
      this._debouncedSearchFn({ searchString });
    }
  }

  @delegate('server')
  async search({ searchString }: SearchStringOptions) {
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.setSearchParams({
        content: searchString || '',
        debounceTime: 0,
      });
    } else {
      this._search({ searchString });
    }
  }

  async _execSearchSource({
    sourceName,
    searchString,
  }: Pick<SearchSourceOptions, 'sourceName' | 'searchString'>) {
    try {
      const expired = this.isContactSearchExpired({
        sourceName,
        searchString,
      });

      if (!expired) return;

      let entities: Entities | null = null;
      // search source
      const searchFn = this._searchSources.get(sourceName)!;
      entities = await searchFn({ searchString });
      // format result
      const formatFn = this._searchSourcesFormat.get(sourceName)!;
      entities = formatFn(entities!);
      // save result
      this._setContactSearch({
        sourceName,
        searchString,
        entities,
        ttl: this._ttl,
      });
    } catch (error) {
      this.logger.error(
        `ContactSearch: search source ${sourceName} failed`,
        error,
      );
    }
  }

  private isContactSearchExpired({
    sourceName,
    searchString,
  }: SearchFromCacheOptions) {
    const key = `${sourceName}-${searchString}`;
    const searching = this.contactSearch[key];
    if (searching && Date.now() - searching.timestamp < this._ttl) {
      return false;
    }

    return true;
  }

  private _readyCheck() {
    for (const sourceName of this._searchSourcesCheck.keys()) {
      if (!this._searchSourcesCheck.get(sourceName)!()) {
        return false;
      }
    }
    return true;
  }
  // #endregion

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *  TODO: below all code is old projects, need to remove when all projects migrate to spring-ui
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  // #region non spring-ui projects
  protected _searchIds: Record<string, string> = {};

  protected _debouncedSearchFn = debounce({ fn: this.search, threshold: 800 });

  protected _timeoutId: NodeJS.Timeout | null = null;

  @state
  searching: Searching = DefaultSearchingState;

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

  @delegate('server')
  async triggerPrepareSearch() {
    this.setPrepareSearch();
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

  override onReset() {
    if (process.env.THEME_SYSTEM === 'spring-ui') return;

    this.cleanUp();
    if (this._debouncedSearchFn) {
      this._debouncedSearchFn.cancel();
    }
  }

  @delegate('server')
  async _search({ searchString }: SearchStringOptions) {
    if (!searchString || searchString.length < this._minimalSearchLength) {
      this.setPrepareSearch();
      return [];
    }
    this._clearTimeout();
    this._timeoutId = setTimeout(async () => {
      const searching = { ...this.searching };
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
    return this.sortedResult;
  }

  _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  // TODO: Need to refactor, remove cache, and update data in real time.
  @delegate('server')
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
      let entities: Entities | null = null;
      entities = this._searchFromCache({ sourceName, searchString });
      if (entities) {
        this._loadSearching({ searchOnSources, searchString, entities });
        return;
      }
      // search source
      const searchFn = this._searchSources.get(sourceName)!;
      entities = await searchFn({ searchString });
      // format result
      const formatFn = this._searchSourcesFormat.get(sourceName)!;
      entities = formatFn(entities!);
      // save result
      this._saveSearching({ sourceName, searchString, entities });
      if (this._searchIds[sourceName] === searchId) {
        this._loadSearching({ searchOnSources, searchString, entities });
      }
    } catch (error) {
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

  @computed(({ searching }: ContactSearch) => [searching.result])
  get searchResult() {
    return this.searching.result ?? [];
  }

  @computed(({ searching }: ContactSearch) => [searching])
  get sortedResult(): ContactSearchEntity[] {
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
      const currentSumIndex =
        findFirstFIndex(currentName, searchString) +
        findFirstFIndex(currentPhoneNumber, searchString);
      const nextSumIndex =
        findFirstFIndex(nextName, searchString) +
        findFirstFIndex(nextPhoneNumber, searchString);
      return currentSumIndex - nextSumIndex;
    });
  }
  // #endregion
}
