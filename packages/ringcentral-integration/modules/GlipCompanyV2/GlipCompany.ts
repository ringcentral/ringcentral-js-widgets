import { GlipCompany as GlipCompanyType } from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './GlipCompany.interface';

@Module({
  name: 'GlipCompany',
  deps: [
    'Client',
    'DataFetcherV2',
    'ExtensionFeatures',
    { dep: 'GlipCompanyOptions', optional: true },
  ],
})
export class GlipCompany extends DataFetcherV2Consumer<Deps, GlipCompanyType> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.glipCompanyOptions,
      key: 'glipCompany',
      fetchFunction: async (): Promise<GlipCompanyType> => {
        const response = await this._deps.client.glip().companies('~').get();
        return response;
      },
      readyCheckFunction: () => this._deps.extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.Glip.available ?? false,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed(({ data }: GlipCompany) => [data])
  get info() {
    return this.data ?? {};
  }

  get name() {
    return this.info.name;
  }

  get domain() {
    return this.info.domain;
  }

  get id() {
    return this.info.id;
  }
}
