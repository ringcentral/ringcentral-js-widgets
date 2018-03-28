import { createSelector } from 'reselect';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import moduleStatuses from '../../enums/moduleStatuses';
import {
  sortByStartTime,
} from '../../lib/callLogHelpers';
import actionTypes from './actionTypes';
import getCallHistoryReducer from './getCallHistoryReducer';
import ensureExist from '../../lib/ensureExist';
import normalizeNumber from '../../lib/normalizeNumber';
import getter from '../../lib/getter';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Call history managing module
 */
@Module({
  deps: [
    'AccountInfo',
    'CallLog',
    'CallMonitor',
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'CallHistoryOptions', optional: true }
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
    activityMatcher,
    contactMatcher,
    ...options
  }) {
    super({
      ...options,
    });
    this._accountInfo = this::ensureExist(accountInfo, 'accountInfo');
    this._callLog = this::ensureExist(callLog, 'callLog');
    this._activityMatcher = activityMatcher;
    this._contactMatcher = contactMatcher;
    this._callMonitor = callMonitor;
    this._reducer = getCallHistoryReducer(this.actionTypes);

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => (
          (!this._callMonitor || this._callMonitor.ready) &&
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
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._callLog.ready ||
        (this._callMonitor && !this._callMonitor.ready) ||
        !this._accountInfo.ready ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._activityMatcher && !this._activityMatcher.ready)
      ) &&
      this.ready
    );
  }

  _shouldTriggerContactMatch(uniqueNumbers) {
    if (this._lastProcessedNumbers !== uniqueNumbers) {
      this._lastProcessedNumbers = uniqueNumbers;
      if (this._contactMatcher && this._contactMatcher.ready) {
        return true;
      }
    }
    return false;
  }

  _shouldTriggerActivityMatch(sessionIds) {
    if (this._lastProcessedIds !== sessionIds) {
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
    () => this.state.endedCalls,
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
      return [
        ...endedCalls.filter(call => !sessionIds[call.sessionId]).sort(sortByStartTime),
        ...calls
      ];
    }
  )

  @getter
  uniqueNumbers = createSelector(
    () => this.normalizedCalls,
    () => this.state.endedCalls,
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
    () => this.state.endedCalls,
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

  get recentlyEndedCalls() {
    return this.state.endedCalls;
  }
}
