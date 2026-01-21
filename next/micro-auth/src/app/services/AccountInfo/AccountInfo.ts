import type BrandInfo from '@rc-ex/core/lib/definitions/BrandInfo';
import type GetAccountInfoResponse from '@rc-ex/core/lib/definitions/GetAccountInfoResponse';
import type ServiceInfo from '@rc-ex/core/lib/definitions/ServiceInfo';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';

import { Auth, loginStatus } from '../Auth';
import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { TierChecker } from '../TierChecker';

import type { AccountInfoOptions } from './AccountInfo.interface';
import { t } from './i18n';

export const subBrands = [
  '3000.Zayo',
  '3000.NWNC',
  '2000.Optus',
  '3000.Brightspeed',
];

export type ServiceInfoWithUBrand = ServiceInfo & { uBrand?: BrandInfo };

@injectable({
  name: 'AccountInfo',
})
export class AccountInfo extends DataFetcherConsumer<GetAccountInfoResponse> {
  constructor(
    protected _auth: Auth,
    protected _client: Client,
    protected _toast: Toast,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional() protected _tierChecker?: TierChecker,
    @optional('AccountInfoOptions')
    protected _accountInfoOptions?: AccountInfoOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._accountInfoOptions,
      key: 'accountInfo',
      fetchFunction: async () =>
        (await this._client.account().get()) as GetAccountInfoResponse,
      readyCheckFunction: () => !!this._extensionFeatures.ready,
      permissionCheckFunction: () => this._checkPermission(),
      cleanOnReset: true,
    });
    this._dataFetcher.register(this._source);
  }

  get isCRMEnabled() {
    return this._tierChecker?.isCRMEnabled;
  }

  protected _checkPermission() {
    return !!this._extensionFeatures.features?.ReadCompanyInfo?.available;
  }

  override async onStateChange() {
    if (
      this._auth.loginStatus === loginStatus.loggedIn &&
      this.ready &&
      !this._checkPermission()
    ) {
      await this._auth.logout({
        reason: 'Insufficient privilege',
        payload: {
          detail: 'not have ReadCompanyInfo permission',
        },
      });
      this._toast.danger({
        message: t('insufficientPrivilege'),
        ttl: 0,
      });
    }
  }

  @computed(({ data }: AccountInfo) => [data])
  get info() {
    return this.data ?? {};
  }

  @computed(({ info }: AccountInfo) => [info])
  get serviceInfo() {
    return (this.info.serviceInfo ?? {}) as ServiceInfoWithUBrand;
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

  get maxExtensionNumberLength() {
    return this.info.limits?.maxExtensionNumberLength ?? 6;
  }

  get uBrandId() {
    return this.serviceInfo.uBrand?.id;
  }

  @computed
  get userBrandId() {
    const serviceInfo = this.serviceInfo;
    const uBrandId = this.uBrandId;
    const brandId =
      uBrandId && subBrands.includes(uBrandId)
        ? uBrandId
        : serviceInfo.brand?.id;
    return brandId;
  }
}
