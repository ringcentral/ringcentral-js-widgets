import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import { PickFunctions } from '@ringcentral-integration/utils/src/typeFunctions/PickFunctions';
import type {
  Service as BaseService,
  defaultStateKey,
  stateKey,
} from 'reactant-share';

import { userIdReadyKey } from './constant';
import type { globalStorageKey } from './lib/decorators/globalStorage';
import type { localStorageOnlyKey } from './lib/decorators/localStorage';
import type { storageKey } from './lib/decorators/storage';
import type { userStorageKey } from './lib/decorators/userStorage';

export type UIFunctions<T extends Record<string, any>> = PickFunctions<T>;

export type UIProps<T extends Record<string, any>> = OmitFunctions<T>;

export interface Service extends BaseService {
  [storageKey]: Set<string>;
  [stateKey]: Record<string, any>;
  [defaultStateKey]?: Record<string, Record<string, any>>;
  [userStorageKey]?: Set<string>;
  [globalStorageKey]?: Set<string>;
  [localStorageOnlyKey]?: Set<string>;
  [userIdReadyKey]?: () => boolean;
}
