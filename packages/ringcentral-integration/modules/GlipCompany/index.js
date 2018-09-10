import { createSelector } from 'reselect';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import getter from '../../lib/getter';
import ensureExist from '../../lib/ensureExist';

/**
 * @class
 * @description Glip Company managing module.
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'GLipCompanyOptions', optional: true }
  ]
})
export default class GlipCompany extends DataFetcher {
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
      name: 'glipCompany',
      client,
      fetchFunction: async () => {
        const response = await this._client.glip().companies('~').get();
        return response;
      },
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
      ...options,
    });
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  @getter
  info = createSelector(
    () => this.data,
    data => data || {},
  )

  get name() {
    return this.info.name;
  }

  get domain() {
    return this.info.domain;
  }

  get id() {
    return this.info.id;
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.hasGlipPermission;
  }
}
