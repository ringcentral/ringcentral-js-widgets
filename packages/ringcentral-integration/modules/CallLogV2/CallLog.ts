import { ReadUserCallLogParameters } from '@rc-ex/core/definitions';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import { callActions } from '../../enums/callActions';
import { callResults } from '../../enums/callResults';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { SyncType, syncTypes } from '../../enums/syncTypes';
import {
  hasEndedCalls,
  isOutbound,
  removeDuplicateIntermediateCalls,
  removeInboundRingOutLegs,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import getDateFrom from '../../lib/getDateFrom';
import { proxify } from '../../lib/proxy/proxify';
import sleep from '../../lib/sleep';
import {
  CallLogData,
  CallLogRecords,
  CallLogSyncData,
  Deps,
  SyncSuccessOptions,
  UserCallLogResponseData,
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

@Module({
  name: 'CallLog',
  deps: [
    'Auth',
    'Client',
    'ExtensionPhoneNumber',
    'ExtensionInfo',
    'Subscription',
    'AppFeatures',
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'CallLogOptions', optional: true },
  ],
})
export class CallLog extends RcModuleV2<Deps> {
  protected _promise: Promise<void> = null;

  protected _queueSync: Promise<void> = null;

  protected _timeoutId: NodeJS.Timeout = null;

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'CallLog',
      enableCache: !(deps.callLogOptions?.disableCache ?? false),
    });
  }

  @storage
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

  @action
  syncSuccess({
    timestamp,
    syncToken,
    records = [],
    supplementRecords = [],
    daySpan,
  }: SyncSuccessOptions) {
    this.data.timestamp = timestamp;
    this.data.token = syncToken;
    const newState: string[] = [];
    const cutOffTime = getDateFrom(daySpan).getTime();
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
      if (call.startTime > cutOffTime) {
        if (!this.data.map[call.id]) {
          newState.push(call.id);
        }
        this.data.map[call.id] = call;
        if (this._enableDeleted && call.deleted) {
          const index = newState.indexOf(call.id);
          if (index > -1) {
            newState.splice(index, 1);
          }
          delete this.data.map[call.id];
        }
      }
    });
    this.data.list = newState;
  }

  protected get _ttl() {
    return this._deps.callLogOptions?.ttl ?? DEFAULT_TTL;
  }

  protected get _refreshLock() {
    return this._deps.callLogOptions?.refreshLock ?? DEFAULT_REFRESH_LOCK;
  }

  protected get _tokenExpiresIn() {
    return (
      this._deps.callLogOptions?.tokenExpiresIn ?? DEFAULT_TOKEN_EXPIRES_IN
    );
  }

  protected get _timeToRetry() {
    return this._deps.callLogOptions?.timeToRetry ?? DEFAULT_TIME_TO_RETRY;
  }

  protected get _daySpan() {
    return this._deps.callLogOptions?.daySpan ?? DEFAULT_DAY_SPAN;
  }

  protected get _polling() {
    return this._deps.callLogOptions?.polling ?? true;
  }

  protected get _isLimitList() {
    return this._deps.callLogOptions?.isLimitList ?? false;
  }

  protected get _listRecordCount() {
    return this._deps.callLogOptions?.listRecordCount ?? LIST_RECORD_COUNT;
  }

  protected get _recordCount() {
    return this._deps.callLogOptions?.recordCount ?? RECORD_COUNT;
  }

  protected get _enableDeleted() {
    return this._deps.callLogOptions?.enableDeleted ?? false;
  }

  _shouldInit() {
    return !!(super._shouldInit() && this._deps.auth.loggedIn);
  }

  _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
  }

  async onInit() {
    /**
     * old call log data structure migration
     */
    if (typeof this.data.list[0] === 'object') {
      this.resetData();
    }

    this.filterExpiredCalls(this._daySpan);
    if (
      this.token &&
      (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)
    ) {
      this.clearToken();
    }
    if (this._deps.appFeatures.hasReadExtensionCallLog) {
      await this._init();
    }
  }

  onReset() {
    this._clearTimeout();
    this._promise = null;
    this.resetData();
  }

  onInitOnce() {
    watch(
      this,
      () => this._deps.subscription.message,
      async (message) => {
        if (
          this.ready &&
          this._deps.subscription.ready &&
          presenceRegExp.test(message.event) &&
          message.body &&
          message.body.activeCalls &&
          hasEndedCalls(message.body.activeCalls)
        ) {
          const { ownerId } = this._deps.auth;
          await sleep(SYNC_DELAY);
          if (
            ownerId === this._deps.auth.ownerId &&
            (!this._deps.storage ||
              !this._deps.tabManager ||
              this._deps.tabManager.active)
          ) {
            this.sync();
          }
        }
      },
    );
  }

  async _init() {
    if (this._deps.subscription) {
      this._deps.subscription.subscribe([subscriptionFilters.detailedPresence]);
    }
    if (
      (!this._deps.tabManager || this._deps.tabManager.active) &&
      (!this.timestamp || Date.now() - this.timestamp > this.refreshLock)
    ) {
      try {
        await this.sync();
      } catch (e) {
        console.log(e);
      }
    } else if (this._polling) {
      this._startPolling();
    }
  }

  @computed(({ list }: CallLog) => [list])
  get calls() {
    // TODO: make sure removeDuplicateIntermediateCalls is necessary here
    const calls = removeInboundRingOutLegs(
      removeDuplicateIntermediateCalls(
        // https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog
        this.list.filter(
          (call) =>
            // [RCINT-3472] calls with result === 'stopped' seems to be useless
            call.result !== callResults.stopped &&
            // [RCINT-51111] calls with result === 'busy'
            call.result !== callResults.busy &&
            // [RCINT-6839]
            // Call processing result is undefined
            call.result !== callResults.unknown &&
            // Outgoing fax sending has failed
            // TODO: Types of Legacy, remove for checking type?
            // @ts-ignore
            call.result !== callResults.faxSendError &&
            // Incoming fax has failed to be received
            call.result !== callResults.faxReceiptError &&
            // Outgoing fax has failed because of no answer
            call.result !== callResults.callFailed &&
            // Error Internal error occurred when receiving fax
            // TODO: Types of Legacy, remove for checking type?
            // @ts-ignore
            call.result !== callResults.faxReceipt,
        ),
      ),
    )
      .map((call) => {
        // [RCINT-7364] Call presence is incorrect when make ringout call from a DL number.
        // When user use DL number set ringout and the outBound from number must not a oneself company/extension number
        // Call log sync will response tow legs.
        // But user use company plus extension number, call log sync will response only one leg.
        // And the results about `to` and `from` in platform APIs call log sync response is opposite.
        // This is a temporary solution.
        const isOutBoundCompanyNumber =
          call.from &&
          call.from.phoneNumber &&
          this.mainCompanyNumbers.indexOf(call.from.phoneNumber) > -1;
        const isOutBoundFromSelfExtNumber =
          call.from &&
          call.from.extensionNumber &&
          call.from.extensionNumber ===
            this._deps.extensionInfo.info.extensionNumber;
        if (
          isOutbound(call) &&
          (call.action === callActions.ringOutWeb ||
            call.action === callActions.ringOutPC ||
            call.action === callActions.ringOutMobile) &&
          !isOutBoundCompanyNumber &&
          !isOutBoundFromSelfExtNumber
        ) {
          return {
            ...call,
            from: call.to,
            to: call.from,
          };
        }
        return call;
      })
      .sort(sortByStartTime);
    if (this._isLimitList) {
      return calls.slice(0, this._listRecordCount);
    }
    return calls;
  }

  @computed(({ data }: CallLog) => [data.list, data.map])
  get list() {
    /**
     * old call log data structure migration
     */
    if (typeof this.data.list[0] === 'object') {
      return [];
    }

    return this.data.list.map((id) => this.data.map[id]).sort(sortByStartTime);
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

  @proxify
  async _fetch({
    dateFrom,
    dateTo,
  }: Pick<ReadUserCallLogParameters, 'dateFrom' | 'dateTo'>) {
    const perPageParam = this._isLimitList
      ? { perPage: this._listRecordCount }
      : {};
    return fetchList(
      (params) =>
        this._deps.client
          .account()
          .extension()
          .callLog()
          .list({
            ...params,
            dateFrom,
            dateTo,
            ...perPageParam,
          }) as Promise<UserCallLogResponseData>,
    );
  }

  @proxify
  async _iSync() {
    const ownerId = this._deps.auth.ownerId;
    try {
      const data: CallLogSyncData = await this._deps.client
        .account()
        .extension()
        .callLogSync()
        .list({
          syncType: syncTypes.iSync,
          syncToken: this.token,
          showDeleted: this._enableDeleted,
        });
      if (ownerId !== this._deps.auth.ownerId) throw Error('request aborted');
      this.syncSuccess({
        ...processData(data),
        daySpan: this._daySpan,
      });
    } catch (error) {
      if (ownerId === this._deps.auth.ownerId) {
        // iSyncError
        throw error;
      }
    }
  }

  @proxify
  async _fSync() {
    const ownerId = this._deps.auth.ownerId;
    try {
      const dateFrom = getISODateFrom(this._daySpan);
      const data: CallLogSyncData = await this._deps.client
        .account()
        .extension()
        .callLogSync()
        .list({
          recordCount: this._recordCount,
          syncType: syncTypes.fSync,
          dateFrom,
        });
      if (ownerId !== this._deps.auth.ownerId) throw Error('request aborted');
      let supplementRecords: CallLogRecords;
      const { records, timestamp, syncToken } = processData(data);
      if (records.length >= this._recordCount) {
        // reach the max record count
        supplementRecords = await this._fetch({
          dateFrom,
          dateTo: getISODateTo(records),
        });
      }
      if (ownerId !== this._deps.auth.ownerId) throw Error('request aborted');
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
    } catch (error) {
      if (ownerId === this._deps.auth.ownerId) {
        // fSyncError
        throw error;
      }
    }
  }

  @proxify
  async _sync(syncType: SyncType) {
    const ownerId = this._deps.auth.ownerId;
    try {
      let shouldFSync = syncType === syncTypes.fSync;
      if (!shouldFSync) {
        try {
          await this._iSync();
        } catch (error) {
          shouldFSync = true;
        }
      }
      if (shouldFSync && ownerId === this._deps.auth.ownerId) {
        await this._fSync();
      }
      if (this._polling) {
        this._startPolling();
      }
    } catch (error) {
      if (ownerId === this._deps.auth.ownerId) {
        if (this._polling) {
          this._startPolling(this.timeToRetry);
        } else {
          this._retry();
        }
      }
    }
    this._promise = null;
  }

  @proxify
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

  @proxify
  fetchData() {
    return this.sync();
  }

  get mainCompanyNumbers() {
    return this._deps.extensionPhoneNumber.numbers
      .filter(({ usageType }) => usageType === 'MainCompanyNumber')
      .map(({ phoneNumber }) => phoneNumber);
  }

  get pollingInterval() {
    return this.ttl;
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  _startPolling(t = this.timestamp + this.pollingInterval + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._deps.tabManager || this._deps.tabManager.active) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }

  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        if (!this._deps.tabManager || this._deps.tabManager.active) {
          this.fetchData();
        } else {
          // continue retry checks in case tab becomes main tab
          this._retry();
        }
      }
    }, t);
  }
}
