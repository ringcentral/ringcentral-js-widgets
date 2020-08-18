import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const BROADCAST_KEY = 'ringcentral_engage_voice';

export const agentScriptEvents = ObjectMap.prefixKeys(
  ['INIT', 'SET_SCRIPT_RESULT'],
  'broadcast',
);

export type AgentScriptEvents = keyof typeof agentScriptEvents;
