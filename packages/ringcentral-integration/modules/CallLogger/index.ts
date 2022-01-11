import { reduce } from 'ramda';

import callLoggerTriggerTypes from '../../enums/callLoggerTriggerTypes';
import {
  isInbound,
  isRinging,
  removeDuplicateSelfCalls,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import LoggerBase from '../../lib/LoggerBase';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import actionTypes from './actionTypes';
import getDataReducer from './getDataReducer';

/**
 * @function
 * @description Identity function for calls.
 * @param {Object} call - call object
 * @return {String} sessionId
 */
export function callIdentityFunction(call) {
  return call.sessionId;
}

/**
 * @class
 * @description call logger module
 */
@Module({
  deps: [
    'Storage',
    { dep: 'ActivityMatcher', optional: true },
    'CallHistory',
    'CallMonitor',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'CallLoggerOptions', optional: true },
  ],
})
export default class CallLogger extends LoggerBase {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Storage} params.storage - storage module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {CallHistory} params.callHistory - callHistory module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   */
  constructor({
    storage,
    activityMatcher,
    callHistory,
    callMonitor,
    contactMatcher,
    tabManager,
    initialState,
    ...options
  }) {
    super({
      ...options,
      name: 'callLogger',
      actionTypes,
      getDataReducer,
      identityFunction: callIdentityFunction,
    });
    this._storage = ensureExist.call(this, storage, 'storage');
    this._callMonitor = ensureExist.call(this, callMonitor, 'callMonitor');
    this._contactMatcher = ensureExist.call(
      this,
      contactMatcher,
      'contactMatcher',
    );
    this._activityMatcher = ensureExist.call(
      this,
      activityMatcher,
      'activityMatcher',
    );
    this._callHistory = callHistory;
    this._tabManager = tabManager;
    this._storageKey = `${this._name}Data`;
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getDataReducer(this.actionTypes, initialState),
    });
    this._lastProcessedCalls = null;
    this._lastProcessedEndedCalls = null;
    this._customMatcherHooks = [];
  }

  _onReset() {
    this._lastProcessedCalls = null;
    this._lastProcessedEndedCalls = null;
  }

  _shouldInit() {
    return (
      this.pending &&
      this._callMonitor.ready &&
      (!this._callHistory || this._callHistory.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this._contactMatcher.ready &&
      this._activityMatcher.ready &&
      this._readyCheckFunction() &&
      this._storage.ready
    );
  }

  _shouldReset() {
    return (
      this.ready &&
      (!this._callMonitor.ready ||
        !this._callMonitor.ready ||
        (this._callHistory && !this._callHistory.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._contactMatcher.ready ||
        !this._activityMatcher.ready ||
        !this._readyCheckFunction() ||
        !this._storage.ready)
    );
  }

  @proxify
  async log({ call, ...options }) {
    return super.log({ item: call, ...options });
  }

  async _ensureActive() {
    const isActive =
      !this._tabManager || (await this._tabManager.checkIsMain());
    return isActive;
  }

  async _shouldLogNewCall(call) {
    const isActive = await this._ensureActive();
    return isActive && this.autoLog && (this.logOnRinging || !isRinging(call));
  }

  @proxify
  async logCall({ call, contact, ...options }) {
    const inbound = isInbound(call);
    const fromEntity = (inbound && contact) || null;
    const toEntity = (!inbound && contact) || null;
    await this.log({
      ...options,
      call: {
        ...call,
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? call.duration
          : Math.round((Date.now() - call.startTime) / 1000),
        result: call.result || call.telephonyStatus,
      },
      fromEntity,
      toEntity,
    });
  }

  async _autoLogCall({ call, fromEntity, toEntity, triggerType }) {
    if (!this.ready) {
      return;
    }
    await this.log({
      call: {
        ...call,
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? call.duration
          : Math.round((Date.now() - call.startTime) / 1000),
        result: call.result || call.telephonyStatus,
      },
      fromEntity,
      toEntity,
      triggerType,
    });
  }

  _activityMatcherCheck(sessionId) {
    return (
      !this._activityMatcher.dataMapping[sessionId] ||
      !this._activityMatcher.dataMapping[sessionId].length
    );
  }

  _customMatcherCheck(sessionId) {
    if (!this._customMatcherHooks.length) {
      return true;
    }
    return this._customMatcherHooks.some((hook) => hook(sessionId));
  }

  addCustomMatcherHook(hook) {
    this._customMatcherHooks.push(hook);
  }

  async _onNewCall(call, triggerType) {
    if (await this._shouldLogNewCall(call)) {
      // RCINT-3857 check activity in case instance was reloaded when call is still active
      await this._activityMatcher.triggerMatch();
      if (
        this._activityMatcherCheck(call.sessionId) &&
        this._customMatcherCheck(call.sessionId)
      ) {
        // is completely new, need entity information
        await this._contactMatcher.triggerMatch();

        const toNumberEntity = call.toNumberEntity || '';

        const fromMatches =
          (call.from &&
            call.from.phoneNumber &&
            this._contactMatcher.dataMapping[call.from.phoneNumber]) ||
          [];

        const toMatches =
          (call.to &&
            call.to.phoneNumber &&
            this._contactMatcher.dataMapping[call.to.phoneNumber]) ||
          [];

        const fromEntity =
          (fromMatches && fromMatches.length === 1 && fromMatches[0]) || null;

        let toEntity = null;
        if (toMatches && toMatches.length === 1) {
          /* eslint { "prefer-destructuring": 0 } */
          toEntity = toMatches[0];
        } else if (toMatches && toMatches.length > 1 && toNumberEntity !== '') {
          toEntity = toMatches.find((match) => toNumberEntity === match.id);
        }

        await this._autoLogCall({
          call,
          fromEntity,
          toEntity,
          triggerType,
        });
      } else {
        // only update call information if call has been logged
        await this._autoLogCall({
          call,
          triggerType,
        });
      }
    }
  }

  async _shouldLogUpdatedCall(call) {
    const isActive = await this._ensureActive();
    if (isActive && (this.logOnRinging || !isRinging(call))) {
      if (this.autoLog) return true;
      await this._activityMatcher.triggerMatch();
      const activityMatches =
        this._activityMatcher.dataMapping[call.sessionId] || [];
      return activityMatches.length > 0;
    }
    return false;
  }

  async _onCallUpdated(call, triggerType) {
    if (await this._shouldLogUpdatedCall(call)) {
      await this._autoLogCall({ call, triggerType });
    }
  }

  _processCalls() {
    if (this.ready) {
      if (this._lastProcessedCalls !== this._callMonitor.calls) {
        const oldCalls =
          (this._lastProcessedCalls && this._lastProcessedCalls.slice()) || [];
        this._lastProcessedCalls = this._callMonitor.calls;

        removeDuplicateSelfCalls(this._lastProcessedCalls).forEach((call) => {
          const oldCallIndex = oldCalls.findIndex(
            (item) => item.sessionId === call.sessionId,
          );
          if (oldCallIndex === -1) {
            this._onNewCall(call, callLoggerTriggerTypes.presenceUpdate);
          } else {
            const oldCall = oldCalls[oldCallIndex];
            oldCalls.splice(oldCallIndex, 1);
            if (call.telephonyStatus !== oldCall.telephonyStatus) {
              this._onCallUpdated(
                {
                  ...call,
                  isTransferredCall: !!this.transferredCallsMap[call.sessionId],
                  transferredMiddleNumber: this.transferredCallsMap[
                    call.sessionId
                  ]
                    ? this.transferredCallsMap[call.sessionId]
                        .transferredMiddleNumber
                    : null,
                },
                callLoggerTriggerTypes.presenceUpdate,
              );
            }
            if (
              (call.from && call.from.phoneNumber) !==
              (oldCall.from && oldCall.from.phoneNumber)
            ) {
              this.store.dispatch({
                type: this.actionTypes.addTransferredCall,
                sessionId: call.sessionId,
                transferredMiddleNumber:
                  oldCall.from && oldCall.from.phoneNumber,
              });
              this._onCallUpdated(
                {
                  ...call,
                  isTransferredCall: true,
                  transferredMiddleNumber:
                    oldCall.from && oldCall.from.phoneNumber,
                  phoneNumberUpdated: true,
                },
                callLoggerTriggerTypes.presenceUpdate,
              );
            }
          }
        });
        oldCalls.forEach((call) => {
          this._onCallUpdated(
            {
              ...call,
              isTransferredCall: !!this.transferredCallsMap[call.sessionId],
              transferredMiddleNumber: this.transferredCallsMap[call.sessionId]
                ? this.transferredCallsMap[call.sessionId]
                    .transferredMiddleNumber
                : null,
            },
            callLoggerTriggerTypes.presenceUpdate,
          );
        });
      }
      if (
        this._callHistory &&
        this._lastProcessedEndedCalls !== this._callHistory.recentlyEndedCalls
      ) {
        const oldCalls =
          (this._lastProcessedEndedCalls &&
            this._lastProcessedEndedCalls.slice()) ||
          [];
        this._lastProcessedEndedCalls = this._callHistory.recentlyEndedCalls;
        const currentSessions = {};
        this._lastProcessedEndedCalls.forEach((call) => {
          currentSessions[call.sessionId] = true;
        });
        oldCalls.forEach((call) => {
          if (!currentSessions[call.sessionId]) {
            // call log updated
            const callInfo = this._callHistory.calls.find(
              (item) => item.sessionId === call.sessionId,
            );
            if (callInfo) {
              this._onCallUpdated(
                {
                  ...callInfo,
                  isTransferredCall:
                    !!this.transferredCallsMap[callInfo.sessionId],
                  transferredMiddleNumber: this.transferredCallsMap[
                    call.sessionId
                  ]
                    ? this.transferredCallsMap[call.sessionId]
                        .transferredMiddleNumber
                    : null,
                },
                callLoggerTriggerTypes.callLogSync,
              );
            }
          }
        });
      }
    }
  }

  async _onStateChange() {
    await super._onStateChange();
    this._processCalls();
  }

  @proxify
  async setAutoLog(autoLog) {
    if (this.ready && autoLog !== this.autoLog) {
      this.store.dispatch({
        type: this.actionTypes.setAutoLog,
        autoLog,
      });
    }
  }

  get autoLog() {
    return this._storage.getItem(this._storageKey).autoLog;
  }

  @proxify
  async setLogOnRinging(logOnRinging) {
    if (this.ready && logOnRinging !== this.logOnRinging) {
      this.store.dispatch({
        type: this.actionTypes.setLogOnRinging,
        logOnRinging,
      });
    }
  }

  @selector
  transferredCallsMap = [
    () => this.transferredCallsArr,
    (transferredCallsArr) =>
      reduce(
        (mapping, matcher) => Object.assign({}, mapping, matcher),
        {},
        transferredCallsArr,
      ),
  ];

  get logOnRinging() {
    return this._storage.getItem(this._storageKey).logOnRinging;
  }

  get transferredCallsArr() {
    return this._storage.getItem(this._storageKey).transferredCallsMap;
  }
}
