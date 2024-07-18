import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { computed, watch } from '@ringcentral-integration/core';
import { filter, find } from 'ramda';
import type { Unsubscribe } from 'redux';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import { usageTypes } from '../../enums/usageTypes';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './ExtensionPhoneNumber.interface';

@Module({
  name: 'ExtensionPhoneNumber',
  deps: [
    'Client',
    'DataFetcherV2',
    'ExtensionFeatures',
    'Subscription',
    { dep: 'TabManager', optional: true },
    { dep: 'ExtensionPhoneNumberOptions', optional: true },
  ],
})
export class ExtensionPhoneNumber extends DataFetcherV2Consumer<
  Deps,
  UserPhoneNumberInfo[]
> {
  // @ts-expect-error TS(2564): Property '_stopWatching' has no initializer and is... Remove this comment to see the full error message
  protected _stopWatching: Unsubscribe;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.extensionPhoneNumberOptions,
      key: 'extensionPhoneNumber',
      cleanOnReset: true,
      fetchFunction: async (): Promise<UserPhoneNumberInfo[]> =>
        fetchList((params: any) =>
          this._deps.client.account().extension().phoneNumber().list(params),
        ),
      readyCheckFunction: () => !!this._deps.extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadExtensionPhoneNumbers
          ?.available ?? false,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _handleSubscription(message: ExtensionInfoEvent) {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      message?.body?.hints?.includes(subscriptionHints.companyNumbers)
    ) {
      this.fetchData();
    }
  }

  override onInit() {
    this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
    this._stopWatching = watch(
      this,
      () => this._deps.subscription.message,
      (newMessage) => this._handleSubscription(newMessage),
    );
  }

  override onReset() {
    this._stopWatching?.();
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    this._stopWatching = null;
  }

  @computed(({ data }: ExtensionPhoneNumber) => [data])
  get numbers() {
    return this.data ?? [];
  }

  @computed(({ numbers }: ExtensionPhoneNumber) => [numbers])
  get companyNumbers() {
    return filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.CompanyNumber,
      this.numbers,
    );
  }

  @computed(({ numbers }: ExtensionPhoneNumber) => [numbers])
  get mainCompanyNumber() {
    return find(
      (phoneNumber) => phoneNumber.usageType === usageTypes.MainCompanyNumber,
      this.numbers,
    );
  }

  @computed(({ numbers }: ExtensionPhoneNumber) => [numbers])
  get directNumbers() {
    return filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.DirectNumber,
      this.numbers,
    );
  }

  @computed(({ numbers }: ExtensionPhoneNumber) => [numbers])
  get callerIdNumbers() {
    return filter(
      (phoneNumber) => !!phoneNumber.features?.includes('CallerId'),
      this.numbers,
    );
  }

  @computed(({ directNumbers }: ExtensionPhoneNumber) => [directNumbers])
  get primaryNumber() {
    return find((phoneNumber) => !!phoneNumber.primary, this.directNumbers);
  }

  @computed(({ numbers }: ExtensionPhoneNumber) => [numbers])
  get smsSenderNumbers() {
    return filter(
      (phoneNumber) => !!phoneNumber.features?.includes('SmsSender'),
      this.numbers,
    );
  }
}
