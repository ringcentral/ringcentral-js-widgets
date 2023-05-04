import { Storage } from '../../modules/Storage';

export interface Deps {
  storage?: Storage;
}

export interface DataMatcherOptions {
  ttl?: number;
  noMatchTtl?: number;
  disableCache?: boolean;
}

export type MatchData<T> = Record<
  string,
  Record<string, { data: T[]; _t: number }>
>;

export interface QuerySourceOptions {
  /**
   * Get some queries for matching
   */
  getQueriesFn: () => Queries;
  /**
   * Match readiness check
   */
  readyCheckFn: () => boolean;
}

export interface SearchProvider<T> {
  /**
   * Provide search method
   */
  searchFn: (
    ...args: any
  ) => Promise<Record<string, T[]>> | Record<string, T[]>;
  /**
   * Search source readiness check
   */
  readyCheckFn: () => boolean;
}

type Queries = string[];

export interface SearchProviderOptions<T> extends SearchProvider<T> {
  /**
   * search provider name
   */
  name: string;
}

export interface TriggerMatchOptions {
  ignoreCache?: boolean;
  ignoreQueue?: boolean;
}

export interface MatchOptions {
  queries: Queries;
  ignoreCache?: boolean;
  ignoreQueue?: boolean;
}

export interface FetchMatchResultOptions {
  name: string;
  queries: Queries;
}

export interface MatchSourceOptions {
  name: string;
  queries: Queries;
  ignoreCache: boolean;
  ignoreQueue: boolean;
}

export interface InsertMatchEntriesOptions<T> {
  name: string;
  queries: Queries;
  data: Record<string, T[]>;
}

export interface MatchQueue {
  queries: Queries;
  promise: Promise<void>;
}

export interface MatchPromises<T> {
  promise: Promise<Record<string, T[]>>;
  queries: Queries;
}
