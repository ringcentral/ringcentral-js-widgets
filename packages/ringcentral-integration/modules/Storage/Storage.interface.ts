import type {
  Deps as StorageBaseDeps,
  IStorageBaseOptions,
} from '../../lib/StorageBase';
import type { Auth } from '../Auth';
import type { TabManager } from '../TabManager';

export interface StorageOptions extends IStorageBaseOptions {
  /**
   * disable inactive tabs Write storage
   */
  disableInactiveTabsWrite?: boolean;
}

export interface Deps extends StorageBaseDeps {
  auth: Auth;
  tabManager?: TabManager;
  storageOptions?: StorageOptions;
}
