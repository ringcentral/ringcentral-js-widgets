import {
  state,
  action,
  watch,
  computed,
  RcModuleV2,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { debounce } from '../../lib/debounce-throttle';
import {
  uniqueContactItems,
  sortContactItemsByName,
  groupByFirstLetterOfName,
  AllContactSourceName,
} from '../../lib/contactHelper';
import { IContact } from '../../interfaces/Contact.model';
import {
  Deps,
  FilterCriteria,
  StampedFilterCriteria,
  ContactSourceLastStatus,
} from './ContactList.interface';

export const FILTER_THRESHOLD: number = 500;

@Module({
  name: 'ContactList',
  deps: ['Auth', 'ContactSources'],
})
export class ContactList extends RcModuleV2<Deps> {
  private _sourcesLastStatus: Map<string, ContactSourceLastStatus> = new Map();
  private _sourcesUpdatedAt: number = 0;
  private _currentFilterCriteria: StampedFilterCriteria = null;
  private _nextFilterCriteria: StampedFilterCriteria = null;

  constructor(deps: Deps) {
    super({ deps });
  }

  _shouldInit() {
    return (
      super._shouldInit() && this._deps.auth.loggedIn && this.allSourcesReady()
    );
  }

  _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && (this._deps.auth.notLoggedIn || !this.allSourcesReady()))
    );
  }

  onInitOnce() {
    this.checkSourcesUpdated();
    watch(
      this,
      () => this.checkSourcesUpdated(),
      () => {
        if (this.ready) {
          this.applyFilters();
        }
      },
    );
  }

  onInitSuccess() {
    this.applyFilters();
  }

  onReset() {
    this._resetFilters();
    this._clearFilteredContacts();
    if (this._debouncedFilterContactSources) {
      this._debouncedFilterContactSources.cancel();
    }
  }

  allSourcesReady() {
    let ready = true;
    for (const source of this._deps.contactSources) {
      if (!source.ready) {
        ready = false;
        break;
      }
    }
    return ready;
  }

  checkSourcesUpdated() {
    let updated = false;
    if (this._sourcesLastStatus.size !== this._deps.contactSources.length) {
      updated = true;
      this._sourcesLastStatus.clear();
    }
    for (const source of this._deps.contactSources) {
      const lastStatus = this._sourcesLastStatus.get(source.sourceName);
      if (
        !lastStatus ||
        lastStatus.sourceReady !== source.sourceReady ||
        lastStatus.contacts !== source.contacts
      ) {
        updated = true;
        this._sourcesLastStatus.set(source.sourceName, {
          sourceReady: source.sourceReady,
          contacts: source.contacts,
        });
      }
    }
    if (updated) {
      this._sourcesUpdatedAt = Date.now();
    }
    return this._sourcesUpdatedAt;
  }

  @state
  sourceFilter: string = AllContactSourceName;

  @state
  searchFilter: string = '';

  @state
  filterStamp: number = 0;

  @state
  isFiltering: boolean = false;

  @state
  filteredContacts: IContact[] = [];

  @action
  private _updateFilters({ sourceFilter, searchFilter }: FilterCriteria) {
    this.sourceFilter = sourceFilter;
    this.searchFilter = searchFilter;
    this.filterStamp = Math.random();
  }

  @action
  private _resetFilters() {
    this.sourceFilter = AllContactSourceName;
    this.searchFilter = '';
    this.filterStamp = 0;
    this.isFiltering = false;
    this._currentFilterCriteria = null;
    this._nextFilterCriteria = null;
  }

  @action
  private _setIsFiltering(isFiltering: boolean) {
    this.isFiltering = isFiltering;
  }

  @action
  private _clearFilteredContacts() {
    this.filteredContacts = [];
  }

  @action
  private _appendFilteredContacts(contacts: IContact[]) {
    this.filteredContacts = this.filteredContacts.concat(contacts);
  }

  private _debouncedFilterContactSources = debounce({
    fn: this._filterContactSources,
    threshold: FILTER_THRESHOLD,
  });

  private async _filterContactSources(criteria: StampedFilterCriteria) {
    if (this._currentFilterCriteria) {
      this._nextFilterCriteria = criteria;
      return;
    }
    this._setIsFiltering(true);
    this._clearFilteredContacts();
    this._currentFilterCriteria = criteria;
    const sources = this._deps.contactSources.filter(
      (source) =>
        source.sourceReady &&
        typeof source.filterContacts === 'function' &&
        (source.sourceName === criteria.sourceFilter ||
          AllContactSourceName === criteria.sourceFilter),
    );
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.filterContacts(criteria.searchFilter),
        );
        return promise
          .then((items) => {
            if (
              !criteria.filterStamp ||
              criteria.filterStamp === this.filterStamp
            ) {
              this._appendFilteredContacts(items);
            }
          })
          .catch((error) => {
            console.error(
              `[ContactList > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
            );
          });
      }),
    );
    this._currentFilterCriteria = null;
    this._setIsFiltering(false);
    if (this._nextFilterCriteria) {
      const next = this._nextFilterCriteria;
      this._nextFilterCriteria = null;
      this._filterContactSources(next);
    }
  }

  @proxify
  async applyFilters({
    sourceFilter = this.sourceFilter,
    searchFilter = this.searchFilter,
  }: FilterCriteria = {}) {
    this._updateFilters({
      sourceFilter,
      searchFilter,
    });
    this._debouncedFilterContactSources({
      sourceFilter,
      searchFilter,
      filterStamp: this.filterStamp,
    });
  }

  @proxify
  async getPresence(contact: IContact, useCache: boolean = true) {
    const source = this._deps.contactSources.find(
      (x) =>
        x.sourceReady &&
        typeof x.getPresence === 'function' &&
        x.sourceName === (contact && contact.type),
    );
    if (source) {
      const result = await source.getPresence(contact, useCache);
      return result;
    }
    return null;
  }

  @computed<ContactList>((that) => [that.checkSourcesUpdated()])
  get sourceNames() {
    const names = [AllContactSourceName];
    for (const source of this._deps.contactSources) {
      if (source.sourceReady) {
        names.push(source.sourceName);
      }
    }
    return names;
  }

  @computed<ContactList>((that) => [that.filteredContacts])
  get contactGroups() {
    return groupByFirstLetterOfName(
      sortContactItemsByName(uniqueContactItems(this.filteredContacts)),
    );
  }
}
