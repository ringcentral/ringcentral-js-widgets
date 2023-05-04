import { map, sort } from 'ramda';
import { Unsubscribe } from 'redux';
import type DetailedExtensionPresenceEvent from '@rc-ex/core/lib/definitions/DetailedExtensionPresenceEvent';
import type UserCallLogRecord from '@rc-ex/core/lib/definitions/UserCallLogRecord';
import { computed, watch } from '@ringcentral-integration/core';

import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { normalizeStartTime, sortByStartTime } from '../../lib/callLogHelpers';
import { debounce, DebouncedFunction } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './ActiveCalls.interface';

const presenceRegExp = /\/presence\?detailedTelephonyState=true/;
const DEFAULT_FETCH_DELAY = 1000;
const DEFAULT_TTL = 5 * 60 * 1000;

@Module({
  name: 'ActiveCalls',
  deps: [
    'Client',
    'AppFeatures',
    'DataFetcherV2',
    'Subscription',
    { dep: 'TabManager', optional: true },
    { dep: 'ActiveCallsOptions', optional: true },
  ],
})
export class ActiveCalls extends DataFetcherV2Consumer<
  Deps,
  UserCallLogRecord[]
> {
  protected _stopWatching: Unsubscribe | null = null;
  protected _debouncedFetchData: DebouncedFunction<ActiveCalls['fetchData']>;
  constructor(deps: Deps) {
    super({
      deps,
    });
    const activeCallsOptions = deps.activeCallsOptions ?? {};
    const { ttl = DEFAULT_TTL } = activeCallsOptions;
    this._source = new DataSource({
      ...activeCallsOptions,
      key: 'activeCalls',
      cleanOnReset: true,
      ttl,
      fetchFunction: async (): Promise<UserCallLogRecord[]> =>
        fetchList((params: any) =>
          this._deps.client.account().extension().activeCalls().list(params),
        ),
      readyCheckFunction: () =>
        !!(this._deps.appFeatures.ready && this._deps.subscription.ready),
      permissionCheckFunction: () =>
        this._deps.appFeatures.hasReadExtensionCallLog,
    });
    this._deps.dataFetcherV2.register(this._source);
    this._debouncedFetchData = debounce({
      fn: this.fetchData,
      threshold: this._fetchDelay,
      // throttle the request rate to once every this._fetchDelay ms
      maxThreshold: this._fetchDelay,
    });
  }

  protected get _fetchDelay() {
    return Math.max(
      0,
      this._deps.activeCallsOptions?.fetchDelay ?? DEFAULT_FETCH_DELAY,
    );
  }

  protected _handleSubscription(message: DetailedExtensionPresenceEvent) {
    if (presenceRegExp.test(message?.event!)) {
      if (
        this.ready &&
        (this._source.disableCache || (this._deps.tabManager?.active ?? true))
      ) {
        this._debouncedFetchData();
      }
    }
  }

  override onInit() {
    this._deps.subscription.subscribe([subscriptionFilters.detailedPresence]);
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

  @computed(({ data }: ActiveCalls) => [data])
  get calls() {
    return sort(
      sortByStartTime,
      map((call) => normalizeStartTime(call), this.data ?? []),
    );
  }
}
