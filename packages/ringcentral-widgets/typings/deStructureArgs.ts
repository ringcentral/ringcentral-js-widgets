export type DeStructureArgs<
  T,
  OptionalKey extends keyof T,
  RequireKey extends keyof T = any
> = Partial<Pick<T, OptionalKey>> & Required<Pick<T, RequireKey>>;
