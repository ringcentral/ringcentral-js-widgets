import {
  IStorageBaseOptions,
  Deps as StorageBaseDeps,
} from '../../lib/StorageBaseV2';
import { Auth } from '../AuthV2';
import { TabManager } from '../TabManager';

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
