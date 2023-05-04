import { EventEmitter } from 'events';

import {
  AsyncStorage,
  GenericStorage,
} from '../../interfaces/GenericStorage.interface';
import { LocalForageStorage } from '../LocalForageStorage';
import { SynchronizedStorage } from '../SynchronizedStorage';

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
