import { EvAgentScriptResult, EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';

export interface EvCallScriptResultMapping {
  [callId: string]: EvAgentScriptResult;
}

export interface EvAgentScriptOptions {}

export interface Deps {
  evClient: EvClient;
  evCall: EvCall;
  evAuth: EvAuth;
  evAgentScriptOptions?: EvAgentScriptOptions;
}

export interface State {}

export interface AgentScript extends State {}
