import {
  ExtensionInfoEvent,
  UserVideoConfiguration,
} from '@rc-ex/core/definitions';
import { watch } from '@ringcentral-integration/core';
import { Unsubscribe } from 'redux';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import { debounce, DebouncedFunction } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { videoProviders } from '../MeetingProvider/videoProviders';
import { Deps } from './VideoConfiguration.interface';

const DEFAULT_FETCH_DELAY = 5 * 1000;

@Module({
  name: 'VideoConfiguration',
  deps: [
    'Client',
    'DataFetcherV2',
    'RolesAndPermissions',
    'Subscription',
    { dep: 'TabManager', optional: true },
    { dep: 'VideoConfigurationOptions', optional: true },
  ],
})
export class VideoConfiguration extends DataFetcherV2Consumer<
  Deps,
  UserVideoConfiguration
> {
  protected _stopWatching: Unsubscribe = null;
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
      fetchFunction: async (): Promise<UserVideoConfiguration> => {
        const response = await this._deps.client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/video-configuration');
        return response.json();
      },
      readyCheckFunction: () =>
        this._deps.rolesAndPermissions.ready && this._deps.subscription.ready,
      permissionCheckFunction: () =>
        !!this._deps.rolesAndPermissions.hasMeetingsPermission,
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
      this._debouncedFetchData();
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
    this._debouncedFetchData.cancel();
  }

  get isRCV() {
    return this.provider === videoProviders.RCVideo;
  }

  get isRCM() {
    return (
      this.provider === videoProviders.RCMeetings ||
      this.provider === videoProviders.None
    );
  }

  get provider() {
    return this.data?.provider || null;
  }
}
