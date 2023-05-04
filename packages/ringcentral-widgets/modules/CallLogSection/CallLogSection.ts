import {
  assoc,
  converge,
  flip,
  identity,
  keys,
  mergeWith,
  pick,
  useWith,
} from 'ramda';

import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isOnHold } from '@ringcentral-integration/commons/lib/callLogHelpers';

import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';

import { Mapping } from '../../typings';
import {
  AddLogHandlerFunctions,
  CallLogSectionCallStatus,
  CallLogStatus,
  CallsMappingType,
  Deps,
} from './CallLogSection.interface';

// TODO: seems that module should move to ringcentral-js-widgets/ringcentral-integration/modules

@Module({
  deps: [
    'Storage',
    'CallHistory',
    'CallMonitor',
    {
      dep: 'CallLogSectionOptions',
      optional: true,
    },
  ],
})
export class CallLogSection<T extends Deps = Deps> extends RcModuleV2<T> {
  _notSyncOpenState: boolean;
  protected _readyCheckFunction?: AddLogHandlerFunctions['readyCheckFunction'];
  protected _logFunction?: AddLogHandlerFunctions['logFunction'];
  protected _onSuccess?: AddLogHandlerFunctions['onSuccess'];
  protected _onUpdate?: AddLogHandlerFunctions['onUpdate'];
  protected _onError?: AddLogHandlerFunctions['onError'];

  constructor(deps: T) {
    super({
      deps,
      storageKey: 'callLogSection',
      enableCache: true,
    });
    this._notSyncOpenState =
      !!this._deps.callLogSectionOptions?.notSyncOpenState;
  }

  // TODO: merge these states in callLogTasks.loggingmapping
  @state
  callsSavingStatus: Record<string, boolean> = {};

  @storage
  @state
  callsMappingState: CallsMappingType = {};

  @storage
  @state
  identifyList: Array<string> = [];

  @state
  stateCurrentIdentify: string = '';

  @storage
  @state
  storageCurrentIdentify: string = '';

  @state
  stateCurrentNotificationIdentify: string = '';

  @storage
  @state
  storageCurrentNotificationIdentify: string = '';

  @state
  stateNotificationIsExpand: boolean = false;

  @storage
  @state
  storageNotificationIsExpand: boolean = false;

  @state
  warmTransferActiveTelephonySessionId: string = '';

  override _shouldInit() {
    return super._shouldInit() && !!this._readyCheckFunction?.();
  }

  override _shouldReset() {
    return (
      super._shouldReset() || (this.ready && !this._readyCheckFunction?.())
    );
  }

  override onInitOnce() {
    // When there is an incoming call,
    // the page should be dismissed
    watch(
      this,
      () => [
        this.currentCall,
        this.currentWarmTransferCall,
        this.warmTransferActiveTelephonySessionId,
      ],
      () => {
        const {
          currentCall,
          currentWarmTransferCall,
          warmTransferActiveTelephonySessionId,
        } = this;

        if (!currentCall || !currentWarmTransferCall) {
          if (this.warmTransferActiveTelephonySessionId) {
            this.setWarmTransferCallActiveId();
          }
          return;
        }

        const currentCallOnHold = isOnHold(currentCall);
        const warmTransferCallOnHold = isOnHold(currentWarmTransferCall);

        if (warmTransferCallOnHold && currentCallOnHold) {
          if (!warmTransferActiveTelephonySessionId) {
            this.setWarmTransferCallActiveId(currentCall.telephonySessionId);
          }
          return;
        }

        const activeCall = currentCallOnHold
          ? currentWarmTransferCall
          : currentCall;

        const { telephonySessionId } = activeCall;
        if (this.warmTransferActiveTelephonySessionId !== telephonySessionId) {
          this.setWarmTransferCallActiveId(telephonySessionId);
        }
      },
      { multiple: true },
    );
  }

  @action
  update(
    identify: string,
    newValue: Partial<CallsMappingType[0]>,
    callsSavingStatus: boolean,
  ) {
    this.callsSavingStatus[identify] = callsSavingStatus;
    const originalState = this.callsMappingState[identify];
    this.callsMappingState[identify] = {
      ...originalState,
      ...newValue,
    };
    this.identifyList = Array.from(new Set([...this.identifyList, identify]));
  }

