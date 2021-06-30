import moment from 'moment';
import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { EventEmitter } from 'events';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { Mapping } from '@ringcentral-integration/widgets/typings';

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
    'EvAuth',
    'EvClient',
    'Storage',
    'TabManager',
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

  get callsLimited() {
    return window.localStorage?.getItem('callsLimited') === 'true';
  }

  changeCallsLimited(value: boolean) {
    window.localStorage?.setItem('callsLimited', value?.toString());
  }

  @action
  addNewCall(call: EvBaseCall) {
    let rawAgentRecording = call?.agentRecording;
    rawAgentRecording &&= {
      ...rawAgentRecording,
      pause: rawAgentRecording.pause ? Number(rawAgentRecording.pause) : null,
    };
    // note: rawCallsMapping index is raw call uii.
    this.data.rawCallsMapping[call.uii] = {
      ...call,
      // input timezone in second arg if EV reponse has timezone propoty
      // default timezone is 'America/New_York'
      timestamp: getTimeStamp(call.queueDts),
      gate: this._getCurrentGateData(call),
      agentRecording: rawAgentRecording,
    };
  }

  @action
  setNewSession(session: EvAddSessionNotification) {
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

  addNewSession(session: EvAddSessionNotification) {
    this.setNewSession(session);
    // check with other phone
    if (session.agentId === '') {
      // ringing
      this.eventEmitter.emit(callStatus.RINGING, session);
    }
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
      this.data.callsMapping[id].endedCall = JSON.parse(
        JSON.stringify(endedCall),
      );
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

  @action
  limitCalls() {
    // max 250 and 7 days
    const lastWeekDayTimestamp = this._getLastWeekDayTimestamp();
    const storageCallData: {
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

    const fullCallLogsIds = this.callLogsIds
      .slice(0, 250)
      .reduce((acc, curr) => [...acc, curr.substr(0, curr.length - 2)], []);

    // valid rawCallsMapping
    storageCallData.rawCallsMapping = Object.keys(this.rawCallsMapping).reduce(
      (acc, id) => {
        if (
          fullCallLogsIds.includes(id) &&
          getTimeStamp(this.rawCallsMapping[id].queueDts) >=
            lastWeekDayTimestamp
        ) {
          acc[id] = this.rawCallsMapping[id];
        }
        return acc;
      },
      {} as Mapping<EvCallData>,
    );

    // valid callsMapping
    storageCallData.callsMapping = Object.keys(this.callsMapping).reduce(
      (acc, id) => {
        if (
          fullCallLogsIds.includes(id.substr(0, id.length - 2)) &&
          getTimeStamp(this.callsMapping[id].queueDts) >= lastWeekDayTimestamp
        ) {
          acc[id] = this.callsMapping[id];
          if (!id.endsWith('$1')) {
            storageCallData.callLogsIds.unshift(id);
          }
        }
        return acc;
      },
      {} as Mapping<EvCallData>,
    );

    this.data = storageCallData;
    this.changeCallsLimited(true);
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

  private _getLastWeekDayTimestamp() {
    const now = moment();
    const lastWeekDay = now.clone().subtract(7, 'days').startOf('day');
    return lastWeekDay.valueOf();
  }
}

export { EvCallDataSource };
