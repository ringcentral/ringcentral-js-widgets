import { findIndex, forEach } from 'ramda';

import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';

import { Call } from '../../interfaces/Call.interface';
import { Entity } from '../../interfaces/Entity.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import {
  getPhoneNumberMatches,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import debounce from '../../lib/debounce';
import { Module } from '../../lib/di';
import { normalizeNumber } from '../../lib/normalizeNumber';
import { proxify } from '../../lib/proxy/proxify';
import { trackEvents } from '../../enums/trackEvents';
import { callingModes } from '../CallingSettings';
import { Deps, HistoryCall } from './CallHistory.interface';
import {
  addNumbersFromCall,
  pickFullPhoneNumber,
  pickPhoneOrExtensionNumber,
} from './callHistoryHelper';

const DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1 day

@Module({
  name: 'CallHistory',
  deps: [
    'AccountInfo',
    'CallLog',
    'Storage',
    { dep: 'CallMonitor', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'CallHistoryOptions', optional: true },
  ],
})
export class CallHistory<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _debouncedSearch = debounce(this.callsSearch, 230, false);

  constructor(deps: T) {
    super({
      deps,
      storageKey: 'CallHistory',
      enableCache: deps.callHistoryOptions?.enableCache ?? true,
    });
    const enableContactMatchInCallHistory =
      this._deps.callHistoryOptions?.enableContactMatchInCallHistory ?? true;
    if (enableContactMatchInCallHistory && this._deps.contactMatcher) {
      this._deps.contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () =>
          (!this._deps.callMonitor || this._deps.callMonitor.ready) &&
          (!this._deps.tabManager || this._deps.tabManager.ready) &&
          this._deps.callLog.ready &&
          this._deps.accountInfo.ready,
      });
    }
    this._deps.activityMatcher?.addQuerySource({
      // @ts-expect-error
      getQueriesFn: () => this.sessionIds,
      readyCheckFn: () =>
        (!this._deps.callMonitor || this._deps.callMonitor.ready) &&
        (!this._deps.tabManager || this._deps.tabManager.ready) &&
        this._deps.callLog.ready,
    });
  }

  @storage
  @state
  endedCalls: Call[] = [];

  @state
  searchInput = '';

  @state
  filteredCalls: HistoryCall[] = [];

  @action
  filterSuccess(data: HistoryCall[] = []) {
    this.filteredCalls = data;
  }

  @action
  setSearchInput(input = '') {
    this.searchInput = input;
  }

  @action
  setEndedCalls(endedCalls: Call[], timestamp: number) {
    forEach((call) => {
      const callWithDuration = {
        ...call,
        // @ts-expect-error
        duration: Math.floor((timestamp - call.startTime) / 1000),
      };
      const idx = findIndex(
        (item) => item.telephonySessionId === call.telephonySessionId,
        this.endedCalls,
      );
      if (idx > -1) {
        // replace old one if found
        this.endedCalls[idx] = callWithDuration;
      } else {
        this.endedCalls.push(callWithDuration);
      }
    }, endedCalls);
  }

  @action
  removeEndedCalls(endedCalls: Pick<Call, 'telephonySessionId'>[]) {
    this.endedCalls = this.endedCalls.filter(
      (call) =>
        !(
          endedCalls.find(
            ({ telephonySessionId }) =>
              telephonySessionId === call.telephonySessionId,
          ) ||
          // clean current overdue ended call (default clean time: 1day).
          // @ts-expect-error
          Date.now() - call.startTime > DEFAULT_CLEAN_TIME
        ),
    );
  }

  @action
  cleanEndedCalls() {
    this.endedCalls = [];
  }

  @action
  removeAllEndedCalls() {
    this.endedCalls = [];
    this.markedList = [];
    this.markRemoved();
  }

  // The call logs which has been removed from remote
  // The marked telephonySessionId should not been added to ended calls afterwards.
  @storage
  @state
  markedList: Pick<Call, 'telephonySessionId'>[] = [];

  @action
  markRemoved() {
    this.markedList = this.markedList.concat(this._deps.callMonitor.calls);
  }

  override onInitOnce() {
    if (this._deps.contactMatcher) {
      watch(
        this,
        () => this.uniqueNumbers,
        () => {
          if (
            this.ready &&
            (!this._deps.tabManager || this._deps.tabManager.active) &&
            // @ts-expect-error
            this._deps.contactMatcher.ready
          ) {
            // @ts-expect-error
            this._deps.contactMatcher.triggerMatch();
          }
        },
      );
    }

    if (this._deps.activityMatcher) {
      watch(
        this,
        () => this.sessionIds,
        () => {
          if (
            this.ready &&
            (!this._deps.tabManager || this._deps.tabManager.active) &&
            // @ts-expect-error
            this._deps.activityMatcher.ready
          ) {
            // @ts-expect-error
            this._deps.activityMatcher.triggerMatch();
          }
        },
      );
    }

    this._deps.callMonitor &&
      watch(
        this,
        () => this._deps.callMonitor.calls,
        (newMonitorCalls, oldMonitorCalls) => {
          if (!this.ready) return;
          const endedCalls = (oldMonitorCalls || []).filter(
            (call) =>
              !newMonitorCalls.find(
                (currentCall) =>
                  call.telephonySessionId === currentCall.telephonySessionId,
              ) &&
              // if the call's callLog has been fetch, skip
              !this._deps.callLog.calls.find(
                (currentCall) =>
                  call.telephonySessionId === currentCall.telephonySessionId,
              ) &&
              // if delete all during active call
              !this.markedList.find((currentCall) => {
                const flag =
                  call.telephonySessionId === currentCall.telephonySessionId;
                return flag;
              }),
          );
          if (endedCalls.length) {
            this._addEndedCalls(endedCalls);
          }
        },
      );

    watch(
      this,
      // use watch multiple, because this.ready is async, can't become true in time, so need watch this.ready, too
      () => [this._deps.callLog.calls, this.ready],
      ([currentCalls = [], ready]) => {
        if (!ready) return;
        const ids: Record<string, boolean> = {};
        // @ts-expect-error
        currentCalls.forEach((call) => {
          ids[call.telephonySessionId] = true;
        });
        const shouldRemovedCalls = this.endedCalls.filter(
          // @ts-expect-error
          (call) => ids[call.telephonySessionId],
        );
        if (shouldRemovedCalls.length) {
          this.removeEndedCalls(shouldRemovedCalls);
        }
      },
      {
        multiple: true,
      },
    );
  }

  override onReset() {
    this.setSearchInput('');
    this.cleanEndedCalls();
  }

  _addEndedCalls(endedCalls: Call[]) {
    endedCalls.forEach((call) => {
      // TODO: refactor with immutable data update
      call.result = 'Disconnected';
      call.isRecording = false;
      call.warmTransferInfo = undefined;
    });
    this.setEndedCalls(endedCalls, Date.now());
    this._deps.callLog.sync();
  }

  // TODO: move to UI module
  // for track click to sms in call history
  @proxify
  @track(trackEvents.clickToSMSCallHistory)
  async onClickToSMS() {}

  // TODO: move to UI module
  // for track click to call in call history
  @proxify
  @track((that: CallHistory) => [
    (that.parentModule as any).callingSettings?.callingMode ===
    callingModes.ringout
      ? trackEvents.clickToDialCallHistoryWithRingOut
      : trackEvents.clickToDialCallHistory,
  ])
  async onClickToCall() {}

  @proxify
  async updateSearchInput(input: string) {
    this.setSearchInput(input);
  }

  @computed((that: CallHistory) => [
    that._deps.callLog.calls,
    that._deps.accountInfo.countryCode,
  ])
  get normalizedCalls(): ActiveCall[] {
    return this._deps.callLog.calls
      .map((call) => {
        const callFrom = {
          ...call.from,
        };
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = normalizeNumber({
            phoneNumber: callFrom.phoneNumber,
            countryCode: this._deps.accountInfo.countryCode,
            maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          });
        }
        const callTo = {
          ...call.to,
        };
        if (callTo.phoneNumber) {
          callTo.phoneNumber = normalizeNumber({
            phoneNumber: callTo.phoneNumber,
            countryCode: this._deps.accountInfo.countryCode,
            maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          });
        }
        return {
          ...call,
          from: callFrom,
          to: callTo,
        };
      })
      .sort(sortByStartTime);
  }

  get enableFullPhoneNumberMatch() {
    return this._deps.callHistoryOptions?.enableFullPhoneNumberMatch ?? false;
  }

  /**
   * Allow sub class to have different find matches logic.
   * @param contactMapping
   * @param call
   * @returns
   */
  findMatches(contactMapping: Record<string, Entity[]>, call: Call) {
    const pickNumber = this.enableFullPhoneNumberMatch
      ? pickFullPhoneNumber
      : pickPhoneOrExtensionNumber;

    const fromNumber =
      // @ts-expect-error
      call.from && pickNumber(call.from.phoneNumber, call.from.extensionNumber);
    const toNumber =
      // @ts-expect-error
      call.to && pickNumber(call.to.phoneNumber, call.to.extensionNumber);

    const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
    const toMatches = (toNumber && contactMapping[toNumber]) || [];
    return {
      fromMatches,
      toMatches,
    };
  }

  @computed((that: CallHistory) => [
    that.normalizedCalls,
    that.endedCalls,
    that._deps.contactMatcher?.dataMapping,
    that._deps.activityMatcher?.dataMapping,
    that._deps.callMonitor?.callMatched,
  ])
  get calls(): HistoryCall[] {
    const contactMapping = this._deps.contactMatcher?.dataMapping ?? {};
    const activityMapping = this._deps.activityMatcher?.dataMapping ?? {};
    const callMatched = this._deps.callMonitor?.callMatched ?? {};
    const telephonySessionIds: Record<string, boolean> = {};
    const calls = this.normalizedCalls.map((call) => {
      // @ts-expect-error
      telephonySessionIds[call.telephonySessionId] = true;
      // @ts-expect-error
      const fromName = call.from.name || call.from.phoneNumber;
      const toName = call.to.name || call.to.phoneNumber;
      // @ts-expect-error
      const { fromMatches, toMatches } = this.findMatches(contactMapping, call);
      // @ts-expect-error
      const activityMatches = activityMapping[call.sessionId] || [];
      // @ts-expect-error
      const matched = callMatched[call.sessionId];
      return {
        ...call,
        fromName,
        toName,
        fromMatches,
        toMatches,
        activityMatches,
        toNumberEntity: matched,
      };
    });
    const filteredEndedCalls = this.endedCalls
      // @ts-expect-error
      .filter((call) => !telephonySessionIds[call.telephonySessionId])
      .map((call) => {
        const activityMatches = activityMapping[call.sessionId] || [];
        const fromNumber =
          call.from && (call.from.phoneNumber || call.from.extensionNumber);
        const toNumber =
          call.to && (call.to.phoneNumber || call.to.extensionNumber);
        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];
        return {
          ...call,
          activityMatches,
          fromMatches,
          toMatches,
        };
      });
    return [...filteredEndedCalls, ...calls].sort(sortByStartTime);
  }

  @proxify
  async debouncedSearch(...args: any[]) {
    this._debouncedSearch.call(this, ...args);
  }

  @proxify
  async callsSearch() {
    if (this.searchInput === '') {
      return;
    }
    const calls = this.calls;
    const searchInput = this.searchInput;
    const effectSearchStr = searchInput.toLowerCase().trim();
    const data = calls
      .filter((call) => {
        // @ts-expect-error
        const { phoneNumber, matches } = getPhoneNumberMatches(call);
        // @ts-expect-error
        const matchesMatched = matches.some((entities) => {
          if (!entities || !entities.id) return false;
          if (
            entities.name &&
            entities.name.toLowerCase().indexOf(effectSearchStr) > -1
          )
            return true;
          if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1)
            return true;
          return false;
        });

        if (matchesMatched) {
          return true;
        }
        if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
          return true;
        }
        return false;
      })
      .sort(sortByStartTime);

    this.filterSuccess(data);
  }

  @computed((that: CallHistory) => [
    that.filterCalls,
    that._deps.activityMatcher?.dataMapping,
  ])
  get latestCalls() {
    if (this._deps.activityMatcher?.dataMapping) {
      const newCalls = this.filterCalls.map((call) => ({
        ...call,
        activityMatches:
          // @ts-expect-error
          this._deps.activityMatcher?.dataMapping[call.sessionId] || [],
      }));
      return newCalls;
    }
    return this.filterCalls;
  }

  @computed((that: CallHistory) => [that.normalizedCalls, that.endedCalls])
  get uniqueNumbers() {
    const output: string[] = [];
    const numberMap: Record<string, boolean> = {};
    this.normalizedCalls.forEach(
      // @ts-expect-error
      addNumbersFromCall(output, numberMap, this.enableFullPhoneNumberMatch),
    );
    this.endedCalls.forEach(
      addNumbersFromCall(output, numberMap, this.enableFullPhoneNumberMatch),
    );
    return output;
  }

  @computed((that: CallHistory) => [that._deps.callLog.calls, that.endedCalls])
  get sessionIds() {
    const sessionIds: Record<string, boolean> = {};
    return this._deps.callLog.calls
      .map((call) => {
        // @ts-expect-error
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      })
      .concat(
        this.endedCalls
          .filter((call) => !sessionIds[call.sessionId])
          .map((call) => call.sessionId),
      );
  }

  @computed((that: CallHistory) => [
    that.searchInput,
    that.calls,
    that.filteredCalls,
  ])
  get filterCalls() {
    if (this.searchInput === '') {
      return this.calls;
    }
    return this.filteredCalls;
  }

  // TODO: remove recentlyEndedCalls getter, instead of `endedCalls`.
  /**
   * !!Please use `endedCalls` instead of it.
   * @deprecated
   */
  get recentlyEndedCalls() {
    return this.endedCalls;
  }
}
