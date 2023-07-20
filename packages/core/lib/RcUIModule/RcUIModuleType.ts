import type { RcModuleType } from '../RcModule';
import type { RcUIModuleV2 } from './RcUIModule';

export type RcUIModuleType<T extends RcUIModuleV2> = RcModuleType<
  T,
  'getUIProps' | 'getUIFunctions'
>;

type PickFunctionKeys<T extends Record<string, any>> = Exclude<
  {
    [K in keyof T]: Required<T> extends Record<K, Function> ? K : never;
  }[keyof T],
  undefined
>;

export type UIFunctions<T extends Record<string, any>> = Pick<
  T,
  PickFunctionKeys<T>
>;

export type UIProps<T extends Record<string, any>> = Omit<
  T,
  PickFunctionKeys<T>
>;
