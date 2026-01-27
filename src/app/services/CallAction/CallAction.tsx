import type {
  SmartNoteClient,
  SmartNotes,
} from '@ringcentral-integration/ai-notes/src/app/services';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isInbound as isInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
import {
  CallActions,
  type CallContactMatch,
  ConnectivityMonitor,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromWatch,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcModule,
  Root,
  RouterPlugin,
  state,
} from '@ringcentral-integration/next-core';
import { type ReplyWithTextParams } from 'ringcentral-call-control/lib/Session';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  merge,
  NEVER,
  share,
  switchMap,
} from 'rxjs';

import type { CallActionType } from '../../hooks';
import {
  CallViewState,
  type CallViewType,
} from '../../views/CallView/services';
import {
  ActiveCallControl,
  ActiveSession,
  isHoldingCall,
  isQueueCall,
  isRingingCall,
} from '../ActiveCallControl';
import { CallMonitor, MAX_EXIST_CALLS_COUNT } from '../CallMonitor';
import { PreinsertCall, PreinsertCallStatus } from '../PreinsertCall';
import { Webphone } from '../Webphone';

import type {
  CallActionOptions,
  CallActionTypeDataMap,
  CallMetaInfo,
} from './CallAction.interface';
import { ConferenceCallAction } from './ConferenceCallAction';
import { SwitchCallConfirm } from './SwitchCallConfirm';
import { t } from './i18n';
import { lastAvailableValue, mapActionTypeToCallActions } from './utils';

type OpenAndNavigateOptions = {
  /**
   * close all other active calls when open a call
   *
   * @default true
   */
  closeOtherActives?: boolean;
  /**
   * redirect to the specific view when open a call
   */
  view?: CallViewType;
};

type CallAllInfo<T extends boolean = false> = {
  // because that is from source call data, call always have value
  call: T extends true ? Call : Call | undefined;
  meta: CallMetaInfo | undefined;
  session: ActiveSession;
};

const CALLING_ROUTE_PATH = '/calling';

/**
 * group all call actions in this service, which use in latest version of spring-ui
 */
@injectable({
  name: 'CallAction',
})
export class CallAction extends RcModule {
  mergeMenuOpened$ = new BehaviorSubject(false);

  displayCallTelephonyIdChange$ = fromWatch(
    this,
    () => this.displayCallAllInfo?.call?.telephonySessionId,
  );

  private callActionEventsHistoryMap = new Map<string, CallActions[]>();

  @state
  private latestOpenCallTelephonySessionId: string | null = null;

  @action
  private _setLatestOpenCallTelephonySessionId(val: string | null) {
    this.latestOpenCallTelephonySessionId = val;
  }

  @state
  private _callMetaInfoMap: Record<string, CallMetaInfo | null> = {};

  get mergeCalls() {
    return this._activeCallControl.skipConferenceCall
      ? []
      : this._conferenceCallAction.mergeCalls;
  }

  readonly isCallMergeable = this._activeCallControl.skipConferenceCall
    ? () => false
    : this._conferenceCallAction.isCallMergeable;

  @computed
  get callMetaInfoMap() {
    return Object.keys(this._callMetaInfoMap).reduce((acc, key) => {
      const metaInfo = this._callMetaInfoMap[key];
      acc[key] = metaInfo
        ? {
            ...metaInfo,
            actionsDisabled:
              metaInfo?.actionsDisabled || this.callActionsDisabled,
          }
        : undefined;
      return acc;
    }, {} as Record<string, CallMetaInfo | undefined>);
  }

  getCallMetaInfo(telephonySessionId: string) {
    const metaInfo = this.callMetaInfoMap[telephonySessionId];
    return metaInfo;
  }

  /**
   * get the call all info by telephonySessionId
   *
   * when the telephonySessionId is from source call data, call always have value, so the return type is `CallAllInfo<true>`, otherwise, the return type is `CallAllInfo<false>`
   *
   * @param telephonySessionId - the telephonySessionId of the call
   * @returns the call all info
   */
  getAllInfoByTelephonySessionId<T extends boolean = false>(
    telephonySessionId: string,
  ): T extends true ? CallAllInfo<true> : CallAllInfo<false> | undefined {
    const session =
      this._activeCallControl.getActiveSession(telephonySessionId);

    if (!session) return undefined as any;

    const sessionId = session.sessionId;
    const meta = this.getCallMetaInfo(telephonySessionId);
    const call = this._callViewState.getCallWithExtraLog(sessionId);

    return {
      call,
      meta,
      session,
    } as any;
  }

