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
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { Mapping } from '../../typings';
import {
  AddLogHandlerFunctions,
  CallLogSectionCallStatus,
  CallsMappingType,
  Deps,
} from './CallLogSection.interface';

@Module({
  deps: [
    'Storage',
    'CallLogTasks',
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
  _storageKey: string;
  private _readyCheckFunction: AddLogHandlerFunctions['readyCheckFunction'];
  private _logFunction: AddLogHandlerFunctions['logFunction'];
  private _onSuccess: AddLogHandlerFunctions['onSuccess'];
  private _onUpdate: AddLogHandlerFunctions['onUpdate'];
  private _onError: AddLogHandlerFunctions['onError'];

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'callLogSection',
      enableCache: true,
    });
    this._notSyncOpenState = !!this._deps.callLogSectionOptions
      ?.notSyncOpenState;
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
  stateCurrentIdentify: string = null;

  @storage
  @state
  storageCurrentIdentify: string = null;

  @state
  stateCurrentNotificationIdentify: string = null;

  @storage
  @state
  storageCurrentNotificationIdentify: string = null;

  @state
  stateNotificationIsExpand: boolean = false;

  @storage
  @state
  storageNotificationIsExpand: boolean = false;

  _shouldInit() {
    return super._shouldInit() && this._readyCheckFunction();
  }

  _shouldReset() {
    return super._shouldReset() || (this.ready && !this._readyCheckFunction());
  }

  @action
  update(
    identify: string,
    newValue: Partial<CallsMappingType[0]>,
    callsSavingStatus: boolean,
  ) {
    this.callsSavingStatus[identify] = callsSavingStatus;
    const originalState = this.callsMappingState[identify];
    this.callsMappingState = {
      ...this.callsMappingState,
      [identify]: {
        ...originalState,
        ...newValue,
      },
    };
    this.identifyList = Array.from(new Set([...this.identifyList, identify]));
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
    await this._onUpdate(identify, ...args);
  }

  // TODO: add args type when implement call log ui
  @proxify
  async saveCallLog(identify: string, ...args: any) {
    if (
      identify &&
      (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving)
    ) {
      this.saving(identify);
      try {
        const result = await this._logFunction(identify, ...args);
        if (!result) {
          throw new Error('Result is empty');
        }
        await this._handleSuccess(identify, ...args);
        return result;
      } catch (e) {
        await this._handleError(identify, ...args);
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
  async closeLogNotification() {
    if (this.showNotification) {
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

  @proxify
  async viewTask(call: Call) {
    await this._deps.callLogTasks.fetchAndUpdateTask(call);
    this.showLogSection(call.sessionId);
  }

  @proxify
  async onNewCall(call: Call) {
    await this._deps.callLogTasks.fetchAndUpdateTask(call);
    this.handleLogSection(call.sessionId);
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
    ]) as any;
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that._deps.callLogTasks.logInfoMapping,
  ])
  get currentLogCall() {
    return this._deps.callLogTasks.logInfoMapping[this.currentIdentify] || {};
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that.callsMappingState,
  ])
  get currentCallLogStatus() {
    return this.callsMappingState[this.currentIdentify] || ({} as any);
  }

  @computed((that: CallLogSection) => [
    that.currentNotificationIdentify,
    that._deps.callLogTasks.logInfoMapping,
  ])
  get currentLogNotificationCall() {
    return (
      this._deps.callLogTasks.logInfoMapping[
        this.currentNotificationIdentify
      ] || {}
    );
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that._deps.callHistory.calls,
    that._deps.callMonitor.calls,
  ])
  get currentCall() {
    return (
      [...this._deps.callHistory.calls, ...this._deps.callMonitor.calls].find(
        (call) => call.sessionId === this.currentIdentify,
      ) || {}
    );
  }

  @computed((that: CallLogSection) => [
    that.currentNotificationIdentify,
    that._deps.callHistory.calls,
    that._deps.callMonitor.calls,
  ])
  get currentNotificationCall() {
    return (
      [...this._deps.callHistory.calls, ...this._deps.callMonitor.calls].find(
        (call) => call.sessionId === this.currentNotificationIdentify,
      ) || {}
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
}
