import 'core-js/fn/array/find';
import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import ensureExist from '../../lib/ensureExist';
import getter from '../../lib/getter';

/**
 * @class
 * @description Extension phone number list module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'ExtensionPhoneNumberOptions', optional: true }
  ]
})
export default class ExtensionPhoneNumber extends DataFetcher {
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
      name: 'extensionPhoneNumber',
      client,
      fetchFunction: () => (fetchList(params => (
        client.account().extension().phoneNumber().list(params)
      ))),
      readyCheckFn: () => this._rolesAndPermissions.ready,
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
  companyNumbers = createSelector(
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => p.usageType === 'CompanyNumber'),
  )

  @getter
  mainCompanyNumber = createSelector(
    () => this.numbers,
    phoneNumbers => phoneNumbers.find(p => p.usageType === 'MainCompanyNumber'),
  )

  @getter
  directNumbers = createSelector(
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => p.usageType === 'DirectNumber'),
  )

  @getter
  callerIdNumbers = createSelector(
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => (
      (p.features && p.features.indexOf('CallerId') !== -1) ||
      (p.usageType === 'ForwardedNumber' && p.status === 'PortedIn')
    )),
  )

  @getter
  smsSenderNumbers = createSelector(
    () => this.numbers,
    phoneNumbers =>
      phoneNumbers.filter(
        p => (p.features && p.features.indexOf('SmsSender') !== -1)
      ),
  )

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadUserPhoneNumbers;
  }
}
