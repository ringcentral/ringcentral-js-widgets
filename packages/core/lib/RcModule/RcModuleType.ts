import { RcModuleV2 } from './RcModule';

export type RcModuleType<T extends RcModuleV2, K extends string = null> = Omit<
  T,
  | Exclude<
      keyof RcModuleV2,
      'pending' | 'ready' | 'initializing' | 'resetting'
    >
  | K
>;
