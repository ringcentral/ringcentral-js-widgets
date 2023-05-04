import { Auth } from '@ringcentral-integration/commons/modules/Auth';
import { StorageOptions } from '@ringcentral-integration/commons/modules/Storage';
import { TabManager } from '@ringcentral-integration/commons/modules/TabManager';

import { EvAuth } from '../EvAuth';

export type EvStorageOptions = StorageOptions;
export interface Deps {
  auth: Auth;
  evAuth: EvAuth;
  tabManager?: TabManager;
  storageOptions?: EvStorageOptions;
}
