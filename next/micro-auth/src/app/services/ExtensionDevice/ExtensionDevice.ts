import type DeviceResource from '@rc-ex/core/lib/definitions/DeviceResource';
import type PhoneLinesInfo from '@rc-ex/core/lib/definitions/PhoneLinesInfo';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import {
  computed,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';
import { reduce } from 'ramda';

import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';

import type { ExtensionDeviceOptions } from './ExtensionDevice.interface';

@injectable({
  name: 'ExtensionDevice',
})
export class ExtensionDevice extends DataFetcherConsumer<DeviceResource[]> {
  constructor(
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    @optional('ExtensionDeviceOptions')
    protected _extensionDeviceOptions?: ExtensionDeviceOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._extensionDeviceOptions,
      key: 'extensionDevice',
      cleanOnReset: true,
      fetchFunction: () =>
        fetchList((params) => this._fetch(params)) as Promise<DeviceResource[]>,
    });
    this._dataFetcher.register(this._source);
  }

  // TODO: use rc-ex/core api
  private async _fetch(params: any) {
    try {
      const result = await this._client
        .account()
        .extension()
        .device()
        // TODO: use rc-ex/core api
        // @ts-ignore
        .list(params);

      return result;
    } catch (error) {
      this.logger.error('fetch DL failed', error);

      throw error;
    }
  }

  @computed(({ data }: ExtensionDevice) => [data])
  get devices() {
    return this.data ?? [];
  }

  @computed(({ devices }: ExtensionDevice) => [devices])
  get phoneLines() {
    return reduce(
      (acc, device) => {
        return acc.concat(device.phoneLines ?? []);
      },
      [] as PhoneLinesInfo[],
      this.devices,
    );
  }
}
