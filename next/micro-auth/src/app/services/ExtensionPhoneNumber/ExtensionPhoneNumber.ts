import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import { usageTypes } from '@ringcentral-integration/commons/enums/usageTypes';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import {
  computed,
  injectable,
  optional,
  watch,
} from '@ringcentral-integration/next-core';
import { filter, find } from 'ramda';
import type { Unsubscribe } from 'redux';

import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import type { ExtensionPhoneNumberOptions } from './ExtensionPhoneNumber.interface';

@injectable({
  name: 'ExtensionPhoneNumber',
})
export class ExtensionPhoneNumber extends DataFetcherConsumer<
  UserPhoneNumberInfo[]
> {
  protected _stopWatching?: Unsubscribe | null;

  constructor(
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _extensionFeatures: ExtensionFeatures,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('ExtensionPhoneNumberOptions')
    protected _extensionPhoneNumberOptions?: ExtensionPhoneNumberOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._extensionPhoneNumberOptions,
      key: 'extensionPhoneNumber',
      cleanOnReset: true,
      refreshDataOnPageRefresh: true,
      fetchFunction: async () => {
        const result = await (fetchList((params: any) =>
          this._client.account().extension().phoneNumber().list(params),
        ) as Promise<UserPhoneNumberInfo[]>);

        return result;
      },
      readyCheckFunction: () => !!this._extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._extensionFeatures.features?.ReadExtensionPhoneNumbers
          ?.available ?? false,
    });
    this._dataFetcher.register(this._source);

    this._subscription?.register(this, {
      filters: [subscriptionFilters.extensionInfo],
    });
  }

  protected _handleSubscription(message?: ExtensionInfoEvent) {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
      message?.body?.hints?.includes(subscriptionHints.companyNumbers)
    ) {
      this.fetchData();
    }
  }

  override onInit() {
    if (this._subscription) {
      this._stopWatching = watch(
        this,
        () => this._subscription!.message as ExtensionInfoEvent | undefined,
        (newMessage) => this._handleSubscription(newMessage),
      );
    }
  }

  override onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  @computed
  get numbers() {
    return this.data ?? [];
  }

  @computed
  get companyNumbers() {
    return filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.CompanyNumber,
      this.numbers,
    );
  }

  @computed
  get mainCompanyNumber() {
    return find(
      (phoneNumber) => phoneNumber.usageType === usageTypes.MainCompanyNumber,
      this.numbers,
    );
  }

  @computed
  get directNumbers() {
    return filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.DirectNumber,
      this.numbers,
    );
  }

  @computed
  get callerIdNumbers() {
    return filter(
      (phoneNumber) => !!phoneNumber.features?.includes('CallerId'),
      this.numbers,
    );
  }

  @computed
  get primaryNumber() {
    return find((phoneNumber) => !!phoneNumber.primary, this.directNumbers);
  }

  @computed
  get smsSenderNumbers() {
    return filter(
      (phoneNumber) => !!phoneNumber.features?.includes('SmsSender'),
      this.numbers,
    );
  }

  @computed
  get faxSenderNumbers() {
    return filter(
      ({ type }) => !!type && ['FaxOnly', 'VoiceFax'].includes(type),
      this.callerIdNumbers,
    );
  }
}
