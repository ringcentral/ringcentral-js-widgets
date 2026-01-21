import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type FeatureInfo from '@rc-ex/core/lib/definitions/FeatureInfo';
import type FeatureList from '@rc-ex/core/lib/definitions/FeatureList';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  optional,
  watch,
} from '@ringcentral-integration/next-core';
import { reduce } from 'ramda';
import type { Unsubscribe } from 'redux';

import { Auth, loginStatus } from '../Auth';
import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import type { ExtensionFeaturesOptions } from './ExtensionFeatures.interface';
import { t } from './i18n';

@injectable({
  name: 'ExtensionFeatures',
})
export class ExtensionFeatures extends DataFetcherConsumer<FeatureList> {
  protected _stopWatchingSubscription: Unsubscribe | null = null;
  constructor(
    protected _auth: Auth,
    protected _toast: Toast,
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('ExtensionFeaturesOptions')
    protected _extensionFeaturesOptions?: ExtensionFeaturesOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      polling: this._extensionFeaturesOptions?.polling ?? true,
      pollingInterval: 24 * 60 * 60 * 1000, // 24 hours as requested by Platform team
      ...this._extensionFeaturesOptions,
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: async () => {
        try {
          const response = await this._client.service
            .platform()
            .get('/restapi/v1.0/account/~/extension/~/features');
          return response.json();
        } catch (error) {
          if ((error as { response?: Response }).response?.status === 403) {
            await this._auth.logout({
              reason: 'Insufficient privilege',
              payload: {
                detail: 'ExtensionFeatures 403',
              },
            });
            this.showInsufficientPrivilege();

            return {};
          }
          throw error;
        }
      },
      readyCheckFunction: () => true,
    });
    this._dataFetcher.register(this._source);

    this._subscription?.register(this, {
      filters: [subscriptionFilters.extensionInfo],
    });
  }

  protected _handleSubscription = (message?: ExtensionInfoEvent) => {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
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
      () =>
        [
          this.ready,
          !!this.data,
          !!this.features?.ReadExtensionInfo?.available,
          this._auth.loginStatus === loginStatus.loggedIn,
        ] as const,
      async ([ready, hasData, readExtensionInfo, loggedIn]) => {
        await this.checkIsInsufficientPrivilege({
          ready,
          loggedIn,
          readExtensionInfo,
          hasData,
        });
      },
      {
        multiple: true,
      },
    );
  }

  private async checkIsInsufficientPrivilege({
    ready,
    loggedIn,
    readExtensionInfo,
    hasData,
  }: {
    ready: boolean;
    loggedIn: boolean;
    readExtensionInfo: boolean;
    hasData: boolean;
  }) {
    if (ready && loggedIn && !readExtensionInfo) {
      await this._auth.logout({
        reason: 'Insufficient privilege',
        payload: {
          detail: 'ExtensionFeatures not have readExtensionInfo permission',
        },
      });

      if (hasData) {
        // only show alert if featuresList was successfully fetched,
        // but the user has no ReadExtensionInfo feature
        this.showInsufficientPrivilege();
      }
    }
  }

  private showInsufficientPrivilege() {
    this._toast.danger({
      message: t('insufficientPrivilege'),
      ttl: 0,
    });
  }

  override onInit() {
    if (this._subscription) {
      this._stopWatchingSubscription = watch(
        this,
        () => this._subscription!.message as ExtensionInfoEvent | undefined,
        this._handleSubscription,
      );
    }
  }

  override onReset() {
    this._stopWatchingSubscription?.();
    this._stopWatchingSubscription = null;
  }

  @computed(({ data }: ExtensionFeatures) => [data])
  get features() {
    return reduce(
      (acc, curr) => {
        const id = curr?.id;
        if (id) acc[id] = curr;

        return acc;
      },
      {} as Record<string, FeatureInfo>,
      this.data?.records ?? [],
    );
  }
}
