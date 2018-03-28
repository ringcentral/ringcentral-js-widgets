import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';

/**
 * @class
 * @description Extension forwarding number list module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'ForwardingNumberOptions', optional: true }
  ]
})
export default class ForwardingNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    rolesAndPermissions,
    ...options
  }) {
    super({
      name: 'forwardingNumber',
      client,
      fetchFunction: async () => {
        const lists = await fetchList(params => (
          this._client.account().extension().forwardingNumber().list(params)
        ));
        return lists;
      },
      forbiddenHandler: () => [],
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
      ...options,
    });
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  @getter
  numbers = createSelector(
    () => this.data,
    data => data || [],
  )

  @getter
  flipNumbers = createSelector(
    () => this.numbers,
    phoneNumbers =>
      phoneNumbers.filter(p => p.features.indexOf('CallFlip') !== -1 && p.phoneNumber)
  )

  @getter
  forwardingNumbers = createSelector(
    () => this.numbers,
    phoneNumbers =>
      phoneNumbers.filter(p => p.features.indexOf('CallForwarding') !== -1 && p.phoneNumber)
  )

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadUserForwardingFlipNumbers;
  }
}
