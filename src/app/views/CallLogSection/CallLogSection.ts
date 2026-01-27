import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isOnHold } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { track } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  fromWatchValue,
  injectable,
  logger,
  optional,
  RcModule,
  Root,
  RouterPlugin,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { filter, tap } from 'rxjs';

import { CallHistory, CallMonitor, HistoryCall } from '../../services';

import type {
  AddLogHandlerFunctions,
  CallLogSectionOptions,
  CallLogStatus,
  CallsMapping,
} from './CallLogSection.interface';

@injectable({
  name: 'CallLogSection',
})
export class CallLogSection extends RcModule {
  protected _logFunction?: AddLogHandlerFunctions['logFunction'];
  protected _onSuccess?: AddLogHandlerFunctions['onSuccess'];
  protected _onUpdate?: AddLogHandlerFunctions['onUpdate'];
  protected _onError?: AddLogHandlerFunctions['onError'];

  constructor(
    protected _storage: StoragePlugin,
    protected _callHistory: CallHistory,
    protected _callMonitor: CallMonitor,
    protected _router: RouterPlugin,
    protected _root: Root,
    @optional('CallLogSectionOptions')
    protected _callLogSectionOptions?: CallLogSectionOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @storage
  @state
  callsMappingState: CallsMapping = {};

  @storage
  @state
  identifyList: Array<string> = [];

  @state
  stateCurrentIdentify: string | null = '';

  @state
  stateCurrentNotificationIdentify: string | null = '';

  @state
  stateNotificationIsExpand = false;

  @state
  warmTransferActiveTelephonySessionId = '';

  override onInitOnce() {
    // When there is an incoming call,
    // the page should be dismissed
    watch(
      this,
      () =>
        [
          this.currentCall,
          this.currentWarmTransferCall,
          this.warmTransferActiveTelephonySessionId,
        ] as const,
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

    // when go to region settings page, alway close log section to prevent that cover the region settings page
    fromWatchValue(this, () => this._router.currentPath)
      .pipe(
        filter((currentPath) => currentPath === '/settings/region'),
        tap(() => this.closeLogSection()),
        this._root.takeUntilAppDestroy,
      )
      .subscribe();
  }

  @action
  update(identify: string, newValue: Partial<CallLogStatus>) {
    const originalState = this.callsMappingState[identify];
    this.callsMappingState[identify] = {
      ...originalState,
      ...newValue,
    };
    this.identifyList = Array.from(new Set([...this.identifyList, identify]));
  }

  @action
  setWarmTransferCallActiveId(telephonySessionId = '') {
    this.warmTransferActiveTelephonySessionId = telephonySessionId;
  }

  @delegate('server')
  async saveSuccess(identify: string) {
    const originalState = this.callsMappingState[identify];
    this.update(identify, {
      isSucceed: true,
      isEdited: !!(
        originalState &&
        originalState.latestUpdateTime &&
        originalState.latestSaveTime &&
        originalState.latestSaveTime < originalState.latestUpdateTime
      ),
      isSaving: false,
    });
  }

  @delegate('server')
  async saving(identify: string) {
    this.update(identify, {
      latestSaveTime: Date.now(),
      isSaving: true,
    });
  }

  @delegate('server')
  async markAsUnSaving(identify: string) {
    this.update(identify, {
      isSaving: false,
    });
  }

  @delegate('server')
  async saveError(identify: string) {
    this.update(identify, {
      isEdited: true,
      isSucceed: false,
      isSaving: false,
    });
  }

  // TODO: add args type
  @delegate('server')
  async _handleSuccess(identify: string, ...args: any) {
    this.saveSuccess(identify);
    await this._onSuccess?.(identify, ...args);
  }

  // TODO: add args type
  @delegate('server')
  async _handleError(identify: string, ...args: any) {
    this.saveError(identify);
    await this._onError?.(identify, ...args);
  }

  @delegate('server')
  async showLogSection(identify: string) {
    if (identify !== this.currentIdentify) {
      this.setLogSectionIdentify(identify);
    }
  }

  @action
  setLogSectionIdentify(identify: string | null) {
    this.stateCurrentIdentify = identify;
  }

  @action
  setLogNotificationIdentify(identify: string | null) {
    this.stateCurrentNotificationIdentify = identify;
  }

  @delegate('server')
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
    onUpdate,
    onSuccess,
    onError,
  }: AddLogHandlerFunctions) {
    if (typeof logFunction !== 'function') {
      throw new Error('CallLogSection: "logFunction" must be a function.');
    }
    this._logFunction = logFunction;
    this._onUpdate = onUpdate;
    this._onSuccess = onSuccess;
    this._onError = onError;
  }

  // TODO: add args type
  @delegate('server')
  async updateCallLog(identify: string, ...args: any) {
    this.update(identify, {
      latestUpdateTime: Date.now(),
      isEdited: true,
    });
    await this._onUpdate?.(identify, ...args);
  }

