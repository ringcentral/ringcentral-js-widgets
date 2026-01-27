import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';
import { renameTurkeyCountries } from '@ringcentral-integration/commons/helpers/renameTurkey';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import {
  computed,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';

import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';

import type { DialingPlanOptions } from './DialingPlan.interface';

@injectable({
  name: 'DialingPlan',
})
export class DialingPlan extends DataFetcherConsumer<CountryInfoShortModel[]> {
  constructor(
    protected _client: Client,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional('DialingPlanOptions')
    protected _dialingPlanOptions?: DialingPlanOptions,
  ) {
    super(_dataFetcher);

    const { polling = true } = this._dialingPlanOptions ?? {};
    this._source = new DataSource({
      ...this._dialingPlanOptions,
      key: 'dialingPlan',
      polling,
      cleanOnReset: true,
      fetchFunction: () => this.fetchFunction(),
      readyCheckFunction: () => this.readyCheckFunction(),
      permissionCheckFunction: () => this.permissionCheckFunction(),
    });
    this._dataFetcher.register(this._source);
  }

  @computed(({ data }: DialingPlan) => [data])
  get plans() {
    return renameTurkeyCountries(this.data ?? []);
  }

  fetchFunction(): Promise<CountryInfoShortModel[]> {
    return fetchList(async (params: any) => {
      const response = await this._client.service
        .platform()
        .get('/restapi/v1.0/account/~/dialing-plan', params);
      return response.json();
    });
  }

  readyCheckFunction() {
    return this._extensionFeatures.ready;
  }

  permissionCheckFunction() {
    return (
      this._extensionFeatures.features?.ReadCompanyInfo?.available ?? false
    );
  }
}
