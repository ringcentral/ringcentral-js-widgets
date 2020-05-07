import { RcModuleType } from '../RcModule/RcModuleType';

export type RcUIModuleType<T> = RcModuleType<
  T,
  'getUIProps' | 'getUIFunctions'
>;
