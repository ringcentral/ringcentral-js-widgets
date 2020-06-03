import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';
import { Mapping } from 'ringcentral-widgets/typings';

import {
  dialoutStatuses,
  DialoutStatusesType,
  messageTypes,
} from '../../enums';
import {
  EvCallData,
  EvEvRequeueCallGate,
} from '../../interfaces/EvData.interface';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import {
  EvAddSessionNotification,
  EvBaseCall,
  EvDropSessionNotification,
  EvEndedCall,
  EvHoldResponse,
  EvOffhookInitResponse,
  EvOffhookTermResponse,
} from '../../lib/EvClient/interfaces';
import { DepsModules, Presence, State } from './EvPresence.interface';
import { getTimeStamp } from './helper';

type EvPresenceState = RcModuleState<EvPresence, State>;

@Module({
  name: 'EvPresence',
  deps: [
    'EvSubscription',
    'EvClient',
    'EvAuth',
    'Storage',
    'EvSettings',
    'EvSessionConfig',
    'Alert',
    { dep: 'PresenceOptions', optional: true },
  ],
})
class EvPresence extends RcModuleV2<DepsModules, EvPresenceState>
  implements Presence {
  evPresenceEvents = new EventEmitter();

  showOffHookInitError = true;

  constructor({
    evSubscription,
    evClient,
    storage,
    evAuth,
    evSettings,
    evSessionConfig,
    alert,
    enableCache = true,
  }) {
    super({
      modules: {
        evSubscription,
        evClient,
        evAuth,
        storage,
        evSettings,
        evSessionConfig,
        alert,
      },
      enableCache,
      storageKey: 'EvPresence',
    });
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  recordId: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setRecordId(recordId: string) {
    this.state.recordId = recordId;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  caseId: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setCaseId(caseId: string) {
    this.state.caseId = caseId;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  objectValue: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setObjectValue(objectValue: string) {
    this.state.objectValue = objectValue;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  objectType: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setObjectType(objectType: string) {
    this.state.objectType = objectType;
  }

  @storage
  @state
  callIds: string[] = [];

  @storage
  @state
  otherCallIds: string[] = [];

  @storage
  @state
  callLogsIds: string[] = [];

  @storage
  @state
  callsMapping: Mapping<EvCallData> = {};

  @storage
  @state
  rawCallsMapping: Mapping<EvCallData> = {};

  @storage
  @state
  dialoutStatus: DialoutStatusesType = dialoutStatuses.idle;

  getCalls = createSelector(
    () => this.callIds,
    () => this.callsMapping,
    (callIds, callsMapping) =>
      callIds.map((id) => callsMapping[id]).filter((call) => !!call),
  );

  getOtherCalls = createSelector(
    () => this.otherCallIds,
    () => this.callsMapping,
    (otherCallIds, callsMapping) => otherCallIds.map((id) => callsMapping[id]),
  );

  getCallLogs = createSelector(
    () => this.callLogsIds,
    () => this.callsMapping,
    (callLogsIds, callsMapping) => callLogsIds.map((id) => callsMapping[id]),
  );

  @action
  addNewCall(call: EvBaseCall) {
    // note: rawCallsMapping‘s index is raw call uii.
    this.state.rawCallsMapping[call.uii] = {
      ...call,
      // input timezone in second arg if EV reponse has timezone propoty
      // default timezone is 'America/New_York'
      timestamp: getTimeStamp(call.queueDts),
      gate: this._getCurrentGateData(call),
      // temporary code for test screen pop sf object when inbound call
      recordId: this.state.recordId,
      caseId: this.state.caseId,
      objectValue: this.state.objectValue,
      objectType: this.state.objectType,
    };
  }

  @action
  addNewSession(session: EvAddSessionNotification) {
    const id = this._getCallEncodeId(session);
    if (session.agentId === this._modules.evAuth.agentId) {
      // related to current agent session
      const index = this.state.callIds.indexOf(id);
      if (index === -1) {
        this.state.callIds.unshift(id);
      }
    } else {
      // other session without current agent
      const index = this.state.otherCallIds.indexOf(id);
      if (index === -1) {
        this.state.otherCallIds.unshift(id);
      }
    }

    this.state.callsMapping[id] = {
      ...this.rawCallsMapping[session.uii],
      session,
    };
  }

  @action
  dropSession(dropSession: EvDropSessionNotification) {
    const id = this._getCallEncodeId(dropSession);
    this.state.otherCallIds = this.state.otherCallIds.filter(
      (callId) => callId !== id,
    );
  }

  @action
  removeEndedCall(endedCall: EvEndedCall) {
    const id = this._getCallEncodeId(endedCall);
    // remove current agent session call with uii.
    this.state.callIds = this.state.callIds.filter((callId) => callId !== id);
    // remove other call session with uii.
    this.state.otherCallIds = this.state.otherCallIds.filter(
      (callId) => !callId.includes(endedCall.uii),
    );

    // add call with id (encodeUii({ uii, sessionId }))
    const callLogsIndex = this.callLogsIds.indexOf(id);
    if (callLogsIndex === -1) {
      this.state.callLogsIds.unshift(id);
    }
    if (this.callsMapping[id]) {
      this.state.callsMapping[id].endedCall = endedCall;
    }
  }

  @action
  setCallHoldStatus(res: EvHoldResponse) {
    const id = this._getCallEncodeId(res);
    this.state.callsMapping[id].isHold = res.holdState;
  }

  @action
  clearCalls() {
    this.state.callIds = [];
    this.state.otherCallIds = [];
  }

  @action
  setDialoutStatus(status: DialoutStatusesType) {
    if (this.state.dialoutStatus !== status) {
      this.state.dialoutStatus = status;
    }
  }

  onInitOnce() {
    this._bindSubscription();
  }

  onInit() {
    if (!this._modules.evSessionConfig.isConfigSuccessByLocal) {
      this.clearCalls();
    }

    if (
      this.getCalls().length === 0 &&
      this.dialoutStatus !== dialoutStatuses.idle
    ) {
      this.setDialoutStatus(dialoutStatuses.idle);
    }
  }

  offhookInit() {
    this._modules.evSettings.offhookInitHandle();
  }

  offhookTerm() {
    this._modules.evSettings.offhookTermHandle();
  }

  private _bindSubscription() {
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.OFFHOOK_INIT,
      (data: EvOffhookInitResponse) => {
        this.evPresenceEvents.emit(EvCallbackTypes.OFFHOOK_INIT, data);
        if (data.status === 'OK') {
          this.offhookInit();
          // when that is reject integrated softphone, we not alert error
        } else if (this.showOffHookInitError) {
          this._modules.alert.danger({
            message: messageTypes.OFFHOOK_INIT_ERROR,
          });
          this._modules.evSettings.offhookTermHandle();
          this.showOffHookInitError = true;
        }
      },
    );
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.OFFHOOK_TERM,
      (data: EvOffhookTermResponse) => {
        if (data.status === 'OK') {
          this.offhookTerm();
        } else {
          this._modules.alert.danger({
            message: messageTypes.OFFHOOK_TERM_ERROR,
          });
          console.error(data);
        }
      },
    );
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.ADD_SESSION,
      (data) => {
        if (data.status === 'OK') {
          this.addNewSession(data);
        } else {
          this._modules.alert.danger({
            message: messageTypes.ADD_SESSION_ERROR,
          });
        }
      },
    );
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.DROP_SESSION,
      (data) => {
        if (data.status === 'OK') {
          this.dropSession(data);
        } else {
          this._modules.alert.danger({
            message: messageTypes.DROP_SESSION_ERROR,
          });
        }
      },
    );
    this._modules.evSubscription.subscribe(EvCallbackTypes.HOLD, (data) => {
      if (data.status === 'OK') {
        this.setCallHoldStatus(data);
      } else {
        this._modules.alert.danger({
          message: messageTypes.HOLD_ERROR,
        });
      }
    });

    this._modules.evSubscription.subscribe(EvCallbackTypes.NEW_CALL, (data) => {
      this.addNewCall(data);
    });

    this._modules.evSubscription.subscribe(EvCallbackTypes.END_CALL, (data) => {
      const id = this._getCallEncodeId(data);
      if (!this.callsMapping[id]) return;
      if (!this._modules.evSettings.isManualOffhook) {
        this._modules.evClient.offhookTerm();
      }
      this.removeEndedCall(data);
    });
  }

  private _getCurrentGateData(call: Partial<EvCallData>): EvEvRequeueCallGate {
    const currentGateId = call.queue.number;
    const currentQueueGroup = this._modules.evAuth
      .getAvailableRequeueQueues()
      .find(({ gates }) => {
        return gates.some(({ gateId }) => gateId === currentGateId);
      });
    return {
      gateId: currentGateId,
      gateGroupId: currentQueueGroup?.gateGroupId,
    };
  }

  private _getCallEncodeId({
    uii,
    sessionId,
  }: Partial<EvAddSessionNotification>) {
    return this._modules.evClient.encodeUii({ sessionId, uii });
  }
}

export { EvPresence };
