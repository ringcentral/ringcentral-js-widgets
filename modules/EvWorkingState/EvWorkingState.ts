import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import type { DefaultAgentStateTexts } from '../../enums';
import {
  agentStateTypes,
  defaultAgentStateTexts,
  messageTypes,
  tabManagerEvents,
} from '../../enums';
import type { EvAgentState, EvAvailableAgentState } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import type { Deps, State, WorkingState } from './EvWorkingState.interface';

const PendingDisposition: EvAvailableAgentState = {
  // TODO: here seems need i18n
  rank: '0',
  agentState: 'PENDING-DISPOSITION',
  agentAuxState: 'Pending Disposition',
};

@Module({
  name: 'EvWorkingState',
  deps: [
    'Auth',
    'EvAuth',
    'EvSubscription',
    'EvClient',
    'Presence',
    'EvCallMonitor',
    'Alert',
    'Storage',
    'EvAgentSession',
    'TabManager',
    { dep: 'EvWorkingStateOptions', optional: true },
  ],
})
class EvWorkingState extends RcModuleV2<Deps> implements WorkingState {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvWorkingState',
    });
    this._deps.evAgentSession.onTriggerConfig(() => {
      const { agentConfig } = this._deps.evAuth.agent;
      if (agentConfig?.agentSettings?.initLoginState) {
        // if that tab is not activity, that wi
        this._deps.evClient.setAgentState(
          agentConfig.agentSettings.initLoginState,
          agentConfig.agentSettings.initLoginStateLabel,
        );
      }

      if (this.tabManagerEnabled) {
        this._deps.tabManager.send(tabManagerEvents.RESET_WORKING_STATE);
      }
      this.resetWorkingState();
    });
  }

  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  @storage
  @state
  time = Date.now();

  @storage
  @state
  agentState: EvAgentState = {
    agentState: agentStateTypes.available,
    agentAuxState: 'Available',
  };

  @storage
  @state
  isPendingDisposition = false;

  get agentConfig() {
    return this._deps.evAuth.agent.agentConfig;
  }

  @computed((that: EvWorkingState) => [
    that.agentConfig.agentSettings,
    that.workingState.agentState,
  ])
  get maxBreakTime() {
    if (this.isOnBreakOrAway) {
      return (
        parseInt(this.agentConfig.agentSettings.maxBreakTime || '0', 10) *
        60 *
        1000
      );
    }
    if (this.isOnLunch) {
      return (
        parseInt(this.agentConfig.agentSettings.maxLunchTime || '0', 10) *
        60 *
        1000
      );
    }
    return 1000 * 60;
  }

  @computed((that: EvWorkingState) => [that.workingState.agentState])
  get isOnBreakOrAway() {
    return (
      [agentStateTypes.away, agentStateTypes.onBreak].indexOf(
        this.workingState.agentState,
      ) > -1
    );
  }

  @computed((that: EvWorkingState) => [that.workingState.agentState])
  get isOnLunch() {
    return this.workingState.agentState === agentStateTypes.lunch;
  }

  @computed((that: EvWorkingState) => [
    that.agentState,
    that.isPendingDisposition,
  ])
  get workingState() {
    return this.isPendingDisposition
      ? PendingDisposition
      : {
          ...this.agentState,
          agentAuxState:
            this.agentState.agentAuxState ||
            defaultAgentStateTexts[
              this.agentState.agentState as DefaultAgentStateTexts
            ],
        };
  }

  @computed((that: EvWorkingState) => [
    that.agentConfig,
    that.isPendingDisposition,
    that.agentConfig.agentSettings.availableAgentStates,
  ])
  get agentStates() {
    const { availableAgentStates } = this.agentConfig.agentSettings;

    const agentStates = this.isPendingDisposition
      ? [PendingDisposition, ...availableAgentStates]
      : availableAgentStates;

    return this.agentConfig ? agentStates : [];
  }

  @computed((that: EvWorkingState) => [that.agentStates])
  get workingAgentState() {
    return this.agentStates.find(
      (state) => state.agentState === agentStateTypes.working,
    );
  }

  @action
  setAgentState(agentState: EvAgentState) {
    this.agentState = agentState;
    if (agentState.agentState !== agentStateTypes.breakAfterCall) {
      this.time = Date.now();
    }
  }

  @action
  setIsPendingDisposition(isPendingDisposition: State['isPendingDisposition']) {
    this.isPendingDisposition = isPendingDisposition;
  }

  @action
  resetWorkingState() {
    this.time = Date.now();
    this.isPendingDisposition = false;
  }

  @action
  setTime(time: number) {
    this.time = time;
  }

  override onInitOnce() {
    this._deps.evCallMonitor.onCallEnded(() => {
      this.setIsPendingDisposition(true);
    });

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.AGENT_STATE,
      ({ currentAuxState, currentState }) => {
        if (
          this.agentState.agentState !== currentState ||
          this.agentState.agentAuxState !== currentAuxState
        ) {
          this.setAgentState({
            agentState: currentState,
            agentAuxState: currentAuxState,
          });
        }
      },
    );
  }

  override async onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      const { event } = this._deps.tabManager;
      if (event) {
        switch (event.name) {
          case tabManagerEvents.RESET_WORKING_STATE:
            this.resetWorkingState();
            break;
          default:
            break;
        }
      }
    }
  }

  changeWorkingState({ agentState, agentAuxState }: EvAgentState) {
    const isOnCall =
      [agentStateTypes.transition, agentStateTypes.engaged].indexOf(
        this.agentState.agentState,
      ) > -1 || this._deps.presence.calls.length > 0;

    if (isOnCall && agentState !== agentStateTypes.onBreak) {
      return this._deps.alert.danger({
        message: messageTypes.INVALID_STATE_CHANGE,
        allowDuplicates: false,
        ttl: 0,
      });
    }

    this._deps.evClient.setAgentState(agentState, agentAuxState);
  }

  setWorkingStateWorking() {
    const state = this.workingAgentState;
    if (state) {
      this.changeWorkingState(state);
    }
  }

  alertOverBreakTime() {
    this._deps.alert.danger({
      message: messageTypes.OVER_BREAK_TIME,
      allowDuplicates: false,
      ttl: 0,
    });
  }
}

export { EvWorkingState };
