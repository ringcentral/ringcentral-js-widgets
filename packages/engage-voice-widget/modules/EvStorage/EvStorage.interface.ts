import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { StorageOptions } from '@ringcentral-integration/commons/modules/StorageV2';
import { TabManager } from '@ringcentral-integration/commons/modules/TabManager';

import { EvAuth } from '../EvAuth';

export type EvStorageOptions = StorageOptions;
export interface Deps {
  auth: Auth;
  evAuth: EvAuth;
  tabManager?: TabManager;
  storageOptions?: EvStorageOptions;
}
