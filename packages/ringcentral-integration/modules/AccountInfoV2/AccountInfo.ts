import { GetAccountInfoResponse } from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { permissionsMessages } from '../RolesAndPermissions/permissionsMessages';
import { Deps } from './AccountInfo.interfaces';

@Module({
  name: 'AccountInfo',
  deps: [
    'Auth',
    'Client',
    'RolesAndPermissions',
    'Alert',
    'DataFetcherV2',
    { dep: 'AccountInfoOptions', optional: true },
  ],
})
export class AccountInfo extends DataFetcherV2Consumer<
  Deps,
  GetAccountInfoResponse
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.accountInfoOptions,
      key: 'accountInfo',
      fetchFunction: async () =>
        (await this._deps.client.account().get()) as GetAccountInfoResponse,
      readyCheckFunction: () => !!this._deps.rolesAndPermissions.ready,
      permissionCheckFunction: () => this._checkPermission(),
      cleanOnReset: true,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _checkPermission() {
    return !!this._deps.rolesAndPermissions.permissions?.ReadCompanyInfo;
  }

  async onStateChange() {
    if (this._deps.auth.loggedIn && this.ready && !this._checkPermission()) {
      await this._deps.auth.logout();
      this._deps.alert.danger({
        message: permissionsMessages.insufficientPrivilege,
        ttl: 0,
      });
    }
  }

  @computed<AccountInfo>(({ data }) => [data])
  get info() {
    return this.data ?? {};
  }

  @computed<AccountInfo>(({ info }) => [info])
  get serviceInfo() {
    return this.info.serviceInfo ?? {};
  }

  @computed<AccountInfo>(({ serviceInfo }) => [serviceInfo])
  get servicePlan() {
    return this.serviceInfo.servicePlan ?? {};
  }

  @computed<AccountInfo>(({ serviceInfo }) => [serviceInfo])
  get billingPlan() {
    return this.serviceInfo.billingPlan ?? {};
  }

  get id() {
    return this.info.id;
  }

  get country() {
    return this.serviceInfo.brand?.homeCountry;
  }

  get countryCode() {
    return this.country?.isoCode ?? 'US';
  }

  get mainCompanyNumber() {
    return this.info.mainNumber;
  }
}
