import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { trackEvents as defaultTrackEvents } from '@ringcentral-integration/commons/modules/Analytics';

export const trackEvents = ObjectMap.fromObject({
  ...defaultTrackEvents,
  // EvAgentSession, Voice Connection & Persistent Voice Connection
  agentSessionSetLoginType: 'User Setting: Set Voice Connection',
  agentSessionSetTakingCall: 'User Setting: Set Persistent Voice Connection',
  agentSessionSetSkillProfileId: 'User Setting: Set Skill Profile',
  agentSessionSetInboundQueueIds: 'User Setting: Set Inbound Queue',
  agentSessionSetAutoAnswer: 'User Setting: Set Auto Answer',
  agentSessionConfigureAgent: 'User Setting: Configure Agent',

  // EvAuth, Authentication & Login & Agent UserId
  loginAgent: 'User Setting: Login Agent',
} as const);
