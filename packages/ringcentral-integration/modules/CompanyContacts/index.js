import { find, filter, reduce } from 'ramda';
import { combineReducers } from 'redux';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import { getDataFetcherReducer } from '../../lib/DataFetcher/getDataFetcherReducer';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';

import { actionTypes } from './actionTypes';
import {
  getDataReducer,
  getTimestampReducer,
  getExtensionTypeFiltersReducer,
  getShowDisabledReducer,
  getShowNotActivatedReducer,
} from './getReducers';
import subscriptionFilters from '../../enums/subscriptionFilters';
import extensionTypes from '../../enums/extensionTypes';
import { phoneTypes } from '../../enums/phoneTypes';
import { extensionStatusTypes } from '../../enums/extensionStatusTypes';

const contactsRegExp = /.*\/directory\/contacts$/;

const DEFAULT_TTL = 24 * 60 * 60 * 1000;
const DEFAULT_SHOW_DISABLED = false;
const DEFAULT_SHOW_NOT_ACTIVATED = false;
const DEFAULT_ALLOW_SETTINGS = false;

// Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings
const DEFAULT_TYPE_FILTERS = [
  extensionTypes.digitalUser,
  extensionTypes.user,
  extensionTypes.department,
  // extensionTypes.limited,
  // extensionTypes.announcement,
  // extensionTypes.applicationExtension,
  // extensionTypes.bot,
  // extensionTypes.faxUser,
  // extensionTypes.ivrMenu,
  // extensionTypes.pagingOnly,
  // extensionTypes.parkLocation,
  // extensionTypes.sharedLinesGroup,
];

/**
 * @class
 * @description Accound extension list managing module
 */
@Module({
  deps: [
    'Client',
    'ExtensionFeatures',
    { dep: 'CompanyContactsOptions', optional: true },
  ],
})
export default class CompanyContacts extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  constructor({
    client,
    extensionFeatures,
    storage,
    ttl = DEFAULT_TTL,
    polling = true,
    showDisabled = DEFAULT_SHOW_DISABLED,
    extensionTypeFilters = DEFAULT_TYPE_FILTERS,
    showNotActivated = DEFAULT_SHOW_NOT_ACTIVATED,
    allowSettings = DEFAULT_ALLOW_SETTINGS,
    ...options
  }) {
    super({
      ...options,
      client,
      storage,
      ttl,
      polling,
      getReducer: allowSettings
        ? getDataFetcherReducer
        : (types, reducers = {}) =>
            getDataFetcherReducer(types, {
              ...reducers,
              showDisabled: getShowDisabledReducer(types, showDisabled),
              showNotActivated: getShowNotActivatedReducer(
                types,
                showNotActivated,
              ),
              extensionTypeFilters: getExtensionTypeFiltersReducer(
                types,
                extensionTypeFilters,
              ),
            }),
      getDataReducer,
      getTimestampReducer,
      subscriptionFilters: [subscriptionFilters.companyContacts],
      subscriptionHandler: async (message) => {
        if (
          this.ready &&
          message &&
          contactsRegExp.test(message.event) &&
          message.body &&
          message.body.contacts
        ) {
          for (const contact of message.body.contacts) {
            await this._processContact(contact);
          }
        }
      },
      fetchFunction: () =>
        fetchList((params) =>
          this._client.account().directory().contacts().list(params),
        ),
      readyCheckFn: () => this._extensionFeatures.ready,
    });
    this._allowSettings = allowSettings;

    if (this._allowSettings) {
      this._storage = ensureExist(storage, 'storage');
      this._settingsStorageKey = 'CompanyContacts-settings';
      this._storage.registerReducer({
        key: this._settingsStorageKey,
        reducer: combineReducers({
          showDisabled: getShowDisabledReducer(this.actionTypes, showDisabled),
          showNotActivated: getShowNotActivatedReducer(
            this.actionTypes,
            showNotActivated,
          ),
          extensionTypeFilters: getExtensionTypeFiltersReducer(
            this.actionTypes,
            extensionTypeFilters,
          ),
        }),
      });
    }
    this._extensionFeatures = extensionFeatures;
  }

  get _name() {
    return 'CompanyContacts';
  }

  get _actionTypes() {
    return actionTypes;
  }

  async _processContact({ eventType, oldEtag, newEtag, ...contact }) {
    switch (eventType) {
      case 'Create':
      case 'Update':
        this.store.dispatch({
          type: this.actionTypes.upsert,
          contact,
          timestamp: Date.now(),
        });
        break;
      case 'Delete':
        this.store.dispatch({
          type: this.actionTypes.delete,
          contact,
          timestamp: Date.now(),
        });
        break;
      default:
      /* do nothing */
    }
  }

  /**
   * @deprecated consider using numberValidate module's isAvailableExtension
   * TODO: Currently we don't have clearly defined business rule on
   * what extension numbers are considered available for dialing.
   * @param {String} extensionNumber
   * @returns {Boolean}
   */
  isAvailableExtension(extensionNumber) {
    return !!find(
      (item) => item.extensionNumber === extensionNumber,
      this.filteredContacts.concat(this.ivrContacts),
    );
  }

  @selector
  _extensionFilter = [
    () => this.showDisabled,
    () => this.showNotActivated,
    () => this.extensionTypeFilters,
    (showDisabled, showNotActivated, filters) => {
      const typeFilter = reduce(
        (acc, item) => {
          acc[item] = true;
          return acc;
        },
        {},
        filters,
      );
      return filter(
        (item) =>
          !(
            (!showDisabled && item.status === extensionStatusTypes.disabled) ||
            (!showNotActivated &&
              item.status === extensionStatusTypes.notActivated) ||
            !typeFilter[item.type]
          ),
      );
    },
  ];

  @selector
  ivrContacts = [
    () => this.data,
    (data) =>
      data
        .filter((item) => item.type === extensionTypes.ivrMenu)
        .map((item) => {
          const phoneNumber = {
            phoneType: phoneTypes.extension,
            phoneNumber: item.extensionNumber,
          };
          let phoneNumbers = [];
          if (!item.phoneNumbers) {
            phoneNumbers = [phoneNumber];
          } else {
            phoneNumbers = item.phoneNumbers.concat([phoneNumber]);
          }
          return {
            ...item,
            phoneNumbers,
          };
        }),
  ];

  @selector
  filteredContacts = [
    () => this.data,
    () => this._extensionFilter,
    (data, extensionFilter) => extensionFilter(data),
  ];

  get _hasPermission() {
    return this._extensionFeatures.features?.ReadExtensions?.available ?? false;
  }

  get allowSettings() {
    return this._allowSettings;
  }

  get showDisabled() {
    if (this.allowSettings) {
      return this._storage.getItem(this._settingsStorageKey).showDisabled;
    }
    return this.state.showDisabled;
  }

  get showNotActivated() {
    if (this.allowSettings) {
      return this._storage.getItem(this._settingsStorageKey).showNotActivated;
    }
    return this.state.showNotActivated;
  }

  get extensionTypeFilters() {
    if (this.allowSettings) {
      return this._storage.getItem(this._settingsStorageKey)
        .extensionTypeFilters;
    }
    return this.state.extensionTypeFilters;
  }
}
