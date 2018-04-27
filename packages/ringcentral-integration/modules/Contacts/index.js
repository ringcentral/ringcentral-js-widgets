import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import isBlank from '../../lib/isBlank';
import {
  uniqueContactItems,
  sortContactItemsByName,
  groupByFirstLetterOfName,
  filterContacts,
  AllContactSourceName,
} from '../../lib/contactHelper';
import proxify from '../../lib/proxy/proxify';
import actionTypes from './actionTypes';
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
    { dep: 'ContactsOptions', optional: true }
  ]
})
export default class Contacts extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  constructor({
    auth,
    listPageSize = DefaultContactListPageSize,
    contactSources = [],
    ...options,
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = this::ensureExist(auth, 'auth');
    this._reducer = getContactsReducer(this.actionTypes);
    this._contactSources = new Map();
    this._sourcesLastStatus = new Map();
    this._sourcesUpdatedAt = Date.now();
    this._listPageSize = listPageSize;

    for (const source of contactSources) {
      this.addSource(source);
    }

    this.addSelector(
      'sourceNames',
      () => this._contactSources.size,
      () => this._checkSourceUpdated(),
      () => {
        const names = [AllContactSourceName];
        for (const sourceName of Array.from(this._contactSources.keys())) {
          const source = this._contactSources.get(sourceName);
          if (source.sourceReady) {
            names.push(sourceName);
          }
        }
        return names;
      }
    );

    this.addSelector(
      'allContacts',
      () => this._checkSourceUpdated(),
      () => {
        let contacts = [];
        for (const sourceName of Array.from(this._contactSources.keys())) {
          const source = this._contactSources.get(sourceName);
          if (source.sourceReady) {
            contacts = contacts.concat(source.contacts);
          }
        }
        return contacts;
      }
    );

    this.addSelector(
      'contactGroups',
      () => this.filteredContacts,
      () => this.pageNumber,
      (filteredContacts, pageNumber) => {
        const pageSize = this._listPageSize;
        const count = pageNumber * pageSize;
        let items = uniqueContactItems(filteredContacts);
        items = sortContactItemsByName(items);
        items = items.slice(0, count);
        const groups = groupByFirstLetterOfName(items);
        return groups;
      }
    );

    this.addSelector(
      'filteredContacts',
      () => this.searchFilter,
      () => this.sourceFilter,
      () => this._checkSourceUpdated(),
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
          contacts = filterContacts(contacts, searchFilter);
        }
        return contacts;
      }
    );
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
    return (
      this._auth.loggedIn &&
      this.sourceModuleReady &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        !this.sourceModuleReady
      ) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  updateFilter({ sourceFilter, searchFilter, pageNumber }) {
    this.store.dispatch({
      type: this.actionTypes.updateFilter,
      sourceFilter,
      searchFilter,
      pageNumber,
    });
  }

  /**
   * @function
   * @param {Object} source - source module object
   * @param {String} params.sourceName - source name
   * @param {Bool} params.ready - source module ready status
   * @param {Bool} params.sourceReady - source ready status
   * @param {Array} params.contacts - source contacts data
   * @param {Function} params.getPresence - get source presence function, optional
   * @param {Function} params.getProfileImage - get source profile image function, optional
   * @param {Function} params.sync - sync source data function, optional
   * @param {Function} params.matchPhoneNumber - get match phoneNumber function, optional
   */
  addSource(source) {
    if (!source.sourceName) {
      throw new Error('Contacts: "sourceName" is required in Contacts source.');
    }
    if (this._contactSources.has(source.sourceName)) {
      throw new Error(`Contacts: A contact source named "${source.sourceName}" already exists`);
    }
    if (source.getPresence && typeof source.getPresence !== 'function') {
      throw new Error('Contacts: source\' getPresence must be a function');
    }
    if (source.getProfileImage && typeof source.getProfileImage !== 'function') {
      throw new Error('Contacts: source\' getProfileImage must be a function');
    }
    if (source.matchPhoneNumber && typeof source.matchPhoneNumber !== 'function') {
      throw new Error('Contacts: source\' matchPhoneNumber must be a function');
    }
    this._contactSources.set(source.sourceName, source);
    this._sourcesLastStatus.set(source.sourceName, {});
    this._sourcesUpdatedAt = Date.now();
  }

  _checkSourceUpdated() {
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

  matchPhoneNumber(phoneNumber) {
    let result = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (typeof source.matchPhoneNumber === 'function') {
        result = result.concat(source.matchPhoneNumber(phoneNumber));
      }
    }
    return result;
  }

  matchContacts({ phoneNumbers }) {
    const result = {};
    phoneNumbers.forEach((phoneNumber) => {
      result[phoneNumber] = this.matchPhoneNumber(phoneNumber);
    });
    return result;
  }

  find({ type, id }) {
    const contactId = (id || '').toString();
    const source = this._contactSources.get(type);
    if (source) {
      return source.contacts.find(x => x.id.toString() === contactId);
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
  async sync() {
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (typeof source.sync === 'function') {
        await source.sync();
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

  get pageNumber() {
    return this.state.pageNumber;
  }

  get allContacts() {
    return this._selectors.allContacts();
  }

  get filteredContacts() {
    return this._selectors.filteredContacts();
  }

  get sourceNames() {
    return this._selectors.sourceNames();
  }

  get contactGroups() {
    return this._selectors.contactGroups();
  }
}
