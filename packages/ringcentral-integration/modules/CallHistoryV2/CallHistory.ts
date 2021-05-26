import { forEach, findIndex } from 'ramda';
import {
  RcModuleV2,
  state,
  action,
  computed,
  storage,
  watch,
  track,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import {
  sortByStartTime,
  getPhoneNumberMatches,
} from '../../lib/callLogHelpers';
import normalizeNumber from '../../lib/normalizeNumber';
import proxify from '../../lib/proxy/proxify';
import debounce from '../../lib/debounce';
import { Deps, EndedCall, HistoryCall } from './CallHistory.interface';
import { addNumbersFromCall } from './callHistoryHelper';
import { Call } from '../../interfaces/Call.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { trackEvents } from '../Analytics';
import { callingModes } from '../CallingSettingsV2';

const DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1 day

@Module({
  name: 'CallHistory',
  deps: [
    'AccountInfo',
    'CallLog',
    'CallMonitor',
    'Storage',
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'CallHistoryOptions', optional: true },
  ],
})
export class CallHistory extends RcModuleV2<Deps> {
  private _debouncedSearch = debounce(this.callsSearch, 230, false);

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'CallHistory',
      enableCache: deps.callHistoryOptions?.enableCache ?? true,
    });
    this._deps.contactMatcher?.addQuerySource({
      getQueriesFn: () => this.uniqueNumbers,
      readyCheckFn: () =>
        this._deps.callMonitor.ready &&
        (!this._deps.tabManager || this._deps.tabManager.ready) &&
        this._deps.callLog.ready &&
        this._deps.accountInfo.ready,
    });
    this._deps.activityMatcher?.addQuerySource({
      getQueriesFn: () => this.sessionIds,
      readyCheckFn: () =>
        this._deps.callMonitor.ready &&
        (!this._deps.tabManager || this._deps.tabManager.ready) &&
        this._deps.callLog.ready,
    });
  }

  @storage
  @state
  endedCalls: EndedCall[] = [];

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
  setEndedCalls(endedCalls: EndedCall[], timestamp: number) {
    forEach((call) => {
      const callWithDuration = {
        ...call,
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
  removeEndedCalls(endedCalls: EndedCall[]) {
    this.endedCalls = this.endedCalls.filter(
      (call) =>
        !(
          endedCalls.find(
            ({ telephonySessionId }) =>
              telephonySessionId === call.telephonySessionId,
          ) ||
          // clean current overdue ended call (default clean time: 1day).
          Date.now() - call.startTime > DEFAULT_CLEAN_TIME
        ),
    );
  }

  onInitOnce() {
    if (this._deps.contactMatcher) {
      watch(
        this,
        () => this.uniqueNumbers,
        () => {
          if (
            this.ready &&
            (!this._deps.tabManager || this._deps.tabManager.active) &&
            this._deps.contactMatcher.ready
          ) {
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
            this._deps.activityMatcher.ready
          ) {
            this._deps.activityMatcher.triggerMatch();
          }
        },
      );
    }

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
            ),
        );
        if (endedCalls.length) {
          this._addEndedCalls(endedCalls);
        }
      },
    );

    watch(
      this,
      () => this._deps.callLog.calls,
      (currentCalls = []) => {
        if (!this.ready) return;
        const ids: Record<string, boolean> = {};
        currentCalls.forEach((call) => {
          ids[call.telephonySessionId] = true;
        });
        const shouldRemovedCalls = this.endedCalls.filter(
          (call) => ids[call.telephonySessionId],
        );
        if (shouldRemovedCalls.length) {
          this.removeEndedCalls(shouldRemovedCalls);
        }
      },
    );
  }

  onReset() {
    this.setSearchInput('');
  }

  _addEndedCalls(endedCalls: Call[]) {
    const disconnectedCalls: EndedCall[] = endedCalls.map((call) => ({
      ...call,
      result: 'Disconnected',
    }));
    this.setEndedCalls(disconnectedCalls, Date.now());
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
          });
        }
        const callTo = {
          ...call.to,
        };
        if (callTo.phoneNumber) {
          callTo.phoneNumber = normalizeNumber({
            phoneNumber: callTo.phoneNumber,
            countryCode: this._deps.accountInfo.countryCode,
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
      telephonySessionIds[call.telephonySessionId] = true;
      const fromNumber =
        call.from && (call.from.phoneNumber || call.from.extensionNumber);
      const toNumber =
        call.to && (call.to.phoneNumber || call.to.extensionNumber);
      const fromName = call.from.name || call.from.phoneNumber;
      const toName = call.to.name || call.to.phoneNumber;
      const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
      const toMatches = (toNumber && contactMapping[toNumber]) || [];
      const activityMatches = activityMapping[call.sessionId] || [];
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
        const { phoneNumber, matches } = getPhoneNumberMatches(call);
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
    this.normalizedCalls.forEach(addNumbersFromCall(output, numberMap));
    this.endedCalls.forEach(addNumbersFromCall(output, numberMap));
    return output;
  }

  @computed((that: CallHistory) => [that._deps.callLog.calls, that.endedCalls])
  get sessionIds() {
    const sessionIds: Record<string, boolean> = {};
    return this._deps.callLog.calls
      .map((call) => {
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
