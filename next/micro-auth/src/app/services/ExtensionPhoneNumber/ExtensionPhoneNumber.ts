import type ExtensionInfoEventBody from '@rc-ex/core/lib/definitions/ExtensionInfoEventBody';
import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import { usageTypes } from '@ringcentral-integration/commons/enums/usageTypes';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import {
  computed,
  injectable,
  optional,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { find } from 'ramda';
import { EMPTY, merge, switchMap, tap, filter } from 'rxjs';

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
  constructor(
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _extensionFeatures: ExtensionFeatures,
    @optional('Subscription') protected _subscription?: Subscription,
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

  override onInitOnce() {
    super.onInitOnce();

    const subscription = this._subscription;
    if (!subscription) return;

    const watchChange$ = merge(
      subscription
        .fromMessage$<ExtensionInfoEventBody>(/.*\/extension\/\d+$/)
        .pipe(
          filter((body) =>
            Boolean(body.hints?.includes(subscriptionHints.companyNumbers)),
          ),
        ),
      // when grant changed, it may cause the change of phone numbers, so also watch the grant change message to trigger the refetch of phone numbers
      subscription.fromMessage$(/\/extension\/.*.\/grant/),
    ).pipe(
      tap(async () => {
        try {
          await this.fetchData();
        } catch (error) {
          this.logger.error('extension phone number update error', error);
        }
      }),
      takeUntilAppDestroy,
    );

    this.readyState$
      .pipe(switchMap((ready) => (ready ? watchChange$ : EMPTY)))

      .subscribe();
  }

  @computed
  get numbers() {
    return this.data ?? [];
  }

  @computed
  get companyNumbers() {
    return this.numbers.filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.CompanyNumber,
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
    return this.numbers.filter(
      (phoneNumber) => phoneNumber.usageType === usageTypes.DirectNumber,
    );
  }

  @computed
  get callerIdNumbers() {
    return this.numbers.filter(
      (phoneNumber) => !!phoneNumber.features?.includes('CallerId'),
    );
  }

  @computed
  get primaryNumber() {
    return find((phoneNumber) => !!phoneNumber.primary, this.directNumbers);
  }

  @computed
  get smsSenderNumbers() {
    return this.numbers.filter(
      (phoneNumber) => !!phoneNumber.features?.includes('SmsSender'),
    );
  }

  @computed
  get faxSenderNumbers() {
    return this.numbers.filter(
      ({ type }) => !!type && ['FaxOnly', 'VoiceFax'].includes(type),
    );
  }
}
