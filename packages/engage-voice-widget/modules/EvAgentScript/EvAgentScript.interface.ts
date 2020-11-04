import { EvTabManager } from '../EvTabManager';

import { EvAgentScriptResult, EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';

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
