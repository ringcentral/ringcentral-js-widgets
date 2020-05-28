import Environment from 'ringcentral-integration/modules/Environment';

export type EvEnvironment = Environment & {
  view: { mode: string };
  isWide: boolean;
};
