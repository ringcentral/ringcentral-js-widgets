import type ExtensionInfoEvent from '@rc-ex/core/lib/definitions/ExtensionInfoEvent';
import type GetExtensionInfoResponse from '@rc-ex/core/lib/definitions/GetExtensionInfoResponse';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import { renameTurkeyCountry } from '@ringcentral-integration/commons/helpers/renameTurkey';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  logger,
  optional,
  watch,
} from '@ringcentral-integration/next-core';
import type { Unsubscribe } from 'redux';

import { Auth } from '../Auth';
import { Client } from '../Client';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import type { ExtensionInfoOptions } from './ExtensionInfo.interface';
import { t } from './i18n';

const extensionRegExp = /.*\/extension\/\d+$/;
const DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1',
};

@injectable({
  name: 'ExtensionInfo',
})
export class ExtensionInfo extends DataFetcherConsumer<GetExtensionInfoResponse> {
  protected _stopWatching: Unsubscribe | null = null;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected _extensionFeatures: ExtensionFeatures,
    protected _toast: Toast,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('ExtensionInfoOptions')
    protected _extensionInfoOptions?: ExtensionInfoOptions,
  ) {
    super(_dataFetcher);

    const extensionInfoOptions = this._extensionInfoOptions ?? {};
    const { polling = true } = extensionInfoOptions;
    this._source = new DataSource({
      ...extensionInfoOptions,
      key: 'extensionInfo',
      polling,
      cleanOnReset: true,
      fetchFunction: async () => {
        try {
          const result = (await this._client
            .account()
            .extension()
            .get()) as GetExtensionInfoResponse;
          return result;
        } catch (error: any) {
          if (error.response?.status === 403) {
            await this._auth.logout({
              reason: 'Insufficient privilege',
              payload: {
                detail: 'ExtensionInfo 403',
              },
            });

            this._toast.danger({
              message: t('insufficientPrivilege'),
              ttl: 0,
            });
            return {} as GetExtensionInfoResponse;
          }
          throw error;
        }
      },
      readyCheckFunction: () => this._auth.loggedIn,
    });
    this._dataFetcher.register(this._source);

    this._subscription?.register(this, {
      filters: [subscriptionFilters.extensionInfo],
    });
  }

  private _handleSubscription(message?: ExtensionInfoEvent) {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
      message?.event &&
      extensionRegExp.test(message.event) &&
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
    if (this._subscription) {
      this._stopWatching = watch(
        this,
        () => this._subscription!.message as ExtensionInfoEvent | undefined,
        (message) => this._handleSubscription(message),
      );
    }
  }

  override onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  @computed(({ data }: ExtensionInfo) => [data])
  get info(): GetExtensionInfoResponse {
    if (this.data?.regionalSettings?.homeCountry) {
      renameTurkeyCountry(this.data.regionalSettings.homeCountry);
    }
    return this.data ?? {};
  }

  get id() {
    return this.info.id!;
  }

  get accountId() {
    return this.info.account?.id;
  }

  get name() {
    return this.info.name;
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
    return !!(this._extensionInfoOptions?.isMultipleSiteEnabled ?? false);
  }

  @computed(({ info }: ExtensionInfo) => [info])
  get site() {
    if (!this.isMultipleSiteEnabled) {
      return null;
    }
    if (
      this._extensionFeatures.features?.SiteCodes?.available &&
      !this.info.site
    ) {
      logger.warn('site code enabled, but cannot retrieve site info');
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

  /**
   * check target user id is current login user
   */
  checkIsCurrentUser(id: number | string | undefined) {
    return Boolean(this.id && id && +id === this.id);
  }
}
