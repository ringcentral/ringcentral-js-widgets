import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type UserVideoConfiguration from '@rc-ex/core/lib/definitions/UserVideoConfiguration';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import type { DebouncedFunction } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AppFeatures,
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  inject,
  injectable,
  optional,
  watch,
} from '@ringcentral-integration/next-core';
import { includes } from 'ramda';
import type { Unsubscribe } from 'redux';

import type { VideoConfigurationOptions } from './VideoConfiguration.interface';
import type { UserLicenseType } from './userLicenseType';
import { videoProviders } from './videoProviders';

const DEFAULT_FETCH_DELAY = 5 * 1000;

@injectable({
  name: 'VideoConfiguration',
})
export class VideoConfiguration extends DataFetcherConsumer<UserVideoConfiguration> {
  protected _stopWatching: Unsubscribe | null = null;
  protected _debouncedFetchData: DebouncedFunction<
    VideoConfiguration['fetchData']
  >;

  constructor(
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _appFeatures: AppFeatures,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('VideoConfigurationOptions')
    protected _videoConfigurationOptions?: VideoConfigurationOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._videoConfigurationOptions,
      key: 'videoConfiguration',
      cleanOnReset: true,
      disableCache: true,
      fetchFunction: async (): Promise<UserVideoConfiguration> => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/video-configuration');
        return response.json();
      },
      readyCheckFunction: () => this._appFeatures.ready,
      permissionCheckFunction: () => this._hasPermission,
    });
    this._dataFetcher.register(this._source);
    this._debouncedFetchData = debounce({
      fn: this.fetchData,
      threshold: this._fetchDelay,
    });

    this._subscription?.register(this, {
      filters: [subscriptionFilters.extensionInfo],
    });
  }

  protected get _fetchDelay() {
    return Math.max(
      0,
      this._videoConfigurationOptions?.fetchDelay ?? DEFAULT_FETCH_DELAY,
    );
  }

  protected async _handleSubscription(message?: ExtensionInfoEvent) {
    if (
      this.ready &&
      message?.body?.hints?.includes(subscriptionHints.videoConfiguration) &&
      (this._source.disableCache || (this._tabManager?.active ?? true))
    ) {
      // https://jira_domain/browse/ENV-67087
      // the video configuration api may return the old value
      // when we try to query immediately right after got the push notification
      // here we wait for seconds as a workaround to solve the issue
      this._debouncedFetchData();
    }
  }

  override onInit() {
    if (!this._subscription) {
      this.fetchData();
    }

    this._stopWatching = watch(
      this,
      () => this._subscription?.message as ExtensionInfoEvent | undefined,
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
    return this._appFeatures.hasMeetingsPermission;
  }

  override async fetchData() {
    this._debouncedFetchData.cancel();
    return this._dataFetcher.fetchData(this._source);
  }
}
