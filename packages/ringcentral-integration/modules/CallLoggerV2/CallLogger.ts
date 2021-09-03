import { reduce } from 'ramda';
import {
  state,
  storage,
  action,
  watch,
  computed,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import { LoggerBase } from '../../lib/LoggerBaseV2';
import {
  isRinging,
  isInbound,
  removeDuplicateSelfCalls,
} from '../../lib/callLogHelpers';
import {
  CallLoggerTriggerType,
  callLoggerTriggerTypes,
} from '../../enums/callLoggerTriggerTypes';
import proxify from '../../lib/proxy/proxify';
import { callIdentityFunction } from './callLoggerHelper';
import { Call } from '../../interfaces/Call.interface';
import {
  AutoLogCallOptions,
  Deps,
  Hook,
  LogCallOptions,
  LogOptions,
  TransferredCall,
  UpdatedCall,
  UpdatedCallMap,
} from './CallLogger.interface';
import { CallLogRecord } from '../CallLogV2';
import { HistoryCall } from '../CallHistoryV2';
import { ActiveCall } from '../../interfaces/Presence.model';

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
    await this.log({
      ...options,
      call: {
        ...call,
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? (call as CallLogRecord).duration
          : Math.round((Date.now() - call.startTime) / 1000),
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
        duration: Object.prototype.hasOwnProperty.call(call, 'duration')
          ? (call as CallLogRecord).duration
          : Math.round((Date.now() - call.startTime) / 1000),
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
      !this._deps.activityMatcher.dataMapping[sessionId] ||
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
      await this._deps.activityMatcher.triggerMatch();
      if (
        this._activityMatcherCheck(call.sessionId) &&
        this._customMatcherCheck(call.sessionId)
      ) {
        // is completely new, need entity information
        await this._deps.contactMatcher.triggerMatch();

        const toNumberEntity = call.toNumberEntity || '';

        const fromMatches =
          (call.from &&
            call.from.phoneNumber &&
            this._deps.contactMatcher.dataMapping[call.from.phoneNumber]) ||
          [];

        const toMatches =
          (call.to &&
            call.to.phoneNumber &&
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

  @proxify
  async _shouldLogUpdatedCall(call: HistoryCall | ActiveCall) {
    const isActive = await this._ensureActive();
    if (isActive && (this.logOnRinging || !isRinging(call))) {
      if (this.autoLog) return true;
      await this._deps.activityMatcher.triggerMatch();
      const activityMatches =
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

  onInitOnce() {
    watch(
      this,
      () => this._deps.callMonitor.calls,
      (newCalls, oldCalls) => {
        if (this.ready) {
          oldCalls = oldCalls?.slice() || [];
          removeDuplicateSelfCalls(newCalls).forEach((call) => {
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
                    isTransferredCall: !!this.transferredCallsMap[
                      call.sessionId
                    ],
                    transferredMiddleNumber: this.transferredCallsMap[
                      call.sessionId
                    ]
                      ? this.transferredCallsMap[call.sessionId]
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
                  call.sessionId,
                  oldCall.from?.phoneNumber,
                );
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
                    isTransferredCall: !!this.transferredCallsMap[
                      callInfo.sessionId
                    ],
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
