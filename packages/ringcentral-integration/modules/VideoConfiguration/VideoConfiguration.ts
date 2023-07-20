import { includes } from 'ramda';
import type { Unsubscribe } from 'redux';
import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type UserVideoConfiguration from '@rc-ex/core/lib/definitions/UserVideoConfiguration';
import { watch } from '@ringcentral-integration/core';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import type { DebouncedFunction } from '../../lib/debounce-throttle';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import type { UserLicenseType } from './userLicenseType';
import type { Deps } from './VideoConfiguration.interface';
import { videoProviders } from './videoProviders';

const DEFAULT_FETCH_DELAY = 5 * 1000;

@Module({
  name: 'VideoConfiguration',
  deps: [
    'Client',
    'DataFetcherV2',
    'AppFeatures',
    'Subscription',
    { dep: 'TabManager', optional: true },
    { dep: 'VideoConfigurationOptions', optional: true },
  ],
})
export class VideoConfiguration extends DataFetcherV2Consumer<
  Deps,
  UserVideoConfiguration
> {
  protected _stopWatching: Unsubscribe | null = null;
  protected _debouncedFetchData: DebouncedFunction<
    VideoConfiguration['fetchData']
  >;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._source = new DataSource({
      ...deps.videoConfigurationOptions,
      key: 'videoConfiguration',
      cleanOnReset: true,
      disableCache: true,
      fetchFunction: async (): Promise<UserVideoConfiguration> => {
        const response = await this._deps.client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/video-configuration');
        return response.json();
      },
      readyCheckFunction: () =>
        this._deps.appFeatures.ready && this._deps.subscription.ready,
      permissionCheckFunction: () => this._hasPermission,
    });
    this._deps.dataFetcherV2.register(this._source);
    this._debouncedFetchData = debounce({
      fn: this.fetchData,
      threshold: this._fetchDelay,
    });
  }

  protected get _fetchDelay() {
    return Math.max(
      0,
      this._deps.videoConfigurationOptions?.fetchDelay ?? DEFAULT_FETCH_DELAY,
    );
  }

  protected async _handleSubscription(message: ExtensionInfoEvent) {
    if (
      this.ready &&
      message?.body?.hints?.includes(subscriptionHints.videoConfiguration) &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true))
    ) {
      // https://jira_domain/browse/ENV-67087
      // the video configuration api may return the old value
      // when we try to query immediately right after got the push notification
      // here we wait for seconds as a workaround to solve the issue
      this._debouncedFetchData();
    }
  }

  override onInit() {
    this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
    this._stopWatching = watch(
      this,
      () => this._deps.subscription.message,
      (message) => this._handleSubscription(message),
    );
  }

  override onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
    this._debouncedFetchData.cancel();
  }

  get isRCV() {
    return this.provider === videoProviders.RCVideo;
  }

  get isRCM() {
    return includes(this.provider, [
      videoProviders.RCMeetings,
      videoProviders.None,
    ]);
  }

  get provider() {
    return this.data?.provider || null;
  }

  get userLicenseType(): UserLicenseType {
    // TODO: fix UserVideoConfiguration type in @rc-ex/core/definitions
    // @ts-ignore
    return this.data?.userLicenseType || null;
  }

  get _hasPermission() {
    return this._deps.appFeatures.hasMeetingsPermission;
  }
}
