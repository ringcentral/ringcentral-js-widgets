import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type FeatureInfo from '@rc-ex/core/lib/definitions/FeatureInfo';
import type FeatureList from '@rc-ex/core/lib/definitions/FeatureList';
import { computed, watch } from '@ringcentral-integration/core';
import { reduce } from 'ramda';
import type { Unsubscribe } from 'redux';

import { permissionsMessages } from '../../enums/permissionsMessages';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import { Module } from '../../lib/di';
import { loginStatus } from '../Auth';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './ExtensionFeatures.interface';

@Module({
  name: 'ExtensionFeatures',
  deps: [
    'Auth',
    'Alert',
    'Client',
    'DataFetcherV2',
    { dep: 'Subscription', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'ExtensionFeaturesOptions', optional: true },
  ],
})
export class ExtensionFeatures extends DataFetcherV2Consumer<
  Deps,
  FeatureList
> {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
  protected _stopWatchingSubscription: Unsubscribe = null;
  constructor(deps: Deps) {
    super({
      deps,
    });

    this._source = new DataSource({
      polling: deps.extensionFeaturesOptions?.polling ?? true,
      ...deps.extensionFeaturesOptions,
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: async () => {
        try {
          const response = await this._deps.client.service
            .platform()
            .get('/restapi/v1.0/account/~/extension/~/features');
          return response.json();
        } catch (error: any /** TODO: confirm with instanceof */) {
          if ((error as { response?: Response }).response?.status === 403) {
            await this._deps.auth.logout();
            this._deps.alert.danger({
              message: permissionsMessages.insufficientPrivilege,
              ttl: 0,
            });
            return {};
          }
          throw error;
        }
      },
      readyCheckFunction: () => true,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected _handleSubscription = (message: ExtensionInfoEvent) => {
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
  };

  override onInitOnce() {
    watch(
      this,
      () => [
        this.ready,
        !!this.data,
        !!this.features?.ReadExtensionInfo?.available,
        this._deps.auth.loginStatus === loginStatus.loggedIn,
      ],
      async ([ready, hasData, readExtensionInfo, loggedIn]) => {
        if (ready && loggedIn && !readExtensionInfo) {
          await this._deps.auth.logout();
          if (hasData) {
            // only show alert if featuresList was successfully fetched,
            // but the user has no ReadExtensionInfo feature
            this._deps.alert.danger({
              message: permissionsMessages.insufficientPrivilege,
              ttl: 0,
            });
          }
        }
      },
      {
        multiple: true,
      },
    );
  }

  override onInit() {
    if (this._deps.subscription) {
      this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
      this._stopWatchingSubscription = watch(
        this,
        () => this._deps.subscription!.message,
        this._handleSubscription,
      );
    }
  }

  override onReset() {
    this._stopWatchingSubscription?.();
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    this._stopWatchingSubscription = null;
  }

  @computed(({ data }: ExtensionFeatures) => [data])
  get features() {
    return reduce(
      (features, item) => {
        if (item && item.id) features[item.id] = item;
        return features;
      },
      {} as Record<string, FeatureInfo>,
      this.data?.records ?? [],
    );
  }
}
