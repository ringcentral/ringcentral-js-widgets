import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

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
    { dep: 'TabManager', optional: true },
    { dep: 'EvActiveCallControlOptions', optional: true },
  ],
})
class EvActiveCallControl
  extends RcModuleV2<Deps>
  implements ActiveCallControl {
  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  constructor(deps: Deps) {
    super({
      deps,
    });
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
