/**
 * Get type from array to union type example => [a, b] to 'a' | 'b'
 */
export type TupletoUnion<T> = T extends { [index: number]: infer E }
  ? E
  : never;
