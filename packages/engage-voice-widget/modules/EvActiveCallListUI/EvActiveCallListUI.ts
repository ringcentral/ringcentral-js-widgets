import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';

import {
  EvActiveCallListUIFunctions,
  EvActiveCallListUIProps,
} from '../../interfaces/EvActiveCallListUI.interface';
import { EvCallData } from '../../interfaces/EvData.interface';
import { ActiveCallListUI, Deps } from './EvActiveCallListUI.interface';

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
    'EvAgentSession',
    { dep: 'EvActiveCallListUIOptions', optional: true },
  ],
})
class EvActiveCallListUI
  extends RcUIModuleV2<Deps>
  implements ActiveCallListUI {
  get callId() {
    return this._deps.evCall.activityCallId;
  }

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: EvActiveCallListUI) => [
    that.callId,
    that._deps.evCallMonitor.callIds,
    that._deps.evCallMonitor.otherCallIds,
    that._deps.evCallMonitor.callsMapping,
    that._deps.evAuth.agentId,
  ])
  get callList() {
    const { callIds, otherCallIds, callsMapping } = this._deps.evCallMonitor;
    const { agentId } = this._deps.evAuth;

    const callList = this._deps.evCallMonitor.getActiveCallList(
      callIds,
      otherCallIds,
      callsMapping,
      this.callId,
    );
    if (callList[1]?.session?.agentId !== agentId) {
      console.error('agent id is wrong');
    }
    return callList;
  }

  onHangup(call: EvCallData) {
    this._deps.activeCallControl.hangupSession({
      sessionId: call.session.sessionId,
    });
  }

  onHold(call: EvCallData) {
    this._deps.activeCallControl.holdSession({
      sessionId: call.session.sessionId,
      state: true,
    });
  }

  onUnHold(call: EvCallData) {
    this._deps.activeCallControl.holdSession({
      sessionId: call.session.sessionId,
      state: false,
    });
  }

  getUIProps({ id }: { id: string }): EvActiveCallListUIProps {
    this._deps.evCall.activityCallId = id;
    return {
      currentLocale: this._deps.locale.currentLocale,
      callList: this.callList,
      isOnMute: this._deps.evIntegratedSoftphone.muteActive,
      showMuteButton: this._deps.evAgentSession.isIntegratedSoftphone,
      userName: this._deps.evAuth.agentSettings?.username,
      isInbound: this._deps.evCall.isInbound,
    };
  }

  getUIFunctions(): EvActiveCallListUIFunctions {
    return {
      goBack: () => {
        this._deps.routerInteraction.goBack();
      },
      onHangup: (call) => this.onHangup(call),
      onHold: (call) => this.onHold(call),
      onUnHold: (call) => this.onUnHold(call),
      onMute: () => this._deps.activeCallControl.mute(),
      onUnmute: () => this._deps.activeCallControl.unmute(),
    };
  }
}

export { EvActiveCallListUI };
