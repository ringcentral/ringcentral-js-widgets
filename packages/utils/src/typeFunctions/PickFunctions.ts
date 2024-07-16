import { PickFunctionKeys } from './PickFunctionKeys';

export type PickFunctions<T extends Record<string, any>> = Pick<
  T,
  PickFunctionKeys<T>
>;
