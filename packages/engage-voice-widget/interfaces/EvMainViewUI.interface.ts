import type { EvAgentState, EvAvailableAgentState } from '../lib/EvClient';

import type { EvOffhookState } from './EvSettingsUI.interface';

export type EvCustomAvailableAgentState = {
  color?: string;
  title?: string;
} & EvAvailableAgentState;

export interface EvMainViewUIProps {
  currentPath: string;
  agentStates: EvCustomAvailableAgentState[];
  currentStateIndex: number;
  stateText: string;
  time: number;
  disabled: boolean;
  agentState: EvAgentState;
  currentLocale: string;
  isOffHookDisable: boolean;
  isOffhooking: boolean;
  offhookState: EvOffhookState;
  isOffhook: boolean;
  isWide: boolean;
  hideOffHookBtn: boolean;
}

export interface EvMainViewUIFunctions {
  goTo: (path: string) => void;
  getTimerText(intervalTime: number): string;
  getStateColor(intervalTime: number): string;
  changeWorkingState(state: EvAgentState): void;
  handleWithIntervalTime(intervalTime: number): void;
  offhook(): void;
}
