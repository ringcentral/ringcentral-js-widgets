import { ForwardingNumberInfo } from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';
import { filter } from 'ramda';

import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ForwardingNumber.interface';

@Module({
  name: 'ForwardingNumber',
  deps: [
    'Client',
    'RolesAndPermissions',
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
      fetchFunction: async (): Promise<ForwardingNumberInfo[]> =>
        fetchList((params: any) =>
          this._deps.client
            .account()
            .extension()
            .forwardingNumber()
            .list(params),
        ),
      readyCheckFunction: () => this._deps.rolesAndPermissions.ready,
      permissionCheckFunction: () =>
        !!this._deps.rolesAndPermissions.permissions
          .ReadUserForwardingFlipNumbers,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed<ForwardingNumber>(({ data }) => [data])
  get numbers() {
    return this.data ?? [];
  }

  @computed<ForwardingNumber>(({ numbers }) => [numbers])
  get flipNumbers() {
    return filter(
      (phoneNumber) =>
        !!(
          phoneNumber.features.indexOf('CallFlip') !== -1 &&
          phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }

  @computed<ForwardingNumber>(({ numbers }) => [numbers])
  get forwardingNumbers() {
    return filter(
      (phoneNumber) =>
        !!(
          phoneNumber.features.indexOf('CallForwarding') !== -1 &&
          phoneNumber.phoneNumber
        ),
      this.numbers,
    );
  }
}
