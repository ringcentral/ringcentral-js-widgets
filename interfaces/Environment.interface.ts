import { Environment } from 'ringcentral-integration/modules/EnvironmentV2';

export type EvEnvironment = Environment & {
  view: { mode: string };
  isWide: boolean;
};
