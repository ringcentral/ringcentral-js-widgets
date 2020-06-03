type Values<T> = T extends { [P: string]: infer V } ? V : never;

type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export type DeepWriteableValues<T> = Values<DeepWriteable<T>>;
