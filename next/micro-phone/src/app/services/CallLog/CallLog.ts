import type DetailedExtensionPresenceEvent from '@rc-ex/core/lib/definitions/DetailedExtensionPresenceEvent';
import type ReadUserCallLogParameters from '@rc-ex/core/lib/definitions/ReadUserCallLogParameters';
import { callResults } from '@ringcentral-integration/commons/enums/callResults';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import type { SyncType } from '@ringcentral-integration/commons/enums/syncTypes';
import { syncTypes } from '@ringcentral-integration/commons/enums/syncTypes';
import type { ActiveCall } from '@ringcentral-integration/commons/interfaces/Presence.model';
import {
  hasEndedCalls,
  removeDuplicateIntermediateCalls,
  removeInboundRingOutLegs,
  sortByStartTime,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import getDateFrom from '@ringcentral-integration/commons/lib/getDateFrom';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  ExtensionPhoneNumber,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  fromWatchValue,
  inject,
  injectable,
  optional,
  RcModule,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  userStorage,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import { delay, EMPTY, filter, switchMap, tap } from 'rxjs';

import type {
  CallLogData,
  CallLogOptions,
  CallLogSyncData,
  SyncSuccessOptions,
} from './CallLog.interface';
import {
  getISODateFrom,
  getISODateTo,
  processData,
  processRecords,
} from './helper';

const DEFAULT_TTL = 5 * 60 * 1000;
// Lock fetching on app refresh if lst fetch happened less than this time span
const DEFAULT_REFRESH_LOCK = 3 * 60 * 1000;
const DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
const DEFAULT_DAY_SPAN = 7;
const RECORD_COUNT = 250;
const LIST_RECORD_COUNT = 250;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const SYNC_DELAY = 30 * 1000;
// to not use $ at the end, presence with sipData has extra query parameters
const presenceRegExp = /\/presence\?detailedTelephonyState=true/;

@injectable({
  name: 'CallLog',
})
export class CallLog extends RcModule {
  protected _promise: Promise<void> | null = null;

  protected _queueSync: Promise<void> | null = null;

  protected _timeoutId: NodeJS.Timeout | null = null;

  protected _handleSyncApiError: ((error?: Error) => Promise<void>) | null =
    null;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    protected _extensionInfo: ExtensionInfo,
    @inject('Subscription') protected _subscription: Subscription,
    protected _appFeatures: AppFeatures,
    @optional() protected _storage?: StoragePlugin,
    @optional('CallLogOptions') protected _callLogOptions?: CallLogOptions,
  ) {
    super();
    const disableCache = this._callLogOptions?.disableCache ?? false;
    if (!disableCache) {
      this._storage?.enable(this);
    }

    this._subscription.register(this, {
      filters: [subscriptionFilters.detailedPresence],
    });
  }

  @userStorage
  @state
  data: CallLogData = {
    list: [],
    map: {},
    token: null,
    timestamp: null,
  };

  @action
  resetData() {
    this.data = {
      list: [],
      map: {},
      token: null,
      timestamp: null,
    };
  }

  @action
  clearToken() {
    this.data.token = null;
    this.data.timestamp = null;
  }

  @action
  filterExpiredCalls(daySpan: number) {
    if (daySpan) {
      const cutOffTime = getDateFrom(daySpan).getTime();
      const newList: string[] = [];
      this.data.list.forEach((id) => {
        const call = this.data.map[id];
        if (call.startTime > cutOffTime) {
          newList.push(id);
        } else {
          delete this.data.map[id];
        }
      });
      this.data.list = newList;
    }
  }

  @action
  syncSuccess({
    timestamp,
    syncToken,
    records = [],
    supplementRecords = [],
    daySpan,
  }: SyncSuccessOptions) {
    this.data.timestamp = timestamp;
    this.data.token = syncToken || '';
    const newState: string[] = [];
    const cutOffTime = daySpan && getDateFrom(daySpan).getTime();
    // filter old calls
    this.data.list.forEach((id) => {
      const call = this.data.map[id];
      if (call.startTime > cutOffTime) {
        newState.push(id);
      } else {
        delete this.data.map[id];
      }
    });

    processRecords(records, supplementRecords).forEach((call) => {
      const checkState =
        (this._limitDaySpan && call.startTime > cutOffTime) ||
        !this._limitDaySpan;
      if (checkState) {
        if (!this.data.map[call.id!]) {
          newState.push(call.id!);
        }
        this.data.map[call.id!] = call;
        if (this._enableDeleted && call.deleted) {
          const index = newState.indexOf(call.id!);
          if (index > -1) {
            newState.splice(index, 1);
          }
          delete this.data.map[call.id!];
        }
      }
    });
    this.data.list = newState;
  }

  protected get _ttl() {
    return this._callLogOptions?.ttl ?? DEFAULT_TTL;
  }

  protected get _refreshLock() {
    return this._callLogOptions?.refreshLock ?? DEFAULT_REFRESH_LOCK;
  }

  protected get _tokenExpiresIn() {
    return this._callLogOptions?.tokenExpiresIn ?? DEFAULT_TOKEN_EXPIRES_IN;
  }

  protected get _timeToRetry() {
    return this._callLogOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;
  }

  protected get _limitDaySpan() {
    return this._callLogOptions?.limitDaySpan ?? true;
  }

  protected get _limitSupplement() {
    return this._callLogOptions?.limitSupplementList ?? false;
  }

  protected get _daySpan() {
    if (this._limitDaySpan) {
      return this._callLogOptions?.daySpan ?? DEFAULT_DAY_SPAN;
    }
    return 0;
  }

  protected get _polling() {
    return this._callLogOptions?.polling ?? true;
  }

  protected get _isLimitList() {
    return this._callLogOptions?.isLimitList ?? true;
  }

  protected get _listRecordCount() {
    return this._callLogOptions?.listRecordCount ?? LIST_RECORD_COUNT;
  }

  protected get _recordCount() {
    return this._callLogOptions?.recordCount ?? RECORD_COUNT;
  }

  protected get _enableDeleted() {
    return this._callLogOptions?.enableDeleted ?? false;
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._auth.loggedIn);
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  override async onInit() {
    /**
     * old call log data structure migration
     */
    if (typeof this.data.list[0] === 'object') {
      this.resetData();
    }

    this._limitDaySpan && this.filterExpiredCalls(this._daySpan);
    if (
      this.token &&
      (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)
    ) {
      this.clearToken();
    }
    await this.initInternal();
  }

  protected async initInternal() {
    if (this._appFeatures.hasReadExtensionCallLog) {
      await this._init();
    }
  }

  override onReset() {
    this._clearTimeout();
    this._promise = null;
    this.resetData();
  }

  override onInitOnce() {
    const hasReadExtensionCallLog$ = fromWatchValue(
      this,
      () => this._appFeatures.hasReadExtensionCallLog,
    );

    const haveNewCallEnded$ = this._subscription
      .fromMessage$<DetailedExtensionPresenceEvent['body']>(presenceRegExp)
      .pipe(
        filter((data) =>
          Boolean(
            data.activeCalls && hasEndedCalls(data.activeCalls as ActiveCall[]),
          ),
        ),
      );

    this.readyState$
      .pipe(
        switchMap(() => (this.ready ? hasReadExtensionCallLog$ : EMPTY)),
        switchMap((hasReadExtensionCallLog) =>
          hasReadExtensionCallLog ? haveNewCallEnded$ : EMPTY,
        ),
        delay(SYNC_DELAY),
        tap(() => {
          this.logger.log(
            'have new active call ended, wait 30s for sync again',
          );
        }),
        switchMap(() => this.sync()),
        tap(() => {
          this.logger.log('active call ended sync done');
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  async _init() {
    if (!this.timestamp || Date.now() - this.timestamp > this.refreshLock) {
      try {
        await this.sync();
      } catch (e) {
        this.logger.log('full sync error', e);
      }
    } else if (this._polling) {
      this._startPolling();
    }
  }

  @computed
  get calls() {
    /**
     * old call log data structure migration
     */
    if (typeof this.data.list[0] === 'object') {
      return [];
    }

    // TODO: make sure removeDuplicateIntermediateCalls is necessary here
    const calls = removeInboundRingOutLegs(
      removeDuplicateIntermediateCalls(
        // https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog
        //@ts-ignore
        this.data.list.reduce((acc, id) => {
          const call = this.data.map[id];

          const valid =
            // * in new version of app, only when the call have telephonySessionId will be show in our app
            (process.env.THEME_SYSTEM === 'spring-ui'
              ? call.telephonySessionId
              : true) &&
            // [RCINT-3472] calls with result === 'stopped' seems to be useless
            call?.result !== callResults.stopped &&
            // [RCINT-51111] calls with result === 'busy'
            call?.result !== callResults.busy &&
            // [RCINT-6839]
            // Call processing result is undefined
            call?.result !== callResults.unknown &&
            // Outgoing fax sending has failed
            // TODO: Types of Legacy, remove for checking type?
            // @ts-ignore
            call?.result !== callResults.faxSendError &&
            // Incoming fax has failed to be received
            call?.result !== callResults.faxReceiptError &&
            // Outgoing fax has failed because of no answer
            call?.result !== callResults.callFailed &&
            // Error Internal error occurred when receiving fax
            // TODO: Types of Legacy, remove for checking type?
            // @ts-ignore
            call?.result !== callResults.faxReceipt;

          if (valid) {
            acc.push(call as ActiveCall);
          }
          return acc;
        }, [] as ActiveCall[]),
      ) as ActiveCall[],
    ).sort(sortByStartTime);

    if (this._isLimitList) {
      return calls.slice(0, this._listRecordCount);
    }

    return calls;
  }

  get token() {
    return this.data.token;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get ttl() {
    return this._ttl;
  }

  get refreshLock() {
    return this._refreshLock;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  @delegate('server')
  async _fetch(
    fromToParams: Pick<ReadUserCallLogParameters, 'dateFrom' | 'dateTo'>,
  ) {
    const perPageParam = this._isLimitList
      ? { perPage: this._listRecordCount }
      : {};

    const fetchFn = (params?: any) =>
      this._client
        .account()
        .extension()
        .callLog()
        .list({
          ...params,
          ...fromToParams,
          ...perPageParam,
        });

    if (this._limitSupplement) {
      try {
        const data = await fetchFn();
        return data?.records || [];
      } catch (err) {
        this.logger.log('callLog._fetch|error', err);
      }
    }

    return fetchList((params) => fetchFn(params));
  }

  @delegate('server')
  async _iSync() {
    const ownerId = this._auth.ownerId;
    try {
      const data: CallLogSyncData = (await this._client
        .account()
        .extension()
        .callLogSync()
        .list({
          // TODO: fix type
          // @ts-ignore
          syncType: syncTypes.iSync,
          syncToken: this.token!,
          showDeleted: this._enableDeleted,
        })) as any;
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      this.syncSuccess({
        ...processData(data),
        daySpan: this._daySpan,
      });
    } catch (error: any /** TODO: confirm with instanceof */) {
      if (ownerId === this._auth.ownerId) {
        // iSyncError
        await this._handleSyncApiError?.(error);
        throw error;
      }
    }
  }

  @delegate('server')
  async _fSync() {
    const ownerId = this._auth.ownerId;
    try {
      const syncParams = this._getSyncParams();
      const data: CallLogSyncData = (await this._client
        .account()
        .extension()
        .callLogSync()
        .list(syncParams)) as any; // TODO: fix type
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      let supplementRecords: any;
      const { records, timestamp, syncToken } = processData(data);

      if (records.length >= this._recordCount) {
        const fetchSupplementParams: Record<string, any> = {
          dateTo: getISODateTo(records),
        };
        if (syncParams.dateFrom) {
          fetchSupplementParams.dateFrom = syncParams.dateFrom;
        }
        // reach the max record count
        supplementRecords = await this._fetch(fetchSupplementParams);
      }
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      if (this._enableDeleted) {
        this.resetData();
      }

      this.syncSuccess({
        records,
        supplementRecords,
        timestamp,
        syncToken,
        daySpan: this._daySpan,
      });
    } catch (error: any /** TODO: confirm with instanceof */) {
      if (ownerId === this._auth.ownerId) {
        // fSyncError
        await this._handleSyncApiError?.(error);
        throw error;
      }
    }
  }

  private _getSyncParams() {
    const daySpan = this._daySpan;
    const params: Record<string, any> = {
      recordCount: this._recordCount,
      syncType: syncTypes.fSync,
    };
    if (daySpan) {
      params.dateFrom = getISODateFrom(daySpan);
    }
    return params;
  }

  @delegate('server')
  async _sync(syncType: SyncType) {
    const ownerId = this._auth.ownerId;
    try {
      let shouldFSync = syncType === syncTypes.fSync;
      if (!shouldFSync) {
        try {
          await this._iSync();
        } catch (error) {
          shouldFSync = true;
        }
      }
      if (shouldFSync && ownerId === this._auth.ownerId) {
        await this._fSync();
      }
      if (this._polling) {
        this._startPolling();
      }
    } catch (error) {
      if (ownerId === this._auth.ownerId) {
        if (this._polling) {
          this._startPolling(this.timeToRetry);
        } else {
          this._retry();
        }
      }
    }
    this._promise = null;
  }

  @delegate('server')
  async sync(syncType = this.token ? syncTypes.iSync : syncTypes.fSync) {
    if (!this._promise) {
      this._promise = this._sync(syncType);
      return this._promise;
    }
    if (!this._queueSync) {
      this._queueSync = (async () => {
        await this._promise;
        this._promise = (async () => {
          await sleep(300);
          return this._sync(syncType);
        })();
        this._queueSync = null;
        return this._promise;
      })();
      return this._queueSync;
    }
    return this._queueSync;
  }

  @delegate('server')
  fetchData() {
    return this.sync();
  }

  get mainCompanyNumbers() {
    return this._extensionPhoneNumber.numbers
      .filter(({ usageType }) => usageType === 'MainCompanyNumber')
      .map(({ phoneNumber }) => phoneNumber);
  }

  get pollingInterval() {
    return this.ttl;
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  _startPolling(t = this.timestamp! + this.pollingInterval + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        this.fetchData();
      } else {
        this._startPolling();
      }
    }, t);
  }

  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        this.fetchData();
      }
    }, t);
  }
}
