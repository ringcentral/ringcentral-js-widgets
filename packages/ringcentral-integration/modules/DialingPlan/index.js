import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import moduleStatuses from '../../enums/moduleStatuses';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';

/**
 * @class
 * @description Dial plan list managing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'DialingPlanOptions', optional: true }
  ]
})
export default class DialingPlan extends DataFetcher {
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
      name: 'dialingPlan',
      client,
      polling: true,
      fetchFunction: async () => (await fetchList(async (params) => {
        const platform = client.service.platform();
        const response = await platform.get('/account/~/dialing-plan', params);
        return response.json();
      })).map(p => ({
        id: p.id,
        isoCode: p.isoCode,
        callingCode: p.callingCode,
      })),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      ...options,
    });

    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  @getter
  plans = createSelector(
    () => this.data,
    data => data || [],
  )

  get plans() {
    return this._selectors.plans();
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadCompanyInfo;
  }
}

