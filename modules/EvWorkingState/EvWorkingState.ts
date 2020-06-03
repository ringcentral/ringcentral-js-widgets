import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  agentStateTypes,
  defaultAgentStatesTexts,
  messageTypes,
} from '../../enums';
import { EvAgentState, EvAvailableAgentState } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { DepsModules, State, WorkingState } from './EvWorkingState.interface';

const PendingDisposition: EvAvailableAgentState = {
  // TODO: here seems need i18n
  rank: '0',
  agentState: 'PENDING-DISPOSITION',
  agentAuxState: 'Pending Disposition',
};

type EvWorkingStateState = RcModuleState<EvWorkingState, State>;

@Module({
  name: 'EvWorkingState',
  deps: [
    'Auth',
    'EvAuth',
    'EvSubscription',
    'EvClient',
    'Presence',
    'Alert',
    'Storage',
    'EvSessionConfig',
    { dep: 'EvWorkingStateOptions', optional: true },
  ],
})
class EvWorkingState extends RcModuleV2<DepsModules, EvWorkingStateState>
  implements WorkingState {
  private _hasSetInitialState = false;

  constructor({
    auth,
    evAuth,
    evSubscription,
    evClient,
    presence,
    storage,
    alert,
    evSessionConfig,
    enableCache = true,
  }) {
    super({
      modules: {
        auth,
        evAuth,
        evSubscription,
        evClient,
        presence,
        storage,
        alert,
        evSessionConfig,
      },
      enableCache,
      storageKey: 'EvWorkingState',
    });
    this._modules.evSessionConfig.onTriggerConfig.push(() => {
      const { agentConfig } = this._modules.evAuth.agent;
      if (agentConfig?.agentSettings?.initLoginState) {
        this._modules.evClient.setAgentState(
          agentConfig.agentSettings.initLoginState,
          agentConfig.agentSettings.initLoginStateLabel,
        );
      }
      this.resetWorkingState();
    });

    this._modules.evSessionConfig.onConfigSuccess.push(() => {
      this._hasSetInitialState = this._modules.evSessionConfig.isConfigSuccessByLocal;
    });
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
    return this._modules.evAuth.agent
      ? this._modules.evAuth.agent.agentConfig
      : null;
  }

  getWorkingState = createSelector(
    () => this.agentState,
    () => this.isPendingDisposition,
    (agentState, isPendingDisposition) =>
      isPendingDisposition
        ? PendingDisposition
        : {
            ...agentState,
            agentAuxState:
              agentState.agentAuxState ||
              defaultAgentStatesTexts[agentState.agentState],
          },
  );

  getAgentStates = createSelector(
    () => this.agentConfig,
    () => this.isPendingDisposition,
    () => this.agentConfig.agentSettings.availableAgentStates,
    (agentConfig, isPendingDisposition, availableAgentStates) => {
      const agentStates = isPendingDisposition
        ? [PendingDisposition, ...availableAgentStates]
        : availableAgentStates;

      return agentConfig ? agentStates : [];
    },
  );

  getWorkingAgentState = createSelector(
    () => this.getAgentStates(),
    (agentStates) => {
      return agentStates.find(
        (state) => state.agentState === agentStateTypes.working,
      );
    },
  );

  @action
  setAgentState(agentState: EvAgentState) {
    this.state.agentState = agentState;
    if (agentState.agentState !== agentStateTypes.breakAfterCall) {
      this.state.time = Date.now();
    }
  }

  @action
  setIsPendingDisposition(
    isPendingDisposition: EvWorkingStateState['isPendingDisposition'],
  ) {
    this.state.isPendingDisposition = isPendingDisposition;
  }

  @action
  setSettingsNow() {
    this.state.time = Date.now();
  }

  @action
  resetWorkingState() {
    this.state.time = Date.now();
    this.state.isPendingDisposition = false;
  }

  @action
  setTime(time: number) {
    this.state.time = time;
  }

  onInitOnce() {
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.AGENT_STATE,
      ({ currentAuxState, currentState }) => {
        // login with multi-tabs and skip the first agent notification for reset timer.
        if (
          !this._hasSetInitialState ||
          this.agentState.agentState !== currentAuxState
        ) {
          this.setAgentState({
            agentState: currentState,
            agentAuxState: currentAuxState,
          });
        }
        this._hasSetInitialState = false;
      },
    );
  }

  changeWorkingState({ agentState, agentAuxState }: EvAgentState) {
    const isOnCall =
      [agentStateTypes.transition, agentStateTypes.engaged].indexOf(
        this.agentState.agentState,
      ) > -1 || this._modules.presence.getCalls().length > 0;

    if (isOnCall) {
      if (agentState === agentStateTypes.onBreak) {
        return this._modules.evClient.setAgentState(agentState, agentAuxState);
      }
      this._modules.alert.danger({
        message: messageTypes.INVALID_STATE_CHANGE,
        allowDuplicates: false,
        ttl: 0,
      });
      return;
    }

    this._modules.evClient.setAgentState(agentState, agentAuxState);
  }

  setWorkingStateWorking() {
    if (this.getWorkingAgentState()) {
      this.changeWorkingState(this.getWorkingAgentState());
    }
  }

  alertOverBreakTime() {
    this._modules.alert.danger({
      message: messageTypes.OVER_BREAK_TIME,
      allowDuplicates: false,
      ttl: 0,
    });
  }
}

export { EvWorkingState };