  // TODO: add args type when implement call log ui
  @delegate('server')
  @track(trackEvents.clickSaveLogSection)
  async saveCallLog(identify: string, ...args: any) {
    // Before save
    let resolvePromise: () => void;
    const savePromise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    this._saveCallLogPromises.set(identify, savePromise);

    // Do save
    let result: unknown;
    const curr = this.callsMappingState[identify];
    if (curr?.isSaving) {
      logger.warn('saveCallLog already saving');
    } else {
      this.saving(identify);
      try {
        result = await this._logFunction?.(identify, ...args);
        if (!result) {
          throw new Error('saveCallLog failed');
        }
        await this._handleSuccess(identify, { ...args, result });
      } catch (e) {
        await this._handleError(identify, { ...args, error: e });
        logger.warn('saveCallLog failed', e);
      }
    }

    // After save
    resolvePromise!();
    this._saveCallLogPromises.delete(identify);
    return result;
  }

  _saveCallLogPromises = new Map<string, Promise<void>>();
  async promiseSaveCallLog(identify: string) {
    const savePromise = this._saveCallLogPromises.get(identify);
    await (savePromise ?? Promise.resolve());
  }

  @delegate('server')
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

  @delegate('server')
  async closeLogSection() {
    if (this.show) {
      this.setLogSectionIdentify(null);
    }
  }

  @delegate('server')
  async discardAndHandleNotification(sessionId?: string) {
    const currentNotificationIdentify =
      sessionId || this.currentNotificationIdentify;
    await this.closeLogNotification();
    await this.closeLogSection();
    await this.showLogSection(currentNotificationIdentify!);
  }

  @delegate('server')
  async saveAndHandleNotification() {
    const currentNotificationIdentify = this.currentNotificationIdentify;
    const currentIdentify = this.currentIdentify;
    await this.saveCallLog(currentIdentify!);
    await this.closeLogNotification();
    await this.closeLogSection();
    await this.showLogSection(currentNotificationIdentify!);
  }

  @delegate('server')
  @track(trackEvents.clickCloseLogNotification)
  async closeLogNotification() {
    await this._closeLogNotification();
  }

  async _closeLogNotification() {
    if (this.showNotification) {
      this.setLogNotificationIdentify(null);
      this.setNotificationIsExpand(false);
    }
  }

  @action
  setNotificationIsExpand(isExpand: boolean) {
    this.stateNotificationIsExpand = isExpand;
  }

  // shrink the popover menu appear when click log button at call notificaiton
  @delegate('server')
  async shrinkNotification() {
    if (this.notificationIsExpand) {
      this.setNotificationIsExpand(false);
    }
  }

  @delegate('server')
  async expandNotification() {
    if (!this.notificationIsExpand) {
      this.setNotificationIsExpand(true);
    }
  }

  @delegate('server')
  async expandLogNotification() {
    if (!this.show) {
      await this.showLogSection(this.currentNotificationIdentify!);
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

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that.callsMappingState,
  ])
  get currentCallLogStatus() {
    return (
      this.callsMappingState[this.currentIdentify!] || ({} as CallLogStatus)
    );
  }

  @computed
  get currentCall() {
    return ([...this._callMonitor.allCalls, ...this._callHistory.calls].find(
      (call) => call.sessionId === this.currentIdentify,
    ) || {}) as HistoryCall;
  }

  @computed((that: CallLogSection) => [
    that.currentIdentify,
    that._callMonitor.allCalls,
  ])
  get isCurrentCallOngoing() {
    return !!this._callMonitor.allCalls.find(
      (x) => x.sessionId === this.currentIdentify,
    );
  }

  @computed((that: CallLogSection) => [
    that.currentCall,
    that._callMonitor.allCalls,
  ])
  get currentWarmTransferCall(): Call | undefined {
    const warmTransferInfo = (this.currentCall as Call).warmTransferInfo;
    if (warmTransferInfo === undefined) {
      return;
    }

    const { relatedTelephonySessionId } = warmTransferInfo;

    return [...this._callMonitor.allCalls].find(
      (call) => call.telephonySessionId === relatedTelephonySessionId,
    );
  }

  @computed((that: CallLogSection) => [
    that.currentNotificationIdentify,
    that._callMonitor.allCalls,
    that._callHistory.calls,
  ])
  get currentNotificationCall(): HistoryCall {
    return ([...this._callMonitor.allCalls, ...this._callHistory.calls].find(
      (call) => call.sessionId === this.currentNotificationIdentify,
    ) || {}) as HistoryCall;
  }

  get currentIdentify() {
    return this.stateCurrentIdentify;
  }

  get show() {
    return !!this.currentIdentify;
  }

  get currentNotificationIdentify() {
    return this.stateCurrentNotificationIdentify;
  }

  get showNotification() {
    return !!this.currentNotificationIdentify;
  }

  get notificationIsExpand() {
    return this.stateNotificationIsExpand;
  }

  get currentCallSavingStatus() {
    return this.currentCallLogStatus.isSaving;
  }
}
