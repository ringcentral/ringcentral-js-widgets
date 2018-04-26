import 'core-js/fn/array/find';
import { createSelector } from 'reselect';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';

import actionTypes from './actionTypes';
import {
  getDataReducer,
  getTimestampReducer,
} from './getAccountExtensionReducer';
import {
  isEssential,
  simplifyExtensionData,
} from './accountExtensionHelper';
import subscriptionFilters from '../../enums/subscriptionFilters';
import proxify from '../../lib/proxy/proxify';

const extensionRegExp = /.*\/extension$/;
const DEFAULT_TTL = 24 * 60 * 60 * 1000;

/**
 * @class
 * @description Accound extension list managing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'AccountExtensionOptions', optional: true }
  ]
})
export default class AccountExtension extends DataFetcher {
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
    ...options
  }) {
    super({
      ...options,
      name: 'accountExtension',
      client,
      ttl,
      actionTypes,
      getDataReducer,
      getTimestampReducer,
      subscriptionFilters: [subscriptionFilters.accountExtension],
      subscriptionHandler: async (message) => {
        this._subscriptionHandleFn(message);
      },
      fetchFunction: async () => (await fetchList(params => (
        this._client.account().extension().list(params)
      ))).filter(isEssential).map(simplifyExtensionData),
      readyCheckFn: () => this._rolesAndPermissions.ready,
    });

    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  async _subscriptionHandleFn(message) {
    if (
      message &&
      extensionRegExp.test(message.event) &&
      message.body &&
      message.body.extensions
    ) {
      for (const item of message.body.extensions) {
        await this._processExtension(item);
      }
    }
  }
  async _processExtension(item) {
    const { extensionId, eventType } = item;
    const id = parseInt(extensionId, 10);
    if (eventType === 'Delete') {
      this._deleteExtension(id);
    } else if (eventType === 'Create' || eventType === 'Update') {
      try {
        const extensionData = await this._fetchExtensionData(id);
        this._addOrDeleteExtension(isEssential(extensionData),
          this.isAvailableExtension(extensionData.extensionNumber), extensionData, id);
      } catch (error) {
        /* falls through */
      }
    } else {
      // console.warn('unexpect notification eventType:', eventType);
    }
  }

  _addOrDeleteExtension(essential, isAvailableExtension, extensionData, extensionId) {
    if (essential && !isAvailableExtension) { // && !isAvailableExtension
      this._addExtension(extensionData);
    } else if (!essential && isAvailableExtension) {
      // if an extension was updated to be not essential anymore
      // eg. not assigned an extension number
      this._deleteExtension(extensionId);
    }
  }

  _addExtension(data) {
    this.store.dispatch({
      type: this.actionTypes.add,
      data: simplifyExtensionData(data),
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

  @proxify
  async _fetchExtensionData(id) {
    return this._client.account().extension(id).get();
  }

  @getter
  availableExtensions = createSelector(
    () => this.data,
    data => data || [],
  )

  isAvailableExtension(extensionNumber) {
    return !!this.availableExtensions.find(item => item.ext === extensionNumber);
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadExtensions;
  }
}
