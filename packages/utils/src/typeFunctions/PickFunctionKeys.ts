export type PickFunctionKeys<T extends Record<string, any>> = Exclude<
  {
    [K in keyof T]: Required<T> extends Record<K, (...args: any) => any>
      ? K
      : never;
  }[keyof T],
  undefined
>;
