import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import { tabManagerEvents } from '../../enums';
import {
  EvClientHandUpParams,
  EvClientHoldSessionParams,
} from '../../lib/EvClient';
import { ActiveCallControl, Deps } from './EvActiveCallControl.interface';

@Module({
  name: 'EvActiveCallControl',
  deps: [
    'EvClient',
    'EvSettings',
    'Presence',
    'EvIntegratedSoftphone',
    'EvAgentSession',
    'Storage',
    'EvCallMonitor',
    { dep: 'TabManager', optional: true },
    { dep: 'EvActiveCallControlOptions', optional: true },
  ],
})
class EvActiveCallControl
  extends RcModuleV2<Deps>
  implements ActiveCallControl
{
  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvActiveCallControl',
    });
  }

  @storage
  @state
  isRecording: boolean = null;

  @action
  setIsRecording(isRecording: boolean) {
    this.isRecording = isRecording;
  }

  @action
  pauseRecordAction() {
    this.isRecording = false;
    this.timeStamp = Date.now();
  }

  async record() {
    const { state, message } = await this._deps.evClient.record(true);

    if (state === 'RECORDING') {
      this.setIsRecording(true);
    } else {
      throw new Error(message);
    }
  }

  async stopRecord() {
    const { state, message } = await this._deps.evClient.record(false);
    if (state === 'STOPPED') {
      this.setIsRecording(false);
    } else {
      throw new Error(message);
    }
  }

  onKeypadClick(value: string) {
    this._deps.evClient.sipSendDTMF(value);
  }

  @storage
  @state
  timeStamp: number = null;

  async pauseRecord() {
    const { state, message } = await this._deps.evClient.pauseRecord(false);
    if (state === 'PAUSED') {
      this.pauseRecordAction();
    } else {
      throw new Error(message);
    }
  }

  @action
  resumeRecord() {
    this.isRecording = true;
    this.timeStamp = null;
  }

  mute() {
    this._sipToggleMute(true);
  }

  unmute() {
    this._sipToggleMute(false);
  }

  hangUp(sessionId: string) {
    this._deps.evClient.hangup({ sessionId });
  }

  reject() {
    console.log('reject');
  }

  hold() {
    this._changeOnHoldState(true);
  }

  unhold() {
    this._changeOnHoldState(false);
  }

  hangupSession({ sessionId }: EvClientHandUpParams) {
    this._deps.evClient.hangup({ sessionId });
  }

  holdSession({ sessionId, state }: EvClientHoldSessionParams) {
    this._deps.evClient.holdSession({ state, sessionId });
  }

  getMainCall(uii: string) {
    const id = this._deps.evClient.getMainId(uii);
    return this._deps.presence.callsMapping[id];
  }

  private _changeOnHoldState(state: boolean) {
    this._deps.evClient.hold(state);
  }

  private _sipToggleMute(state: boolean) {
    if (this._deps.evAgentSession.isIntegratedSoftphone) {
      if (this.tabManagerEnabled) {
        this._deps.tabManager.send(tabManagerEvents.MUTE, state);
      }
      this._deps.evIntegratedSoftphone.sipToggleMute(state);
    }
  }
}

export { EvActiveCallControl };
