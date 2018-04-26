import 'core-js/fn/array/find';
import { createSelector } from 'reselect';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import DataFetcher from '../../lib/DataFetcher';
import removeUri from '../../lib/removeUri';
import getter from '../../lib/getter';
import ensureExist from '../../lib/ensureExist';

import { getDataReducer } from './getReducer';

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
    { dep: 'AccountPhoneNumberOptions', optional: true }
  ]
})
export default class AccountPhoneNumber extends DataFetcher {
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
      name: 'accountPhoneNumber',
      client,
      getDataReducer,
      fetchFunction: async () => (await fetchList(params => (
        client.account().phoneNumber().list(params)
      ))).map(simplifyPhoneNumber),
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
  extensionToPhoneNumberMap = createSelector(
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
  )

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions.ReadCompanyPhoneNumbers;
  }
}
