import { PickFunctionKeys } from './PickFunctionKeys';

export type OmitFunctions<T extends Record<string, any>> = Omit<
  T,
  PickFunctionKeys<T>
>;