  @action
  _updateCallMetaInfo(
    telephonySessionId: string,
    metaInfo: Partial<CallMetaInfo> | null,
  ) {
    this._callMetaInfoMap[telephonySessionId] ??= {
      open: false,
      currentPath: null,
      minimized: false,
      actionsDisabled: false,
      expanded: null,
    };

    // when from open become close, set that as latest open call
    if (
      this._callMetaInfoMap[telephonySessionId]?.open &&
      metaInfo?.open === false
    ) {
      this._setLatestOpenCallTelephonySessionId(telephonySessionId);
    }

    Object.assign(this._callMetaInfoMap[telephonySessionId], metaInfo);

    const updatedMetaInfo = this._callMetaInfoMap[telephonySessionId];

    if (
      updatedMetaInfo &&
      // when open and not minimized, means that become active call
      updatedMetaInfo.open &&
      !updatedMetaInfo.minimized
    ) {
      this._activeCallControl.setActiveSessionId(telephonySessionId);
    }

    const expanded = metaInfo?.expanded;

    if (typeof expanded === 'boolean' && expanded !== this._root.expanded) {
      this._root['_setExpanded'](expanded);
    }
  }

  @delegate('server')
  async updateCallMetaInfo(
    telephonySessionId: string,
    val: Partial<CallMetaInfo> | null,
  ) {
    this._updateCallMetaInfo(telephonySessionId, val);
  }

  @action
  private _setAllIncomingCallsMeta(metaInfo: Partial<CallMetaInfo>) {
    this.allCallInfoList.forEach(({ meta, call }) => {
      if (meta?.currentPath === 'incoming') {
        this._updateCallMetaInfo(call?.telephonySessionId!, metaInfo);
      }
    });
  }

  @action
  private _closeAllIncomingCalls() {
    this._setAllIncomingCallsMeta({ open: false });
  }

  @delegate('server')
  async closeAllIncomingCalls() {
    this._closeAllIncomingCalls();
  }

  /**
   * disable actions when processing
   *
   * ### the first argument must be `telephonySessionId`
   *
   * @param cb any callback method that need to disable actions when processing
   * @returns the callback method with actions disabled
   */
  private processing<
    T extends (telephonySessionId: string, ...args: any[]) => Promise<unknown>,
  >(cb: T, preinsertClientStatus?: PreinsertCallStatus): T {
    return (async (telephonySessionId: string, ...args: unknown[]) => {
      const info = this.getCallMetaInfo(telephonySessionId);
      // ensure that still be there and not disabled already
      if (info && !info.actionsDisabled) {
        this.updateCallMetaInfo(telephonySessionId, {
          actionsDisabled: true,
        });
      }

      // in need preinsert client status
      if (preinsertClientStatus) {
        this._preinsertCall.setPreinsert(
          telephonySessionId,
          preinsertClientStatus,
        );
      }

      try {
        return await cb(telephonySessionId, ...args);
      } finally {
        const info = this.getCallMetaInfo(telephonySessionId);
        // ensure that still be disabled
        if (info && info.actionsDisabled) {
          this.updateCallMetaInfo(telephonySessionId, {
            actionsDisabled: false,
          });
        }
      }
    }) as T;
  }

  @delegate('server')
  async close(telephonySessionId: string) {
    // Call the onBeforeClose callback if provided
    if (this._callActionOptions?.onBeforeClose) {
      // Get the session to extract the sessionId (not telephonySessionId)
      const session =
        this._activeCallControl.getActiveSession(telephonySessionId);
      const sessionId = session?.sessionId;

      if (sessionId) {
        await this._callActionOptions.onBeforeClose(sessionId);
      }
    }

    this._updateCallMetaInfo(telephonySessionId, {
      open: false,
    });
    this._callViewState._setView('hidden');
  }

  @action
  _remove(telephonySessionId: string) {
    delete this._callMetaInfoMap[telephonySessionId];
    if (this.latestOpenCallTelephonySessionId === telephonySessionId) {
      this._setLatestOpenCallTelephonySessionId(null);
    }

    const activeSessionId = this._activeCallControl.activeSessionId;
    const allCalls = this._callMonitor.allCalls;

    if (activeSessionId === telephonySessionId) {
      this._activeCallControl.removeActiveSession();

      // when still have exist call, make the latest one as active, because that is the latest(time) call
      if (allCalls.length > 0) {
        this._activeCallControl.setActiveSessionId(
          allCalls[allCalls.length - 1].telephonySessionId!,
        );

        if (this._callViewState.view === 'hidden') {
          this._callViewState._setView('activeCall');
        }
      }
    }
  }

  @delegate('server')
  async remove(telephonySessionId: string) {
    this._remove(telephonySessionId);
  }

  @delegate('server')
  async toggle(telephonySessionId: string) {
    this._updateCallMetaInfo(telephonySessionId, {
      open: this.getCallMetaInfo(telephonySessionId)?.open ? false : true,
    });
  }

