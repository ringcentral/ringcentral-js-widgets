import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import {
  moduleActionTypes,
  ModuleActionTypes,
} from '../../enums/moduleActionTypes';

export default ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'updateTimezones',
    'updateCacheExpiredAt',
  ],
  'timezone',
);

export interface TimezoneActionTypes extends ModuleActionTypes {
  updateTimezones: string;
  updateCacheExpiredAt: string;
}
