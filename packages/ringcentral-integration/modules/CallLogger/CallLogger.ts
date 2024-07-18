import {
  action,
  computed,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import { reduce } from 'ramda';

import type { CallLoggerTriggerType } from '../../enums/callLoggerTriggerTypes';
import { callLoggerTriggerTypes } from '../../enums/callLoggerTriggerTypes';
import type { Call } from '../../interfaces/Call.interface';
import type { ActiveCall } from '../../interfaces/Presence.model';
import { LoggerBase } from '../../lib/LoggerBase';
import {
  isInbound,
  isRinging,
  removeDuplicateSelfCalls,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import type { HistoryCall } from '../CallHistory';
import type { CallLogRecord } from '../CallLog';

import type {
  AutoLogCallOptions,
  Deps,
  Hook,
  LogCallOptions,
  LogOptions,
  TransferredCall,
  UpdatedCall,
  UpdatedCallMap,
} from './CallLogger.interface';
import { callIdentityFunction } from './callLoggerHelper';

const DEFAULT_OPACITY = 20;

@Module({
  name: 'CallLogger',
  deps: [
    'Storage',
    'CallHistory',
    'CallMonitor',
    'CallLoggerOptions',
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'TabManager', optional: true },
  ],
})
export class CallLogger<T extends Deps = Deps> extends LoggerBase<T> {
  protected _customMatcherHooks: Hook[] = [];

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  protected _identityFunction = callIdentityFunction;

  _logFunction = this._deps.callLoggerOptions.logFunction;

  _readyCheckFunction = this._deps.callLoggerOptions.readyCheckFunction;

  constructor(deps: T) {
    super(deps, {
      enableCache: true,
      storageKey: 'CallLogger',
    });
    if (typeof this._deps.callLoggerOptions.autoLog !== 'undefined') {
      this.autoLog = this._deps.callLoggerOptions.autoLog;
    }
  }

  @storage
  @state
  autoLog = true;

  @storage
  @state
  logOnRinging = true;

  @storage
  @state
  transferredCallsList: Record<string, TransferredCall>[] = [];

  @action
  _setLogOnRinging(logOnRinging: boolean) {
    this.logOnRinging = !!logOnRinging;
  }

  @action
  _setAutoLog(autoLog: boolean) {
    this.autoLog = !!autoLog;
  }

  @action
  _addTransferredCall(sessionId: string, transferredMiddleNumber: string) {
    this.transferredCallsList = [
      ...this.transferredCallsList.slice(
        this.transferredCallsList.length >= DEFAULT_OPACITY ? 1 : 0,
        DEFAULT_OPACITY,
      ),
      { [sessionId]: { transferredMiddleNumber } },
    ];
  }

  @proxify
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  async log<T>({ call, ...options }: LogOptions<T>) {
    return super.log({ item: call, ...options });
  }

  async _ensureActive() {
    const isActive =
      !this._deps.tabManager || (await this._deps.tabManager.checkIsMain());
    return isActive;
  }

  @proxify
  async _shouldLogNewCall(call: Call) {
    const isActive = await this._ensureActive();
    return isActive && this.autoLog && (this.logOnRinging || !isRinging(call));
  }

  @proxify
  async logCall<T>({ call, contact, ...options }: LogCallOptions<T>) {
    const inbound = isInbound(call);
    const fromEntity = (inbound && contact) || null;
    const toEntity = (!inbound && contact) || null;
    // @ts-expect-error TS(2345): Argument of type 'Omit<LogCallOptions<T>, "call" |... Remove this comment to see the full error message
    await this.log({
      ...options,
      call: {
        ...call,
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? (call as CallLogRecord).duration
          : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            Math.round((Date.now() - call.startTime) / 1000),
        result:
          (call as CallLogRecord).result || (call as Call).telephonyStatus,
      },
      fromEntity,
      toEntity,
    });
  }

  @proxify
  async _autoLogCall({
    call,
    fromEntity,
    toEntity,
    triggerType,
  }: AutoLogCallOptions) {
    if (!this.ready) {
      return;
    }
    await this.log({
      call: {
        ...call,
        // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? (call as CallLogRecord).duration
          : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            Math.round((Date.now() - call.startTime) / 1000),
        result:
          (call as CallLogRecord).result || (call as Call).telephonyStatus,
      },
      fromEntity,
      toEntity,
      triggerType,
    });
  }

  _activityMatcherCheck(sessionId: string) {
    return (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !this._deps.activityMatcher.dataMapping[sessionId] ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !this._deps.activityMatcher.dataMapping[sessionId].length
    );
  }

  _customMatcherCheck(sessionId: string) {
    if (!this._customMatcherHooks.length) {
      return true;
    }
    return this._customMatcherHooks.some((hook) => hook(sessionId));
  }

  addCustomMatcherHook(hook: Hook) {
    this._customMatcherHooks.push(hook);
  }

  @proxify
  async _onNewCall(call: Call, triggerType: CallLoggerTriggerType) {
    if (await this._shouldLogNewCall(call)) {
      // RCINT-3857 check activity in case instance was reloaded when call is still active
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      await this._deps.activityMatcher.triggerMatch();
      if (
        this._activityMatcherCheck(call.sessionId) &&
        this._customMatcherCheck(call.sessionId)
      ) {
        // is completely new, need entity information
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        await this._deps.contactMatcher.triggerMatch();

        const toNumberEntity = call.toNumberEntity || '';

        const fromMatches =
          (call.from &&
            call.from.phoneNumber &&
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.contactMatcher.dataMapping[call.from.phoneNumber]) ||
          [];

        const toMatches =
          (call.to &&
            call.to.phoneNumber &&
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.contactMatcher.dataMapping[call.to.phoneNumber]) ||
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
          // @ts-expect-error TS(2322): Type 'Entity | null' is not assignable to type 'En... Remove this comment to see the full error message
          fromEntity,
          // @ts-expect-error TS(2322): Type 'Entity | null | undefined' is not assignable... Remove this comment to see the full error message
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

  @proxify
  async _shouldLogUpdatedCall(call: HistoryCall | ActiveCall) {
    const isActive = await this._ensureActive();
    // @ts-expect-error TS(2345): Argument of type 'ActiveCall | HistoryCall' is not... Remove this comment to see the full error message
    if (isActive && (this.logOnRinging || !isRinging(call))) {
      if (this.autoLog) return true;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      await this._deps.activityMatcher.triggerMatch();
      const activityMatches =
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.activityMatcher.dataMapping[call.sessionId] || [];
      return activityMatches.length > 0;
    }
    return false;
  }

  @proxify
  async _onCallUpdated<T extends keyof UpdatedCallMap>(
    call: UpdatedCall<T>,
    triggerType: T,
  ) {
    if (await this._shouldLogUpdatedCall(call)) {
      await this._autoLogCall({ call, triggerType });
    }
  }

  @proxify
  async _onCallAnswered(call: ActiveCall) {}

  override onInitOnce() {
    watch(
      this,
      () => this._deps.callMonitor.calls,
      (newCalls, oldCalls) => {
        if (this.ready) {
          oldCalls = oldCalls?.slice() || [];
          // @ts-expect-error TS(2345): Argument of type 'Call[]' is not assignable to par... Remove this comment to see the full error message
          removeDuplicateSelfCalls(newCalls).forEach((call) => {
            const oldCallIndex = oldCalls.findIndex(
              (item) => item.sessionId === call.sessionId,
            );
            if (oldCallIndex === -1) {
              // @ts-expect-error TS(2345): Argument of type 'ActiveCall' is not assignable to... Remove this comment to see the full error message
              this._onNewCall(call, callLoggerTriggerTypes.presenceUpdate);
            } else {
              const oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                this._onCallUpdated(
                  {
                    ...call,
                    isTransferredCall:
                      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                      !!this.transferredCallsMap[call.sessionId],
                    transferredMiddleNumber: this.transferredCallsMap[
                      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                      call.sessionId
                    ]
                      ? // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                        this.transferredCallsMap[call.sessionId]
                          .transferredMiddleNumber
                      : null,
                  },
                  callLoggerTriggerTypes.presenceUpdate,
                );
                if (
                  oldCall.telephonyStatus === 'Ringing' &&
                  call.telephonyStatus === 'CallConnected'
                ) {
                  this._onCallAnswered(call);
                }
              }
              if (
                (call.from && call.from.phoneNumber) !==
                (oldCall.from && oldCall.from.phoneNumber)
              ) {
                this._addTransferredCall(
                  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                  call.sessionId,
                  oldCall.from?.phoneNumber,
                );
                this._onCallUpdated(
                  {
                    ...call,
                    isTransferredCall: true,
                    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                transferredMiddleNumber: this.transferredCallsMap[
                  call.sessionId
                ]
                  ? this.transferredCallsMap[call.sessionId]
                      .transferredMiddleNumber
                  : null,
              },
              callLoggerTriggerTypes.presenceUpdate,
            );
          });
        }
      },
    );

    watch(
      this,
      () => this._deps.callHistory.endedCalls,
      (newCall, oldCalls) => {
        if (this.ready) {
          oldCalls = oldCalls?.slice() || [];
          const currentSessions: Record<string, boolean> = {};
          newCall.forEach((call) => {
            currentSessions[call.sessionId] = true;
          });
          oldCalls.forEach((call) => {
            if (!currentSessions[call.sessionId]) {
              // call log updated
              const callInfo = this._deps.callHistory.calls.find(
                (item) => item.sessionId === call.sessionId,
              );
              if (callInfo) {
                this._onCallUpdated(
                  {
                    ...callInfo,
                    isTransferredCall:
                      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                      !!this.transferredCallsMap[callInfo.sessionId],
                    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
      },
    );
  }

  @proxify
  async setAutoLog(autoLog: boolean) {
    if (this.ready && autoLog !== this.autoLog) {
      this._setAutoLog(autoLog);
    }
  }

  @proxify
  async setLogOnRinging(logOnRinging: boolean) {
    if (this.ready && logOnRinging !== this.logOnRinging) {
      this._setLogOnRinging(logOnRinging);
    }
  }

  @computed((that: CallLogger) => [that.transferredCallsList])
  get transferredCallsMap() {
    return reduce(
      (mapping, matcher) => ({ ...mapping, ...matcher }),
      {} as Record<string, TransferredCall>,
      this.transferredCallsList,
    );
  }
}