  @action
  private _openAndNavigate(
    telephonySessionId: string,
    metaInfo: Partial<CallMetaInfo> | null,
    options: OpenAndNavigateOptions = {},
  ) {
    const { closeOtherActives = true, view } = options;
    this.logger.log('openAndNavigate', {
      telephonySessionId,
      metaInfo,
      options,
    });
    const currentMetaInfo =
      this.getAllInfoByTelephonySessionId(telephonySessionId);

    const ringing = isRingingCall(currentMetaInfo?.call);

    // when ringing always close other ringing calls, we currently only support one ringing call show
    if (ringing) this._closeAllIncomingCalls();

    if (closeOtherActives) {
      // when open a call, close all exist opened not ringing calls
      this.allCallInfoList.forEach(({ call, meta }) => {
        const ringing = call && isRingingCall(call);
        // when ringing and be minimized, should not close
        if (ringing && meta?.minimized) return;

        const id = call?.telephonySessionId!;

        if (meta && meta.open) {
          this._updateCallMetaInfo(id, { open: false });
        }
      });
    }

    if (view) {
      this._callViewState._setView(view);
    }

    this._updateCallMetaInfo(telephonySessionId, {
      open: true,
      ...metaInfo,
    });
  }

  @delegate('server')
  async openAndNavigate(
    telephonySessionId: string,
    metaInfo: Partial<CallMetaInfo> | null,
    options?: OpenAndNavigateOptions,
  ) {
    this._openAndNavigate(telephonySessionId, metaInfo, options);
  }

  @computed
  get isAnyCallOpened() {
    return this.allCallInfoList.some(({ meta }) => meta?.open);
  }

  get displayCallsMap() {
    return this._callMonitor.getDeviceCallsMaps('allDevices');
  }

  @computed
  get displayCallList(): Call[] {
    return [
      ...this.displayCallsMap.ringing,
      ...this.displayCallsMap.holding,
      ...this.displayCallsMap.active,
    ];
  }

  /**
   * all info multiple calls
   */
  @computed
  get allCallInfoList() {
    return this._callMonitor.allCalls.map((call) =>
      this.getAllInfoByTelephonySessionId<true>(call.telephonySessionId!),
    );
  }

  @computed
  get preInsertCallInfoList() {
    return this._preinsertCall.preinsertCalls.map((call) => {
      const isInbound = call.direction === 'Inbound';
      const meta = this.getCallMetaInfo(call.telephonySessionId!) || {
        open: true,
        currentPath: isInbound ? 'incoming' : 'controls',
        minimized: isInbound
          ? this.existRingingOpenCallMetaInfo?.meta?.minimized ?? true
          : false,
        actionsDisabled: true,
        expanded: null,
      };

      return {
        call,
        meta,
      };
    });
  }

  @computed
  get ringingCallInfoList() {
    return this.displayCallsMap.ringing
      .map((call) =>
        this.getAllInfoByTelephonySessionId<true>(call.telephonySessionId!),
      )
      .filter((x) => x.meta);
  }

  @computed
  get activeCallInfo() {
    return this._activeCallControl.activeSessionId
      ? this.getAllInfoByTelephonySessionId(
          this._activeCallControl.activeSessionId,
        )
      : undefined;
  }

  /**
   *  when ringing call => active call, there will have a little time gap, info be undefined which will cause the expanded layout jump a little, so keep use the lasted ringing id for the display call info
   */
  private getLastedRingingTelephonySessionId = lastAvailableValue(() => {
    const ringingCall = this.displayCallsMap.ringing[0];
    return ringingCall?.telephonySessionId;
  });
  /**
   * be private, only use in `displayCallAllInfo` to got the telephonySessionId, because the display call info will need also base on the minimized state, should only use inside this module
   *
   * use ɵ prefix to make that hard to use outside
   *
   * # always use `displayCallAllInfo` to get the correct display call info
   */
  @computed
  private get ɵ_displayTelephonySessionId() {
    const displayId =
      this._activeCallControl.activeSessionId ||
      this.getLastedRingingTelephonySessionId();

    if (displayId) return displayId;

    // when no active call, no ringing call, use the first call in the list to avoid exist call be hidden
    if (this.allCallInfoList.length > 0)
      return this.allCallInfoList[0].call?.telephonySessionId;

    return undefined;
  }

  /**
   * the current display call info, which will be used in the display call layout, and top indicator layout
   *
   * use during the call connect process
   */
  @computed
  get displayCallAllInfo() {
    const currTelephonySessionId = this.ɵ_displayTelephonySessionId;
    if (!currTelephonySessionId) return null;

    const info = this.getAllInfoByTelephonySessionId(currTelephonySessionId);

    if (!info || !info.meta) return null;

    return info;
  }

  /**
   * the call data during the call connect and after the call disconnect
   *
   * always use in call log form view
   */
  @computed
  get displayFormCall() {
    if (this._callViewState.callDetailCallLog) {
      return this._callViewState.callDetailCallLog;
    }

    if (this._callViewState.view === 'postCall') {
      return this._callViewState.postCallCallLog;
    }

    const displayCallAllInfo = this.displayCallAllInfo;
    if (displayCallAllInfo?.meta?.open) {
      return displayCallAllInfo.call;
    }
  }

