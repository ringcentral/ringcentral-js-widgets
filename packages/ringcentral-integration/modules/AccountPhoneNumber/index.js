import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import removeUri from '../../lib/removeUri';
import { selector } from '../../lib/selector';
import ensureExist from '../../lib/ensureExist';
import { getDataReducer } from './getReducer';

/**
 * @typedef ExtensionData
 * @type {object}
 * @property {number} id
 * @property {string} extensionNumber
 */

/**
 * @typedef {Object} SimplePhoneNumber
 * @property {ExtensionData} extension
 * @property {number} id
 * @property {string} location
 * @property {string} paymentType
 * @property {string} phoneNumber
 * @property {string} status
 * @property {string} type
 * @property {string} usageType
 */

/**
 * @typedef {Object} PhoneNumber
 * @property {string} uri
 * @property {number} id
 * @property {string} location
 * @property {string} paymentType
 * @property {string} phoneNumber
 * @property {string} status
 * @property {string} type
 * @property {string} usageType
 */

/**
 * @param {PhoneNumber} number
 * @returns {SimplePhoneNumber}
 */
function simplifyPhoneNumber(number) {
  return removeUri(number);
}

/**
 * @class
 * @description Accound phone number module to get account phone number list
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'AccountPhoneNumberOptions', optional: true },
  ],
})
export default class AccountPhoneNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, rolesAndPermissions, ...options }) {
    super({
      client,
      getDataReducer,
      fetchFunction: async () =>
        (
          await fetchList((params) =>
            client
              .account()
              .phoneNumber()
              .list(params),
          )
        ).map(simplifyPhoneNumber),
      readyCheckFn: () => this._rolesAndPermissions.ready,
      ...options,
    });
    console.warn(
      'AccountPhoneNumber module is deprecated, please use CompanyContacts instead.',
    );

    this._rolesAndPermissions = ensureExist.call(
      this,
      rolesAndPermissions,
      'rolesAndPermissions',
    );
  }

  get _name() {
    return 'accountPhoneNumber';
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  @selector
  extensionToPhoneNumberMap = [
    () => this.numbers,
    (numbers) => {
      const numberMap = {};
      numbers.forEach((number) => {
        if (number.extension && number.extension.extensionNumber) {
          if (!numberMap[number.extension.extensionNumber]) {
            numberMap[number.extension.extensionNumber] = [];
          }
          numberMap[number.extension.extensionNumber].push(number);
        }
      });
      return numberMap;
    },
  ];

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadCompanyPhoneNumbers;
  }
}
