import { Unsubscribe } from 'redux';
import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type GetExtensionInfoResponse from '@rc-ex/core/lib/definitions/GetExtensionInfoResponse';
import { computed, watch } from '@ringcentral-integration/core';

import { permissionsMessages } from '../../enums/permissionsMessages';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { subscriptionHints } from '../../enums/subscriptionHints';
import { Module } from '../../lib/di';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ExtensionInfo.interface';

const extensionRegExp = /.*\/extension\/\d+$/;
const DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1',
};

@Module({
  name: 'ExtensionInfo',
  deps: [
    'Auth',
    'Client',
    'DataFetcherV2',
    'ExtensionFeatures',
    { dep: 'Subscription', optional: true },
    'Alert',
    { dep: 'TabManager', optional: true },
    { dep: 'ExtensionInfoOptions', optional: true },
  ],
})
export class ExtensionInfo extends DataFetcherV2Consumer<
  Deps,
  GetExtensionInfoResponse
> {
  // @ts-expect-error
  protected _stopWatching: Unsubscribe;
  constructor(deps: Deps) {
    super({
      deps,
    });
    const extensionInfoOptions = this._deps.extensionInfoOptions ?? {};
    const { polling = true } = extensionInfoOptions;
    this._source = new DataSource({
      ...extensionInfoOptions,
      key: 'extensionInfo',
      polling,
      cleanOnReset: true,
      fetchFunction: async () => {
        try {
          const result: GetExtensionInfoResponse = await this._deps.client
            .account()
            .extension()
            .get();
          return result;
        } catch (error: any /** TODO: confirm with instanceof */) {
          if (error.response?.status === 403) {
            await this._deps.auth.logout();
            this._deps.alert.danger({
              message: permissionsMessages.insufficientPrivilege,
              ttl: 0,
            });
            return {} as GetExtensionInfoResponse;
          }
          throw error;
        }
      },
      readyCheckFunction: () => this._deps.auth.loggedIn,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  private _handleSubscription(message: ExtensionInfoEvent) {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      // @ts-expect-error
      extensionRegExp.test(message?.event) &&
      !(
        message.body?.hints?.includes(subscriptionHints.companyNumbers) ||
        message.body?.hints?.includes(subscriptionHints.limits) ||
        message.body?.hints?.includes(subscriptionHints.features) ||
        message.body?.hints?.includes(subscriptionHints.permissions) ||
        message.body?.hints?.includes(subscriptionHints.videoConfiguration)
      )
    ) {
      this.fetchData();
    }
  }

  override onInit() {
    if (this._deps.subscription) {
      this._deps.subscription.subscribe([subscriptionFilters.extensionInfo]);
      this._stopWatching = watch(
        this,
        () => this._deps.subscription!.message,
        (message) => this._handleSubscription(message),
      );
    }
  }

  override onReset() {
    this._stopWatching?.();
    // @ts-expect-error
    this._stopWatching = null;
  }

  @computed(({ data }: ExtensionInfo) => [data])
  get info(): GetExtensionInfoResponse {
    return this.data ?? {};
  }

  get id() {
    return this.info.id;
  }

  get extensionNumber() {
    return this.info.extensionNumber;
  }

  get country() {
    return this.info.regionalSettings?.homeCountry || DEFAULT_COUNTRY;
  }

  get departments() {
    return this.info.departments;
  }

  get isMultipleSiteEnabled() {
    return !!(this._deps.extensionInfoOptions?.isMultipleSiteEnabled ?? false);
  }

  @computed(({ info }: ExtensionInfo) => [info])
  get site() {
    if (!this.isMultipleSiteEnabled) {
      return null;
    }
    if (
      this._deps.extensionFeatures.features?.SiteCodes?.available &&
      !this.info.site
    ) {
      console.warn('site code enabled, but cannot retrieve site info');
    }
    return this.info.site || null;
  }

  get isCallQueueMember() {
    return (
      !!this.departments &&
      Array.isArray(this.departments) &&
      this.departments.length > 0
    );
  }

  get isoCode() {
    return this.info.regionalSettings?.homeCountry?.isoCode;
  }
}