  isFullSizeDisplayCall(telephonySessionId: string) {
    const callMetaInfo = this.getCallMetaInfo(telephonySessionId);

    return callMetaInfo && !callMetaInfo.minimized && callMetaInfo.open;
  }

  @computed
  get latestOpenedCallInfo() {
    return this.latestOpenCallTelephonySessionId
      ? this.getAllInfoByTelephonySessionId(
          this.latestOpenCallTelephonySessionId,
        )
      : undefined;
  }

  get callActionsDisabled() {
    return (
      !this._connectivityMonitor.connectivity ||
      this._activeCallControl._rateLimiter?.restricted ||
      false
    );
  }

  @computed
  get existRingingOpenCallMetaInfo() {
    return this.ringingCallInfoList.find((callInfo) => callInfo.meta?.open);
  }

  @computed
  get connectingCalls() {
    return this.allCallInfoList.filter((x) => x.call);
  }

  @computed
  get announcementInfo() {
    const displayCallAllInfo = this.displayCallAllInfo;
    const firstInfo = this.connectingCalls[0];

    return displayCallAllInfo?.call ? displayCallAllInfo : firstInfo;
  }

  get hasHiddenCalls() {
    const displayCount =
      this.allCallInfoList.length -
      (this.existRingingOpenCallMetaInfo?.meta?.minimized ? 1 : 0) -
      (this.announcementInfo?.meta?.open ? 1 : 0);

    return displayCount >= 1;
  }

  /**
   * active call actions
   */
  @computed
  get onActiveActions() {
    return this.createActionsHandler(this._activeCallControl.activeSessionId);
  }

  get enableSmartNotes() {
    return (
      // if project not provide the brandAllowsSmartNotes, default to true
      (this._callActionOptions?.brandAllowsSmartNotes ?? true) &&
      !!this._smartNotes &&
      this._smartNotes.hasPermission
    );
  }

  get isCurrentAiNotesLoading() {
    return !!this._smartNoteClient && this._smartNoteClient.isAiNotesLoading;
  }

  get isCurrentAiNotesPauseable() {
    return !!this._smartNoteClient && this._smartNoteClient.isAiNotesPauseable;
  }

  get expandedAbility() {
    return this._callActionOptions?.expandedAbility ?? true;
  }

  @dynamic('SmartNotes')
  protected readonly _smartNotes?: SmartNotes;

  @dynamic('SmartNoteClient')
  protected readonly _smartNoteClient?: SmartNoteClient;

