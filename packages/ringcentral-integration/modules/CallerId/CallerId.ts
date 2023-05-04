import { find } from 'ramda';
import type ExtensionCallerIdInfo from '@rc-ex/core/lib/definitions/ExtensionCallerIdInfo';
import { computed } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './CallerId.interface';

@Module({
  name: 'CallerId',
  deps: ['Client', 'DataFetcherV2', { dep: 'CallerIdOptions', optional: true }],
})
export class CallerId extends DataFetcherV2Consumer<
  Deps,
  ExtensionCallerIdInfo
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.callerIdOptions,
      key: 'callerId',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ExtensionCallerIdInfo> => {
        const response = await this._deps.client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/caller-id');
        return response.json();
      },
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed(({ data }: CallerId) => [data])
  get byDevice() {
    return this.data?.byDevice ?? [];
  }

  @computed(({ data }: CallerId) => [data])
  get byFeature() {
    return this.data?.byFeature ?? [];
  }

  @computed(({ byFeature }: CallerId) => [byFeature])
  get ringOut() {
    return find((item) => item.feature === 'RingOut', this.byFeature)?.callerId;
  }
}
