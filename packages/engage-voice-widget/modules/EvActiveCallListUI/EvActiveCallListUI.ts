import { RcUIModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  EvActiveCallListUIFunctions,
  EvActiveCallListUIProps,
} from '../../interfaces/EvActiveCallListUI.interface';
import { EvCallData } from '../../interfaces/EvData.interface';
import { ActiveCallListUI, DepsModules } from './EvActiveCallListUI.interface';
import { transferTypes } from '../../enums/transferTypes';

@Module({
  name: 'EvActiveCallListUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvCall',
    'ActiveCallControl',
    'EvCallMonitor',
    'EvIntegratedSoftphone',
    'EvAuth',
    'EvClient',
    'EvSessionConfig',
    { dep: 'EvActiveCallListUIOptions', optional: true },
  ],
})
class EvActiveCallListUI extends RcUIModuleV2<DepsModules>
  implements ActiveCallListUI {
  get callId() {
    return this._modules.evCall.activityCallId;
  }

  constructor({
    locale,
    routerInteraction,
    evCall,
    activeCallControl,
    evCallMonitor,
    evIntegratedSoftphone,
    evAuth,
    evClient,
    evSessionConfig,
  }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evCall,
        activeCallControl,
        evCallMonitor,
        evIntegratedSoftphone,
        evAuth,
        evClient,
        evSessionConfig,
      },
    });
  }

  getCallList = createSelector(
    () => this.callId,
    () => this._modules.evCallMonitor.callIds,
    () => this._modules.evCallMonitor.otherCallIds,
    () => this._modules.evCallMonitor.getCallsMapping(),
    () => this._modules.evAuth.agentId,
    (callId, callIds, otherCallIds, callsMapping, agentId) => {
      const callList = this._modules.evCallMonitor.getActiveCallList(
        callIds,
        otherCallIds,
        callsMapping,
        callId,
      );
      if (callList[1]?.session?.agentId !== agentId) {
        console.error('agent id is wrong');
      }
      return callList;
    },
  );

  onHangup(call: EvCallData) {
    this._modules.activeCallControl.hangupSession({
      sessionId: call.session.sessionId,
    });
  }

  onHold(call: EvCallData) {
    this._modules.activeCallControl.holdSession({
      sessionId: call.session.sessionId,
      state: true,
    });
  }

  onUnHold(call: EvCallData) {
    this._modules.activeCallControl.holdSession({
      sessionId: call.session.sessionId,
      state: false,
    });
  }

  getUIProps({ id }): EvActiveCallListUIProps {
    this._modules.evCall.activityCallId = id;
    return {
      currentLocale: this._modules.locale.currentLocale,
      callList: this.getCallList(),
      isOnMute: this._modules.evIntegratedSoftphone.muteActive,
      showMuteButton: this._modules.evSessionConfig.isIntegratedSoftphone,
      userName: this._modules.evClient.agentSettings?.username,
      isInbound: this._modules.evCall.isInbound,
    };
  }

  getUIFunctions(): EvActiveCallListUIFunctions {
    return {
      goBack: () => {
        this._modules.routerInteraction.goBack();
      },
      onHangup: (call) => this.onHangup(call),
      onHold: (call) => this.onHold(call),
      onUnHold: (call) => this.onUnHold(call),
      onMute: () => this._modules.activeCallControl.mute(),
      onUnmute: () => this._modules.activeCallControl.unmute(),
    };
  }
}

export { EvActiveCallListUI };
