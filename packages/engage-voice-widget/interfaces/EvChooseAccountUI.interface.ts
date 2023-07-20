import type { EvAgents } from '../lib/EvClient/interfaces';

export type EvChooseAccountUIProps = {
  agents: EvAgents;
  currentLocale: string;
};

export type EvChooseAccountUIFunctions = {
  onAccountItemClick(agentId: string): void | Promise<void>;
};
