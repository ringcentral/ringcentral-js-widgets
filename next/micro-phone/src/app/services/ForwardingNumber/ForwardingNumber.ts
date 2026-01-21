import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import {
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
  ExtensionFeatures,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import { filter } from 'ramda';

import type { ForwardingNumberOptions } from './ForwardingNumber.interface';

@injectable({
  name: 'ForwardingNumber',
})
export class ForwardingNumber extends DataFetcherConsumer<
  ForwardingNumberInfo[]
> {
  constructor(
    protected _client: Client,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional('ForwardingNumberOptions')
    protected _forwardingNumberOptions?: ForwardingNumberOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._forwardingNumberOptions,
      key: 'forwardingNumber',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ForwardingNumberInfo[]> => {
        try {
          const forwardingNumbers = (await fetchList((params: any) =>
            this._client.account().extension().forwardingNumber().list(params),
          )) as ForwardingNumberInfo[];
          return forwardingNumbers;
        } catch (e) {
          const error: ApiError = e as any;
          if (error.response?.status === 403) {
            return [];
          }
          throw error;
        }
      },
      readyCheckFunction: () => this._extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._extensionFeatures.features?.ReadExtensionAnsweringRules
          ?.available ?? false,
    });
    this._dataFetcher.register(this._source);
  }

  @computed(({ data }: ForwardingNumber) => [data])
  get numbers() {
    return this.data ?? [];
  }

  @computed(({ numbers }: ForwardingNumber) => [numbers])
  get flipNumbers() {
    return filter(
      (phoneNumber) =>
        !!(
          phoneNumber.features?.includes('CallFlip') && phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }

  @computed(({ numbers }: ForwardingNumber) => [numbers])
  get forwardingNumbers() {
    return filter(
      (phoneNumber) =>
        !!(
          phoneNumber.features?.includes('CallForwarding') &&
          phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }
}
