export type PartialRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;
