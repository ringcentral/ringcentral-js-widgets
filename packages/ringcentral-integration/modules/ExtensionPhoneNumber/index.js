import { find } from 'ramda';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import removeUri from '../../lib/removeUri';
import DataFetcher from '../../lib/DataFetcher';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';


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
      fetchFunction: async () => (await fetchList(params => (
        client.account().extension().phoneNumber().list(params)
      ))).map(number => ({
        ...number,
        country: removeUri(number.country),
      })),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
      ...options,
    });

    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
  }

  @selector
  numbers = [
    () => this.data,
    data => data || [],
  ]

  @selector
  companyNumbers = [
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => p.usageType === 'CompanyNumber'),
  ]

  @selector
  mainCompanyNumber = [
    () => this.numbers,
    phoneNumbers => find(p => p.usageType === 'MainCompanyNumber', phoneNumbers),
  ]

  @selector
  directNumbers = [
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => p.usageType === 'DirectNumber'),
  ]

  @selector
  callerIdNumbers = [
    () => this.numbers,
    phoneNumbers => phoneNumbers.filter(p => (
      (p.features && p.features.indexOf('CallerId') !== -1) ||
      (p.usageType === 'ForwardedNumber' && p.status === 'PortedIn')
    )),
  ]

  @selector
  smsSenderNumbers = [
    () => this.numbers,
    phoneNumbers =>
      phoneNumbers.filter(
        p => (p.features && p.features.indexOf('SmsSender') !== -1)
      ),
  ]

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadUserPhoneNumbers;
  }
}
