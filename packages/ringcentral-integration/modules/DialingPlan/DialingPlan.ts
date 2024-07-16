import type CountryInfoShortModel from '@rc-ex/core/lib/definitions/CountryInfoShortModel';
import { computed } from '@ringcentral-integration/core';

import { renameTurkeyCountries } from '../../helpers/renameTurkey';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './DialingPlan.interface';

@Module({
  name: 'DialingPlan',
  deps: [
    'Client',
    'ExtensionFeatures',
    'DataFetcherV2',
    { dep: 'DialingPlanOptions', optional: true },
  ],
})
export class DialingPlan<T extends Deps = Deps> extends DataFetcherV2Consumer<
  T,
  CountryInfoShortModel[]
> {
  constructor(deps: T) {
    super({
      deps,
    });
    const { polling = true } = deps.dialingPlanOptions ?? {};
    // @ts-expect-error TS(2322): Type 'DataSource<unknown[]>' is not assignable to ... Remove this comment to see the full error message
    this._source = new DataSource({
      ...deps.dialingPlanOptions,
      key: 'dialingPlan',
      polling,
      cleanOnReset: true,
      fetchFunction: () => this.fetchFunction(),
      readyCheckFunction: () => this.readyCheckFunction(),
      permissionCheckFunction: () => this.permissionCheckFunction(),
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @computed(({ data }: DialingPlan) => [data])
  get plans() {
    return renameTurkeyCountries(this.data ?? []);
  }

  fetchFunction() {
    return fetchList(async (params: any) => {
      const response = await this._deps.client.service
        .platform()
        .get('/restapi/v1.0/account/~/dialing-plan', params);
      return response.json();
    });
  }

  readyCheckFunction() {
    return this._deps.extensionFeatures.ready;
  }

  permissionCheckFunction() {
    return (
      this._deps.extensionFeatures.features?.ReadCompanyInfo?.available ?? false
    );
  }
}
