export type LogOptions<T, S> = {
  item?: T;
} & S;

export interface Options {
  storageKey?: string;
  enableCache?: boolean;
}

export interface Deps {}
