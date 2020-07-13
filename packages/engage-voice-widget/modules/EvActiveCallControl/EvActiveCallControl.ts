import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { tabManagerEvents } from '../../enums';
import {
  ActiveCallControl,
  DepsModules,
} from './EvActiveCallControl.interface';

@Module({
  name: 'EvActiveCallControl',
  deps: [
    'EvClient',
    'EvSettings',
    'Presence',
    'EvIntegratedSoftphone',
    'EvSessionConfig',
    { dep: 'TabManager', optional: true },
    { dep: 'EvActiveCallControlOptions', optional: true },
  ],
})
class EvActiveCallControl extends RcModuleV2<DepsModules>
  implements ActiveCallControl {
  get tabManagerEnabled() {
    return this._modules.tabManager?._tabbie.enabled;
  }

  constructor({
    evClient,
    presence,
    evSettings,
    tabManager,
    evIntegratedSoftphone,
    evSessionConfig,
    ...options
  }) {
    super({
      modules: {
        evClient,
        evSettings,
        tabManager,
        presence,
        evIntegratedSoftphone,
        evSessionConfig,
      },
      ...options,
    });
  }

  mute() {
    this._sipToggleMute(true);
  }

  unmute() {
    this._sipToggleMute(false);
  }

  hangUp(sessionId: string) {
    this._modules.evClient.hangup({ sessionId });
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

  private _changeOnHoldState(state: boolean) {
    this._modules.evClient.hold(state);
  }

  private _sipToggleMute(state: boolean) {
    if (this._modules.evSessionConfig.isIntegratedSoftphone) {
      if (this.tabManagerEnabled) {
        this._modules.tabManager.send(tabManagerEvents.MUTE, state);
      }
      this._modules.evIntegratedSoftphone.sipToggleMute(state);
    }
  }
}

export { EvActiveCallControl };
