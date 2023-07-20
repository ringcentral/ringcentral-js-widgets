import type { EvAgentScriptResult, EvClient } from '../../lib/EvClient';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvTabManager } from '../EvTabManager';

export interface EvCallScriptResultMapping {
  [callId: string]: EvAgentScriptResult;
}

export interface EvAgentScriptOptions {}

export interface Deps {
  evClient: EvClient;
  tabManager?: EvTabManager;
  evCall: EvCall;
  evAuth: EvAuth;
  evCallMonitor: EvCallMonitor;
  evAgentScriptOptions?: EvAgentScriptOptions;
}

export interface State {}

export interface AgentScript extends State {}
