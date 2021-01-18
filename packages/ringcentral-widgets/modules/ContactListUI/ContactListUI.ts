import {
  state,
  action,
  watch,
  computed,
  RcUIModuleV2,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import { debounce } from 'ringcentral-integration/lib/debounce-throttle';
import {
  uniqueContactItems,
  sortContactItemsByName,
  groupByFirstLetterOfName,
  AllContactSourceName,
} from 'ringcentral-integration/lib/contactHelper';
import {
  IContact,
  ContactPresence,
} from 'ringcentral-integration/interfaces/Contact.model';
import { RouteParams } from '../ContactDetailsUI';
import {
  Deps,
  FilterCriteria,
  StampedFilterCriteria,
  ContactSourceLastStatus,
  GetUIProps,
  GetUIFunctions,
} from './ContactListUI.interface';

export const FILTER_THRESHOLD: number = 500;

@Module({
  name: 'ContactListUI',
  deps: [
    'Auth',
    'Locale',
    'ExtensionInfo',
    'ContactSources',
    { dep: 'ContactDetailsUI', optional: true },
  ],
})
export class ContactListUI extends RcUIModuleV2<Deps> {
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
              `[ContactListUI > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
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
  async getPresence(
    contact: IContact,
    useCache: boolean = true,
  ): Promise<ContactPresence> {
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

  @computed<ContactListUI>((that) => [that.checkSourcesUpdated()])
  get sourceNames() {
    const names = [AllContactSourceName];
    for (const source of this._deps.contactSources) {
      if (source.sourceReady) {
        names.push(source.sourceName);
      }
    }
    return names;
  }

  @computed<ContactListUI>((that) => [that.filteredContacts])
  get contactGroups() {
    return groupByFirstLetterOfName(
      sortContactItemsByName(uniqueContactItems(this.filteredContacts)),
    );
  }

  getUIProps({ bottomNotice, bottomNoticeHeight }: GetUIProps) {
    return {
      currentLocale: this._deps.locale.currentLocale,
      contactSourceNames: this.sourceNames || [],
      contactGroups: this.contactGroups || [],
      searchSource: this.sourceFilter,
      searchString: this.searchFilter,
      isSearching: this.isFiltering,
      showSpinner: !(this._deps.locale.ready && this.ready),
      currentSiteCode: this._deps.extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
      bottomNotice,
      bottomNoticeHeight,
    };
  }

  getUIFunctions({ onVisitPage, onRefresh, onItemSelect }: GetUIFunctions) {
    return {
      getAvatarUrl(): string {
        return null;
      },
      getPresence: (contact: IContact): Promise<any> => {
        return this.getPresence(contact);
      },
      onItemSelect:
        onItemSelect ||
        (async ({ type, id }: RouteParams) => {
          if (this._deps.contactDetailsUI) {
            this._deps.contactDetailsUI.showContactDetails({ type, id });
          }
        }),
      onSearchContact: ({
        searchSource,
        searchString,
      }: {
        searchSource: string;
        searchString: string;
      }) => {
        this.applyFilters({
          sourceFilter: searchSource,
          searchFilter: searchString,
        });
      },
      onVisitPage: () => {
        if (typeof onVisitPage === 'function') {
          onVisitPage();
        }
        // fire filtering contacts if not yet
        if (!this.filterStamp) {
          this.applyFilters();
        }
      },
      onRefresh,
    };
  }
}
