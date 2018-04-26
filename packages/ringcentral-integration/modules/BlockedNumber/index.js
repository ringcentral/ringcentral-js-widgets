import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import getter from '../../lib/getter';
import ensureExist from '../../lib/ensureExist';

/**
 * @class
 * @description Blocked number list managing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'BlockedNumberOptions', optional: true }
  ]
})
export default class BlockedNumber extends DataFetcher {
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
      ...options,
      name: 'blockedNumber',
      client,
      fetchFunction: async () => fetchList(params => (
        this._client.account().extension().blockedNumber().list(params)
      )),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
    });

    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  @getter
  numbers = createSelector(
    () => this.data,
    data => data || [],
  )

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadBlockedNumbers;
  }
}
