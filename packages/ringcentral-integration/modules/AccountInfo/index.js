import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';

import loginStatus from '../Auth/loginStatus';
import permissionsMessages from '../RolesAndPermissions/permissionsMessages';

/**
 * @class
 * @description Accound info managing module.
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    'Alert',
    { dep: 'AccountInfoOptions', optional: true },
  ],
})
export default class AccountInfo extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, rolesAndPermissions, alert, ...options }) {
    super({
      client,
      fetchFunction: async () => client.account().get(),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      ...options,
    });

    this._rolesAndPermissions = this::ensureExist(
      rolesAndPermissions,
      'rolesAndPermissions',
    );
    this._alert = alert;
  }

  get _name() {
    return 'accountInfo';
  }

  async _onStateChange() {
    await super._onStateChange();
    if (
      this._auth.loginStatus === loginStatus.loggedIn &&
      this.ready &&
      !this._hasPermission
    ) {
      await this._auth.logout();
      if (this._alert) {
        this._alert.danger({
          message: permissionsMessages.insufficientPrivilege,
          ttl: 0,
        });
      }
    }
  }

  @selector
  info = [() => this.data, (data) => data || {}];

  @selector
  serviceInfo = [() => this.info, (info) => info.serviceInfo || {}];

  @selector
  servicePlan = [
    () => this.serviceInfo,
    (serviceInfo) => serviceInfo.servicePlan || {},
  ];

  get id() {
    return this.info.id;
  }

  get country() {
    return this.info.serviceInfo && this.info.serviceInfo.brand.homeCountry;
  }

  get countryCode() {
    return (this.country && this.country.isoCode) || 'US';
  }

  get mainCompanyNumber() {
    return this.info.mainNumber;
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadCompanyInfo;
  }
}
