import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';
/**
 * @class
 * @description Blocked number list managing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'BlockedNumberOptions', optional: true },
  ],
})
export default class BlockedNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, rolesAndPermissions, ...options }) {
    super({
      ...options,
      client,
      fetchFunction: async () =>
        fetchList((params) =>
          this._client
            .account()
            .extension()
            .blockedNumber()
            .list(params),
        ),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
    });

    this._rolesAndPermissions = this::ensureExist(
      rolesAndPermissions,
      'rolesAndPermissions',
    );
  }

  get _name() {
    return 'blockedNumber';
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadBlockedNumbers;
  }
}
