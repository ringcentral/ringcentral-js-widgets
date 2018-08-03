import { createSelector } from 'reselect';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import moduleStatuses from '../../enums/moduleStatuses';
import { sortByStartTime, getPhoneNumberMatches } from '../../lib/callLogHelpers';
import actionTypes from './actionTypes';
import getCallHistoryReducer, { getEndedCallsReducer } from './getCallHistoryReducer';
import ensureExist from '../../lib/ensureExist';
import normalizeNumber from '../../lib/normalizeNumber';
import getter from '../../lib/getter';
import proxify from '../../lib/proxy/proxify';
import debounce from '../../lib/debounce';

// const DEBOUNDCE_THRESHOLD = 800;
// const DEBOUNDCE_IMMEDIATE = false;

/**
 * @class
 * @description Call history managing module
 */
@Module({
  deps: [
    'AccountInfo',
    'CallLog',
    'CallMonitor',
    'Locale',
    { dep: 'Storage', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'CallHistoryOptions', optional: true },
    { dep: 'TabManager', optional: true },
  ]
})
export default class CallHistory extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {CallLog} params.callLog - callLog module instance
   * @param {CallMonitor} params.callMonitor - callMonitor module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   */
  constructor({
    accountInfo,
    callLog,
    callMonitor,
    locale,
    storage,
    activityMatcher,
    contactMatcher,
    tabManager,
    // debThreshold,
    // debImmediate,
    ...options
  }) {
    super({
      ...options,
    });
    this._accountInfo = this:: ensureExist(accountInfo, 'accountInfo');
    this._callLog = this:: ensureExist(callLog, 'callLog');
    this._storage = storage;
    this._activityMatcher = activityMatcher;
    this._contactMatcher = contactMatcher;
    this._callMonitor = callMonitor;
    this._tabManager = tabManager;
    this._locale = locale;
    this._debouncedSearch = debounce(this.callsSearch, 230, false)

    if (this._storage) {
      this._reducer = getCallHistoryReducer(this.actionTypes);
      this._endedCallsStorageKey = 'callHistoryEndedCalls';
      this._storage.registerReducer({
        key: this._endedCallsStorageKey,
        reducer: getEndedCallsReducer(this.actionTypes),
      });
    } else {
      this._reducer = getCallHistoryReducer(this.actionTypes, {
        endedCalls: getEndedCallsReducer(this.actionTypes),
      });
    }
    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => (
          (!this._callMonitor || this._callMonitor.ready) &&
          (!this._tabManager || this._tabManager.ready) &&
          this._callLog.ready &&
          this._accountInfo.ready
        ),
      });
    }
    if (this._activityMatcher) {
      this._activityMatcher.addQuerySource({
        getQueriesFn: () => this.sessionIds,
        readyCheckFn: () => (
          (!this._callMonitor || this._callMonitor.ready) &&
          (!this._tabManager || this._tabManager.ready) &&
          this._callLog.ready
        ),
      });
    }
  }

  get _actionTypes() {
    return actionTypes;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this._initModuleStatus();
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (
      this.ready
    ) {
      this._processCallHistory();
    }
  }

  _shouldInit() {
    return (
      this._callLog.ready &&
      (!this._callMonitor || this._callMonitor.ready) &&
      this._accountInfo.ready &&
      (!this._contactMatcher || this._contactMatcher.ready) &&
      (!this._activityMatcher || this._activityMatcher.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._callLog.ready ||
        (this._callMonitor && !this._callMonitor.ready) ||
        !this._accountInfo.ready ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        (this._activityMatcher && !this._activityMatcher.ready)
      ) &&
      this.ready
    );
  }

  _shouldTriggerContactMatch(uniqueNumbers) {
    if (
      this._lastProcessedNumbers !== uniqueNumbers &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._lastProcessedNumbers = uniqueNumbers;
      if (this._contactMatcher && this._contactMatcher.ready) {
        return true;
      }
    }
    return false;
  }

  _shouldTriggerActivityMatch(sessionIds) {
    if (
      this._lastProcessedIds !== sessionIds &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._lastProcessedIds = sessionIds;
      if (this._activityMatcher && this._activityMatcher.ready) {
        return true;
      }
    }
    return false;
  }

  _getEndedCalls() {
    if (this._callMonitor) {
      const monitorCalls = this._callMonitor.calls;
      const callLogCalls = this._callLog.calls;
      if (this._lastProcessedMonitorCalls !== monitorCalls) {
        const endedCalls = (this._lastProcessedMonitorCalls || [])
          .filter(call => (
            !monitorCalls.find(currentCall => call.sessionId === currentCall.sessionId) &&
            // if the call's callLog has been fetch, skip
            !callLogCalls.find(currentCall => call.sessionId === currentCall.sessionId)
          ));
        this._lastProcessedMonitorCalls = monitorCalls;
        return endedCalls;
      }
    }
    return null;
  }

  _shouldRemoveEndedCalls() {
    const currentCalls = this._callLog.calls;
    if (currentCalls !== this._lastProcessedCalls) {
      this._lastProcessedCalls = currentCalls;
      const ids = {};
      currentCalls.forEach((call) => {
        ids[call.sessionId] = true;
      });
      return this.recentlyEndedCalls.filter(call => ids[call.sessionId]);
    }
    return null;
  }

  _processCallHistory() {
    const uniqueNumbers = this.uniqueNumbers;
    if (this._shouldTriggerContactMatch(uniqueNumbers)) {
      this._contactMatcher.triggerMatch();
    }
    const sessionIds = this.sessionIds;
    if (this._shouldTriggerActivityMatch(sessionIds)) {
      this._activityMatcher.triggerMatch();
    }

    const endedCalls = this._getEndedCalls();
    if (endedCalls && endedCalls.length) {
      this._addEndedCalls(endedCalls);
    }

    const shouldRemove = this._shouldRemoveEndedCalls();
    if (shouldRemove && shouldRemove.length) {
      this._removeEndedCalls(shouldRemove);
    }
  }

  _initModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
    this._lastProcessedCalls = null;
    this._lastProcessedIds = null;
    this._lastProcessedMonitorCalls = null;
    this._lastProcessedNumbers = null;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  _addEndedCalls(endedCalls) {
    endedCalls.map((call) => {
      call.result = 'Disconnected';
      return call;
    });
    this.store.dispatch({
      type: this.actionTypes.addEndedCalls,
      endedCalls,
      timestamp: Date.now(),
    });
    this._callLog.sync();
  }

  _removeEndedCalls(endedCalls) {
    this.store.dispatch({
      type: this.actionTypes.removeEndedCalls,
      endedCalls,
    });
  }

  // for track click to sms in call history
  @proxify
  onClickToSMS() {
    this.store.dispatch({
      type: this.actionTypes.clickToSMS
    });
  }
  // for track click to call in call history
  @proxify
  onClickToCall() {
    this.store.dispatch({
      type: this.actionTypes.clickToCall,
    });
  }

  @proxify
  updateSearchInput(input) {
    this.store.dispatch({
      type: this.actionTypes.updateSearchInput,
      input,
    });
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  @getter
  normalizedCalls = createSelector(
    () => this._callLog.calls,
    () => this._accountInfo.countryCode,
    (calls, countryCode) => (
      calls.map((call) => {
        const callFrom = {
          ...call.from,
        };
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = normalizeNumber({
            phoneNumber: callFrom.phoneNumber,
            countryCode,
          });
        }
        const callTo = {
          ...call.to,
        };
        if (callTo.phoneNumber) {
          callTo.phoneNumber = normalizeNumber({
            phoneNumber: callTo.phoneNumber,
            countryCode,
          });
        }
        return {
          ...call,
          from: callFrom,
          to: callTo,
        };
      }).sort(sortByStartTime)
    ),
  )

  @getter
  calls = createSelector(
    () => this.normalizedCalls,
    () => this.recentlyEndedCalls,
    () => (this._contactMatcher && this._contactMatcher.dataMapping),
    () => (this._activityMatcher && this._activityMatcher.dataMapping),
    () => (this._callMonitor && this._callMonitor.callMatched),
    (
      normalizedCalls,
      endedCalls,
      contactMapping = {},
      activityMapping = {},
      callMatched = {}
    ) => {
      const sessionIds = {};
      const calls = normalizedCalls.map((call) => {
        sessionIds[call.sessionId] = true;
        const fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        const toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];
        const activityMatches = (activityMapping[call.sessionId]) || [];
        const matched = callMatched[call.sessionId];
        return {
          ...call,
          fromMatches,
          toMatches,
          activityMatches,
          toNumberEntity: matched,
        };
      });
      const filteredEndedCalls = endedCalls
        .filter(call => !sessionIds[call.sessionId])
        .map((call) => {
          const activityMatches = (activityMapping[call.sessionId]) || [];
          const fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
          const toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
          const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
          const toMatches = (toNumber && contactMapping[toNumber]) || [];
          return {
            ...call,
            activityMatches,
            fromMatches,
            toMatches,
          };
        });
      return [
        ...filteredEndedCalls,
        ...calls
      ].sort(sortByStartTime);
    }
  )

  @proxify
  debouncedSearch(...args) {
    this._debouncedSearch.apply( this, args);
  }

  @proxify
  callsSearch() {
    if (this.searchInput === '') {
      return;
    }
    const calls = this.calls;
    const searchInput = this.searchInput;
    let data = [];
    const effectSearchStr = searchInput.toLowerCase().trim();

    data = calls.filter((call) => {
      const { phoneNumber, matches } = getPhoneNumberMatches(call);
      const matchesMatched = matches.some((entities) => {
        if (!entities || !entities.id) return false;
        if (entities.name && entities.name.toLowerCase().indexOf(effectSearchStr) > -1) return true;
        if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1) return true;
        return false;
      });

      if (matchesMatched) {
        return true;
      }
      if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
        return true;
      }
      return false;
    }).sort(sortByStartTime);

    this.store.dispatch({
      type: this.actionTypes.filterSuccess,
      data
    });
  }

  @getter
  uniqueNumbers = createSelector(
    () => this.normalizedCalls,
    () => this.recentlyEndedCalls,
    (normalizedCalls, endedCalls) => {
      const output = [];
      const numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      function addNumbersFromCall(call) {
        if (call.from && call.from.phoneNumber) {
          addIfNotExist(call.from.phoneNumber);
        } else if (call.from && call.from.extensionNumber) {
          addIfNotExist(call.from.extensionNumber);
        }
        if (call.to && call.to.phoneNumber) {
          addIfNotExist(call.to.phoneNumber);
        } else if (call.to && call.to.extensionNumber) {
          addIfNotExist(call.to.extensionNumber);
        }
      }
      normalizedCalls.forEach(addNumbersFromCall);
      endedCalls.forEach(addNumbersFromCall);
      return output;
    },
  )

  @getter
  sessionIds = createSelector(
    () => this._callLog.calls,
    () => this.recentlyEndedCalls,
    (calls, endedCalls) => {
      const sessionIds = {};
      return calls.map((call) => {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(
        endedCalls
          .filter(call => !sessionIds[call.sessionId])
          .map(call => call.sessionId)
      );
    },
  )

  get filterCalls() {
    if (this.searchInput === '') {
      return this.calls;
    }
    return this.state.filterCalls;
  }

  get searchInput() {
    return this.state.searchInput;
  }

  get recentlyEndedCalls() {
    if (this._storage) {
      return this._storage.getItem(this._endedCallsStorageKey);
    }
    return this.state.endedCalls;
  }
}
