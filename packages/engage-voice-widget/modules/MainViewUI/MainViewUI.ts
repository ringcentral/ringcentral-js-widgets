import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import { agentStatesColors } from '../../enums';
import {
  EvMainViewUIFunctions,
  EvMainViewUIProps,
} from '../../interfaces/EvMainViewUI.interface';
import { getClockByTimestamp } from '../../lib/getClockByTimestamp';
import { Deps, MainView } from './MainViewUI.interface';

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
    'EvCall',
  ],
})
class MainViewUI extends RcUIModuleV2<Deps> implements MainView {
  public oldIntervalTime?: number;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  get maxBreakTime() {
    return this._deps.evWorkingState.maxBreakTime;
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
  get isBreak() {
    const { isOnBreakOrAway, isOnLunch } = this._deps.evWorkingState;
    return isOnBreakOrAway || isOnLunch;
  }

  @computed((that: MainViewUI) => [
    that._deps.evSettings.isOffhooking,
    that._deps.evCallMonitor.isOnCall,
    that._deps.evCall.isDialing,
    that._deps.evAuth.agentPermissions.allowOffHook,
  ])
  get isOffHookDisable() {
    return (
      this._deps.evSettings.isOffhooking ||
      this._deps.evCallMonitor.isOnCall ||
      this._deps.evCall.isDialing ||
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
    if (this.isBreak) {
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
    if (this._checkOverTime(intervalTime)) {
      return `-${getClockByTimestamp(intervalTime - this.maxBreakTime)}`;
    }
    if (this.isBreak && this.maxBreakTime > 0) {
      intervalTime = parseInt(`${this.maxBreakTime - intervalTime}`, 10);
      return getClockByTimestamp(intervalTime, { useCeil: true });
    }
    return getClockByTimestamp(intervalTime);
  }

  handleWithIntervalTime(intervalTime: number) {
    const isOverOneMinute = this._checkOverTime(intervalTime);
    // TODO: think about when browser is block.
    if (
      this.oldIntervalTime < this.maxBreakTime &&
      isOverOneMinute &&
      this.isBreak
    ) {
      this._deps.evWorkingState.alertOverBreakTime();
    }
    this.oldIntervalTime = intervalTime;
  }

  private _checkOverTime(intervalTime: number) {
    return (
      this.isBreak && this.maxBreakTime > 0 && intervalTime > this.maxBreakTime
    );
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
