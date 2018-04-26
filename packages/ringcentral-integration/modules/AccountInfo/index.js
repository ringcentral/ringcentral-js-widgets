import mask from 'json-mask';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import ensureExist from '../../lib/ensureExist';

import loginStatus from '../Auth/loginStatus';
import permissionsMessages from '../RolesAndPermissions/permissionsMessages';

const DEFAULT_MASK = [
  'id,mainNumber,status',
  'operator(id,extensionNumber)',
  'serviceInfo(brand(id,homeCountry(isoCode)))',
  `regionalSettings(${[
    'timezone(id,name,bias)',
    'homeCountry(id)',
    'language(localeCode)',
    'formattingLocale(localeCode)',
    'timeFormat',
  ].join(',')})`,
].join(',');

/**
 * @class
 * @description Accound info managing module.
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    'Alert',
    { dep: 'AccountInfoOptions', optional: true }
  ]
})
export default class AccountInfo extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    rolesAndPermissions,
    alert,
    ...options
  }) {
    super({
      name: 'accountInfo',
      client,
      fetchFunction: async () => mask(await client.account().get(), DEFAULT_MASK),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      ...options,
    });

    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._alert = alert;

    this.addSelector(
      'info',
      () => this.data,
      data => data || {},
    );
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

  get info() {
    return this._selectors.info();
  }

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
