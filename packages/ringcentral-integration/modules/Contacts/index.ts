import {
  AllContactSourceName,
  getFilterContacts,
  groupByFirstLetterOfName,
  sortContactItemsByName,
  uniqueContactItems,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import isBlank from '../../lib/isBlank';
import { proxify } from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import { actionTypes } from './actionTypes';
import getContactsReducer from './getContactsReducer';

export const DefaultContactListPageSize = 20;

/**
 * @class
 * @description Contacts managing module
 */
@Module({
  deps: [
    'Auth',
    { dep: 'ContactSources', optional: true },
    { dep: 'ContactsOptions', optional: true },
  ],
})
export default class Contacts extends RcModule {
  _auth: any;
  _contactSources: Map<any, any>;
  _sourcesLastStatus: Map<any, any>;
  _sourcesUpdatedAt: number;
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  constructor({ auth, contactSources = [], ...options }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = ensureExist.call(this, auth, 'auth');
    this._reducer = getContactsReducer(this.actionTypes);
    this._contactSources = new Map();
    this._sourcesLastStatus = new Map();
    this._sourcesUpdatedAt = Date.now();

    for (const source of contactSources) {
      this.addSource(source);
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    }
  }

  _shouldInit() {
    return this._auth.loggedIn && this.sourceModuleReady && this.pending;
  }

  _shouldReset() {
    return (!this._auth.loggedIn || !this.sourceModuleReady) && this.ready;
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async updateFilter({ sourceFilter, searchFilter }) {
    this.store.dispatch({
      type: this.actionTypes.updateFilter,
      sourceFilter,
      searchFilter,
    });
  }

  addSource(source) {
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
    if (source.findContact && typeof source.findContact !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > findContact] must be a function`,
      );
    }
    if (source.filterContacts && typeof source.filterContacts !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > filterContacts] must be a function`,
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

  async findContact({ sourceName, contactId }) {
    let contact = null;
    const source = this._contactSources.get(sourceName);
    if (source && typeof source.findContact === 'function') {
      try {
        contact = await source.findContact(contactId);
      } catch (error) {
        console.error(
          `[Contacts > ContactSource(${source.sourceName}) > findContact] ${error}`,
        );
      }
    }
    return contact;
  }

  async filterContacts(searchFilter) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.filterContacts === 'function',
    );
    let result = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(source.filterContacts(searchFilter));
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
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

  async searchForPhoneNumbers(searchString) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.searchForPhoneNumbers === 'function',
    );
    let result = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.searchForPhoneNumbers(searchString),
        );
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
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

  async matchContactsByPhoneNumber(phoneNumber) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.matchContactsByPhoneNumber === 'function',
    );
    let result = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.matchContactsByPhoneNumber(phoneNumber),
        );
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
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

  async matchContacts({ phoneNumbers }) {
    const result = {};
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

  find({ type, id }) {
    const contactId = (id || '').toString();
    const source = this._contactSources.get(type);
    if (source) {
      return source.contacts.find((x) => x.id.toString() === contactId);
    }
    return null;
  }

  @proxify
  async getProfileImage(contact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getProfileImage) {
      const result = await source.getProfileImage(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async getPresence(contact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getPresence) {
      const result = await source.getPresence(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async sync(...args) {
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (typeof source.sync === 'function') {
        await source.sync(...args);
      }
    }
  }

  get status() {
    return this.state.status;
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

  get searchFilter() {
    return this.state.searchFilter;
  }

  get sourceFilter() {
    return this.state.sourceFilter;
  }

  @selector
  sourceNames = [
    () => this._contactSources.size,
    () => this.checkSourceUpdated(),
    () => {
      const names = [AllContactSourceName];
      for (const sourceName of Array.from(this._contactSources.keys())) {
        const source = this._contactSources.get(sourceName);
        if (source.sourceReady) {
          names.push(sourceName);
        }
      }
      return names;
    },
  ];

  @selector
  allContacts = [
    () => this.checkSourceUpdated(),
    () => {
      let contacts = [];
      for (const sourceName of Array.from(this._contactSources.keys())) {
        const source = this._contactSources.get(sourceName);
        if (source.sourceReady && source.contacts) {
          contacts = contacts.concat(source.contacts);
        }
      }
      return contacts;
    },
  ];

  @selector
  contactGroups = [
    () => this.filteredContacts,
    (filteredContacts) =>
      groupByFirstLetterOfName(
        sortContactItemsByName(uniqueContactItems(filteredContacts)),
      ),
  ];

  @selector
  filteredContacts = [
    () => this.searchFilter,
    () => this.sourceFilter,
    () => this.checkSourceUpdated(),
    (searchFilter, sourceFilter) => {
      let contacts;
      if (
        isBlank(searchFilter) &&
        (sourceFilter === AllContactSourceName || isBlank(sourceFilter))
      ) {
        return this.allContacts;
      }
      if (sourceFilter !== AllContactSourceName && !isBlank(sourceFilter)) {
        const source = this._contactSources.get(sourceFilter);
        if (source && source.sourceReady) {
          /* eslint { "prefer-destructuring": 0 } */
          contacts = source.contacts;
        } else {
          contacts = [];
        }
      } else {
        contacts = this.allContacts;
      }
      if (!isBlank(searchFilter)) {
        contacts = getFilterContacts(contacts, searchFilter);
      }
      return contacts;
    },
  ];
}
