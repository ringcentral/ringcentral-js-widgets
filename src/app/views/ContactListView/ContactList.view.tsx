import type {
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
import {
  Auth,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  injectable,
  optional,
  delegate,
  RcViewModule,
  state,
  UIFunctions,
  UIProps,
  useConnector,
  watch,
} from '@ringcentral-integration/next-core';
import ContactListPanel from '@ringcentral-integration/widgets/components/ContactsView';
import React, { useRef } from 'react';

import { Contacts } from '../../services';
import type { RouteParams } from '../ContactDetailsView';
import { ContactDetailsView } from '../ContactDetailsView';

import type {
  ContactListContainerProps,
  ContactListPanelProps,
  ContactListViewOptions,
  ContactListViewProps,
  ContactSourceLastStatus,
  FilterCriteria,
  StampedFilterCriteria,
} from './ContactList.view.interface';

export const FILTER_THRESHOLD = 500;

@injectable({
  name: 'ContactListView',
})
export class ContactListView extends RcViewModule {
  private _sourcesLastStatus: Map<string, ContactSourceLastStatus> = new Map();
  private _sourcesUpdatedAt = 0;
  private _currentFilterCriteria: StampedFilterCriteria | null = null;
  private _nextFilterCriteria: StampedFilterCriteria | null = null;

  constructor(
    protected _auth: Auth,
    protected _locale: Locale,
    protected _extensionInfo: ExtensionInfo,
    protected _contacts: Contacts,
    @optional() protected _contactDetailsView?: ContactDetailsView,
    @optional('ContactListViewOptions')
    protected _contactListViewOptions?: ContactListViewOptions,
  ) {
    super();
  }

  override _shouldInit() {
    return super._shouldInit() && this._auth.loggedIn && this.allSourcesReady();
  }

  override _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && (this._auth.notLoggedIn || !this.allSourcesReady()))
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
    return Array.from(this._contacts.contactSources.values());
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
  searchFilter = '';

  @state
  filterStamp = 0;

  @state
  isFiltering = false;

  @state
  filteredContactsList: [string, string][] = [];

  @action
  private _updateFilters({
    sourceFilter = this.sourceFilter,
    searchFilter = this.searchFilter,
  }: FilterCriteria) {
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

  @computed((that: ContactListView) => [
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
          source.filterContacts!(criteria.searchFilter!),
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
              `[ContactListView > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
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

  @delegate('server')
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

  @delegate('server')
  async getPresence(
    contact: IContact,
    useCache = true,
  ): Promise<ContactPresence | null> {
    const presence = await this._contacts.getPresence(contact, useCache);
    return presence;
  }

  @computed((that: ContactListView) => [that.checkSourcesUpdated()])
  get sourceNames() {
    const names = [AllContactSourceName];
    for (const source of this.contactSources) {
      if (source.sourceReady) {
        names.push(source.sourceName);
      }
    }
    return names;
  }

  @computed((that: ContactListView) => [that.filteredContacts])
  get contactGroups() {
    return (
      groupByFirstLetterOfName(
        sortContactItemsByName(uniqueContactItems(this.filteredContacts)),
      ) ?? []
    );
  }

  getUIProps({
    bottomNotice,
    bottomNoticeHeight,
  }: ContactListContainerProps): UIProps<ContactListPanelProps> {
    return {
      currentLocale: this._locale.currentLocale,
      contactSourceNames: this.sourceNames,
      contactGroups: this.contactGroups,
      searchSource: this.sourceFilter,
      searchString: this.searchFilter,
      isSearching: this.isFiltering,
      showSpinner: !this._locale.ready,
      currentSiteCode: this._extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._extensionInfo?.isMultipleSiteEnabled ?? false,
      bottomNotice,
      bottomNoticeHeight,
    };
  }

  private _defaultOnItemSelect = async ({ type, id }: RouteParams) => {
    if (!this._contactDetailsView) {
      throw new Error('ContactDetailsView is not introduced');
    }
    this._contactDetailsView.showContactDetails({ type, id });
  };

  getUIFunctions({
    onVisitPage,
    onRefresh,
    onItemSelect = this._defaultOnItemSelect,
  }: ContactListContainerProps): UIFunctions<ContactListPanelProps> {
    return {
      getAvatarUrl(): string | null {
        return null;
      },
      getPresence: (contact: IContact): Promise<any> => {
        return this.getPresence(contact);
      },
      onItemSelect,
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
        onVisitPage?.();
        // fire filtering contacts if not yet
        if (!this.filterStamp) {
          this.applyFilters();
        }
      },
      onRefresh,
    };
  }

  component(props: ContactListViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._contactListViewOptions?.component || ContactListPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
