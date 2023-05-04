import {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  AllContactSourceName,
  groupByFirstLetterOfName,
  sortContactItemsByName,
  uniqueContactItems,
} from '@ringcentral-integration/commons/lib/contactHelper';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';

import { RouteParams } from '../ContactDetailsUI';
import {
  ContactSourceLastStatus,
  Deps,
  FilterCriteria,
  GetUIFunctions,
  GetUIProps,
  StampedFilterCriteria,
} from './ContactListUI.interface';

export const FILTER_THRESHOLD: number = 500;

@Module({
  name: 'ContactListUI',
  deps: [
    'Auth',
    'Locale',
    'ExtensionInfo',
    'Contacts',
    { dep: 'ContactDetailsUI', optional: true },
  ],
})
export class ContactListUI extends RcUIModuleV2<Deps> {
  private _sourcesLastStatus: Map<string, ContactSourceLastStatus> = new Map();
  private _sourcesUpdatedAt: number = 0;
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
  private _currentFilterCriteria: StampedFilterCriteria = null;
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
  private _nextFilterCriteria: StampedFilterCriteria = null;

  constructor(deps: Deps) {
    super({ deps });
  }

  override _shouldInit() {
    return (
      super._shouldInit() && this._deps.auth.loggedIn && this.allSourcesReady()
    );
  }

  override _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && (this._deps.auth.notLoggedIn || !this.allSourcesReady()))
    );
  }

  override onInitOnce() {
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

  override onInitSuccess() {
    this.applyFilters();
  }

  override onReset() {
    this._resetFilters();
    this._clearFilteredContacts();
    if (this._debouncedFilterContactSources) {
      this._debouncedFilterContactSources.cancel();
    }
  }

  get contactSources() {
    return Array.from(this._deps.contacts.contactSources.values());
  }

  allSourcesReady() {
    let ready = true;
    for (const source of this.contactSources) {
      if (!source.ready) {
        ready = false;
        break;
      }
    }
    return ready;
  }

  checkSourcesUpdated() {
    let updated = false;
    if (this._sourcesLastStatus.size !== this.contactSources.length) {
      updated = true;
      this._sourcesLastStatus.clear();
    }
    for (const source of this.contactSources) {
      const lastStatus = this._sourcesLastStatus.get(source.sourceName);
      if (
        !lastStatus ||
        lastStatus.sourceReady !== source.sourceReady ||
        lastStatus.rawContacts !== source.rawContacts
      ) {
        updated = true;
        this._sourcesLastStatus.set(source.sourceName, {
          sourceReady: source.sourceReady,
          contacts: source.contacts,
          rawContacts: source.rawContacts,
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
  filteredContactsList: [string, string][] = [];

  @action
  private _updateFilters({ sourceFilter, searchFilter }: FilterCriteria) {
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    this.sourceFilter = sourceFilter;
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    this.searchFilter = searchFilter;
    this.filterStamp = Math.random();
  }

  @action
  private _resetFilters() {
    this.sourceFilter = AllContactSourceName;
    this.searchFilter = '';
    this.filterStamp = 0;
    this.isFiltering = false;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    this._currentFilterCriteria = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    this._nextFilterCriteria = null;
  }

  @action
  private _setIsFiltering(isFiltering: boolean) {
    this.isFiltering = isFiltering;
  }

  @action
  private _clearFilteredContacts() {
    this.filteredContactsList = [];
  }

  @action
  private _appendFilteredContacts(contacts: IContact[], sourceName: string) {
    if (contacts.length > 0) {
      contacts.forEach((contact) => {
        this.filteredContactsList.push([sourceName, contact.id]);
      });
    }
  }

  @computed((that: ContactListUI) => [
    that.filteredContactsList,
    ...Object.values(that.contactSources).map((source) => source.contacts),
  ])
  get filteredContacts() {
    const contactsMap: Record<string, Record<string, IContact>> = {};
    this.contactSources.forEach((source) => {
      contactsMap[source.sourceName] = {};
      source.contacts.forEach((contact) => {
        contactsMap[source.sourceName][contact.id] = contact;
      });
    });
    const filteredContacts: IContact[] = [];
    this.filteredContactsList.forEach(([sourceName, id]) => {
      const contact = contactsMap[sourceName][id];
      if (contact) {
        filteredContacts.push(contact);
      }
    });
    return filteredContacts;
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
    const sources = this.contactSources.filter(
      (source) =>
        source.sourceReady &&
        typeof source.filterContacts === 'function' &&
        (source.sourceName === criteria.sourceFilter ||
          AllContactSourceName === criteria.sourceFilter),
    );
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          source.filterContacts(criteria.searchFilter),
        );
        return promise
          .then((items) => {
            if (
              !criteria.filterStamp ||
              criteria.filterStamp === this.filterStamp
            ) {
              this._appendFilteredContacts(items, source.sourceName);
            }
          })
          .catch((error) => {
            console.error(
              `[ContactListUI > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
            );
          });
      }),
    );
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    this._currentFilterCriteria = null;
    this._setIsFiltering(false);
    if (this._nextFilterCriteria) {
      const next = this._nextFilterCriteria;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
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
  ): Promise<ContactPresence | null> {
    const presence = await this._deps.contacts.getPresence(contact, useCache);
    return presence;
  }

  @computed((that: ContactListUI) => [that.checkSourcesUpdated()])
  get sourceNames() {
    const names = [AllContactSourceName];
    for (const source of this.contactSources) {
      if (source.sourceReady) {
        names.push(source.sourceName);
      }
    }
    return names;
  }

  @computed((that: ContactListUI) => [that.filteredContacts])
  get contactGroups() {
    return (
      groupByFirstLetterOfName(
        sortContactItemsByName(uniqueContactItems(this.filteredContacts)),
      ) ?? []
    );
  }

  getUIProps({ bottomNotice, bottomNoticeHeight }: GetUIProps) {
    return {
      currentLocale: this._deps.locale.currentLocale,
      contactSourceNames: this.sourceNames,
      contactGroups: this.contactGroups,
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
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
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
