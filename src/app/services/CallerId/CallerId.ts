import CallerIdByFeature from '@rc-ex/core/lib/definitions/CallerIdByFeature';
import type ExtensionCallerIdInfo from '@rc-ex/core/lib/definitions/ExtensionCallerIdInfo';
import {
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  delegate,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';
import { find } from 'ramda';

import type { CallerIdOptions } from './CallerId.interface';

@injectable({
  name: 'CallerId',
})
export class CallerId extends DataFetcherConsumer<ExtensionCallerIdInfo> {
  constructor(
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    @optional('CallerIdOptions') protected _callerIdOptions?: CallerIdOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._callerIdOptions,
      key: 'callerId',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ExtensionCallerIdInfo> => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/caller-id');
        return response.json();
      },
    });
    this._dataFetcher.register(this._source);
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

  @computed(({ byFeature }: CallerId) => [byFeature])
  get faxNumber() {
    return find((item) => item.feature === 'FaxNumber', this.byFeature)
      ?.callerId?.phoneInfo?.phoneNumber;
  }

  @delegate('server')
  async setDefaultCallerId(
    newCallerId: string,
    feature: CallerIdByFeature['feature'],
  ) {
    const payload = {
      byFeature: [
        {
          feature,
          callerId:
            newCallerId === '0'
              ? { type: 'Blocked' }
              : { phoneInfo: { id: newCallerId } },
        },
      ],
    };
    const res = await this._client.service
      .platform()
      .put('/restapi/v1.0/account/~/extension/~/caller-id', payload);

    const result: ExtensionCallerIdInfo = await res.json();

    this.updateData(result);
  }
}
