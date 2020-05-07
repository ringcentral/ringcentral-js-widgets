export type RcModuleState<T, K> = Pick<T, Extract<keyof T, keyof K>>;
