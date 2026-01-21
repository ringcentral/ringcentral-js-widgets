import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import type { CallLoggerTriggerType } from '@ringcentral-integration/commons/enums/callLoggerTriggerTypes';
import { callLoggerTriggerTypes } from '@ringcentral-integration/commons/enums/callLoggerTriggerTypes';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { ActiveCall } from '@ringcentral-integration/commons/interfaces/Presence.model';
import {
  isInbound,
  isRinging,
  removeDuplicateSelfCalls,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import {
  ActivityMatcher,
  ContactMatcher,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { LoggerBase } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  inject,
  injectable,
  optional,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { reduce } from 'ramda';

import type { HistoryCall } from '../CallHistory';
import { CallHistory } from '../CallHistory';
import type { CallLogRecord } from '../CallLog';
import { CallMonitor } from '../CallMonitor';

import type {
  AutoLogCallOptions,
  CallLoggerOptions,
  Hook,
  LogCallOptions,
  LogOptions,
  TransferredCall,
  UpdatedCall,
  UpdatedCallMap,
} from './CallLogger.interface';
import { callIdentityFunction } from './callLoggerHelper';

const DEFAULT_OPACITY = 20;

@injectable({
  name: 'CallLogger',
})
export class CallLogger extends LoggerBase {
  protected _customMatcherHooks: Hook[] = [];

  protected override _identityFunction = callIdentityFunction;

  _logFunction = this._callLoggerOptions.logFunction;

  _readyCheckFunction = this._callLoggerOptions.readyCheckFunction;

  constructor(
    protected _storage: StoragePlugin,
    protected _callHistory: CallHistory,
    protected _callMonitor: CallMonitor,
    @inject('CallLoggerOptions')
    protected _callLoggerOptions: CallLoggerOptions,
    @optional() protected _activityMatcher?: ActivityMatcher,
    @optional() protected _contactMatcher?: ContactMatcher,
  ) {
    super();
    this._storage.enable(this);

    if (typeof this._callLoggerOptions.autoLog !== 'undefined') {
      this._autoLog = this._callLoggerOptions.autoLog;
    }
  }

  @storage
  @state
  _autoLog = true;

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
    this._autoLog = !!autoLog;
  }

  get autoLog() {
    return this._autoLog;
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

  @delegate('server')
  override async log<T>({ call, ...options }: LogOptions<T>) {
    return super.log({ item: call, ...options });
  }

  @delegate('server')
  async _shouldLogNewCall(call: Call) {
    return this.autoLog && (this.logOnRinging || !isRinging(call));
  }

  @delegate('server')
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
          : Math.round((Date.now() - call.startTime!) / 1000),
        result:
          (call as CallLogRecord).result || (call as Call).telephonyStatus,
      },
      fromEntity,
      toEntity,
    } as any as LogOptions<T>); // TODO: fix type
  }

  @delegate('server')
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
          ? (call as CallLogRecord).duration!
          : Math.round((Date.now() - call.startTime!) / 1000),
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
      !this._activityMatcher?.dataMapping[sessionId] ||
      !this._activityMatcher?.dataMapping[sessionId].length
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

  @delegate('server')
  async _onNewCall(call: Call, triggerType: CallLoggerTriggerType) {
    if (await this._shouldLogNewCall(call)) {
      // RCINT-3857 check activity in case instance was reloaded when call is still active
      await this._activityMatcher?.triggerMatch();
      if (
        this._activityMatcherCheck(call.sessionId) &&
        this._customMatcherCheck(call.sessionId)
      ) {
        // is completely new, need entity information
        await this._contactMatcher?.triggerMatch();

        const toNumberEntity = call.toNumberEntity || '';

        const fromMatches =
          (call.from &&
            call.from.phoneNumber &&
            this._contactMatcher?.dataMapping[call.from.phoneNumber]) ||
          [];

        const toMatches =
          (call.to &&
            call.to.phoneNumber &&
            this._contactMatcher?.dataMapping[call.to.phoneNumber]) ||
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
        } as AutoLogCallOptions);
      } else {
        // only update call information if call has been logged
        await this._autoLogCall({
          call,
          triggerType,
        } as AutoLogCallOptions);
      }
    }
  }

  @delegate('server')
  async _shouldLogUpdatedCall(call: HistoryCall | ActiveCall) {
    if (this.logOnRinging || !isRinging(call as Call)) {
      if (this.autoLog) return true;
      await this._activityMatcher?.triggerMatch();
      const activityMatches =
        this._activityMatcher?.dataMapping[call.sessionId!] || [];
      return activityMatches.length > 0;
    }
    return false;
  }

  @delegate('server')
  async _onCallUpdated<T extends keyof UpdatedCallMap>(
    call: UpdatedCall<T>,
    triggerType: T,
  ) {
    if (await this._shouldLogUpdatedCall(call)) {
      await this._autoLogCall({ call, triggerType });
    }
  }

  @delegate('server')
  async _onCallAnswered(_call: ActiveCall) {
    //
  }

  /**
   * Check whether the given call matches AAL-configured call types.
   * Supported types: 'ALL' | 'OUTGOING_CALLS' | 'INCOMING_ANSWERED' | 'MISSED_WITHOUT_VOICEMAIL' | 'MISSED_WITH_VOICEMAIL'.
   */
  protected isCallTypeAllowedByAalConfig(
    call: Call,
    allowedCallTypes?: readonly any[] | null,
  ): boolean {
    if (!allowedCallTypes || allowedCallTypes.length === 0) return false;

    if (allowedCallTypes.includes('ALL')) return true;

    const isInboundCall = (call as any).direction === callDirection.inbound;
    const isOutboundCall = (call as any).direction === callDirection.outbound;
    const result = (call as any).result as string | undefined;
    const isAnsweredCall = result === 'Accepted' || result === 'Connected';
    const isMissedCallWithoutVoiceMail = result === 'Missed';
    const isMissedCallWithVoiceMail = result === 'Voicemail';

    if (allowedCallTypes.includes('OUTGOING_CALLS') && isOutboundCall) {
      return true;
    }

    if (
      allowedCallTypes.includes('INCOMING_ANSWERED') &&
      isAnsweredCall &&
      isInboundCall
    ) {
      return true;
    }

    if (
      allowedCallTypes.includes('MISSED_WITHOUT_VOICEMAIL') &&
      isMissedCallWithoutVoiceMail
    ) {
      return true;
    }

    if (
      allowedCallTypes.includes('MISSED_WITH_VOICEMAIL') &&
      isMissedCallWithVoiceMail
    ) {
      return true;
    }

    return false;
  }

  override onInitOnce() {
    watch(
      this,
      () => this._callMonitor.allCalls,
      (newCalls, oldCalls) => {
        if (this.ready) {
          oldCalls = oldCalls?.slice() || [];
          removeDuplicateSelfCalls(newCalls as ActiveCall[]).forEach((call) => {
            const oldCallIndex = oldCalls.findIndex(
              (item) => item.sessionId === call.sessionId,
            );
            if (oldCallIndex === -1) {
              this._onNewCall(
                call as Call,
                callLoggerTriggerTypes.presenceUpdate,
              );
            } else {
              const oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);

              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                this._onCallUpdated(
                  {
                    ...call,
                    isTransferredCall:
                      !!this.transferredCallsMap[call.sessionId!],
                    transferredMiddleNumber: this.transferredCallsMap[
                      call.sessionId!
                    ]
                      ? this.transferredCallsMap[call.sessionId!]
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
                  call.sessionId!,
                  oldCall.from?.phoneNumber!,
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
              } as UpdatedCall<'presenceUpdate'>,
              callLoggerTriggerTypes.presenceUpdate,
            );
          });
        }
      },
    );

    watch(
      this,
      () => this._callHistory.endedCalls,
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
              const callInfo = this._callHistory.getHistoryCallBySessionId(
                call.sessionId,
              );

              if (callInfo) {
                this._onCallUpdated(
                  {
                    ...callInfo,
                    isTransferredCall:
                      !!this.transferredCallsMap[callInfo.sessionId!],
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

  @delegate('server')
  async setAutoLog(autoLog: boolean) {
    if (this.ready && autoLog !== this.autoLog) {
      this._setAutoLog(autoLog);
    }
  }

  @delegate('server')
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
