import { combineReducers } from 'redux';

import moduleStatuses from '../../enums/moduleStatuses';
import { phoneSources } from '../../enums/phoneSources';
import syncTypes from '../../enums/syncTypes';
import {
  addPhoneToContact,
  getFilterContacts,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import sleep from '../../lib/sleep';
import { actionTypes } from './actionTypes';
import getAddressBookReducer, {
  getContactListReducer,
  getSyncTokenReducer,
  getTimestampReducer,
} from './getAddressBookReducer';

const CONTACTS_PER_PAGE = 250;
const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const REGX_DECODE = /&\w+;/g;
const DECODE = {
  '&amp;': '&',
  '&bsol;': '\\',
  '&sol;': '/',
  '&apos;': "'",
};

function getSyncParams(syncToken, pageId) {
  const query = {
    perPage: CONTACTS_PER_PAGE,
  };
  if (syncToken) {
    query.syncToken = syncToken;
    query.syncType = syncTypes.iSync;
  } else {
    query.syncType = syncTypes.fSync;
  }
  if (pageId) {
    query.pageId = pageId;
  }
  return query;
}

/**
 * @class
 * @description Accound book module to get user person contacts in RC
 */
@Module({
  deps: [
    'Client',
    'Auth',
    'ExtensionFeatures',
    { dep: 'Storage', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'AddressBookOptions', optional: true },
  ],
})
export default class AddressBook extends Pollable {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - Auth module instance
   * @param {TabManager} params.tabManage - TabManager module instance
   * @param {Storage} params.storage - storage module instance, optional
   * @param {Number} params.ttl - local cache timestamp, default 30 mins
   * @param {Number} params.timeToRetry - timestamp to retry, default 62 seconds
   * @param {Bool} params.polling - polling flag, default true
   * @param {Bool} params.disableCache - polling flag, default false
   */
  constructor({
    client,
    auth,
    storage,
    tabManager,
    extensionFeatures,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    polling = true,
    disableCache = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._auth = auth;
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._extensionFeatures = extensionFeatures;
    this._timeToRetry = timeToRetry;
    this._polling = polling;
    this._promise = null;
    this._addressBookStorageKey = 'addressBookContactsList';
    if (this._storage) {
      this._reducer = getAddressBookReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._addressBookStorageKey,
        reducer: combineReducers({
          syncToken: getSyncTokenReducer(this.actionTypes),
          timestamp: getTimestampReducer(this.actionTypes),
          contactList: getContactListReducer(this.actionTypes),
        }),
      });
    } else {
      this._reducer = getAddressBookReducer(this.actionTypes, {
        contactList: getContactListReducer(this.actionTypes),
        syncToken: getSyncTokenReducer(this.actionTypes),
        timestamp: getTimestampReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this._shouleCleanCache()) {
        this._cleanUp();
      }
      if (this._hasPermission) {
        await this._initAddressBook();
      } else {
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
        });
      }
    } else if (this._isDataReady()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    }
  }

  _shouldInit() {
    return (
      (!this._storage || this._storage.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this._extensionFeatures.ready &&
      this._auth.loggedIn &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      ((!!this._storage && !this._storage.ready) ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._extensionFeatures.ready ||
        !this._auth.loggedIn) &&
      this.ready
    );
  }

  _shouleCleanCache() {
    return (
      this._auth.isFreshLogin ||
      !this.timestamp ||
      Date.now() - this.timestamp > this._ttl
    );
  }

  _shouldFetch() {
    return (
      (!this._storage || !this._tabManager || this._tabManager.active) &&
      this._shouleCleanCache()
    );
  }

  _isDataReady() {
    // only turns ready when data has been fetched
    // (could be from other tabs)
    return (
      this.status === moduleStatuses.initializing && this.timestamp !== null
    );
  }

  async _initAddressBook() {
    if (!this._hasPermission) return;
    if (this._shouldFetch()) {
      try {
        await this.sync();
      } catch (e) {
        console.error('syncData error:', e);
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
  }

  get _hasPermission() {
    return (
      this._extensionFeatures.features?.ReadPersonalContacts?.available ?? false
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
    this._clearTimeout();
    this._promise = null;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  async _syncWithForbiddenCheck(syncToken) {
    try {
      const response = await this._sync(syncToken);
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 403) {
        const result = {
          records: [],
          syncInfo: {
            syncToken: undefined,
          },
        };
        return result;
      }
      throw error;
    }
  }

  // interface of ContactSource
  @proxify
  async sync() {
    if (!this._promise) {
      this._promise = (async () => {
        try {
          this.store.dispatch({
            type: this.actionTypes.sync,
          });
          const response = await this._syncWithForbiddenCheck(this.syncToken);
          this.store.dispatch({
            type: this.actionTypes.syncSuccess,
            records: response.records,
            syncToken: response.syncInfo.syncToken,
            timestamp: Date.now(),
          });
          if (this._polling) {
            this._startPolling();
          }
        } catch (error) {
          this._onSyncError();
          if (this._polling) {
            this._startPolling(this.timeToRetry);
          } else {
            this._retry();
          }
          this._promise = null;
          throw error;
        }
        this._promise = null;
      })();
    }
    await this._promise;
  }

  _onSyncError() {
    this.store.dispatch({
      type: this.actionTypes.syncError,
    });
  }

  @proxify
  async _sync(syncToken, pageId) {
    const params = getSyncParams(syncToken, pageId);
    const response = await this._syncAddressBookApi(params);
    if (!response.nextPageId) {
      return response;
    }
    await sleep(1000);
    const lastResponse = await this._sync(syncToken, response.nextPageId);
    return {
      ...lastResponse,
      records: response.records.concat(lastResponse.records),
    };
  }

  @proxify
  async _syncAddressBookApi(params) {
    const updateRequest = await this._client
      .account()
      .extension()
      .addressBookSync()
      .list(params);
    this._decodeAddressBook(updateRequest);
    return updateRequest;
  }

  _decode(text) {
    return text.replace(REGX_DECODE, ($0) => {
      let handleText = $0;
      if (DECODE[$0]) {
        handleText = DECODE[$0];
      }
      return handleText;
    });
  }

  _decodeAddressBook(origin) {
    if (origin && origin.records && Array.isArray(origin.records)) {
      origin.records.forEach((record) => {
        if (record.firstName) {
          record.firstName = this._decode(record.firstName);
        }
        if (record.lastName) {
          record.lastName = this._decode(record.lastName);
        }
      });
    }
  }

  _cleanUp() {
    this.store.dispatch({
      type: this.actionTypes.cleanUp,
    });
  }

  // interface of ContactSource
  findContact(contactId) {
    return this.contacts.find((x) => x.id === contactId);
  }

  // interface of ContactSource
  filterContacts(searchFilter) {
    return getFilterContacts(this.contacts, searchFilter);
  }

  // interface of ContactSource
  searchForPhoneNumbers(searchString) {
    return getSearchForPhoneNumbers({
      contacts: this.contacts,
      searchString,
      entityType: phoneSources.contact,
      options: null,
    });
  }

  // interface of ContactSource
  matchContactsByPhoneNumber(phoneNumber) {
    return getMatchContactsByPhoneNumber({
      contacts: this.contacts,
      phoneNumber,
      entityType: phoneSources.rcContact,
    });
  }

  @proxify
  async fetchData() {
    await this.sync();
  }

  get status() {
    return this.state.status;
  }

  get syncToken() {
    if (this._storage) {
      return this._storage.getItem(this._addressBookStorageKey).syncToken;
    }
    return this.state.syncToken;
  }

  get rawContacts() {
    if (this._storage) {
      return this._storage.getItem(this._addressBookStorageKey).contactList;
    }
    return this.state.contactList;
  }

  get timestamp() {
    if (this._storage) {
      return this._storage.getItem(this._addressBookStorageKey).timestamp;
    }
    return this.state.timestamp;
  }

  get ttl() {
    return this._ttl;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  // interface of ContactSource
  get sourceName() {
    return 'personal';
  }

  // interface of ContactSource
  @selector
  contacts = [
    () => this.rawContacts,
    (rawContacts) => {
      const contactsList = [];
      rawContacts.forEach((rawContact) => {
        const contact = {
          type: this.sourceName,
          phoneNumbers: [],
          emails: [],
          ...rawContact,
        };
        contact.id = `${contact.id}`;
        contact.name = `${contact.firstName || ''} ${contact.lastName || ''}`;
        if (contact.email) contact.emails.push(contact.email);
        if (contact.email2) contact.emails.push(contact.email2);
        if (contact.email3) contact.emails.push(contact.email3);
        Object.keys(contact).forEach((key) => {
          if (key.toLowerCase().indexOf('phone') === -1) {
            return;
          }
          if (typeof contact[key] !== 'string') {
            return;
          }
          addPhoneToContact(contact, contact[key], key);
        });
        contactsList.push(contact);
      });
      return contactsList;
    },
  ];

  // interface of ContactSource
  get sourceReady() {
    return this.ready;
  }
}
