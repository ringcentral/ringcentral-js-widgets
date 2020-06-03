import { RcUIModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { agentStatesColors, agentStateTypes } from '../../enums';
import {
  EvMainViewUIFunctions,
  EvMainViewUIProps,
} from '../../interfaces/EvMainViewUI.interface';
import { handleToClockTime } from '../../lib/time';
import { DepsModules, MainView } from './MainViewUI.interface';

const expiredWorkingTime = 60 * 1000;

@Module({
  name: 'MainViewUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvWorkingState',
    'EvSettings',
    'EvCallMonitor',
    'EvAuth',
    'Environment',
    { dep: 'MainViewUIOptions', optional: true },
  ],
})
class MainViewUI extends RcUIModuleV2<DepsModules> implements MainView {
  public oldIntervalTime?: number;

  constructor({
    routerInteraction,
    evWorkingState,
    locale,
    evSettings,
    evAuth,
    evCallMonitor,
    environment,
  }) {
    super({
      modules: {
        routerInteraction,
        evWorkingState,
        locale,
        evSettings,
        evAuth,
        evCallMonitor,
        environment,
      },
    });
  }

  getAgentStates = createSelector(
    () => this._modules.evWorkingState.getAgentStates(),
    (agentStates) => {
      return agentStates.map((state) => ({
        ...state,
        color: agentStatesColors[state.agentState],
        title: state.agentAuxState,
      }));
    },
  );

  getCurrentStateIndex = createSelector(
    () => this.getAgentStates(),
    () => this._modules.evWorkingState.getWorkingState(),
    (agentStates, workingState) =>
      agentStates.findIndex(
        (state) =>
          state.agentAuxState === workingState.agentAuxState &&
          state.agentState === workingState.agentState,
      ),
  );

  getStateText = createSelector(
    () => this._modules.evWorkingState.getWorkingState(),
    (workingState) => workingState.agentAuxState || workingState.agentState,
  );

  getIsTimingOneMinuteType = createSelector(
    () => this._modules.evWorkingState.getWorkingState(),
    (workingState) =>
      [
        agentStateTypes.away,
        agentStateTypes.onBreak,
        agentStateTypes.lunch,
      ].indexOf(workingState.agentState) > -1,
  );

  getIsOffHookDisable = createSelector(
    () => this._modules.evSettings.isOffhooking,
    () => this._modules.evCallMonitor.isOnCall,
    () => this._modules.evAuth.agentPermissions.allowOffHook,
    (isOffhooking, isOnCall, allowOffHook) => {
      return isOffhooking || isOnCall || !allowOffHook;
    },
  );

  getStateColor(intervalTime: number) {
    if (this.getIsTimingOneMinuteType()) {
      const isOverOneMinute = this._checkOverTime(intervalTime);

      if (isOverOneMinute) {
        return 'red';
      }
    }

    return (
      agentStatesColors[
        this._modules.evWorkingState.getWorkingState().agentState
      ] || 'grey'
    );
  }

  getTimerText(intervalTime: number) {
    if (!this.getIsTimingOneMinuteType()) {
      return handleToClockTime(intervalTime);
    }

    if (this._checkOverTime(intervalTime)) {
      return `-${handleToClockTime(intervalTime - expiredWorkingTime)}`;
    }

    const resetSecond = parseInt(
      `${(expiredWorkingTime - intervalTime) / 1000}`,
      10,
    );

    return `00:${String(resetSecond).length < 2 ? '0' : ''}${resetSecond}`;
  }

  handleWithIntervalTime(intervalTime: number) {
    const isOverOneMinute = this._checkOverTime(intervalTime);
    // TODO think about when browser is block.
    if (
      this.oldIntervalTime < expiredWorkingTime &&
      isOverOneMinute &&
      this.getIsTimingOneMinuteType()
    ) {
      this._modules.evWorkingState.alertOverBreakTime();
    }
    this.oldIntervalTime = intervalTime;
  }

  private _checkOverTime(intervalTime: number) {
    return intervalTime > expiredWorkingTime;
  }

  getUIProps(): EvMainViewUIProps {
    return {
      agentStates: this.getAgentStates(),
      agentState: this._modules.evWorkingState.agentState,
      currentStateIndex: this.getCurrentStateIndex(),
      currentPath: this._modules.routerInteraction.currentPath,
      stateText: this.getStateText(),
      time: this._modules.evWorkingState.time,
      disabled: this._modules.evWorkingState.isPendingDisposition,
      isOffHookDisable: this.getIsOffHookDisable(),
      offhookState: this._modules.evSettings.getOffhookState(),
      isOffhook: this._modules.evSettings.isOffhook,
      isOffhooking: this._modules.evSettings.isOffhooking,
      isWide: this._modules.environment.isWide,
      currentLocale: this._modules.locale.currentLocale,
    };
  }

  getUIFunctions(): EvMainViewUIFunctions {
    return {
      goTo: (path: string) => {
        if (path) {
          this._modules.routerInteraction.push(path);
        }
      },
      changeWorkingState: (state) =>
        this._modules.evWorkingState.changeWorkingState(state),
      getTimerText: (intervalTime: number) => this.getTimerText(intervalTime),
      getStateColor: (intervalTime: number) => this.getStateColor(intervalTime),
      handleWithIntervalTime: (intervalTime: number) =>
        this.handleWithIntervalTime(intervalTime),
      offhook: () => {
        if (!this.getIsOffHookDisable()) {
          this._modules.evSettings.offHook();
        }
      },
    };
  }
}

export { MainViewUI };
