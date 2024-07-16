import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import { computed } from '@ringcentral-integration/core';
import { filter } from 'ramda';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './ForwardingNumber.interface';

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
          // @ts-expect-error TS(2322): Type 'unknown[]' is not assignable to type 'Forwar... Remove this comment to see the full error message
          return forwardingNumbers;
        } catch (error: any /** TODO: confirm with instanceof */) {
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
