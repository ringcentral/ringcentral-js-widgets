import { EventEmitter } from 'events';
import {
  GenericStorage,
  AsyncStorage,
} from '../../interfaces/GenericStorage.interface';
import { SynchronizedStorage } from '../SynchronizedStorage';
import { LocalForageStorage } from '../LocalForageStorage';

export type IStorage =
  | (EventEmitter & GenericStorage)
  | (EventEmitter & AsyncStorage);

export interface IStorageBaseOptions<
  T = typeof SynchronizedStorage | typeof LocalForageStorage
> {
  /**
   * providers of storage
   */
  StorageProvider?: T;
}

export interface StorageBaseOptions extends IStorageBaseOptions {
  name: string;
}

export interface Deps {
  prefix?: string;
}
