import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { StorageOptions } from '@ringcentral-integration/commons/modules/Storage';
import type { TabManager } from '@ringcentral-integration/commons/modules/TabManager';

import type { EvAuth } from '../EvAuth';

export type EvStorageOptions = StorageOptions;
export interface Deps {
  auth: Auth;
  evAuth: EvAuth;
  tabManager?: TabManager;
  storageOptions?: EvStorageOptions;
}
