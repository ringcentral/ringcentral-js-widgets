import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { EventEmitter } from 'events';
import { Module } from 'ringcentral-integration/lib/di';
import { Mapping } from 'ringcentral-widgets/typings';

import { callStatus } from '../../enums';
import {
  EvCallData,
  EvEvRequeueCallGate,
} from '../../interfaces/EvData.interface';
import {
  EvAddSessionNotification,
  EvBaseCall,
  EvDropSessionNotification,
  EvEndedCall,
  EvHoldResponse,
} from '../../lib/EvClient';
import { CallDataSource, Deps } from './EvCallDataSource.interface';
import { getTimeStamp } from './helper';

@Module({
  name: 'EvCallDataSource',
  deps: [
    'EvClient',
    'Storage',
    'EvAuth',
    { dep: 'EvCallDataSourceOptions', optional: true },
  ],
})
class EvCallDataSource extends RcModuleV2<Deps> implements CallDataSource {
  eventEmitter = new EventEmitter();

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvCallDataSource',
    });
  }

  @storage
  @state
  data: {
    callIds: string[];
    otherCallIds: string[];
    callLogsIds: string[];
    callsMapping: Mapping<EvCallData>;
    rawCallsMapping: Mapping<EvCallData>;
  } = {
    callIds: [],
    otherCallIds: [],
    callLogsIds: [],
    callsMapping: {},
    rawCallsMapping: {},
  };

  get callIds() {
    return this.data.callIds;
  }

  get otherCallIds() {
    return this.data.otherCallIds;
  }

  get callLogsIds() {
    return this.data.callLogsIds;
  }

  get callsMapping() {
    return this.data.callsMapping;
  }

  get rawCallsMapping() {
    return this.data.rawCallsMapping;
  }

  @action
  addNewCall(call: EvBaseCall) {
    // note: rawCallsMapping index is raw call uii.
    this.data.rawCallsMapping[call.uii] = {
      ...call,
      // input timezone in second arg if EV reponse has timezone propoty
      // default timezone is 'America/New_York'
      timestamp: getTimeStamp(call.queueDts),
      gate: this._getCurrentGateData(call),
    };
  }

  @action
  addNewSession(session: EvAddSessionNotification) {
    // check with other phone
    if (session.agentId === '') {
      // ringing
      this.eventEmitter.emit(callStatus.RINGING, session);
    }

    const id = this._deps.evClient.encodeUii(session);
    if (session.agentId === this._deps.evAuth.agentId) {
      // related to current agent session
      const index = this.callIds.indexOf(id);
      if (index === -1) {
        this.data.callIds.unshift(id);
      }
    } else {
      // other session without current agent
      const index = this.otherCallIds.indexOf(id);
      if (index === -1) {
        this.data.otherCallIds.unshift(id);
      }
    }

    this.data.callsMapping[id] = {
      ...this.rawCallsMapping[session.uii],
      session,
    };
  }

  @action
  dropSession(dropSession: EvDropSessionNotification) {
    const id = this._getCallEncodeId(dropSession);
    this.data.otherCallIds = this.otherCallIds.filter(
      (callId) => callId !== id,
    );
  }

  @action
  removeEndedCall(endedCall: EvEndedCall) {
    const id = this._getCallEncodeId(endedCall);
    // remove current agent session call with uii.
    this.data.callIds = this.callIds.filter((callId) => callId !== id);
    // remove other call session with uii.
    this.data.otherCallIds = this.otherCallIds.filter(
      (callId) => !callId.includes(endedCall.uii),
    );

    // add call with id (encodeUii({ uii, sessionId }))
    const callLogsIndex = this.callLogsIds.indexOf(id);
    if (callLogsIndex === -1) {
      this.data.callLogsIds.unshift(id);
    }
    if (this.callsMapping[id]) {
      this.data.callsMapping[id].endedCall = endedCall;
    }
  }

  @action
  clearCalls() {
    this.data.callIds = [];
    this.data.otherCallIds = [];
  }

  @action
  setCallHoldStatus(res: EvHoldResponse) {
    const id = this._deps.evClient.encodeUii(res);
    this.data.callsMapping[id].isHold = res.holdState;
  }

  private _getCallEncodeId(session: Partial<EvAddSessionNotification>) {
    return this._deps.evClient.encodeUii(session);
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
}
export { EvCallDataSource };
