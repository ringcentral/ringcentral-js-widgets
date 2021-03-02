import {
  action,
  computed,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { keys } from 'ramda';
import { Module } from 'ringcentral-integration/lib/di';
import { CallLogPanelProps } from 'ringcentral-widgets/components/CallLogPanel';

import {
  dialoutStatuses,
  EvTransferType,
  logTypes,
  MessageTypes,
  messageTypes,
  tabManagerEvents,
  transferTypes,
} from '../../enums';
import {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
  EvCurrentLog,
  CallLogMethods,
  SaveStatus,
  saveStatus,
} from '../../interfaces/EvActivityCallUI.interface';
import { EvIvrData } from '../../interfaces/EvData.interface';
import { EvBaggage } from '../../lib/EvClient';
import { ActivityCallUI, Deps } from './EvActivityCallUI.interface';
import i18n from './i18n';

type FormState = {
  validated?: Partial<EvActivityCallUI['validated']>;
  required?: Partial<EvActivityCallUI['required']>;
  disabled?: Partial<EvActivityCallUI['disabled']>;
};

@Module({
  name: 'EvActivityCallUI',
  deps: [
    'Locale',
    'Alert',
    'ActiveCallControl',
    'EvCallMonitor',
    'EvCall',
    'EvAgentScript',
    'EvRequeueCall',
    'EvTransferCall',
    'EvCallDisposition',
    'EvWorkingState',
    'EvAgentSession',
    'EvIntegratedSoftphone',
    'RouterInteraction',
    'ConnectivityMonitor',
    'RateLimiter',
    'Environment',
    'Storage',
    'EvAuth',
    { dep: 'TabManager', optional: true },
    { dep: 'EvActivityCallUIOptions', optional: true },
  ],
})
class EvActivityCallUI<T = {}>
  extends RcUIModuleV2<Deps & T>
  implements ActivityCallUI {
  public isFirstTimeHandled = false;

  /** Is the call pick up directly */
  pickUpDirectly = true;

  protected openAgentScriptTab() {
    console.warn('this should be implement in extend module');
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvActivityCallUI',
    });
  }

  @storage
  @state
  validated = {
    dispositionId: true,
    notes: true,
  };

  @storage
  @state
  required = {
    notes: false,
  };

  @storage
  @state
  disabled: any = {};

  @storage
  @state
  saveStatus: SaveStatus | CallLogMethods = saveStatus.submit;

  @storage
  @state
  scrollTo: string = null;

  get callId() {
    return this._deps.evCall.activityCallId;
  }

  get disableLinks() {
    return (
      !this._deps.connectivityMonitor.connectivity ||
      this._deps.rateLimiter.throttling
    );
  }

  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  get currentEvCall() {
    return this._deps.evCall.currentCall;
  }

  // TODO: should check with outbound call
  get isInComingCall() {
    return this._deps.evCall.isInbound && !this.pickUpDirectly;
    // currentSession.callStatus === telephonyStatuses.ringing
  }

  // transferCall and requeueCall are two parts of transfer menu
  get allowTransfer() {
    return (
      this._deps.evTransferCall.allowTransferCall ||
      this._deps.evRequeueCall.allowRequeueCall
    );
  }

  @computed((that: EvActivityCallUI) => [
    that._deps.evTransferCall.allowTransferCall,
    that._deps.evRequeueCall.allowRequeueCall,
    that.currentEvMainCall,
  ])
  get currentCallControlPermission() {
    return {
      allowTransferCall: this._deps.evTransferCall.allowTransferCall,
      allowRequeueCall: this._deps.evRequeueCall.allowRequeueCall,
      allowHoldCall: this.currentEvMainCall?.allowHold,
      allowHangupCall: this.currentEvMainCall?.allowHangup,
    };
  }

  @computed((that: EvActivityCallUI) => [that.currentEvCall])
  get dispositionPickList() {
    return (
      this.currentEvCall?.outdialDispositions?.dispositions?.map((item) => ({
        ...item,
        label: item.disposition,
        value: item.dispositionId,
      })) || []
    );
  }

  // TODO add `callDisposition` in CallLog
  @computed((that: EvActivityCallUI) => [
    that.callId,
    that.currentEvCall,
    that._deps.evCallDisposition.callsMapping[that.callId],
    that.validated,
    that.required,
    that._deps.locale.currentLocale,
    that.dispositionPickList,
  ])
  get activityCallLog(): EvCurrentLog {
    const {
      callId,
      currentEvCall: currentCall,

      validated,
      required,
    } = this;

    const callDisposition = this._deps.evCallDisposition.callsMapping[
      this.callId
    ];

    if (!currentCall) {
      return undefined;
    }
    const { callType, dnis, uii, ani, queueDts, agentId } = currentCall;

    // TODO confirm about  dialDest or dnis?
    const fromNumber = callType === 'OUTBOUND' ? dnis : ani;
    // TODO confirm about  dialDest or dnis?
    const toNumber = callType === 'OUTBOUND' ? ani : dnis;
    const { dispositionId, notes } = callDisposition || {};

    const dispositionPickList = this.dispositionPickList;

    return {
      currentEvRawCall: currentCall,
      // the call which maps for rc component
      call: {
        id: uii,
        direction: callType,
        from: {
          phoneNumber: fromNumber,
          name: fromNumber,
        },
        to: {
          phoneNumber: toNumber,
          name: toNumber,
        },
        telephonyStatus: 'CallConnected', // TODO handle with call state and agent state
        sessionId: currentCall.session.sessionId,
        telephonySessionId: uii,
        partyId: agentId,
        startTime: new Date(queueDts).getTime(),
        offset: 0,
        fromMatches: [],
        toMatches: [],
        activityMatches: [],
      },
      currentSessionId: callId,
      // TODO: this will be remove when api can using.
      currentLogCall: {
        isFailed: false,
        isAutoSave: false,
        isCreated: false,
        phoneNumber: currentCall.ani,
      },
      customLogFields:
        dispositionPickList.length === 0
          ? []
          : [
              {
                label: 'Notes',
                sort: 3,
                type: 'textarea',
                value: 'notes',
                maxLength: 32000,
                required: required.notes,
                error: !validated.notes,
                onChange: (value: string) => {
                  if (required.notes) {
                    this.changeFormStatus({ validated: { notes: !!value } });
                  } else {
                    this.changeFormStatus({ validated: { notes: true } });
                  }
                },
              },
              {
                label: 'Disposition',
                sort: 5,
                type: 'picklist',
                value: 'dispositionId',
                placeholder: i18n.getString(
                  'pleaseSelect',
                  this._deps.locale.currentLocale,
                ),
                required: true,
                picklistOptions: dispositionPickList,
                enableScrollError: true,
                error: !validated.dispositionId,
                helperText: !validated.dispositionId
                  ? i18n.getString(
                      'dispositionError',
                      this._deps.locale.currentLocale,
                    )
                  : undefined,
                onChange: (value: string) => {
                  const currentDisposition = dispositionPickList.find(
                    (item) => item.value === value,
                  );

                  const noteRequired =
                    currentDisposition && currentDisposition.requireNote;

                  this.changeFormStatus({
                    validated: {
                      dispositionId: !!value,
                      notes: !noteRequired || (noteRequired && !!notes),
                    },
                    required: {
                      notes: noteRequired,
                    },
                  });
                },
              },
            ],
      task: {
        dispositionId,
        notes,
      },
    };
  }

  @computed((that: EvActivityCallUI) => [
    that.currentEvCall,
    that.currentEvMainCall,
  ])
  get callStatus() {
    let status: EvActivityCallUIProps['status'] = 'active';

    if (this.currentEvCall?.endedCall) {
      status = 'callEnd';
    } else if (this.currentEvMainCall?.isHold) {
      status = 'onHold';
    }
    return status;
  }

  @computed((that: EvActivityCallUI) => [that.currentEvCall])
  get currentEvMainCall() {
    return this.currentEvCall
      ? this._deps.activeCallControl.getMainCall(this.currentEvCall.uii)
      : null;
  }

  @computed((that: EvActivityCallUI) => [
    that.callId,
    that._deps.evCallMonitor.callIds,
    that._deps.evCallMonitor.otherCallIds,
    that._deps.evCallMonitor.callsMapping,
  ])
  get callList() {
    const { callIds, otherCallIds, callsMapping } = this._deps.evCallMonitor;

    return this._deps.evCallMonitor.getActiveCallList(
      callIds,
      otherCallIds,
      callsMapping,
      this.callId,
    );
  }

  @computed((that: EvActivityCallUI) => [that.callList])
  get isMultipleCalls() {
    return this.callList.length > 2;
  }

  @computed((that: EvActivityCallUI) => [
    that.isMultipleCalls,
    that.callList,
    that._deps.evAuth.agentId,
    that.currentEvMainCall,
  ])
  get isOnHold() {
    const { isMultipleCalls, callList, currentEvMainCall } = this;
    if (isMultipleCalls) {
      return !!callList.find(
        (call) =>
          !(call.session.agentId === this._deps.evAuth.agentId) &&
          !!call.isHold,
      );
    }
    return currentEvMainCall?.isHold;
  }

  @computed((that: EvActivityCallUI) => [that.currentEvCall, that._deps.locale])
  get ivrAlertData() {
    const call = this.currentEvCall;
    const { currentLocale } = this._deps.locale;
    const ivrAlertData: EvIvrData[] = [];

    if (
      this._deps.environment.isWide &&
      this._deps.evAgentScript.getIsAgentScript(call)
    ) {
      ivrAlertData.push({
        subject: i18n.getString('agentScriptTitle', currentLocale),
        body: i18n.getString('agentScriptContent', currentLocale),
        onClick: () => this.openAgentScriptTab(),
      });
    }

    if (call?.baggage) {
      for (let i = 1; i <= 3; i++) {
        const ivrAlertSubject =
          call.baggage[`ivrAlertSubject_${i}` as keyof EvBaggage];
        const ivrAlertBody =
          call.baggage[`ivrAlertBody_${i}` as keyof EvBaggage];
        if (ivrAlertSubject || ivrAlertBody)
          ivrAlertData.push({
            subject: ivrAlertSubject || '',
            body: ivrAlertBody || '',
          });
      }
    }
    return ivrAlertData as EvIvrData[];
  }

  @action
  changeSavingStatus(status: SaveStatus | CallLogMethods) {
    this.saveStatus = status;
  }

  @action
  protected changeFormStatus({ validated, required, disabled }: FormState) {
    if (validated) {
      this.validated = {
        ...this.validated,
        ...validated,
      };
    }
    if (required) {
      this.required = {
        ...this.required,
        ...required,
      };
    }
    if (disabled) {
      this.disabled = {
        ...this.disabled,
        ...disabled,
      };
    }
  }

  @action
  setScrollTo(id: string) {
    this.scrollTo = id;
  }

  @action
  reset() {
    this.validated = {
      dispositionId: true,
      notes: true,
    };
    this.required = {
      notes: false,
    };
    this.disabled = {};
    this.saveStatus = saveStatus.submit;
  }

  onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      this._checkTabManagerEvent();
    }
  }

  onUpdateCallLog(
    { task }: Parameters<CallLogPanelProps['onUpdateCallLog']>[0],
    id: Parameters<CallLogPanelProps['onUpdateCallLog']>[1],
  ) {
    const isEvCallDisposition =
      Object.hasOwnProperty.call(task, 'dispositionId') ||
      Object.hasOwnProperty.call(task, 'notes');
    if (isEvCallDisposition) {
      const data = {
        ...this._deps.evCallDisposition.callsMapping[id],
        ...task,
      };
      this._deps.evCallDisposition.setDisposition(id, {
        dispositionId: data.dispositionId,
        notes: data.notes,
      });
    }
  }

  goToActivityCallPage = (id: string = this.callId) => {
    this._deps.routerInteraction.push(`/activityCallLog/${id}`);
  };

  goToActivityCallListPage = (id: string = this.callId) => {
    this._deps.routerInteraction.push(`/activityCallLog/${id}/activeCallList`);
  };

  goToRequeueCallPage() {
    const { gateGroupId, gateId } = this._deps.evCallMonitor.callsMapping[
      this.callId
    ].gate;
    this._deps.evRequeueCall.setStatus({
      selectedQueueGroupId: gateGroupId,
      selectedGateId: gateId,
      stayOnCall: false,
      requeuing: false,
    });
    this._deps.evTransferCall.changeTransferType(transferTypes.queue);
    this._redirectTransferCall('/transferCall');
  }

  goToTransferCallPage(type: EvTransferType) {
    this._deps.evTransferCall.resetTransferStatus();
    this._deps.evTransferCall.fetchAgentList();
    this._redirectTransferCall(`/transferCall/${type}`);
  }

  private _redirectTransferCall(url: string = '') {
    this._deps.routerInteraction.push(`/activityCallLog/${this.callId}${url}`);
  }

  goBack() {
    // set status to 'idle' in case of EvCallMonitor does not emit ENDED
    this._deps.evCall.setDialoutStatus(dialoutStatuses.idle);

    this._deps.routerInteraction.goBack();
    this.reset();
    this._deps.evCall.activityCallId = null;
  }

  async disposeCall() {
    this._deps.evCallDisposition.disposeCall(this.callId);

    const { evAgentScript } = this._deps;
    const call = this.currentEvCall;
    // evAgentScript.isDisplayAgentScript &&
    if (call.scriptId) {
      evAgentScript.setCurrentCallScript(null);
      evAgentScript.saveScriptResult(call);
    }
  }

  private _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    if (event) {
      // const data = event.args[0];
      switch (event.name) {
        case tabManagerEvents.CALL_DISPOSITION_SUCCESS:
          this._dispositionSuccess();
          break;
        default:
          break;
      }
    }
  }

  private _hasError() {
    return keys(this.validated).some((key) => {
      return !this.validated[key];
    });
  }

  private async _submitData(id: string) {
    try {
      const saveFields = this._deps.evCallDisposition.callsMapping[id];
      if (saveFields) {
        this.changeFormStatus({
          validated: {
            dispositionId: !!saveFields.dispositionId,
            notes:
              !this.required.notes || (saveFields.notes && this.required.notes),
          },
        });
      }

      if (this._hasError()) {
        return;
      }
      this.changeSavingStatus(saveStatus.saving);
      await this.disposeCall();

      this._sendTabManager(tabManagerEvents.CALL_DISPOSITION_SUCCESS);
      this._dispositionSuccess();
    } catch (e) {
      this._deps.alert.danger({
        message: logTypes.CALL_DISPOSITION_FAILURE,
        ttl: 0,
      });
      this.changeSavingStatus(saveStatus.submit);
      throw e;
    }
  }

  private _dispositionSuccess() {
    this.changeSavingStatus(saveStatus.saved);

    this._deps.alert.success({
      message: logTypes.CALL_DISPOSITION_SUCCESS,
    });
    // delay for animation with loading ui.
    setTimeout(() => this.goBack(), 1000);

    this._deps.evWorkingState.setIsPendingDisposition(false);
  }

  private _onHoldOrUnHold(type: 'hold' | 'unhold') {
    if (this.isMultipleCalls) {
      return this.goToActivityCallListPage();
    }
    this._deps.activeCallControl[type]();
  }

  private _sendTabManager(event: string, value?: any) {
    this._deps.tabManager?.send(event, value);
  }

  getUIProps({ id }: { id: string }): EvActivityCallUIProps {
    this._deps.evCall.activityCallId = id;

    return {
      scrollTo: this.scrollTo,
      currentLog: this.activityCallLog,
      showSmallCallControl: !this.activityCallLog?.currentEvRawCall?.endedCall,
      currentLocale: this._deps.locale.currentLocale,
      currentEvCall: this.currentEvCall,
      saveStatus: this.saveStatus,
      status: this.callStatus,
      isInbound: this._deps.evCall.isInbound,
      isOnMute: this._deps.evIntegratedSoftphone.muteActive,
      isOnHold: this.isOnHold,
      isOnActive: this.isMultipleCalls,
      isInComingCall: this.isInComingCall,
      smallCallControlSize: this._deps.environment.isWide ? 'medium' : 'small',
      currentCallControlPermission: this.currentCallControlPermission,
      disableDispose:
        this.disableLinks || this.saveStatus === saveStatus.saving,
      disableTransfer:
        this.disableLinks || this.isInComingCall || !this.allowTransfer,
      disableInternalTransfer:
        this.disableLinks ||
        this.isInComingCall ||
        !this.allowTransfer ||
        !this._deps.evTransferCall.allowInternalTransfer,
      disableHold:
        this.disableLinks ||
        this.isInComingCall ||
        !this.currentCallControlPermission.allowHoldCall,
      disableHangup:
        this.disableLinks || !this.currentCallControlPermission.allowHangupCall,
      disableMute:
        !this._deps.evAgentSession.isIntegratedSoftphone || this.disableLinks,
      showMuteButton: this._deps.evAgentSession.isIntegratedSoftphone,
      disableActive: this.disableLinks,
      ivrAlertData: this.ivrAlertData,
    };
  }

  getUIFunctions(): EvActivityCallUIFunctions {
    return {
      goBack: () => this.goBack(),
      onMute: () => this._deps.activeCallControl.mute(),
      onUnmute: () => this._deps.activeCallControl.unmute(),
      onHangup: () =>
        this._deps.activeCallControl.hangUp(
          this.currentEvCall.session.sessionId,
        ),
      onReject: () => this._deps.activeCallControl.reject(),
      onHold: () => this._onHoldOrUnHold('hold'),
      onUnHold: () => this._onHoldOrUnHold('unhold'),
      onActive: () => this.goToActivityCallListPage(),
      onUpdateCallLog: (data, id) => this.onUpdateCallLog(data, id),
      disposeCall: async () => {
        if (this.saveStatus === saveStatus.saved) {
          return this.goBack();
        }
        await this._submitData(this.callId);
      },
      onCopySuccess: (name) => {
        name = name.toUpperCase();
        this._deps.alert.info({
          message: messageTypes[`COPY_${name}_SUCCESS` as MessageTypes],
          action: '',
        });
      },
      goToRequeueCallPage: () => this.goToRequeueCallPage(),
      goToTransferCallPage: (transferType: EvTransferType) =>
        this.goToTransferCallPage(transferType),
    };
  }
}
export { EvActivityCallUI };
