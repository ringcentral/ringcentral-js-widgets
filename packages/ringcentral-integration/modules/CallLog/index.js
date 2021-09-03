/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import fetchList from '../../lib/fetchList';
import moduleStatuses from '../../enums/moduleStatuses';
import getDateFrom from '../../lib/getDateFrom';
import { actionTypes } from './actionTypes';
import getCallLogReducer, {
  getDataReducer,
  getTimestampReducer,
  getTokenReducer,
} from './getCallLogReducer';
import sleep from '../../lib/sleep';
import subscriptionFilters from '../../enums/subscriptionFilters';
import syncTypes from '../../enums/syncTypes';
import {
  hasEndedCalls,
  removeDuplicateIntermediateCalls,
  removeInboundRingOutLegs,
  isOutbound,
} from '../../lib/callLogHelpers';
import callResults from '../../enums/callResults';
import callActions from '../../enums/callActions';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';

const DEFAULT_TTL = 5 * 60 * 1000;
// Lock fetching on app refresh if lst fetch happened less than this time span
const DEFAULT_REFRESH_LOCK = 3 * 60 * 1000;
const DEFAULT_TOKEN_EXPIRES_IN = 60 * 60 * 1000;
const DEFAULT_DAY_SPAN = 7;
const RECORD_COUNT = 250;
const LIST_RECORD_COUNT = 250;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const SYNC_DELAY = 30 * 1000;

export function processData(data) {
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: data.syncInfo.syncToken,
  };
}

export function getISODateFrom(daySpan) {
  const d = getDateFrom(daySpan);
  return d.toISOString();
}

