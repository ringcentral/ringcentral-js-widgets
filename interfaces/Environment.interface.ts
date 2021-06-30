import { Environment } from '@ringcentral-integration/commons/modules/EnvironmentV2';

export type EvEnvironment = Environment & {
  view: { mode: string };
  isWide: boolean;
};
