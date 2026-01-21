import type CallLogResponse from '@rc-ex/core/lib/definitions/CallLogResponse';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import concurrentExecute from '@ringcentral-integration/commons/lib/concurrentExecute';
import getDateFrom from '@ringcentral-integration/commons/lib/getDateFrom';
import {
  Auth,
  Client,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';

import type { HistoryCall } from '../CallHistory';
import { CallHistory } from '../CallHistory';

import type {
  CleanUpCallsOptions,
  FetchCallLogListOptions,
  GetCallsOptions,
  LoadSuccessOptions,
  RecentCallsOptions,
} from './RecentCalls.interface';
import {
  dedup,
  filterPhoneNumber,
  flattenToRecords,
  sortByTime,
} from './RecentCallsHelper';
import { callStatus } from './callStatus';

@injectable({
  name: 'RecentCalls',
})
export class RecentCalls extends RcModule {
  constructor(
    protected _client: Client,
    protected _auth: Auth,
    protected _callHistory: CallHistory,
    @optional('RecentCallsOptions')
    protected _recentCallsOptions?: RecentCallsOptions,
  ) {
    super();
  }

  @state
  calls: Record<string, HistoryCall[]> = {};

  @state
  callStatus: string | null = null;

  @action
  initLoad() {
    this.callStatus = callStatus.loading;
  }

  @action
  loadSuccess({ contact, calls, sessionId }: LoadSuccessOptions) {
    this.callStatus = callStatus.loaded;
    const contactId = String(contact && contact.id);
    this.calls[sessionId ? `${contactId}-${sessionId}` : contactId] = calls;
  }

  @action
  cleanUpCalls({ contact, sessionId = null }: CleanUpCallsOptions) {
    this.callStatus = callStatus.loaded;
    const contactId = String(contact && contact.id);
    const id = sessionId ? `${contactId}-${sessionId}` : contactId;
    delete this.calls[id];
  }

  get isCallsLoaded() {
    return this.callStatus === callStatus.loaded;
  }

  @delegate('server')
  async getCalls({ currentContact, sessionId = null }: GetCallsOptions) {
    // No need to calculate recent calls of the same contact repeatedly
    if (!currentContact) {
      return;
    }
    const contactId = String(currentContact && currentContact.id);
    if (this.calls[sessionId ? `${contactId}-${sessionId}` : contactId]) {
      return;
    }
    this.initLoad();
    const calls = await this._getRecentCalls(
      currentContact,
      this._callHistory.calls,
    );
    this.loadSuccess({
      calls,
      contact: currentContact,
      sessionId,
    });
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._auth.loggedIn);
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  /**
   * Searching for recent calls of specific contact.
   * @param {Object} currentContact Current contact
   * @param {Array} calls Calls in callHistory
   * @param {Number} daySpan Find calls within certain days
   * @param {Number} length Maximum length of recent calls
   * @return {Array}
   * @private
   */
  async _getRecentCalls(
    currentContact: Entity,
    calls: HistoryCall[] = [],
    daySpan = 60,
    length = 5,
  ) {
    const dateFrom = getDateFrom(daySpan);
    let recentCalls = this._getLocalRecentCalls(
      currentContact,
      calls,
      dateFrom,
    );

    // If we could not find enough recent calls,
    // we need to search for calls on server.
    if (recentCalls.length < length) {
      recentCalls = await this._fetchRemoteRecentCalls(
        currentContact,
        dateFrom.toISOString(),
        length,
      );
    }

    recentCalls.sort(sortByTime);
    recentCalls = dedup(recentCalls);
    return recentCalls.length > length
      ? recentCalls.slice(0, length)
      : recentCalls;
  }

  _getLocalRecentCalls(
    { phoneNumbers }: Entity,
    calls: HistoryCall[],
    dateFrom: Date,
  ) {
    // Get all calls related to this contact
    return calls.reduce((acc, call) => {
      if (call && call.to && call.from) {
        const matches = phoneNumbers?.find(filterPhoneNumber(call));

        // Check if calls is within certain days
        if (!!matches && new Date(call.startTime as number) > dateFrom) {
          return acc.concat(call);
        }
      }
      return acc;
    }, [] as HistoryCall[]);
  }

  /**
   * Fetch recent calls from server by given current contact.
   */
  @delegate('server')
  _fetchRemoteRecentCalls(
    { phoneNumbers }: Entity,
    dateFrom: string,
    length: number,
  ) {
    const params = {
      dateFrom,
      perPage: length,
      type: 'Voice',
    };

    // CallLog API doesn't support plus sign in phoneNumber
    const recentCallsPromises = phoneNumbers?.reduce(
      (acc, { phoneType, phoneNumber }) => {
        phoneNumber = phoneNumber.replace('+', '');
        if (phoneType === phoneTypes.extension) {
          const promise = this._fetchCallLogList({
            ...params,
            extensionNumber: phoneNumber,
          });
          return acc.concat(promise);
        }
        const promise = this._fetchCallLogList({
          ...params,
          phoneNumber,
        });
        return acc.concat(promise);
      },
      [] as (() => Promise<CallLogResponse>)[],
    );

    return concurrentExecute(recentCallsPromises!, 5, { delay: 500 }).then(
      flattenToRecords,
    ) as Promise<HistoryCall[]>;
  }

  _fetchCallLogList(params: FetchCallLogListOptions) {
    // TODO: fix type for params
    return async () => {
      if (!this._auth.loggedIn) {
        return { records: [] };
      }
      return this._client
        .account()
        .extension()
        .callLog()
        .list(params as any) as Promise<CallLogResponse>;
    };
  }
}