  @action
  setWarmTransferCallActiveId(telephonySessionId: string = '') {
    this.warmTransferActiveTelephonySessionId = telephonySessionId;
  }

  @proxify
  async saveSuccess(identify: string) {
    const originalState = this.callsMappingState[identify];
    this.update(
      identify,
      {
        isSucceed: true,
        isEdited: !!(
          originalState?.latestUpdateTime &&
          originalState?.latestSaveTime &&
          originalState?.latestSaveTime < originalState?.latestUpdateTime
        ),
      },
      false,
    );
  }

  @proxify
  async saving(identify: string) {
    this.update(
      identify,
      {
        latestSaveTime: Date.now(),
      },
      true,
    );
  }

  @proxify
  async markAsUnSaving(identify: string) {
    this.update(identify, {}, false);
  }

  @proxify
  async saveError(identify: string) {
    this.update(
      identify,
      {
        isEdited: true,
        isSucceed: false,
      },
      false,
    );
  }

  // TODO: add args type
  @proxify
  async _handleSuccess(identify: string, ...args: any) {
    this.saveSuccess(identify);
    if (typeof this._onSuccess === 'function')
      this._onSuccess(identify, ...args);
  }

  // TODO: add args type
  @proxify
  async _handleError(identify: string, ...args: any) {
    this.saveError(identify);
    if (typeof this._onError === 'function') {
      await this._onError(identify, ...args);
    }
  }

  @proxify
  async showLogSection(identify: string) {
    if (!this.show || identify !== this.currentIdentify) {
      this.setLogSectionIdentify(identify);
    }
  }

  @action
  setLogSectionIdentify(identify: string) {
    if (this._notSyncOpenState) {
      this.stateCurrentIdentify = identify;
    } else {
      this.storageCurrentIdentify = identify;
    }
  }

  @action
  setLogNotificationIdentify(identify: string) {
    if (this._notSyncOpenState) {
      this.stateCurrentNotificationIdentify = identify;
    } else {
      this.storageCurrentNotificationIdentify = identify;
    }
  }

  @proxify
  async showLogNotification(identify: string) {
    if (
      !this.showNotification ||
      identify !== this.currentNotificationIdentify
    ) {
      this.setLogNotificationIdentify(identify);
    }
  }

  addLogHandler({
    logFunction,
    readyCheckFunction,
    onUpdate,
    onSuccess,
    onError,
  }: AddLogHandlerFunctions) {
    if (typeof logFunction !== 'function') {
      throw new Error('CallLogSection: "logFunction" must be a function.');
    }
    if (typeof readyCheckFunction !== 'function') {
      throw new Error(
        'CallLogSection: "readyCheckFunction" must be a function.',
      );
    }
    this._logFunction = logFunction;
    this._readyCheckFunction = readyCheckFunction;
    this._onUpdate = onUpdate;
    this._onSuccess = onSuccess;
    this._onError = onError;
  }

  // TODO: add args type
  @proxify
  async updateCallLog(identify: string, ...args: any) {
    this.update(
      identify,
      {
        latestUpdateTime: Date.now(),
        isEdited: true,
      },
      this.callsSavingStatus[identify],
    );
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    await this._onUpdate(identify, ...args);
  }

  // TODO: add args type when implement call log ui
  @proxify
  @track(trackEvents.clickSaveLogSection)
  async saveCallLog(identify: string, ...args: any) {
    if (
      identify &&
      (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving)
    ) {
      this.saving(identify);
      try {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        const result = await this._logFunction(identify, ...args);
        if (!result) {
          throw new Error('Result is empty');
        }
        this._handleSuccess(identify, { ...args, result });
        return result;
      } catch (e) {
        await this._handleError(identify, { ...args, error: e });
        console.warn(e);
      }
    }
  }

  @proxify
  async handleLogSection(identify: string) {
    if (!this.show) {
      // Preferentially show call log section.
      await this.showLogSection(identify);
    } else if (
      !this.notificationIsExpand &&
      this.currentIdentify !== identify
    ) {
      // Check it to show log notification when the call log notification isn't expanded.
      await this.showLogNotification(identify);
    }
  }

  @proxify
  async closeLogSection() {
    if (this.show) {
      // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      this.setLogSectionIdentify(null);
    }
  }

  @proxify
  async discardAndHandleNotification() {
    const currentNotificationIdentify = this.currentNotificationIdentify;
    await this.closeLogNotification();
    await this.closeLogSection();
    await this.showLogSection(currentNotificationIdentify);
  }

