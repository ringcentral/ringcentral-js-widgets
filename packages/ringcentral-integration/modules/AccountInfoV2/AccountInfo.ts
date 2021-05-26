import { GetAccountInfoResponse } from '@rc-ex/core/definitions';
import { computed, track } from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { loginStatus } from '../AuthV2';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { permissionsMessages } from '../RolesAndPermissions/permissionsMessages';
import { Deps } from './AccountInfo.interfaces';

@Module({
  name: 'AccountInfo',
  deps: [
    'Auth',
    'Client',
    'Alert',
    'ExtensionFeatures',
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
      readyCheckFunction: () => !!this._deps.extensionFeatures.ready,
      permissionCheckFunction: () => this._checkPermission(),
      cleanOnReset: true,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _checkPermission() {
    return !!this._deps.extensionFeatures.features?.ReadCompanyInfo?.available;
  }

  async onStateChange() {
    if (
      this._deps.auth.loginStatus === loginStatus.loggedIn &&
      this.ready &&
      !this._checkPermission()
    ) {
      await this._deps.auth.logout();
      this._deps.alert.danger({
        message: permissionsMessages.insufficientPrivilege,
        ttl: 0,
      });
    }
  }

  @track((that: AccountInfo) => (analytics) => {
    analytics.identify?.({
      userId: that._deps.auth?.ownerId,
      accountId: that.id,
      servicePlanId: that.servicePlan.id,
      edition: that.servicePlan.edition,
      CRMEnabled: that._deps.extensionFeatures.isCRMEnabled,
    });
  })
  onInitSuccess() {}

  @computed(({ data }: AccountInfo) => [data])
  get info() {
    return this.data ?? {};
  }

  @computed(({ info }: AccountInfo) => [info])
  get serviceInfo() {
    return this.info.serviceInfo ?? {};
  }

  @computed(({ serviceInfo }: AccountInfo) => [serviceInfo])
  get servicePlan() {
    return this.serviceInfo.servicePlan ?? {};
  }

  @computed(({ serviceInfo }: AccountInfo) => [serviceInfo])
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
