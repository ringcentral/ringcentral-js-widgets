import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { agentStatesColors, agentStateTypes } from '../../enums';
import {
  EvMainViewUIFunctions,
  EvMainViewUIProps,
} from '../../interfaces/EvMainViewUI.interface';
import { handleToClockTime } from '../../lib/time';
import { Deps, MainView } from './MainViewUI.interface';

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
  ],
})
class MainViewUI extends RcUIModuleV2<Deps> implements MainView {
  public oldIntervalTime?: number;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: MainViewUI) => [that._deps.evWorkingState.agentStates])
  get agentStates() {
    return this._deps.evWorkingState.agentStates.map((state) => ({
      ...state,
      color: agentStatesColors[state.agentState],
      title: state.agentAuxState,
    }));
  }

  @computed((that: MainViewUI) => [
    that.agentStates,
    that._deps.evWorkingState.workingState,
  ])
  get currentStateIndex() {
    const { workingState } = this._deps.evWorkingState;
    return this.agentStates.findIndex(
      (state) =>
        state.agentAuxState === workingState.agentAuxState &&
        state.agentState === workingState.agentState,
    );
  }

  @computed((that: MainViewUI) => [that._deps.evWorkingState.workingState])
  get stateText() {
    const { workingState } = this._deps.evWorkingState;
    return workingState.agentAuxState || workingState.agentState;
  }

  @computed((that: MainViewUI) => [that._deps.evWorkingState.workingState])
  get isTimingOneMinuteType() {
    const { workingState } = this._deps.evWorkingState;
    return (
      [
        agentStateTypes.away,
        agentStateTypes.onBreak,
        agentStateTypes.lunch,
      ].indexOf(workingState.agentState) > -1
    );
  }

  @computed((that: MainViewUI) => [
    that._deps.evSettings.isOffhooking,
    that._deps.evCallMonitor.isOnCall,
    that._deps.evAuth.agentPermissions.allowOffHook,
  ])
  get isOffHookDisable() {
    return (
      this._deps.evSettings.isOffhooking ||
      this._deps.evCallMonitor.isOnCall ||
      !this._deps.evAuth.agentPermissions.allowOffHook
    );
  }

  @computed((that: MainViewUI) => [
    that._deps.evAuth.agentPermissions.allowOffHook,
  ])
  get hideOffHookBtn() {
    return !this._deps.evAuth.agentPermissions.allowOffHook;
  }

  getStateColor(intervalTime: number) {
    if (this.isTimingOneMinuteType) {
      const isOverOneMinute = this._checkOverTime(intervalTime);

      if (isOverOneMinute) {
        return 'red';
      }
    }

    return (
      agentStatesColors[this._deps.evWorkingState.workingState.agentState] ||
      'grey'
    );
  }

  getTimerText(intervalTime: number) {
    if (!this.isTimingOneMinuteType) {
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
      this.isTimingOneMinuteType
    ) {
      this._deps.evWorkingState.alertOverBreakTime();
    }
    this.oldIntervalTime = intervalTime;
  }

  private _checkOverTime(intervalTime: number) {
    return intervalTime > expiredWorkingTime;
  }

  getUIProps(): EvMainViewUIProps {
    return {
      agentStates: this.agentStates,
      agentState: this._deps.evWorkingState.agentState,
      currentStateIndex: this.currentStateIndex,
      currentPath: this._deps.routerInteraction.currentPath,
      stateText: this.stateText,
      time: this._deps.evWorkingState.time,
      disabled: this._deps.evWorkingState.isPendingDisposition,
      isOffHookDisable: this.isOffHookDisable,
      offhookState: this._deps.evSettings.offhookState,
      isOffhook: this._deps.evSettings.isOffhook,
      isOffhooking: this._deps.evSettings.isOffhooking,
      isWide: this._deps.environment.isWide,
      hideOffHookBtn: this.hideOffHookBtn,
      currentLocale: this._deps.locale.currentLocale,
    };
  }

  getUIFunctions(): EvMainViewUIFunctions {
    return {
      goTo: (path: string) => {
        if (path) {
          this._deps.routerInteraction.push(path);
        }
      },
      changeWorkingState: (state) =>
        this._deps.evWorkingState.changeWorkingState(state),
      getTimerText: (intervalTime: number) => this.getTimerText(intervalTime),
      getStateColor: (intervalTime: number) => this.getStateColor(intervalTime),
      handleWithIntervalTime: (intervalTime: number) =>
        this.handleWithIntervalTime(intervalTime),
      offhook: () => {
        if (!this.isOffHookDisable) {
          this._deps.evSettings.offHook();
        }
      },
    };
  }
}

export { MainViewUI };
