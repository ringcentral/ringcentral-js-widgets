import {
  ExtensionInfoEvent,
  FeatureInfo,
  FeatureList,
} from '@rc-ex/core/definitions';
import { computed, watch } from '@ringcentral-integration/core';
import { reduce } from 'ramda';
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
    { dep: 'Subscription', optional: true },
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
      polling: deps.extensionFeaturesOptions?.polling ?? true,
      ...deps.extensionFeaturesOptions,
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: async () => {
        const response = await this._deps.client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/features');
        return response.json();
      },
      readyCheckFunction: () => this._deps.subscription?.ready ?? true,
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

  onInit() {
    if (this._deps.subscription) {
      this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
      this._stopWatching = watch(
        this,
        () => this._deps.subscription.message,
        this._handleSubscription,
      );
    }
  }

  onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  @computed(({ data }: ExtensionFeatures) => [data])
  get features() {
    return reduce(
      (features, item) => {
        features[item.id] = item;
        return features;
      },
      {} as Record<string, FeatureInfo>,
      this.data?.records ?? [],
    );
  }

  get CRMFlag() {
    return this._deps.extensionFeaturesOptions?.CRMFlag ?? 'SalesForce';
  }

  get isCRMEnabled() {
    return this.features?.[this.CRMFlag]?.available ?? false;
  }

  get isRingOutEnabled() {
    return this.features?.RingOut?.available ?? false;
  }

  get isWebPhoneEnabled() {
    return this.features?.WebPhone?.available ?? false;
  }

  get isCallingEnabled() {
    return this.isRingOutEnabled || this.isWebPhoneEnabled;
  }

  get hasComposeTextPermission() {
    return !!(
      this.features?.PagesSending?.available ||
      this.features?.SMSSending?.available
    );
  }

  get hasReadMessagesPermission() {
    return (
      this.hasReadTextPermission ||
      this.hasVoicemailPermission ||
      this.hasReadFaxPermission
    );
  }

  get hasReadTextPermission() {
    return !!(
      this.features?.PagesReceiving?.available ||
      this.features?.SMSReceiving?.available
    );
  }

  get hasVoicemailPermission() {
    return this.features?.Voicemail?.available ?? false;
  }

  get hasReadFaxPermission() {
    return this.features?.FaxReceiving?.available ?? false;
  }

  get hasRoomConnectorBeta() {
    return this.features?.RoomConnectorBeta?.available ?? false;
  }

  get hasOutboundSMSPermission() {
    return this.features?.SMSSending?.available ?? false;
  }

  get hasInternalSMSPermission() {
    return this.features?.PagesSending?.available ?? false;
  }
}
