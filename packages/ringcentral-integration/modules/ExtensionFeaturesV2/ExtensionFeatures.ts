import { ExtensionInfoEvent, FeatureList } from '@rc-ex/core/definitions';
import { computed, watch } from '@ringcentral-integration/core';
import { Unsubscribe } from 'redux';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ExtensionFeatures.interface';

@Module({
  name: 'ExtensionFeatures',
  deps: [
    'Client',
    'DataFetcherV2',
    'Subscription',
    { dep: 'TabManager', optional: true },
    { dep: 'ExtensionFeaturesOptions', optional: true },
  ],
})
export class ExtensionFeatures extends DataFetcherV2Consumer<
  Deps,
  FeatureList
> {
  protected _stopWatching: Unsubscribe = null;
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.extensionFeaturesOptions,
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: async () => {
        const response = await this._deps.client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/features');
        return response.json();
      },
      readyCheckFunction: () => this._deps.subscription.ready,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _handleSubscription(message: ExtensionInfoEvent) {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      message?.body?.hints &&
      (message.body.hints.includes(subscriptionHints.limits) ||
        message.body.hints.includes(subscriptionHints.features) ||
        message.body.hints.includes(subscriptionHints.permissions))
    ) {
      this.fetchData();
    }
  }

  onInit() {
    this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
    this._stopWatching = watch(
      this,
      () => this._deps.subscription.message,
      (message) => this._handleSubscription(message),
    );
  }

  onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  @computed<ExtensionFeatures>(({ data }) => [data])
  get features() {
    return this.data?.records ?? [];
  }
}
