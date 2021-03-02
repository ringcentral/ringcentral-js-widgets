import { computed } from '@ringcentral-integration/core';
import BlockedNumberInfo from 'ringcentral-client/build/definitions/BlockedNumberInfo';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './BlockedNumber.interface';

@Module({
  name: 'BlockedNumber',
  deps: [
    'Client',
    'DataFetcherV2',
    'RolesAndPermissions',
    { dep: 'BlockedNumberOptions', optional: true },
  ],
})
export class BlockedNumber extends DataFetcherV2Consumer<
  Deps,
  BlockedNumberInfo[]
> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.blockedNumberOptions,
      key: 'blockedNumber',
      cleanOnReset: true,
      fetchFunction: async (): Promise<BlockedNumberInfo[]> =>
        fetchList((params: any) =>
          this._deps.client.account().extension().blockedNumber().list(params),
        ),
      readyCheckFunction: () =>
        !!(
          this._deps.rolesAndPermissions.ready && this._deps.dataFetcherV2.ready
        ),
      permissionCheckFunction: () =>
        !!this._deps.rolesAndPermissions.permissions.ReadBlockedNumbers,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed<BlockedNumber>(({ data }) => [data])
  get numbers() {
    return this.data ?? [];
  }
}
