import type { Environment } from '@ringcentral-integration/commons/modules/Environment';

export type EvEnvironment = Environment & {
  view: { mode: string };
  isWide: boolean;
};
