import {
  action,
  createSelector,
  RcModuleState,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import { PickListOption } from 'ringcentral-widgets/components/CallLogFields';

import { EvTransferType, logTypes, transferTypes } from '../../enums';
import {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
  EvCurrentLog,
} from '../../interfaces/EvActivityCallUI.interface';
import { EvDisposition } from '../../lib/EvClient';
import {
  ActivityCallUI,
  DepsModules,
  State,
} from './EvActivityCallUI.interface';
import i18n from './i18n';

type FormState = {
  validated?: Partial<EvActivityCallUI['validated']>;
  required?: Partial<EvActivityCallUI['required']>;
  disabled?: Partial<EvActivityCallUI['disabled']>;
};

type EvActivityCallUIState = RcModuleState<EvActivityCallUI, State>;

@Module({
  name: 'EvActivityCallUI',
  deps: [
    'Locale',
    'Alert',
    'ActiveCallControl',
    'EvCallMonitor',
    'EvCall',
    'EvRequeueCall',
    'EvTransferCall',
    'EvCallDisposition',
    'EvWorkingState',
    'EvSessionConfig',
    'EvIntegratedSoftphone',
    'RouterInteraction',
    'ConnectivityMonitor',
    'RateLimiter',
    'Environment',
    'Storage',
    { dep: 'TabManager', optional: true },
    { dep: 'EvActivityCallUIOptions', optional: true },
  ],
})
class EvActivityCallUI<T = {}, K = {}>
  extends RcUIModuleV2<DepsModules & T, EvActivityCallUIState & K>
  implements ActivityCallUI {
  protected _lastSaveStatus?: EvActivityCallUIProps['saveStatus'];

  public isFirstTimeHandled = false;

  /** Is the call pick up directly */
  pickUpDirectly = true;

  constructor({
    locale,
    alert,
    activeCallControl,
    evCallMonitor,
    evCall,
    evCallDisposition,
    routerInteraction,
    evRequeueCall,
    evTransferCall,
    evWorkingState,
    evSessionConfig,
    evIntegratedSoftphone,
    connectivityMonitor,
    rateLimiter,
    environment,
    modules,
    storage,
    tabManager,
    enableCache = true,
    storageKey = 'EvActivityCallUI',
  }) {
    super({
      modules: {
        locale,
        alert,
        activeCallControl,
        evCallMonitor,
        evCall,
        evCallDisposition,
        routerInteraction,
        evRequeueCall,
        evTransferCall,
        evWorkingState,
        evSessionConfig,
        evIntegratedSoftphone,
        connectivityMonitor,
        rateLimiter,
        environment,
        storage,
        tabManager,
        ...modules,
      },
      enableCache,
      storageKey,
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
  saveStatus: EvActivityCallUIProps['saveStatus'] = 'submit';

  get callId() {
    return this._modules.evCall.activityCallId;
  }

  get disableLinks() {
    return (
      !this._modules.connectivityMonitor.connectivity ||
      this._modules.rateLimiter.throttling
    );
  }

  get currentEvCall() {
    return this._modules.evCall.getCurrentCall();
  }

  get isInbound() {
    return this.currentEvCall?.callType === 'INBOUND';
  }

  // TODO: should check with outbound call
  get isInComingCall() {
    return this.isInbound && !this.pickUpDirectly;
    // currentSession.callStatus === telephonyStatuses.ringing
  }

  // transferCall and requeueCall are two parts of transfer menu
  get allowTransfer() {
    return this.getAllowTransferCall() || this.getAllowRequeueCall();
  }

  getCurrentCallControlPermission = createSelector(
    () => this.getAllowTransferCall(),
    () => this.getAllowRequeueCall(),
    () => this.getCurrentEvMainCall(),
    (allowTransferCall, allowRequeueCall, currentEvMainCall) => {
      return {
        allowTransferCall,
        allowRequeueCall,
        allowHoldCall: currentEvMainCall?.allowHold,
        allowHangupCall: currentEvMainCall?.allowHangup,
        // TODO: allow mute feature
        allowMuteCall: true,
      };
    },
  );

  getAllowRequeueCall = createSelector(
    () => this.currentEvCall,
    (currentCall) => {
      return this._modules.evRequeueCall.checkAllowRequeue(currentCall);
    },
  );

  getAllowTransferCall = createSelector(
    () => this.currentEvCall,
    (currentCall) => {
      return this._modules.evTransferCall.checkAllowTransfer(currentCall);
    },
  );

  getDispositionPickList = createSelector(
    () => this.currentEvCall,
    (currentCall): (PickListOption & Partial<EvDisposition>)[] => {
      return (
        currentCall?.outdialDispositions?.dispositions?.map((item) => ({
          ...item,
          label: item.disposition,
          value: item.dispositionId,
        })) || []
      );
    },
  );

  // TODO add `callDisposition` in CallLog
  getActivityCallLog = createSelector(
    () => this.callId,
    () => this.currentEvCall,
    () => this._modules.evCallDisposition.callsMapping[this.callId],
    () => this.validated,
    () => this.required,
    (
      callId,
      currentCall,
      callDisposition,
      validated,
      required,
    ): EvCurrentLog => {
      if (!currentCall) {
        return undefined;
      }
      const { callType, dnis, uii, ani, queueDts, agentId } = currentCall;

      // TODO confirm about  dialDest or dnis?
      const fromNumber = callType === 'OUTBOUND' ? dnis : ani;
      // TODO confirm about  dialDest or dnis?
      const toNumber = callType === 'OUTBOUND' ? ani : dnis;
      const { dispositionId, notes } = callDisposition || {};

      const dispositionPickList = this.getDispositionPickList();

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
                    this._modules.locale.currentLocale,
                  ),
                  required: true,
                  picklistOptions: dispositionPickList,
                  enableScrollError: true,
                  error: !validated.dispositionId,
                  helperText: !validated.dispositionId
                    ? i18n.getString(
                        'dispositionError',
                        this._modules.locale.currentLocale,
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
    },
  );

  getCallStatus = createSelector(
    () => this.currentEvCall,
    () => this.getCurrentEvMainCall(),
    (currentEvCall, currentEvMainCall) => {
      let status: EvActivityCallUIProps['status'] = 'active';

      if (currentEvCall?.endedCall) {
        status = 'callEnd';
      } else if (currentEvMainCall.isHold) {
        status = 'onHold';
      }
      return status;
    },
  );

  getCurrentEvMainCall = createSelector(
    () => this.currentEvCall,
    (currentEvCall) => {
      return this._modules.activeCallControl.getMainCall(currentEvCall.uii);
    },
  );

  getCallList = createSelector(
    () => this.callId,
    () => this._modules.evCallMonitor.callIds,
    () => this._modules.evCallMonitor.otherCallIds,
    () => this._modules.evCallMonitor.getCallsMapping(),
    (callId, callIds, otherCallIds, callsMapping) => {
      return this._modules.evCallMonitor.getActiveCallList(
        callIds,
        otherCallIds,
        callsMapping,
        callId,
      );
    },
  );

  getIsMultipleCalls = createSelector(
    () => this.getCallList(),
    (callList) => callList.length > 2,
  );

  @action
  changeSavingStatus(status: EvActivityCallUIProps['saveStatus']) {
    this.state.saveStatus = status;
  }

  @action
  protected changeFormStatus({ validated, required, disabled }: FormState) {
    if (validated) {
      this.state.validated = {
        ...this.state.validated,
        ...validated,
      };
    }
    if (required) {
      this.state.required = {
        ...this.state.required,
        ...required,
      };
    }
    if (disabled) {
      this.state.disabled = {
        ...this.state.disabled,
        ...disabled,
      };
    }
  }

  @action
  reset() {
    this.state.validated = {
      dispositionId: true,
      notes: true,
    };
    this.state.required = {
      notes: false,
    };
    this.state.disabled = {};
    this.state.saveStatus = 'submit';
  }

  onUpdateCallLog({ task }, id) {
    const isEvCallDisposition =
      Object.hasOwnProperty.call(task, 'dispositionId') ||
      Object.hasOwnProperty.call(task, 'notes');
    if (isEvCallDisposition) {
      const data = {
        ...this._modules.evCallDisposition.callsMapping[id],
        ...task,
      };
      this._modules.evCallDisposition.changeDisposition(id, {
        dispositionId: data.dispositionId,
        notes: data.notes,
      });
    }
  }

  goToActivityCallPage = (id: string = this.callId) => {
    this._modules.routerInteraction.push(
      `/activityCallLog/${id}/activeCallList`,
    );
  };

  goToRequeueCallPage() {
    const {
      gateGroupId,
      gateId,
    } = this._modules.evCallMonitor.getCallsMapping()[this.callId].gate;
    this._modules.evRequeueCall.setStatus({
      selectedQueueGroupId: gateGroupId,
      selectedGateId: gateId,
      stayOnCall: false,
      requeuing: false,
    });
    this._modules.evTransferCall.changeTransferType(transferTypes.queue);
    this._redirectTransferCall('/transferCall');
  }

  goToTransferCallPage(type: EvTransferType) {
    this._modules.evTransferCall.resetTransferStatus();
    this._modules.evTransferCall.fetchAgentList();
    this._redirectTransferCall(`/transferCall/${type}`);
  }

  private _redirectTransferCall(url: string = '') {
    this._modules.routerInteraction.push(
      `/activityCallLog/${this.callId}${url}`,
    );
  }

  goDialer() {
    this._modules.routerInteraction.push('/dialer');
    this.reset();
  }

  disposeCall() {
    this._modules.evCallDisposition.disposeCall(this.callId);
  }

  private _hasError() {
    return Object.keys(this.validated).some((key) => {
      return !this.validated[key];
    });
  }

  private async _submitData(id: string) {
    try {
      const saveFields = this._modules.evCallDisposition.callsMapping[id];
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
      this.changeSavingStatus('saving');
      await this.disposeCall();
      this.changeSavingStatus('saved');
      if (!this.tabManagerEnabled) {
        this._modules.alert.success({
          message: logTypes.CALL_DISPOSITION_SUCCESS,
        });
        // delay for animation with loading ui.
        setTimeout(() => this.goDialer(), 1000);
      }
      this._modules.evWorkingState.setIsPendingDisposition(false);
    } catch (e) {
      this._modules.alert.danger({
        message: logTypes.CALL_DISPOSITION_FAILURE,
        ttl: 0,
      });
      this.changeSavingStatus('submit');
      throw e;
    }
  }

  get tabManagerEnabled() {
    return this._modules.tabManager?._tabbie.enabled;
  }

  onStateChange() {
    if (
      this.tabManagerEnabled &&
      this._lastSaveStatus === 'saving' &&
      this.saveStatus === 'saved'
    ) {
      this._lastSaveStatus = this.saveStatus;
      this._modules.alert.success({
        message: logTypes.CALL_DISPOSITION_SUCCESS,
      });
      // delay for animation with loading ui.
      setTimeout(() => this.goDialer(), 1000);
    }
    this._lastSaveStatus = this.saveStatus;
  }

  private _onHold() {
    if (this.getIsMultipleCalls()) {
      return this.goToActivityCallPage();
    }
    this._modules.activeCallControl.hold();
  }

  getUIProps({ id }): EvActivityCallUIProps {
    this._modules.evCall.activityCallId = id;

    return {
      currentLog: this.getActivityCallLog(),
      showSmallCallControl: !this.getActivityCallLog()?.currentEvRawCall
        ?.endedCall,
      currentLocale: this._modules.locale.currentLocale,
      currentEvCall: this.currentEvCall,
      saveStatus: this.saveStatus,
      status: this.getCallStatus(),
      isInbound: this.isInbound,
      isOnMute: this._modules.evIntegratedSoftphone.muteActive,
      isOnHold: this.getCurrentEvMainCall().isHold,
      isOnActive: this.getIsMultipleCalls(),
      isInComingCall: this.isInComingCall,
      smallCallControlSize: this._modules.environment.isWide
        ? 'medium'
        : 'small',
      currentCallControlPermission: this.getCurrentCallControlPermission(),
      disableDispose: this.disableLinks || this.saveStatus === 'saving',
      disableTransfer:
        this.disableLinks || this.isInComingCall || !this.allowTransfer,
      disableInternalTransfer:
        this.disableLinks ||
        this.isInComingCall ||
        !this.allowTransfer ||
        !this._modules.evTransferCall.allowInternalTransfer,
      disableHold:
        this.disableLinks ||
        this.isInComingCall ||
        !this.getCurrentCallControlPermission().allowHoldCall,
      disableHangup:
        this.disableLinks ||
        !this.getCurrentCallControlPermission().allowHangupCall,
      disableMute:
        !this._modules.evSessionConfig.isIntegrated ||
        this.disableLinks ||
        !this.getCurrentCallControlPermission().allowMuteCall,
      disableActive: this.disableLinks,
    };
  }

  getUIFunctions(): EvActivityCallUIFunctions {
    return {
      goBack: () => {},
      onMute: () => this._modules.activeCallControl.mute(),
      onUnmute: () => this._modules.activeCallControl.unmute(),
      onHangup: () =>
        this._modules.activeCallControl.hangUp(
          this.currentEvCall.session.sessionId,
        ),
      onReject: () => this._modules.activeCallControl.reject(),
      onHold: () => this._onHold(),
      onUnHold: () => this._modules.activeCallControl.unhold(),
      onActive: () => this.goToActivityCallPage(),
      onUpdateCallLog: (data, id) => this.onUpdateCallLog(data, id),
      disposeCall: async () => {
        if (this.saveStatus === 'saved') {
          return this.goDialer();
        }
        await this._submitData(this.callId);
      },
      goToRequeueCallPage: () => this.goToRequeueCallPage(),
      goToTransferCallPage: (transferType: EvTransferType) =>
        this.goToTransferCallPage(transferType),
    };
  }
}
export { EvActivityCallUI };