  constructor(
    private _root: Root,
    private _callViewState: CallViewState,
    private _conferenceCallAction: ConferenceCallAction,
    private _switchCallConfirm: SwitchCallConfirm,
    private _callMonitor: CallMonitor,
    private _preinsertCall: PreinsertCall,
    private _connectivityMonitor: ConnectivityMonitor,
    private _activeCallControl: ActiveCallControl,
    private _toast: Toast,
    private _router: RouterPlugin,
    private _portManager: PortManager,
    @optional() protected _webphone?: Webphone,
    @optional('CallActionOptions')
    protected _callActionOptions?: CallActionOptions,
  ) {
    super();

    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      throw new Error('This module is only for spring-ui');
    }
  }

  @action
  _navigateToActive(telephonySessionId: string) {
    const allInfo = this.getAllInfoByTelephonySessionId(telephonySessionId);

    if (allInfo) {
      const { call } = allInfo;
      this._callViewState._setView('activeCall');

      const ringing = isRingingCall(call);

      this._activeCallControl.setActiveSessionId(telephonySessionId);

      this._openAndNavigate(telephonySessionId, {
        currentPath: ringing ? 'incoming' : 'controls',
        // always not minimized when navigate to active call
        minimized: false,
      });
      return;
    }

    this.logger.info(` No active session found.`);
  }

  @delegate('server')
  async navigateToActive(telephonySessionId: string) {
    this._navigateToActive(telephonySessionId);
  }

  /**
   * swap call
   *
   * 1. unhold the target call if the call is holing
   * 2. switch the view to the target call
   */
  @delegate('server')
  async swap(telephonySessionId: string) {
    const allInfo = this.getAllInfoByTelephonySessionId(telephonySessionId);

    if (allInfo?.call && isHoldingCall(allInfo?.call)) {
      this.actions.unhold(telephonySessionId);
    }

    this._navigateToActive(telephonySessionId);
  }

  private async _mergeCallsProcess(
    telephonySessionId: string,
    toMergeWithTelephonySessionId: string,
  ) {
    const control = this._activeCallControl;
    const mergeCalls = this.processing(control.mergeCalls.bind(control));

    const mergeId = await this._conferenceCallAction.mergeConfirmProcess(
      toMergeWithTelephonySessionId,
    );

    this.logger.log(`mergeCallsProcess`, {
      telephonySessionId,
      toMergeWithTelephonySessionId,
      mergeId,
    });

    if (!mergeId || !telephonySessionId) return;

    return mergeCalls(telephonySessionId, mergeId);
  }

  @delegate('server')
  async mergeCallsProcess(
    telephonySessionId: string,
    toMergeWithTelephonySessionId: string,
  ) {
    const conferenceTelephonySessionId = await this._mergeCallsProcess(
      telephonySessionId,
      toMergeWithTelephonySessionId,
    );

    if (!conferenceTelephonySessionId) return;

    this.logger.log(
      `mergeCallsProcess success, navigate`,
      conferenceTelephonySessionId,
    );

    const info = this.getCallMetaInfo(conferenceTelephonySessionId);

    if (info) {
      this._navigateToActive(conferenceTelephonySessionId);
    }
  }

  @delegate('server')
  async hangUpProcess(telephonySessionId: string) {
    const control = this._activeCallControl;

    const hangUp = this.processing(control.hangUp.bind(control), 'end');
    const isConferenceCall = await control.checkIfConferenceCall(
      telephonySessionId,
    );

    if (isConferenceCall && control.enableLeaveConferenceAsHost) {
      const hangupOnlyHost =
        await this._conferenceCallAction.leaveConfirmProcess();

      if (typeof hangupOnlyHost === 'boolean') {
        hangUp(telephonySessionId, hangupOnlyHost);
      }

      return;
    }

    await hangUp(telephonySessionId);
  }

  @delegate('server')
  async switchProcess(telephonySessionId: string) {
    const control = this._activeCallControl;

    const switchFn = this.processing(control.switch.bind(control));

    const result = await this._switchCallConfirm.confirmProcess(
      telephonySessionId,
    );

    if (!result) return;

    const success = await switchFn(telephonySessionId);

    if (success) {
      await this.openAndNavigate(
        telephonySessionId,
        {
          currentPath: 'controls',
          minimized: false,
        },
        {
          view: 'activeCall',
        },
      );
    }
  }

  @delegate('server')
  async checkReachToMaxExistCalls() {
    if (this._callMonitor.allCalls.length >= MAX_EXIST_CALLS_COUNT) {
      this._toast.danger({
        message: t('maxExistCallsError', {
          count: MAX_EXIST_CALLS_COUNT - 1,
        }),
        allowDuplicates: false,
      });
      return true;
    }
    return false;
  }

  /**
   * all possible actions that use for user interaction
   */
  actions = (() => {
    const control = this._activeCallControl;

    return {
      ignore: this.processing(control.ignore.bind(control), 'ignore'),
      ignoreQueue: this.processing(control.ignore.bind(control), 'end'),
      reject: this.processing(control.reject.bind(control), 'end'),
      endAndAnswer: this.processing(control.answerAndEnd.bind(control)),
      holdAndAnswer: this.processing(control.answerAndHold.bind(control)),
      answer: this.processing(control.answer.bind(control)),
      hold: this.processing(control.hold.bind(control)),
      unhold: this.processing(control.unhold.bind(control)),
      mute: this.processing(control.mute.bind(control)),
      unmute: this.processing(control.unmute.bind(control)),
      hangUp: this.hangUpProcess.bind(this),
      startRecord: this.processing(control.startRecord.bind(control)),
      stopRecord: this.processing(control.stopRecord.bind(control)),
      switch: this.switchProcess.bind(this),
      transfer: this.processing(
        (telephonySessionId: string, transferNumber: string) =>
          control.transfer(transferNumber, telephonySessionId),
      ),
      transferToVoicemail: this.processing(
        (telephonySessionId: string, voicemailId: string) =>
          control.toVoicemail(voicemailId, telephonySessionId),
      ),
      flip: this.processing((telephonySessionId: string, flipValue: string) =>
        control.flip(flipValue, telephonySessionId),
      ),
      startWarmTransfer: this.processing(
        (telephonySessionId: string, transferNumber: string) =>
          control.startWarmTransfer(transferNumber, telephonySessionId),
      ),
      replyWithMessage: this.processing(
        (telephonySessionId: string, params: ReplyWithTextParams) =>
          control.replyWithMessage(params, telephonySessionId),
      ),
      forward: this.processing(
        (telephonySessionId: string, forwardNumber: string) =>
          control.forward(forwardNumber, telephonySessionId),
      ),
      sendDTMF: control.sendDTMF.bind(control),
      completeWarmTransfer: this.processing(
        control.completeWarmTransfer.bind(control),
      ),
      removeConferenceParticipant: this.processing(
        control.removeConferenceParticipant.bind(control),
      ),
      mergeCalls: this.mergeCallsProcess.bind(this),
      navigateToReply: (telephonySessionId: string) =>
        this.openAndNavigate(
          telephonySessionId,
          { currentPath: 'reply', minimized: false },
          { view: 'activeCall' },
        ),
      navigateToForward: (telephonySessionId: string) =>
        this.openAndNavigate(
          telephonySessionId,
          { currentPath: 'forward', minimized: false },
          { view: 'activeCall' },
        ),
      navigateToTransfer: (telephonySessionId: string) =>
        this.openAndNavigate(
          telephonySessionId,
          { currentPath: 'transfer' },
          { view: 'activeCall' },
        ),
      navigateToKeypad: (telephonySessionId: string) =>
        this.openAndNavigate(
          telephonySessionId,
          { currentPath: 'keypad' },
          { view: 'activeCall' },
        ),
      navigateToActive: this.navigateToActive.bind(this),
      swap: this.swap.bind(this),
      navigateToAddCall: () => this._callViewState.setView('addCall'),
      navigateToCallList: () => this._callViewState.setView('callList'),
      close: this.close.bind(this),
    };
  })();

  toggleExpanded = this.expandedAbility
    ? (telephonySessionId: string) => {
        this.updateCallMetaInfo(telephonySessionId, {
          expanded: !this._root.expanded,
        });
      }
    : undefined;

  /**
   * create all actions handler during the call by `telephonySessionId`
   *
   * @param telephonySessionId
   */
  createActionsHandler = (telephonySessionId?: string | null) => {
    const actions = this.actions;

    return async <T extends CallActionType>(
      actionType: T,
      value?: CallActionTypeDataMap[T],
    ) => {
      this.logger.log(`call action`, {
        telephonySessionId,
        actionType,
        value,
      });

      if (telephonySessionId) {
        this.pushCallActionHistory(telephonySessionId, actionType);

        switch (actionType) {
          case 'mute':
            await actions.mute(telephonySessionId);
            break;
          case 'unmute':
            await actions.unmute(telephonySessionId);
            break;
          case 'answer':
            await actions.answer(telephonySessionId);
            break;
          case 'voicemail':
            await actions.reject((value as string) || telephonySessionId);
            break;
          case 'hangUp':
          case 'hangUpWarmTransfer':
            await actions.hangUp((value as string) || telephonySessionId);
            break;
          case 'ignore':
            await actions.ignore(telephonySessionId);
            break;
          case 'ignoreQueue':
            await actions.ignoreQueue(telephonySessionId);
            break;
          case 'hold':
            await actions.hold(telephonySessionId);
            break;
          case 'unHold':
            await actions.unhold((value as string) || telephonySessionId);
            break;
          case 'endAndAnswer':
            await actions.endAndAnswer(telephonySessionId);
            break;
          case 'holdAndAnswer':
            await actions.holdAndAnswer(telephonySessionId);
            break;
          case 'forward':
            await actions.navigateToForward(telephonySessionId);
            break;
          case 'reply':
            await actions.navigateToReply(telephonySessionId);
            break;
          case 'keypad':
            await actions.navigateToKeypad(telephonySessionId);
            break;
          case 'transfer':
            await actions.navigateToTransfer(telephonySessionId);
            break;
          case 'add': {
            const hasReachedMaxCalls = await this.checkReachToMaxExistCalls();
            if (!hasReachedMaxCalls) {
              await actions.navigateToAddCall();
            }
            break;
          }
          case 'record':
            await actions.startRecord(telephonySessionId);
            break;
          case 'stopRecord':
            await actions.stopRecord(telephonySessionId);
            break;
          case 'flip':
            if (!value) {
              this.logger.warn('[flip] must have value is empty');
              return;
            }

            await actions.flip(telephonySessionId, value as string);
            break;
          case 'sendDTMF':
            if (!value) {
              this.logger.warn('[sendDTMF] must have value is empty');
              return;
            }

            await actions.sendDTMF(value as string, telephonySessionId);
            break;
          case 'startSwap':
            await actions.swap((value as string) || telephonySessionId);

            break;
          case 'activeCall':
            await actions.navigateToActive(
              (value as string) || telephonySessionId,
            );
            break;
          case 'callList':
            await actions.navigateToCallList();
            break;
          case 'back':
            // implementation of the back logic
            await actions.close(telephonySessionId);
            break;
          case 'startTransfer':
            if (!value) {
              this.logger.warn(
                '[startTransfer] must have value, but got empty',
              );
              return;
            }

            await actions.transfer(telephonySessionId, value as string);
            await this.updateCallMetaInfo(telephonySessionId, {
              currentPath: 'controls',
            });
            break;
          case 'startWarmTransfer':
            if (!value) {
              this.logger.warn(
                '[startWarmTransfer] must have value, but got empty',
              );
              return;
            }

            await actions.startWarmTransfer(
              telephonySessionId,
              value as string,
            );
            await this.updateCallMetaInfo(telephonySessionId, {
              currentPath: 'controls',
            });
            break;
          case 'startTransferToVoicemail':
            if (!value) {
              this.logger.warn(
                '[startTransferToVoicemail] must have value, but got empty',
              );
              return;
            }

            await actions.transferToVoicemail(
              telephonySessionId,
              value as string,
            );
            break;

          case 'completeWarmTransfer':
            await actions.completeWarmTransfer(telephonySessionId);
            break;
          case 'startReply':
            await actions.replyWithMessage(
              telephonySessionId,
              value as ReplyWithTextParams,
            );
            break;
          case 'startForward':
            await actions.forward(telephonySessionId, value as string);
            break;
          case 'merge':
            {
              if (this.mergeCalls.length > 1) {
                this.mergeMenuOpened$.next(true);
                return;
              }

              if (this.mergeCalls.length === 1) {
                await actions.mergeCalls(
                  telephonySessionId,
                  this.mergeCalls[0].telephonySessionId!,
                );
              }
            }
            break;
          case 'startMerge':
            {
              const toMergeWithTelephonySessionId = value as string;

              await actions.mergeCalls(
                telephonySessionId,
                toMergeWithTelephonySessionId,
              );
            }
            break;
          case 'viewConferenceList':
            this._conferenceCallAction.openParticipantsList(telephonySessionId);
            break;
          case 'removeParticipant':
            await this.actions.removeConferenceParticipant(
              telephonySessionId,
              value as string,
            );
            break;
          case 'switch':
            await this.actions.switch(telephonySessionId);
            break;
          case 'aiNotes':
            await this._smartNotes?.verifySessionFromId(telephonySessionId);
            return await this._smartNoteClient?.startOrResume();
          case 'stopNotes':
            return await this._smartNoteClient?.stopNotes();
            break;
          default:
            this.logger.warn(`un handle "${actionType}" action`, {
              value,
              telephonySessionId,
            });
            break;
        }
      } else {
        switch (actionType) {
          case 'callList':
            await actions.navigateToCallList();
            break;
          case 'activeCall':
            await actions.navigateToActive(value as string);
            break;
          default:
            this.logger.warn(
              `no telephonySessionId, can't handle "${actionType}" action`,
              { value },
            );
            break;
        }
      }
    };
  };

  fromCallAllInfo(telephonySessionId: string) {
    return fromWatchValue(this, () =>
      this.getAllInfoByTelephonySessionId(telephonySessionId),
    );
  }

  /**
   * from post call page, let us know the event is from post call page
   */
  fromPostCall = false;
  /**
   * when inside history page, leave history page to avoid user see two post call page(one is from history page, one is from post call page)
   */
  private async leaveCallingRoute() {
    const result = await this.getPreviousPathAndIndex();

    // to avoid during above the getPreviousPathAndIndex, the router path is not calling page, so we need to check the current path is calling page
    if (this._router.currentPath !== CALLING_ROUTE_PATH) {
      this.logger.log('already leave calling page, do nothing');
      return;
    }

    const previousPath = result[0];
    let previousPathIndex = result[1];

    if (this.fromPostCall) {
      this.fromPostCall = false;

      // only keep one call log detail page in route history
      const callLogDetailReg = new RegExp('^/history/.*');
      const insideHistory = callLogDetailReg.test(previousPath);

      if (insideHistory) {
        // when in history page, to avoid user see two post call page, go to previous page
        this.logger.log('inside history, leave call history page');

        previousPathIndex++;
        const cachedHistory =
          result[2]
            // clone the array to avoid modify the original array
            ?.slice()
            ?.splice(previousPathIndex) || [];

        const validatePathIndex = cachedHistory?.findIndex((x: any) => {
          const pathname = x['pathname'] || x['location']?.pathname;
          return (
            // find the pathname that is not history page and not calling page
            !callLogDetailReg.test(pathname) && pathname !== CALLING_ROUTE_PATH
          );
        });

        previousPathIndex += validatePathIndex;
        // when in history page, to avoid user see two post call page, go to previous page
        this.logger.log(
          'find the pathname that is not history page and not calling page',
          {
            previousPathIndex,
            validatePathIndex,
            pathname: cachedHistory[validatePathIndex],
          },
        );
      } else {
        // when in history page, to avoid user see two post call page, go to previous page
        this.logger.log('not inside history, go to previous page', {
          previousPathIndex,
        });
      }
    }

    await this._router.go(-previousPathIndex);
  }

  @delegate('server')
  private async getPreviousPathAndIndex() {
    try {
      // in shared worker structure, get the path from worker
      if (this._portManager.shared) {
        const cachedHistory: { location: { pathname: string } }[] =
          this._router['cachedHistory'];

        const nonCallingHistoryIndex = cachedHistory.findIndex(
          (x) => x.location.pathname !== CALLING_ROUTE_PATH,
        );

        if (nonCallingHistoryIndex !== -1) {
          return [
            cachedHistory[nonCallingHistoryIndex].location.pathname,
            nonCallingHistoryIndex,
            cachedHistory,
          ] as const;
        }
      } else {
        // in normal mode, get the path from history directly
        const historyEntries = (this._router['history'] as any)['entries'] as {
          pathname: string;
        }[];

        // the historyEntries is in reverse order, so we need to reverse it
        const historyList = [...historyEntries].reverse();
        const previousPathIndex = historyList.findIndex(
          (x) => x.pathname !== CALLING_ROUTE_PATH,
        );

        if (previousPathIndex !== -1) {
          return [
            historyList[previousPathIndex].pathname,
            previousPathIndex,
            historyList,
          ] as const;
        }
      }
    } catch (error) {
      this.logger.warn('getPreviousPath failed', error);
    }

    return ['', 0] as const;
  }

  // remember the history in server port
  @delegate('server')
  private async pushCallActionHistory(
    telephonySessionId: string,
    actionType: CallActionType,
  ) {
    const info = this.getAllInfoByTelephonySessionId(telephonySessionId);
    const action = mapActionTypeToCallActions(actionType);
    const call = info?.call;

    if (call?.telephonySessionId && action) {
      const events =
        this.callActionEventsHistoryMap.get(call.telephonySessionId) || [];

      events.push(action);

      this.callActionEventsHistoryMap.set(call.telephonySessionId, events);
    }
  }

  trackCallEventResult(call: Call) {
    if (process.env.NODE_ENV !== 'production') {
      if (this._portManager.shared && !this._portManager.isServer) {
        console.warn(
          'trackCallEventResult should not be called in client port',
        );
      }
    }

    try {
      if (call && call.telephonySessionId) {
        const isInbound = isInboundCall(call);
        const callFrom = call.from || {};
        const callTo = call.to || {};

        const extensionNumber = isInbound
          ? callFrom.extensionNumber
          : callTo.extensionNumber;

        const phoneNumber = isInbound
          ? callFrom.phoneNumber
          : callTo.phoneNumber;

        const matches = isInbound ? call.fromMatches : call.toMatches;
        const thirdPartyMatches = call.callSelectionInfo?.selections;
        const callContactMatch: CallContactMatch[] = [];
        if (thirdPartyMatches && thirdPartyMatches.length > 0) {
          callContactMatch.push('3rd party contact matched');
        }
        if (matches && matches.length > 0) {
          callContactMatch.push('RC contact matched');
        }

        const callActions =
          this.callActionEventsHistoryMap.get(call.telephonySessionId) || [];
        // after track, clear the history
        this.callActionEventsHistoryMap.delete(call.telephonySessionId);

        trackEvent('Int_Phone_callEventResult', {
          callDirection: isInbound ? 'Inbound' : 'Outbound',
          callNumberType:
            !extensionNumber && !phoneNumber
              ? 'Anonymous'
              : extensionNumber
              ? 'Extension'
              : 'PSTN',
          callContactMatch,
          callActions,
          callQueueCall: isQueueCall(call),
          // when call end the duration still not ready from server, so use the start time to calculate the duration
          callDuration: call.startTime
            ? Math.floor((Date.now() - call.startTime) / 1000)
            : -1,
        });
      }
    } catch (error) {
      // track only add try catch to avoid the error throw effect the app process
    }
  }

  @computed
  get fullScreenCallActionOpened() {
    const displayMeta = this.displayCallAllInfo?.meta;
    const view = this._callViewState.view;

    const fullScreenOpened =
      view !== 'hidden' &&
      ((displayMeta && displayMeta.open && !displayMeta.minimized) ||
        view === 'callList' ||
        view === 'addCall' ||
        view === 'postCall');

    return fullScreenOpened;
  }

  /**
   * when call action full screen opened
   */
  fullScreenCallActionOpened$ = merge(
    // when router path is not /calling, close the display call
    fromWatchValue(this, () => this._router.currentPath).pipe(
      switchMap(async (path) => {
        if (this.displayCallAllInfo && path !== CALLING_ROUTE_PATH) {
          const telephonySessionId =
            this.displayCallAllInfo.call?.telephonySessionId;
          if (
            telephonySessionId &&
            // when that is minimized, don't close the call, that mean the call on the top of screen
            this.displayCallAllInfo.meta?.open &&
            !this.displayCallAllInfo.meta?.minimized
          ) {
            await this.close(telephonySessionId);
          }
        }
      }),
      switchMap(() => NEVER),
    ),
    combineLatest([
      // also listen the telephony id change event, if id change should also check does that still inside the calling page
      // TODO: we may add the telephonySessionId into the calling path
      this.displayCallTelephonyIdChange$,
      fromWatchValue(this, () => this.fullScreenCallActionOpened),
    ]).pipe(
      concatMap(async ([_, opened]) => {
        if (opened) {
          if (this._router.currentPath !== CALLING_ROUTE_PATH) {
            this.logger.log('push to calling page');
            await this._router.push(CALLING_ROUTE_PATH);
          }
        } else {
          if (
            // when that is calling route
            this._router.currentPath === CALLING_ROUTE_PATH
          ) {
            this.logger.log('go back from calling page', {
              fromPostCall: this.fromPostCall,
            });
            await this.leaveCallingRoute();
          }
        }
      }),
    ),
  ).pipe(share());
}

export type CreateActionsHandler = InstanceType<
  typeof CallAction
>['createActionsHandler'];

export type OnCallActionType = ReturnType<CreateActionsHandler>;
