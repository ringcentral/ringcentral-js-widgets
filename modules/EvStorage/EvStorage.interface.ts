import { Auth } from 'ringcentral-integration/modules/AuthV2';
import { StorageOptions } from 'ringcentral-integration/modules/StorageV2';
import { TabManager } from 'ringcentral-integration/modules/TabManagerV2';
import { EvAuth } from '../EvAuth';

export type EvStorageOptions = StorageOptions;
export interface Deps {
  auth: Auth;
  evAuth: EvAuth;
  tabManager?: TabManager;
  storageOptions?: EvStorageOptions;
}
