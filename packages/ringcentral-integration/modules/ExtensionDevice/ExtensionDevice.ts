import { reduce } from 'ramda';
import type DeviceResource from '@rc-ex/core/lib/definitions/DeviceResource';
import type PhoneLinesInfo from '@rc-ex/core/lib/definitions/PhoneLinesInfo';
import { computed } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import type { Deps } from './ExtensionDevice.interface';

@Module({
  name: 'ExtensionDevice',
  deps: [
    'Client',
    'DataFetcherV2',
    { dep: 'ExtensionDeviceOptions', optional: true },
  ],
})
export class ExtensionDevice extends DataFetcherV2Consumer<
  Deps,
  DeviceResource[]
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.extensionDeviceOptions,
      key: 'extensionDevice',
      cleanOnReset: true,
      fetchFunction: async (): Promise<DeviceResource[]> =>
        fetchList((params: any) =>
          this._deps.client.account().extension().device().list(params),
        ),
    });
    this._deps.dataFetcherV2.register(this._source);
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