  @proxify
  async saveAndHandleNotification() {
    const currentNotificationIdentify = this.currentNotificationIdentify;
    const currentIdentify = this.currentIdentify;
    await this.saveCallLog(currentIdentify);
    await this.closeLogNotification();
    await this.closeLogSection();
    await this.showLogSection(currentNotificationIdentify);
  }

  @proxify
  @track(trackEvents.clickCloseLogNotification)
  async closeLogNotification() {
    if (this.showNotification) {
      // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      this.setLogNotificationIdentify(null);
      this.setNotificationIsExpand(false);
    }
  }

  @action
  setNotificationIsExpand(isExpand: boolean) {
    if (this._notSyncOpenState) {
      this.stateNotificationIsExpand = isExpand;
    } else {
      this.storageNotificationIsExpand = isExpand;
    }
  }

  // shrink the popover menu appear when click log button at call notificaiton
  @proxify
  async shrinkNotification() {
    if (this.notificationIsExpand) {
      this.setNotificationIsExpand(false);
    }
  }

  @proxify
  async expandNotification() {
    if (!this.notificationIsExpand) {
      this.setNotificationIsExpand(true);
    }
  }

  @proxify
  async expandLogNotification() {
    if (!this.show) {
      await this.showLogSection(this.currentNotificationIdentify);
      await this.closeLogNotification();
    }
    await this.expandNotification();
  }

  @computed((that: CallLogSection) => [
    that.identifyList,
    that.callsMappingState,
  ])
  get calls() {
    const calls = this.identifyList.map(
      (identify: string) => this.callsMappingState[identify],
    );
    return calls;
  }

  /**
   * Merge isSaving property from reducer to callsMapping
   */
  @computed((that: CallLogSection) => [
    that.callsMappingState,
    that.callsSavingStatus,
  ])
  get callsMapping(): Mapping<CallLogSectionCallStatus> {
    return converge(mergeWith(flip(assoc('isSaving'))), [
      identity,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useWith(pick, [keys, identity]),
    ])(this.callsMappingState, this.callsSavingStatus) as any;
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that.callsMappingState,
  ])
  get currentCallLogStatus() {
    return (
      this.callsMappingState[this.currentIdentify] || ({} as CallLogStatus)
    );
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that._deps.callHistory.calls,
    that._deps.callMonitor.calls,
  ])
  get currentCall(): HistoryCall {
    return (
      [...this._deps.callMonitor.calls, ...this._deps.callHistory.calls].find(
        (call) => call.sessionId === this.currentIdentify,
      ) || ({} as HistoryCall)
    );
  }

  @computed((that: CallLogSection) => [
    that.currentCall,
    that._deps.callMonitor.calls,
  ])
  get currentWarmTransferCall(): Call | undefined {
    const warmTransferInfo = (this.currentCall as Call).warmTransferInfo;
    if (warmTransferInfo === undefined) {
      return;
    }

    const { relatedTelephonySessionId } = warmTransferInfo;

    return [...this._deps.callMonitor.calls].find(
      (call) => call.telephonySessionId === relatedTelephonySessionId,
    );
  }

  @computed((that: CallLogSection) => [
    that.currentNotificationIdentify,
    that._deps.callMonitor.calls,
    that._deps.callHistory.calls,
  ])
  get currentNotificationCall(): HistoryCall {
    return (
      [...this._deps.callMonitor.calls, ...this._deps.callHistory.calls].find(
        (call) => call.sessionId === this.currentNotificationIdentify,
      ) || ({} as HistoryCall)
    );
  }

  get currentIdentify() {
    return this._notSyncOpenState
      ? this.stateCurrentIdentify
      : this.storageCurrentIdentify;
  }

  get show() {
    return !!this.currentIdentify;
  }

  get currentNotificationIdentify() {
    return this._notSyncOpenState
      ? this.stateCurrentNotificationIdentify
      : this.storageCurrentNotificationIdentify;
  }

  get showNotification() {
    return !!this.currentNotificationIdentify;
  }

  get notificationIsExpand() {
    return this._notSyncOpenState
      ? this.stateNotificationIsExpand
      : this.storageNotificationIsExpand;
  }

  get currentCallSavingStatus() {
    return this.callsSavingStatus[this.currentIdentify];
  }
}
