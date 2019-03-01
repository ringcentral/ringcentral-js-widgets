import { find } from 'ramda';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';

import actionTypes from './actionTypes';
import {
  getDataReducer,
  getTimestampReducer,
} from './getAccountDirectoryReducer';
import {
  isEnabled,
  isNotActivated,
  isFiltered,
  hasExtensionNumber,
} from './accountDirectoryHelper';
import subscriptionFilters from '../../enums/subscriptionFilters';
import proxify from '../../lib/proxy/proxify';
import extensionTypes from '../../enums/extensionTypes';

const contactsRegExp = /.*\/contacts$/;

const DEFAULT_TTL = 24 * 60 * 60 * 1000;
const DEFAULT_CHECK_STATUS = true;

// Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings
const DEFAULT_TYPE_LIST = [
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
    'RolesAndPermissions',
    { dep: 'AccountDirectoryOptions', optional: true }
  ]
})
export default class AccountDirectory extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  constructor({
    client,
    rolesAndPermissions,
    ttl = DEFAULT_TTL,
    checkStatus = DEFAULT_CHECK_STATUS,
    typeList = DEFAULT_TYPE_LIST,
    showNotActivated = false,
    ...options
  }) {
    super({
      ...options,
      name: 'AccountDirectory',
      client,
      ttl,
      actionTypes,
      getDataReducer,
      getTimestampReducer,
      subscriptionFilters: [subscriptionFilters.accountDirectory],
      subscriptionHandler: async (message) => {
        this._subscriptionHandleFn(message);
      },
      fetchFunction: async () => (await fetchList((params) => {
        const fetchRet = this._client.account().directory().contacts().list(params);
        return fetchRet;
      })).filter(ext => this._extensionFilter(ext)),
      readyCheckFn: () => this._rolesAndPermissions.ready,
    });

    this._checkStatus = checkStatus;
    this._typeList = typeList;
    this._rolesAndPermissions = this:: ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._showNotActivated = showNotActivated;
  }

  _extensionFilter(ext) {
    return (
      hasExtensionNumber(ext) &&
      (!this._checkStatus || isEnabled(ext) || (this._showNotActivated && isNotActivated(ext))) &&
      !isFiltered(ext, this._typeList)
    );
  }

  async _subscriptionHandleFn(message) {
    if ( // for new
      message &&
      contactsRegExp.test(message.event) &&
      message.body &&
      message.body.contacts
    ) {
      for (const item of message.body.contacts) {
        await this._processExtension(item);
      }
    }
  }

  async _processExtension(item) {
    const { id, eventType } = item;
    if (eventType === 'Delete') {
      this._deleteExtension(id);
    } else if (eventType === 'Create' || eventType === 'Update') {
      try {
        const extensionData = await this._fetchExtensionData(id);
        this._addOrDeleteExtension(extensionData, id);
      } catch (error) {
        /* falls through */
      }
    } else {
      // console.warn('unexpect notification eventType:', eventType);
    }
  }

  _addOrDeleteExtension(extensionData, extensionId) {
    const essential = this._extensionFilter(extensionData);
    const alreadyExists = this.isAvailableExtension(extensionData.extensionNumber);
    if (essential && !alreadyExists) {
      this._addExtension(extensionData);
    } else if (!essential && alreadyExists) {
      this._deleteExtension(extensionId);
    } else if (essential && alreadyExists) {
      this._updateExtension(extensionId, extensionData);
    }
  }

  _addExtension(data) {
    this.store.dispatch({
      type: this.actionTypes.add,
      data,
      timestamp: Date.now(),
    });
  }

  _deleteExtension(id) {
    this.store.dispatch({
      type: this.actionTypes.delete,
      id,
      timestamp: Date.now(),
    });
  }

  _updateExtension(id, data) {
    this.store.dispatch({
      type: this.actionTypes.update,
      id,
      data,
      timestamp: Date.now(),
    });
  }

  @proxify
  async _fetchExtensionData(id) {
    return this._client.account().directory().contacts(id).get();
  }

  @selector
  availableExtensions = [
    () => this.data,
    data => data || [],
  ]

  isAvailableExtension(extensionNumber) {
    return !!find(item => item.extensionNumber === extensionNumber, this.availableExtensions);
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadExtensions;
  }
}
