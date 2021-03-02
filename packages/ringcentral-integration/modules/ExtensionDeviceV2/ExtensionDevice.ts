import {
  ExtensionDeviceResponse,
  PhoneLinesInfo,
} from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';
import { reduce } from 'ramda';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ExtensionDevice.interface';

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
  ExtensionDeviceResponse[]
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.extensionDeviceOptions,
      key: 'extensionDevice',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ExtensionDeviceResponse[]> =>
        fetchList((params: any) =>
          this._deps.client.account().extension().device().list(params),
        ),
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed<ExtensionDevice>(({ data }) => [data])
  get devices() {
    return this.data ?? [];
  }

  @computed<ExtensionDevice>(({ devices }) => [devices])
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