export function getISODateTo(records) {
  let dateTo;
  records.forEach((call) => {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
}
// to not use $ at the end, presence with sipData has extra query parameters
const presenceRegExp = /\/presence\?detailedTelephonyState=true/;

/**
 * @class
 * @description Call log managing module
 */
@Module({
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
export default class CallLog extends Pollable {
  constructor({
    auth,
    client,
    storage,
    extensionPhoneNumber,
    extensionInfo,
    subscription,
    appFeatures,
    tabManager,
    ttl = DEFAULT_TTL,
    refreshLock = DEFAULT_REFRESH_LOCK,
    tokenExpiresIn = DEFAULT_TOKEN_EXPIRES_IN,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    daySpan = DEFAULT_DAY_SPAN,
    polling = true,
    disableCache = false,
    isLimitList = false,
    listRecordCount = LIST_RECORD_COUNT,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = auth;
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._extensionPhoneNumber = extensionPhoneNumber;
    this._extensionInfo = extensionInfo;
    this._subscription = subscription;
    this._appFeatures = appFeatures;
    this._tabManager = tabManager;
    this._isLimitList = isLimitList;
    this._listRecordCount = listRecordCount;
    this._callLogStorageKey = 'callLog';
    this._ttl = ttl;
    this._tokenExpiresIn = tokenExpiresIn;
    this._timeToRetry = timeToRetry;
    this._refreshLock = refreshLock;
    this._daySpan = daySpan;
    this._polling = polling;
    if (this._storage) {
      this._reducer = getCallLogReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._callLogStorageKey,
        reducer: combineReducers({
          data: getDataReducer(this.actionTypes),
          token: getTokenReducer(this.actionTypes),
          timestamp: getTimestampReducer(this.actionTypes),
        }),
      });
    } else {
      this._reducer = getCallLogReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
        token: getTokenReducer(this.actionTypes),
        timestamp: getTimestampReducer(this.actionTypes),
      });
    }
    this._promise = null;
    this._lastMessage = null;
  }

  _subscriptionHandler = async (message) => {
    if (
      this.ready &&
      presenceRegExp.test(message.event) &&
      message.body &&
      message.body.activeCalls &&
      hasEndedCalls(message.body.activeCalls)
    ) {
      const { ownerId } = this._auth;
      await sleep(SYNC_DELAY);
      if (
        ownerId === this._auth.ownerId &&
        (!this._storage || !this._tabManager || this._tabManager.active)
      ) {
        this.sync();
      }
    }
  };

  _onStateChange = async () => {
    if (
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      (!this._subscription || this._subscription.ready) &&
      (!this._extensionPhoneNumber || this._extensionPhoneNumber.ready) &&
      (!this._extensionInfo || this._extensionInfo.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this._appFeatures.ready &&
      this.status === moduleStatuses.pending
    ) {
      this.store.dispatch({
        type: this.actionTypes.init,
        daySpan: this._daySpan,
      });
      if (
        this.token &&
        (!this.timestamp || Date.now() - this.timestamp > this._tokenExpiresIn)
      ) {
        this.store.dispatch({
          type: this.actionTypes.clearToken,
        });
      }
      if (this._appFeatures.hasReadExtensionCallLog) {
        await this._init();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      (!this._auth.loggedIn ||
        (!!this._storage && !this._storage.ready) ||
        (this._extensionPhoneNumber && !this._extensionPhoneNumber.ready) ||
        (this._extensionInfo && !this._extensionInfo.ready) ||
        (this._subscription && !this._subscription.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._appFeatures.ready) &&
      this.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this._clearTimeout();
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (
      this.ready &&
      this._subscription &&
      this._subscription.ready &&
      this._subscription.message &&
      this._subscription.message !== this._lastMessage
    ) {
      this._lastMessage = this._subscription.message;
      this._subscriptionHandler(this._lastMessage);
    }
  };

  async _init() {
    if (this._subscription) {
      this._subscription.subscribe([subscriptionFilters.detailedPresence]);
    }
    if (
      (!this._tabManager || this._tabManager.active) &&
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

  initialize() {
    this.store.subscribe(this._onStateChange);
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get data() {
    if (this._storage) {
      return this._storage.getItem(this._callLogStorageKey)?.data;
    }
    return this.state.data;
  }

  @selector
  calls = [
    () => this.data,
    (data) => {
      // TODO make sure removeDuplicateIntermediateCalls is necessary here
      const calls = removeInboundRingOutLegs(
        removeDuplicateIntermediateCalls(
          data.filter(
            (call) =>
              // [RCINT-3472] calls with result === 'stopped' seems to be useless
              call.result !== callResults.stopped &&
              // [RCINT-51111] calls with result === 'busy'
              call.result !== callResults.busy &&
              // [RCINT-6839]
              // Call processing result is undefined
              call.result !== callResults.unknown &&
              // Outgoing fax sending has failed
              call.result !== callResults.faxSendError &&
              // Incoming fax has failed to be received
              call.result !== callResults.faxReceiptError &&
              // Outgoing fax has failed because of no answer
              call.result !== callResults.callFailed &&
              // Outgoing fax sending has been stopped
              call.result !== callResults.stopped &&
              // Error Internal error occurred when receiving fax
              call.result !== callResults.faxReceipt,
          ),
        ),
      ).map((call) => {
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
            this._extensionInfo.info.extensionNumber;
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
      });
      if (this._isLimitList) {
        return calls.slice(0, this._listRecordCount);
      }
      return calls;
    },
  ];

  get token() {
    if (this._storage) {
      return this._storage.getItem(this._callLogStorageKey).token;
    }
    return this.state.token;
  }

  get timestamp() {
    if (this._storage) {
      return this._storage.getItem(this._callLogStorageKey).timestamp;
    }
    return this.state.timestamp;
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
  async _fetch({ dateFrom, dateTo }) {
    const perPageParam = this._isLimitList
      ? { perPage: this._listRecordCount }
      : {};
    return fetchList((params) =>
      this._client
        .account()
        .extension()
        .callLog()
        .list({ ...params, dateFrom, dateTo, ...perPageParam }),
    );
  }

  @proxify
  async _iSync() {
    const ownerId = this._auth.ownerId;
    try {
      this.store.dispatch({
        type: this.actionTypes.iSync,
      });
      const data = await this._client.account().extension().callLogSync().list({
        syncType: syncTypes.iSync,
        syncToken: this.token,
      });
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      this.store.dispatch({
        type: this.actionTypes.iSyncSuccess,
        ...processData(data),
        daySpan: this._daySpan,
      });
    } catch (error) {
      if (ownerId === this._auth.ownerId) {
        this.store.dispatch({
          type: this.actionTypes.iSyncError,
          error,
        });
        throw error;
      }
    }
  }

  @proxify
  async _fSync() {
    const ownerId = this._auth.ownerId;
    try {
      this.store.dispatch({
        type: this.actionTypes.fSync,
      });

      const dateFrom = getISODateFrom(this._daySpan);
      const data = await this._client.account().extension().callLogSync().list({
        recordCount: RECORD_COUNT,
        syncType: syncTypes.fSync,
        dateFrom,
      });
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      let supplementRecords;
      const { records, timestamp, syncToken } = processData(data);
      if (records.length >= RECORD_COUNT) {
        // reach the max record count
        supplementRecords = await this._fetch({
          dateFrom,
          dateTo: getISODateTo(records),
        });
      }
      if (ownerId !== this._auth.ownerId) throw Error('request aborted');
      this.store.dispatch({
        type: this.actionTypes.fSyncSuccess,
        records,
        supplementRecords,
        timestamp,
        syncToken,
        daySpan: this._daySpan,
      });
    } catch (error) {
      if (ownerId === this._auth.ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fSyncError,
          error,
        });
        throw error;
      }
    }
  }

  @proxify
  async _sync(syncType) {
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

  // TODO: this.token: iSync or fSync depends on token???
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
    return this._extensionPhoneNumber.numbers
      .filter(({ usageType }) => usageType === 'MainCompanyNumber')
      .map(({ phoneNumber }) => phoneNumber);
  }
}
