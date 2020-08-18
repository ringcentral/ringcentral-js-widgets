import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
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
import { Deps, Presence } from './EvPresence.interface';
import { getTimeStamp } from './helper';

@Module({
  name: 'EvPresence',
  deps: [
    'EvSubscription',
    'EvClient',
    'EvAuth',
    'Storage',
    'EvSettings',
    'EvAgentSession',
    'Alert',
    { dep: 'PresenceOptions', optional: true },
  ],
})
class EvPresence extends RcModuleV2<Deps> implements Presence {
  evPresenceEvents = new EventEmitter();

  showOffHookInitError = true;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvPresence',
    });
    this._deps.evAgentSession.clearCalls = () => {
      this.clearCalls();
    };
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  recordId: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setRecordId(recordId: string) {
    this.recordId = recordId;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  caseId: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setCaseId(caseId: string) {
    this.caseId = caseId;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  objectValue: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setObjectValue(objectValue: string) {
    this.objectValue = objectValue;
  }

  // temporary code for test screen pop sf object when inbound call
  @storage
  @state
  objectType: string = '';

  // temporary code for test screen pop sf object when inbound call
  @action
  setObjectType(objectType: string) {
    this.objectType = objectType;
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

  @computed((that: EvPresence) => [that.callIds, that.callsMapping])
  get calls() {
    return this.callIds
      .map((id) => this.callsMapping[id])
      .filter((call) => !!call);
  }

  @computed((that: EvPresence) => [that.otherCallIds, that.callsMapping])
  get otherCalls() {
    return this.otherCallIds.map((id) => this.callsMapping[id]);
  }

  @computed((that: EvPresence) => [that.callLogsIds, that.callsMapping])
  get callLogs() {
    return this.callLogsIds.map((id) => this.callsMapping[id]);
  }

  @action
  addNewCall(call: EvBaseCall) {
    // note: rawCallsMapping index is raw call uii.
    this.rawCallsMapping[call.uii] = {
      ...call,
      // input timezone in second arg if EV reponse has timezone propoty
      // default timezone is 'America/New_York'
      timestamp: getTimeStamp(call.queueDts),
      gate: this._getCurrentGateData(call),
      // temporary code for test screen pop sf object when inbound call
      recordId: this.recordId,
      caseId: this.caseId,
      objectValue: this.objectValue,
      objectType: this.objectType,
    };
  }

  @action
  addNewSession(session: EvAddSessionNotification) {
    const id = this._getCallEncodeId(session);
    if (session.agentId === this._deps.evAuth.agentId) {
      // related to current agent session
      const index = this.callIds.indexOf(id);
      if (index === -1) {
        this.callIds.unshift(id);
      }
    } else {
      // other session without current agent
      const index = this.otherCallIds.indexOf(id);
      if (index === -1) {
        this.otherCallIds.unshift(id);
      }
    }

    this.callsMapping[id] = {
      ...this.rawCallsMapping[session.uii],
      session,
    };
  }

  @action
  dropSession(dropSession: EvDropSessionNotification) {
    const id = this._getCallEncodeId(dropSession);
    this.otherCallIds = this.otherCallIds.filter((callId) => callId !== id);
  }

  @action
  removeEndedCall(endedCall: EvEndedCall) {
    const id = this._getCallEncodeId(endedCall);
    // remove current agent session call with uii.
    this.callIds = this.callIds.filter((callId) => callId !== id);
    // remove other call session with uii.
    this.otherCallIds = this.otherCallIds.filter(
      (callId) => !callId.includes(endedCall.uii),
    );

    // add call with id (encodeUii({ uii, sessionId }))
    const callLogsIndex = this.callLogsIds.indexOf(id);
    if (callLogsIndex === -1) {
      this.callLogsIds.unshift(id);
    }
    if (this.callsMapping[id]) {
      this.callsMapping[id].endedCall = endedCall;
    }
  }

  @action
  setCallHoldStatus(res: EvHoldResponse) {
    const id = this._getCallEncodeId(res);
    this.callsMapping[id].isHold = res.holdState;
  }

  @action
  clearCalls() {
    this.callIds = [];
    this.otherCallIds = [];
  }

  @action
  setDialoutStatus(status: DialoutStatusesType) {
    if (this.dialoutStatus !== status) {
      this.dialoutStatus = status;
    }
  }

  onInitOnce() {
    this._deps.evAgentSession.onConfigSuccess.push(() => {
      if (this.calls.length === 0) {
        this.setDialoutStatus(dialoutStatuses.idle);
      }
    });

    this._bindSubscription();
  }

  setOffhookInit() {
    this._deps.evSettings.setOffhookInit();
  }

  setOffhookTerm() {
    this._deps.evSettings.setOffhookTerm();
  }

  private _bindSubscription() {
    this._deps.evSubscription.subscribe(
      EvCallbackTypes.OFFHOOK_INIT,
      (data: EvOffhookInitResponse) => {
        this.evPresenceEvents.emit(EvCallbackTypes.OFFHOOK_INIT, data);
        if (data.status === 'OK') {
          this.setOffhookInit();
          // when that is reject integrated softphone, we not alert error
        } else if (this.showOffHookInitError) {
          this._deps.alert.danger({
            message: messageTypes.OFFHOOK_INIT_ERROR,
          });
          this.setOffhookTerm();
          this.showOffHookInitError = true;
        }
      },
    );
    this._deps.evSubscription.subscribe(
      EvCallbackTypes.OFFHOOK_TERM,
      (data: EvOffhookTermResponse) => {
        if (data.status === 'OK') {
          this.setOffhookTerm();
        } else {
          this._deps.alert.danger({
            message: messageTypes.OFFHOOK_TERM_ERROR,
          });
          console.error(data);
        }
      },
    );
    this._deps.evSubscription.subscribe(EvCallbackTypes.ADD_SESSION, (data) => {
      if (data.status === 'OK') {
        this.addNewSession(data);
      } else {
        this._deps.alert.danger({
          message: messageTypes.ADD_SESSION_ERROR,
        });
      }
    });
    this._deps.evSubscription.subscribe(
      EvCallbackTypes.DROP_SESSION,
      (data) => {
        if (data.status === 'OK') {
          this.dropSession(data);
        } else {
          this._deps.alert.danger({
            message: messageTypes.DROP_SESSION_ERROR,
          });
        }
      },
    );
    this._deps.evSubscription.subscribe(EvCallbackTypes.HOLD, (data) => {
      if (data.status === 'OK') {
        this.setCallHoldStatus(data);
      } else {
        this._deps.alert.danger({
          message: messageTypes.HOLD_ERROR,
        });
      }
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.NEW_CALL, (data) => {
      this.addNewCall(data);
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.END_CALL, (data) => {
      const id = this._getCallEncodeId(data);
      if (!this.callsMapping[id]) return;
      if (!this._deps.evSettings.isManualOffhook) {
        this._deps.evClient.offhookTerm();
      }
      this.removeEndedCall(data);
    });
  }

  private _getCurrentGateData(call: Partial<EvCallData>): EvEvRequeueCallGate {
    const currentGateId = call.queue.number;
    const currentQueueGroup = this._deps.evAuth.availableRequeueQueues.find(
      ({ gates }) => {
        return gates.some(({ gateId }) => gateId === currentGateId);
      },
    );
    return {
      gateId: currentGateId,
      gateGroupId: currentQueueGroup?.gateGroupId,
    };
  }

  private _getCallEncodeId({
    uii,
    sessionId,
  }: Partial<EvAddSessionNotification>) {
    return this._deps.evClient.encodeUii({ sessionId, uii });
  }
}

export { EvPresence };
