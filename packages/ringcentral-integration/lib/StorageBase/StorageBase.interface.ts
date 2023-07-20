import type { EventEmitter } from 'events';

import type {
  AsyncStorage,
  GenericStorage,
} from '../../interfaces/GenericStorage.interface';
import type { LocalForageStorage } from '../LocalForageStorage';
import type { SynchronizedStorage } from '../SynchronizedStorage';

export type IStorage =
  | (EventEmitter & GenericStorage)
  | (EventEmitter & AsyncStorage);

export interface IStorageBaseOptions<
  T = typeof SynchronizedStorage | typeof LocalForageStorage,
> {
  /**
   * providers of storage
   */
  StorageProvider?: T;
  /**
   * disable clear unused storage data
   */
  disableClearUnused?: boolean;
}

export interface StorageBaseOptions extends IStorageBaseOptions {
  name: string;
}

export interface Deps {
  prefix?: string;
}
