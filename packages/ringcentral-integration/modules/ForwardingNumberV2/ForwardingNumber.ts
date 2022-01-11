import { filter } from 'ramda';

import { ForwardingNumberInfo } from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ForwardingNumber.interface';

@Module({
  name: 'ForwardingNumber',
  deps: [
    'Client',
    'ExtensionFeatures',
    'DataFetcherV2',
    { dep: 'ForwardingNumberOptions', optional: true },
  ],
})
export class ForwardingNumber extends DataFetcherV2Consumer<
  Deps,
  ForwardingNumberInfo[]
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.forwardingNumberOptions,
      key: 'forwardingNumber',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ForwardingNumberInfo[]> => {
        try {
          const forwardingNumbers = await fetchList((params: any) =>
            this._deps.client
              .account()
              .extension()
              .forwardingNumber()
              .list(params),
          );
          return forwardingNumbers;
        } catch (error) {
          if (error.response?.status === 403) {
            return [];
          }
          throw error;
        }
      },
      readyCheckFunction: () => this._deps.extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadExtensionAnsweringRules
          ?.available ?? false,
    });
    this._deps.dataFetcherV2.register(this._source);
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
          phoneNumber.features?.indexOf('CallFlip') !== -1 &&
          phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }

  @computed(({ numbers }: ForwardingNumber) => [numbers])
  get forwardingNumbers() {
    return filter(
      (phoneNumber) =>
        !!(
          phoneNumber.features?.indexOf('CallForwarding') !== -1 &&
          phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }
}
