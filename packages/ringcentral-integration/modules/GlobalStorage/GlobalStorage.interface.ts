import {
  Deps as StorageBaseDeps,
  IStorageBaseOptions,
} from '../../lib/StorageBase';

export interface Deps extends StorageBaseDeps {
  globalStorageOptions?: GlobalStorageOptions;
}

export interface GlobalStorageOptions extends IStorageBaseOptions {}
