import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  ActiveCallControl,
  DepsModules,
} from './EvActiveCallControl.interface';
import { loginTypes } from '../../enums';

@Module({
  name: 'EvActiveCallControl',
  deps: [
    'EvClient',
    'EvSettings',
    'Presence',
    'EvIntegratedSoftphone',
    { dep: 'EvActiveCallControlOptions', optional: true },
  ],
})
class EvActiveCallControl extends RcModuleV2<DepsModules>
  implements ActiveCallControl {
  get isIntegratedSoftphone() {
    return (
      this._modules.evSettings.loginType === loginTypes.integratedSoftphone
    );
  }

  constructor({
    evClient,
    presence,
    evSettings,
    evIntegratedSoftphone,
    ...options
  }) {
    super({
      modules: {
        evClient,
        evSettings,
        presence,
        evIntegratedSoftphone,
      },
      ...options,
    });
  }

  mute() {
    console.log('mute');

    if (this.isIntegratedSoftphone) {
      this._modules.evIntegratedSoftphone.sipToggleMute(true);
    }
  }

  unmute() {
    console.log('unmute');
    if (this.isIntegratedSoftphone) {
      this._modules.evIntegratedSoftphone.sipToggleMute(false);
    }
  }

  hangUp(sessionId: string) {
    this._modules.evClient.hangup({ sessionId });
  }

  reject() {
    console.log('reject');
  }

  hold() {
    this.changeOnHoldState(true);
  }

  unhold() {
    this.changeOnHoldState(false);
  }

  hangupSession({ sessionId }) {
    this._modules.evClient.hangup({ sessionId });
  }

  holdSession({ sessionId, state }) {
    this._modules.evClient.holdSession({ state, sessionId });
  }

  getMainCall(uii: string) {
    const id = this._modules.evClient.getMainId(uii);
    return this._modules.presence.callsMapping[id];
  }

  private changeOnHoldState(state: boolean) {
    this._modules.evClient.hold(state);
  }
}

export { EvActiveCallControl };
