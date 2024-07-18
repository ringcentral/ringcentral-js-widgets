import type CallLogResponse from '@rc-ex/core/lib/definitions/CallLogResponse';
import { action, RcModuleV2, state } from '@ringcentral-integration/core';

import { phoneTypes } from '../../enums/phoneTypes';
import type { Entity } from '../../interfaces/Entity.interface';
import background from '../../lib/background';
import concurrentExecute from '../../lib/concurrentExecute';
import { Module } from '../../lib/di';
import getDateFrom from '../../lib/getDateFrom';
import type { HistoryCall } from '../CallHistory';

import type {
  CleanUpCallsOptions,
  Deps,
  FetchCallLogListOptions,
  GetCallsOptions,
  LoadSuccessOptions,
} from './RecentCalls.interface';
import {
  dedup,
  filterPhoneNumber,
  flattenToRecords,
  sortByTime,
} from './RecentCallsHelper';
import { callStatus } from './callStatus';

@Module({
  name: 'RecentCalls',
  deps: [
    'Client',
    'Auth',
    'CallHistory',
    { dep: 'RecentCallsOptions', optional: true },
  ],
})
export class RecentCalls extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
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

  @background
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
      this._deps.callHistory.calls,
    );
    this.loadSuccess({
      calls,
      contact: currentContact,
      sessionId,
    });
  }

  override _shouldInit() {
    return !!(super._shouldInit() && this._deps.auth.loggedIn);
  }

  override _shouldReset() {
    return !!(
      super._shouldReset() ||
      (this.ready && !this._deps.auth.loggedIn)
    );
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
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const matches = phoneNumbers.find(filterPhoneNumber(call));

        // Check if calls is within certain days
        // @ts-expect-error TS(2769): No overload matches this call.
        if (!!matches && new Date(call.startTime) > dateFrom) {
          return acc.concat(call);
        }
      }
      return acc;
    }, [] as HistoryCall[]);
  }

  /**
   * Fetch recent calls from server by given current contact.
   */
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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const recentCallsPromises = phoneNumbers.reduce(
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

    return concurrentExecute(recentCallsPromises, 5, { delay: 500 }).then(
      flattenToRecords,
    ) as Promise<HistoryCall[]>;
  }

  _fetchCallLogList(params: FetchCallLogListOptions) {
    return async () => {
      if (!this._deps.auth.loggedIn) {
        return { records: [] };
      }
      return this._deps.client
        .account()
        .extension()
        .callLog()
        .list(params) as Promise<CallLogResponse>;
    };
  }
}
