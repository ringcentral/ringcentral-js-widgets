import {
  RcModuleV2,
  state,
  action,
  computed,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import isBlank from '../../lib/isBlank';
import {
  uniqueContactItems,
  sortContactItemsByName,
  groupByFirstLetterOfName,
  getFilterContacts,
  AllContactSourceName,
} from '../../lib/contactHelper';
import proxify from '../../lib/proxy/proxify';
import { Deps, UpdateFilterOptions } from './Contacts.interface';
import {
  IContact,
  TypedContact,
  TypedPhoneNumber,
  ContactSource,
} from '../../interfaces/Contact.model';

export const DEFAULT_SOURCE_FILTER = 'all';

@Module({
  name: 'Contacts',
  deps: [
    'Auth',
    { dep: 'ContactSources', optional: true },
    { dep: 'ContactsOptions', optional: true },
  ],
})
export class Contacts extends RcModuleV2<Deps> {
  protected _contactSources = new Map<string, ContactSource>();

  protected _sourcesLastStatus = new Map<
    string,
    { ready?: boolean; data?: IContact[] }
  >();

  protected _sourcesUpdatedAt = Date.now();

  constructor(deps: Deps) {
    super({
      deps,
    });
    for (const source of this._deps.contactSources ?? []) {
      this.addSource(source);
    }
  }

  @state
  searchFilter = '';

  @state
  sourceFilter = DEFAULT_SOURCE_FILTER;

  @action
  protected _updateFilter({ sourceFilter, searchFilter }: UpdateFilterOptions) {
    this.searchFilter = searchFilter ?? this.searchFilter;
    this.sourceFilter = sourceFilter ?? this.sourceFilter;
  }

  onReset() {
    this._updateFilter({
      sourceFilter: DEFAULT_SOURCE_FILTER,
      searchFilter: '',
    });
  }

  _shouldInit() {
    return this._deps.auth.loggedIn && this.sourceModuleReady && this.pending;
  }

  _shouldReset() {
    return (!this._deps.auth.loggedIn || !this.sourceModuleReady) && this.ready;
  }

  @proxify
  async updateFilter({ sourceFilter, searchFilter }: UpdateFilterOptions) {
    this._updateFilter({ sourceFilter, searchFilter });
  }

  addSource(source: ContactSource) {
    if (!source.sourceName) {
      throw new Error('[Contacts > ContactSource > sourceName] is required');
    }
    if (this._contactSources.has(source.sourceName)) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > sourceName] already exists`,
      );
    }
    if (source.getPresence && typeof source.getPresence !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > getPresence] must be a function`,
      );
    }
    if (
      source.getProfileImage &&
      typeof source.getProfileImage !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > getProfileImage] must be a function`,
      );
    }
    if (
      source.searchForPhoneNumbers &&
      typeof source.searchForPhoneNumbers !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > searchForPhoneNumbers] must be a function`,
      );
    }
    if (source.filterContacts && typeof source.filterContacts !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > filterContacts] must be a function`,
      );
    }
    if (
      source.matchContactsByPhoneNumber &&
      typeof source.matchContactsByPhoneNumber !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > matchContactsByPhoneNumber] must be a function`,
      );
    }
    this._contactSources.set(source.sourceName, source);
    this._sourcesLastStatus.set(source.sourceName, {});
    this._sourcesUpdatedAt = Date.now();
  }

  checkSourceUpdated() {
    let updated = false;
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      const lastStatus = this._sourcesLastStatus.get(sourceName);
      if (
        lastStatus.ready !== source.sourceReady ||
        lastStatus.data !== source.contacts
      ) {
        updated = true;
        this._sourcesLastStatus.set(sourceName, {
          ready: source.sourceReady,
          data: source.contacts,
        });
      }
    }
    if (updated) {
      this._sourcesUpdatedAt = Date.now();
    }
    return this._sourcesUpdatedAt;
  }

  async filterContacts(searchFilter: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.filterContacts === 'function',
    );
    let result: IContact[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(source.filterContacts(searchFilter));
        return promise
          .then((items) => {
            result = result.concat(items);
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async searchForPhoneNumbers(searchString: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.searchForPhoneNumbers === 'function',
    );
    let result: TypedPhoneNumber[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.searchForPhoneNumbers(searchString),
        );
        return promise
          .then((items) => {
            result = result.concat(items);
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > searchForPhoneNumbers] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async matchContactsByPhoneNumber(phoneNumber: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.matchContactsByPhoneNumber === 'function',
    );
    let result: TypedContact[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.matchContactsByPhoneNumber(phoneNumber),
        );
        return promise
          .then((items) => {
            result = result.concat(items);
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > matchContactsByPhoneNumber] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async matchContacts({ phoneNumbers }: { phoneNumbers: string[] }) {
    const result: Record<string, TypedContact[]> = {};
    await Promise.all(
      phoneNumbers.map((phoneNumber) => {
        const promise = this.matchContactsByPhoneNumber(phoneNumber);
        return promise.then((items) => {
          result[phoneNumber] = items;
        });
      }),
    );
    return result;
  }

  find({ type, id }: { type: string; id: string }) {
    const contactId = (id || '').toString();
    const source = this._contactSources.get(type);
    if (source) {
      return source.contacts.find((x) => x.id.toString() === contactId);
    }
    return null;
  }

  @proxify
  async getProfileImage(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getProfileImage) {
      const result = await source.getProfileImage(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async getPresence(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getPresence) {
      const result = await source.getPresence(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async sync(...args: unknown[]) {
    const syncPromises = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (typeof source.sync === 'function') {
        syncPromises.push(source.sync(...args));
      }
    }
    await Promise.all(syncPromises);
  }

  get sourceModuleReady() {
    let ready = true;
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (!source.ready) {
        ready = false;
      }
    }
    return ready;
  }

  get companyContacts() {
    const source = this._contactSources.get('company');
    if (source) {
      return source.contacts;
    }
    return [];
  }

  get personalContacts() {
    const source = this._contactSources.get('personal');
    if (source) {
      return source.contacts;
    }
    return [];
  }

  @computed<Contacts>((that) => [
    that._contactSources.size,
    that.checkSourceUpdated(),
  ])
  get sourceNames() {
    const names = [AllContactSourceName];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (source.sourceReady) {
        names.push(sourceName);
      }
    }
    return names;
  }

  @computed<Contacts>((that) => [that.checkSourceUpdated()])
  get allContacts() {
    let contacts: IContact[] = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (source.sourceReady) {
        contacts = contacts.concat(source.contacts);
      }
    }
    return contacts;
  }

  @computed<Contacts>(({ filteredContacts }) => [filteredContacts])
  get contactGroups() {
    return groupByFirstLetterOfName(
      sortContactItemsByName(uniqueContactItems(this.filteredContacts)),
    );
  }

  @computed<Contacts>((that) => [
    that.searchFilter,
    that.sourceFilter,
    that.checkSourceUpdated(),
  ])
  get filteredContacts() {
    let contacts: IContact[];
    if (
      isBlank(this.searchFilter) &&
      (this.sourceFilter === AllContactSourceName || isBlank(this.sourceFilter))
    ) {
      return this.allContacts;
    }
    if (
      this.sourceFilter !== AllContactSourceName &&
      !isBlank(this.sourceFilter)
    ) {
      const source = this._contactSources.get(this.sourceFilter);
      if (source && source.sourceReady) {
        /* eslint { "prefer-destructuring": 0 } */
        contacts = source.contacts;
      } else {
        contacts = [];
      }
    } else {
      contacts = this.allContacts;
    }
    if (!isBlank(this.searchFilter)) {
      contacts = getFilterContacts(contacts, this.searchFilter);
    }
    return contacts;
  }
}
