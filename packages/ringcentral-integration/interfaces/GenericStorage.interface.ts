type Async = 'async';
type Sync = 'sync';

type ReturnValue<T, R> = T extends Async ? Promise<R> : R;

export interface GenericStorage<T extends Async | Sync = Sync> {
  getLocalStorageKeys(): ReturnValue<T, string[]>;
  getData(): ReturnValue<T, Record<string, unknown>>;
  getItem(key: string): ReturnValue<T, unknown>;
  setItem(key: string, value: unknown): ReturnValue<T, void>;
  removeItem(key: string): ReturnValue<T, void>;
  destroy(): void;
  readonly id: string;
  readonly driver: string;
}

export type AsyncStorage = GenericStorage<Async>;

export interface StorageItem {
  value: unknown;
  setter: string;
}
